function ansiDash(str) {
  return str.replace(/([A-Z])/g, sub => `-${sub.toLowerCase()}`);
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Warns users against importing Lit decorators from decorators.js, without manually tree-shaking',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source?.value === 'lit/decorators.js') {
          context.report({
            message: 'Lit decorator imports must be tree-shaken in source',
            node,
            fix(fixer) {
              return fixer.replaceText(node, node
                .specifiers
                .map(({ local: { name } }) =>
                  `import { ${name} } from 'lit/decorators/${ansiDash(name)}.js';`).join('\n'));
            },
          });
        }
      }
    };
  },
};
