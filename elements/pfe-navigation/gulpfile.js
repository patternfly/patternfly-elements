const gulpFactory = require("../../scripts/gulpfile.factory.js");
const pfelementPackage = require("./package.json");

gulpFactory(pfelementPackage.pfelement);

// Copy SVG from assets folder into the iconSVG function
