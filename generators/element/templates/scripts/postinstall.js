const fs = require("fs");
const path = require("path");

const pfelementPackage = require("../package.json");
const elementName = pfelementPackage.pfelement.elementName;
const elementPath = path.join("node_modules", elementName);
const elementFileName = `${elementName}.js`;
const elementFileNameMap = `${elementFileName}.map`;
const elementFileNameUmd = `${elementName}.umd.js`;
const elementFileNameUmdMap = `${elementFileNameUmd}.map`;
const filesToSymLink = [elementFileName, elementFileNameMap, elementFileNameUmd, elementFileNameUmdMap];

if (!fs.existsSync(elementPath)) {
  fs.mkdirSync(elementPath);

  filesToSymLink.forEach(fileName => {
    fs.symlinkSync(
      path.join("..", "..", fileName),
      path.join(elementPath, fileName)
    );
  });
}
