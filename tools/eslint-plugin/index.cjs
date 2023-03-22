/* eslint-env node */
const noLitDecoratorsIndexImport = require('./rules/no-lit-decorators-index-import.cjs');
const noMissingPackageExports = require('./rules/no-missing-package-exports.cjs');

module.exports = {
  rules: {
    'no-lit-decorators-index-import': noLitDecoratorsIndexImport,
    'no-missing-package-exports': noMissingPackageExports,
  },
};
