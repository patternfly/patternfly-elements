// @ts-check
const ts = require('typescript');
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
 * @param {string} content
 * @param {string} [name]
 */
function createLitCssTaggedTemplateLiteral(ctx, content, name) {
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
          ctx.factory.createNoSubstitutionTemplateLiteral(content),
        )
      )
    ], ts.NodeFlags.Const)
  );
}

/**
 * Replace .css import specifiers with .css.js import specifiers
 * @param {import('typescript').Program} _program
 * @return {import('typescript').TransformerFactory<import('typescript').Node>}
 */
module.exports = function(_program, { inline = false } = {}) {
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
            return [
              createLitCssImportStatement(ctx, node.getSourceFile()),
              createLitCssTaggedTemplateLiteral(ctx, content, node.importClause?.name?.getText()),
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

