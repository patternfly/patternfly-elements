// If we have a .env file respect the LOCALHOST setting
// If not default to localhost
require("dotenv").config();

// Check the command input for any component names, filter those out
const COMPONENTS = process.argv.filter(input => input.startsWith("pfe-"));

module.exports = {
  host: process.env.LOCALHOST || "localhost",
  port: process.env.PORT || "auto",
  open: process.env.OPEN || true,
  // If only 1 component is listed, open that demo page specifically, otherwise, show the listing
  startPath: COMPONENTS.length === 1 ? `/elements/${COMPONENTS[0]}/demo` : "/examples",
  verbose: false,
  routes: {
    "/elements": "./elements",
    "/examples": "./examples",
    "/favicon.ico": "./favicon.ico",
    "/": "./",
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
