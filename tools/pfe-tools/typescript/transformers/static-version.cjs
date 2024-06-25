const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');

/**
 * @param {ts.ModifierLike} mod
 * @returns {mod is ts.ExportKeyword}
 */
const isExportKeyword = mod =>
  mod.kind === ts.SyntaxKind.ExportKeyword;

/**
 * @param {ts.ModifierLike} mod
 * @returns {mod is ts.Decorator}
 */
const isCustomElementDecorator = mod =>
  ts.isDecorator(mod)
  && ts.isCallExpression(mod.expression)
  && ts.isIdentifier(mod.expression.expression)
  && mod.expression.expression.escapedText === 'customElement';

/**
 * @param {ts.Node} node
 * @returns {node is ts.ClassDeclaration}
 */
const isExportCustomElementClass = node =>
  ts.isClassDeclaration(node)
  && !!node.modifiers?.some(isExportKeyword)
  && !!node.modifiers?.some(isCustomElementDecorator);

/** @param {string} dir */
function findPackageDir(dir) {
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return dir;
  }
  const parentDir = path.resolve(dir, '..');
  if (dir === parentDir) {
    return null;
  }
  return findPackageDir(parentDir);
}

/** @param {string} filePath */
function getNearestPackageJson(filePath) {
  const parentDir = path.dirname(filePath);
  const packageDir = findPackageDir(parentDir);
  if (packageDir) {
    const filePath = path.normalize(`${packageDir}/package.json`);
    return require(filePath);
  } else {
    return null;
  }
}

/** @returns {ts.TransformerFactory<ts.SourceFile>} */
module.exports = () => ctx => {
  return sourceFile => ts.visitEachChild(
    sourceFile,
    function addVersionVisitor(node) {
      if (isExportCustomElementClass(node)) {
        const { fileName } = node.getSourceFile();
        const packageJson = getNearestPackageJson(fileName);
        if (packageJson?.version) {
          return ctx.factory.createClassDeclaration(
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            node.members.concat(ctx.factory.createPropertyDeclaration(
              [ctx.factory.createModifier(ts.SyntaxKind.StaticKeyword)],
              'version',
              undefined,
              undefined,
              ctx.factory.createStringLiteral(packageJson.version)
            ))
          );
        }
      }
      return node;
    },
    ctx
  );
};

