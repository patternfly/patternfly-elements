// If we have a .env file respect the LOCALHOST setting
// If not default to localhost
require('dotenv').config();
let localhost = 'localhost';
if (typeof process.env === 'object' && typeof process.env.LOCALHOST !== 'undefined') {
  localhost = process.env.LOCALHOST;
}

module.exports = {
  host: localhost,
  port: "auto",
  open: true,
  startPath: "/examples",
  verbose: false,
  routes: {
    "/elements": "./elements",
    "/examples": "./examples",
    "/favicon.ico": "./favicon.ico",
    "/": "./node_modules",
    "/webassets": {
      host: "https://access.redhat.com"
    }
  },
  bs: {
    watchOptions: {
      ignoreInitial: true,
      ignored: ["node_modules", "_temp"]
    },
    middleware: [require("compression")()]
  }
};
