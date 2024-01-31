// @ts-check
const ts = require('typescript/lib/typescript');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');

const SEEN_SOURCES = new WeakSet();

/**
 * @param {import('typescript').CoreTransformationContext} ctx
 * @param {import('typescript').SourceFile} sourceFile
 */
function createLitCssImportStatement(ctx, sourceFile) {
  if (SEEN_SOURCES.has(sourceFile)) {
    return;
  }
  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      statement.moduleSpecifier.getText() === 'lit') {
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
        )
      ]),
    ),
    ctx.factory.createStringLiteral('lit'),
  );
}

/**
 * @param {import('typescript').CoreTransformationContext} ctx
 * @param {string} stylesheet
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
      )
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
    console.log('Could not minify ', filePath);
    console.error(e);
    return stylesheet;
  }
}

/**
 * Replace .css import specifiers with .css.js import specifiers
 * @param {import('typescript').Program} _program
 * @return {import('typescript').TransformerFactory<import('typescript').Node>}
 */
module.exports = function(_program, { inline = false, minify = false } = {}) {
  // TODO: find duplicated imports and refuse to inline them
  // i.e. run visitEachChild twice,
  // 1. to build up a cache of css module specifiers that are imported more than once
  // 2. to inline every import except the ones in the cache
  //    (and write the rest to .css.js files)
  return ctx => {
    /**
     * @param {import('typescript').Node} node
     */
    function visitor(node) {
      if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
        const specifier = node.moduleSpecifier.getText().replace(/^'(.*)'$/, '$1');
        if (specifier.endsWith('.css')) {
          if (inline) {
            const { fileName } = node.getSourceFile();
            const dir = pathToFileURL(fileName);
            const url = new URL(specifier, dir);
            const content = fs.readFileSync(url, 'utf-8');
            const stylesheet = minify ? minifyCss(content, url.pathname) : content;
            return [
              createLitCssImportStatement(ctx, node.getSourceFile()),
              createLitCssTaggedTemplateLiteral(ctx, stylesheet, node.importClause?.name?.getText()),
            ];
          } else {
            return ctx.factory.createImportDeclaration(
              node.modifiers,
              node.importClause,
              ctx.factory.createStringLiteral(`${specifier}.js`)
            );
          }
        }
      }
      return ts.visitEachChild(node, visitor, ctx);
    }

    return sourceFile => {
      const children = sourceFile.getChildren();
      const litImportBindings = /** @type {ts.ImportDeclaration|undefined} */(children.find(x =>
        !ts.isTypeOnlyImportOrExportDeclaration(x) &&
        !ts.isNamespaceImport(x) &&
        ts.isImportDeclaration(x) &&
        x.moduleSpecifier.getText() === 'lit' &&
        x.importClause?.namedBindings
      ))?.importClause?.namedBindings;

      const hasStyleImports = children.find(x => ts.isImportDeclaration(x) && x.moduleSpecifier.getText().endsWith('.css'));
      if (hasStyleImports) {
        if (litImportBindings && ts.isNamedImports(litImportBindings) && !litImportBindings.elements?.some(x => x.getText() === 'css')) {
          ctx.factory.updateNamedImports(
            litImportBindings,
            [
              ...litImportBindings.elements,
              ctx.factory.createImportSpecifier(false, undefined, ctx.factory.createIdentifier('css'))
            ]
          );
        }
      }
      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
};
