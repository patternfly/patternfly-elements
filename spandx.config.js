module.exports = {
  host: "localhost",
  port: "auto",
  open: true,
  startPath: "/doc",
  verbose: false,
  routes: {
    "/elements": "./elements",
    "/doc": "./doc",
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
