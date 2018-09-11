module.exports = {
  host: "localhost",
  port: 1234,
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
    }
  }
};
