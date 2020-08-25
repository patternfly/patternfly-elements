const path = require("path");
const fs = require("fs");
const elementsDir = path.join(__dirname, "../elements");

const getElementNames = () => {
  let elementNames = fs
    .readdirSync(elementsDir)
    .filter(file => fs.statSync(path.join(elementsDir, file)).isDirectory());

  // Remove base class and sass helpers from listing
  elementNames = elementNames.filter(
    folder => folder !== "pfelement" && !folder.includes("sass")
  );

  return elementNames;
};

exports.getElementNames = getElementNames;
