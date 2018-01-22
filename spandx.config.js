module.exports = {
  host: "localhost",
  port: 1234,
  open: true,
  startPath: "/doc",
  verbose: false,
  routes: {
    "/elements": "./elements",
    "/doc": "./doc",
    "/": "./node_modules/"
  }
};
