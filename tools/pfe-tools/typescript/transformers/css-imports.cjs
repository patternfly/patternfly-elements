const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const SEEN_SOURCES = new WeakSet();

/**
 * @param {ts.CoreTransformationContext} ctx
 * @param {ts.SourceFile} sourceFile
 */
function createLitCssImportStatement(ctx, sourceFile) {
  if (SEEN_SOURCES.has(sourceFile)) {
    return;
  }
  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement)
      && statement.moduleSpecifier.getText() === 'lit') {
      for (const binding of statement.importClause?.namedBindings?.getChildren() ?? []) {
        if (binding.getText() === 'css') {
          SEEN_SOURCES.add(sourceFile);
          return;
        }
      }
    }
  }
  SEEN_SOURCES.add(sourceFile);
  return ctx.factory.createImportDeclaration(
    undefined,
    ctx.factory.createImportClause(
      false,
      undefined,
      ctx.factory.createNamedImports([
        ctx.factory.createImportSpecifier(
          false,
          undefined,
          ctx.factory.createIdentifier('css')
        ),
      ]),
    ),
    ctx.factory.createStringLiteral('lit'),
  );
}

/**
 * @param {ts.CoreTransformationContext} ctx
 * @param {ts.SourceFile} stylesheet source file
 * @param {string} [name]
 */
function createLitCssTaggedTemplateLiteral(ctx, stylesheet, name) {
  return ctx.factory.createVariableStatement(
    undefined,
    ctx.factory.createVariableDeclarationList([
      ctx.factory.createVariableDeclaration(
        name ?? 'style',
        undefined,
        undefined,
        ctx.factory.createTaggedTemplateExpression(
          ctx.factory.createIdentifier('css'),
          undefined,
          ctx.factory.createNoSubstitutionTemplateLiteral(stylesheet),
        )
      ),
    ], ts.NodeFlags.Const)
  );
}

/**
 * @param {string} stylesheet
 * @param {string} filePath
 */
function minifyCss(stylesheet, filePath) {
  const CleanCSS = require('clean-css');

  try {
    const clean = new CleanCSS({ returnPromise: false });
    const { styles } = clean.minify(stylesheet);
    return styles;
  } catch (e) {
    /* eslint-disable no-console */
    console.log('Could not minify ', filePath);
    console.error(e);
    /* eslint-enable no-console */
    return stylesheet;
  }
}

/** @param {ts.ImportDeclaration} node */
function getImportSpecifier(node) {
  return node.moduleSpecifier.getText().replace(/^'(.*)'$/, '$1');
}

/**
 * @param {ts.Node} node
 * @returns {node is ts.ImportDeclaration}
 */
function isCssImportNode(node) {
  if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
    const specifier = getImportSpecifier(node);
    return specifier.endsWith('.css');
  } else {
    return false;
  }
}

/** map from (abspath to import spec) to (set of abspaths to importers) */
const cssImportSpecImporterMap = new Map();

/** map from (abspath to import spec) to (abspaths to manually written transformed module) */
const cssImportFakeEmitMap = new Map();

/** @param {ts.ImportDeclaration} node */
function getImportAbsPathOrBareSpec(node) {
  const specifier = getImportSpecifier(node);
  if (!specifier.startsWith('.')) {
    return specifier;
  } else {
    const { fileName } = node.getSourceFile();
    const specifierRelative = path.resolve(path.dirname(fileName), specifier);
    return specifierRelative;
  }
}

/** @param {ts.SourceFile} sourceFile */
function cacheCssImportSpecsAbsolute(sourceFile) {
  sourceFile.forEachChild(node => {
    if (isCssImportNode(node)) {
      const specifierAbs = getImportAbsPathOrBareSpec(node);
      cssImportSpecImporterMap.set(specifierAbs, new Set([
        ...cssImportSpecImporterMap.get(specifierAbs) ?? [],
        node.getSourceFile().fileName,
      ]));
    }
  });
}

