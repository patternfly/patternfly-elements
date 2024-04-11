const fs = require('fs');
const path = require('path');
const normalizeWorkspace = x =>
  fs.readdirSync(path.join(__dirname, x)).map(x => x.replace('pf-', ''));

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [0],
    'body-max-line-length': [0],
    'scope-enum': [2, 'always', [
      'ci',
      'config',
      'create',
      'dependencies',
      'deps',
      'docs',
      'scripts',
      'elements',
      'core',
      'tools',
      ...normalizeWorkspace('elements'),
      ...normalizeWorkspace('core'),
      ...normalizeWorkspace('tools'),
    ]],
  },
};
