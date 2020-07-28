// If we have a .env file respect the LOCALHOST setting
// If not default to localhost
require("dotenv").config();

let component = process.argv[2];
if (!component.startsWith("pfe-")) {
  component = "";
}

module.exports = {
  host: process.env.LOCALHOST || "localhost",
  port: "auto",
  open: true,
  startPath: component ? `/elements/${component}/demo` : "/examples",
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