function getStylesheetContent(specifier, fileName, minify) {
  let content; let pathname;
  if (specifier.startsWith('.')) {
    const dir = pathToFileURL(fileName);
    const url = new URL(specifier, dir);
    ({ pathname } = url);
    content = fs.readFileSync(url, 'utf-8');
  } else {
    pathname = require.resolve(specifier);
    content = fs.readFileSync(pathname, 'utf-8');
  }
  return minify ? minifyCss(content, pathname) : content;
}

/**
 * Replace .css import specifiers with .css.js import specifiers
 * If the inline option is set, remove the import specifier and print the css
 * object in place, except if that module is imported elsewhere in the project,
 * in which case leave a `.css.js` import
 * @param {ts.Program} program
 * @param opts
 * @param {boolean} opts.inline
 * @param {boolean} opts.minify
 * @returns {ts.TransformerFactory<ts.SourceFile>}
 */
module.exports = function(program, {
  inline = false,
  minify = false,
} = {}) {
  return ctx => {
    for (const sourceFileName of program.getRootFileNames()) {
      const sourceFile = program.getSourceFile(sourceFileName);
      if (sourceFile && !sourceFile.isDeclarationFile) {
        cacheCssImportSpecsAbsolute(sourceFile);
      }
    }

    /** @param {ts.Node} node */
    function rewriteOrInlineVisitor(node) {
      if (isCssImportNode(node)) {
        const { fileName } = node.getSourceFile();
        const specifier = getImportSpecifier(node);
        const specifierAbs = getImportAbsPathOrBareSpec(node);
        if (inline) {
          const cached = cssImportSpecImporterMap.get(specifierAbs);
          if (cached?.size === 1) {
            const stylesheet = getStylesheetContent(specifier, fileName, minify);
            return [
              createLitCssImportStatement(ctx, node.getSourceFile()),
              createLitCssTaggedTemplateLiteral(
                ctx,
                stylesheet,
                node.importClause?.name?.getText(),
              ),
            ];
          } else if (!cssImportFakeEmitMap.get(specifierAbs)) {
            const outPath = `${specifierAbs}.js`;
            const css = fs.readFileSync(specifierAbs, 'utf8');
            const stylesheet = minify ? minifyCss(css, specifierAbs) : css;
            fs.writeFileSync(outPath, `import { css } from 'lit';\nexport default css\`${stylesheet}\`;`, 'utf8');
            cssImportFakeEmitMap.set(specifierAbs, outPath);
          }
        }
        return ctx.factory.createImportDeclaration(
          node.modifiers,
          node.importClause,
          ctx.factory.createStringLiteral(`${specifier}.js`)
        );
      }
      return ts.visitEachChild(node, rewriteOrInlineVisitor, ctx);
    }

    return sourceFile => {
      const children = sourceFile.getChildren();

      // eslint-disable-next-line
      /** @type {ts.ImportDeclaration} */
      const litImportBindings =
        (children.find(x =>
          !ts.isTypeOnlyImportOrExportDeclaration(x)
        && !ts.isNamespaceImport(x)
        && ts.isImportDeclaration(x)
        && x.moduleSpecifier.getText() === 'lit'
        && x.importClause?.namedBindings
        ))?.importClause?.namedBindings;

      const hasStyleImports = children.find(x =>
        ts.isImportDeclaration(x) && x.moduleSpecifier.getText().endsWith('.css'));

      if (hasStyleImports) {
        if (litImportBindings
          && ts.isNamedImports(litImportBindings)
          && !litImportBindings.elements?.some(x => x.getText() === 'css')) {
          ctx.factory.updateNamedImports(
            litImportBindings,
            [
              ...litImportBindings.elements,
              ctx.factory.createImportSpecifier(
                false,
                undefined,
                ctx.factory.createIdentifier('css'),
              ),
            ]
          );
        }
      }
      return ts.visitEachChild(sourceFile, rewriteOrInlineVisitor, ctx);
    };
  };
};

