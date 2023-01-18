// @ts-check
const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

/**
 * Replace .css import specifiers with .css.js import specifiers
* @param {import('typescript').Program} program
* @return {import('typescript').TransformerFactory<import('typescript').Node>}
 */
module.exports = function(program, { inline = false } = {}) {
  return ctx => {
    function visitor(node) {
      if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
        const specifier = node.moduleSpecifier.getText().replace(/^'(.*)'$/, '$1');
        if (specifier.endsWith('.css')) {
          if (inline) {
            const cw = program.getCurrentDirectory();
            const { fileName } = node.getSourceFile();
            const dir = pathToFileURL(fileName);
            const url = new URL(specifier, dir);
            const content = fs.readFileSync(url, 'utf-8');
            return [
              ctx.factory.createImportDeclaration(
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
                ctx.factory.createIdentifier('lit'),
              ),
              ctx.factory.createVariableStatement(
                undefined,
                ctx.factory.createVariableDeclarationList([
                  ctx.factory.createVariableDeclaration(
                    node.importClause?.name ?? 'style',
                    undefined,
                    undefined,
                    ctx.factory.createTaggedTemplateExpression(
                      ctx.factory.createIdentifier('css'),
                      undefined,
                      ctx.factory.createNoSubstitutionTemplateLiteral(content),
                    )
                  )
                ], ts.NodeFlags.Const)
              ),
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
    return sourceFile => ts.visitEachChild(sourceFile, visitor, ctx);
  };
};
