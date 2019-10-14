module.exports = {
  host: "localhost",
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
      ignored: ["node_modules"]
    },
    middleware: [require("compression")()]
  }
};
