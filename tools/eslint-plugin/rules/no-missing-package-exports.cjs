const { dirname, join } = require('node:path');
const { existsSync } = require('node:fs');
const { globSync } = require('glob');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Requires package.json to export element files',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          typescript: {
            type: 'boolean'
          },
          matches: {
            type: 'array',
            items: { type: 'string' }
          },
          additionalProperties: false
        }
      }
    ]
  },
  create(context) {
    if (!context.getSourceCode().parserServices.isJSON) {
      return {};
    }
    const cwd = context.getCwd();
    const [options] = context.options;
    const ts = options.typescript ?? existsSync(join(dirname(context.getPhysicalFilename()), 'tsconfig.json'));
    const matches = options.matches.map(x => ts ? x.replace(/\.js$/, '.ts') : x);
    const files = globSync(matches, { cwd });
    const entryPoints = files
      .map(x => !ts ? x : x.replace('.js', '.ts'))
      .filter(x => !x.endsWith('.d.ts'))
      .filter(x => !x.endsWith('.map.js'))
      .map(x => x.replace(/^elements/, '.'));
    return {
      JSONProperty(node) {
        if (node.key?.value === 'exports' && node.value?.type === 'JSONObjectExpression') {
          const fixes = [];
          const exportkeys = new Set((node.value?.properties ?? []).map(x => x.key?.value).filter(Boolean));
          for (const entryPoint of entryPoints) {
            const exportKey = entryPoint.replace('.ts', '.js');
            if (!exportkeys.has(exportKey)) {
              fixes.push(exportKey);
            }
          }
          for (const fix of fixes) {
            context.report({
              message: `Missing package export ${fix}`,
              node: node.value,
              fix(fixer) {
                const last = node.value.properties.at(-1);
                const alphaNext = node.value.properties.find(x => x.key.value > fix);
                if (alphaNext) {
                  return fixer.insertTextBefore(alphaNext, `"${fix}": "${fix}",\n    `);
                } else {
                  return fixer.insertTextAfter(last, `,\n    "${fix}": "${fix}",`);
                }
              },
            });
          }
        }
      }
    };
  },
};
