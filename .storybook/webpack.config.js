const path = require("path");

module.exports = async ({ config, mode }) => {
  config.resolve.alias = {
    "../../whatwg-fetch/fetch.js": path.join(__dirname, "../node_modules/whatwg-fetch/fetch.js"),
    "../../numeral/min/numeral.min.js": path.join(__dirname, "../node_modules/numeral/min/numeral.min.js"),
    "../../numeral/numeral.js": path.join(__dirname, "../node_modules/numeral/numeral.js"),
    "../../dialog-polyfill/dialog-polyfill.js": path.join(
      __dirname,
      "../node_modules/dialog-polyfill/dialog-polyfill.js"
    )
  };

  config.performance.hints = false;

  return config;
};
