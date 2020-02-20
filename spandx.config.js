// If we have a .env file respect the LOCALHOST setting
// If not default to localhost
require("dotenv").config();

module.exports = {
  host: process.env.LOCALHOST || "localhost",
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
