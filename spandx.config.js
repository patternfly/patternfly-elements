module.exports = {
  host: "localhost",
  port: 1234,
  open: true,
  startPath: "/examples",
  verbose: false,
  routes: {
    "/elements": "./elements",
    "/examples": "./examples",
    "/favicon.ico": "./favicon.ico",
    "/": "./node_modules",
    "/themes": "./themes"
  },
  bs: {
    watchOptions: {
      ignoreInitial: true,
      ignored: ["node_modules"]
    },
    middleware: [require("compression")()]
  }
};
