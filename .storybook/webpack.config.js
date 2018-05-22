const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias = {
    '../../whatwg-fetch/fetch.js': path.join(__dirname, '../node_modules/whatwg-fetch/fetch.js'),
    '../../numeral/min/numeral.min.js': path.join(__dirname, '../node_modules/numeral/min/numeral.min.js')
  };

  return defaultConfig;
};
