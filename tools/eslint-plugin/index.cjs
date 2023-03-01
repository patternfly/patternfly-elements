/* eslint-env node */
const noLitDecoratorsIndexImport = require('./rules/no-lit-decorators-index-import.cjs');

module.exports = {
  rules: {
    'no-lit-decorators-index-import': noLitDecoratorsIndexImport,
  },
};
