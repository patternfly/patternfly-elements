const fs = require("fs");
const path = require("path");
const normalizeWorkspace = x =>
  fs.readdirSync(path.join(__dirname, x)).map(x => x.replace('pfe-', ''));

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
      ...normalizeWorkspace('elements'),
      ...normalizeWorkspace('core'),
      ...normalizeWorkspace('tools'),
    ]],
  }
};
