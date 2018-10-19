// rollup.config.js
const gulpFactory = require("../../scripts/gulpfile.factory.js");
const rhelementPackage = require("./package.json");

gulpFactory(rhelementPackage.rhelement);
