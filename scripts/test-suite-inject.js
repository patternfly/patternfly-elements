const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const elementsDir = path.join(__dirname, "../elements");
const elementNames = fs.readdirSync(elementsDir);
const templateFile = path.join(__dirname, "../test/.index.html");
const outFile = path.join(__dirname, "../test/index.html");

function hasTests(element) {
  const path = testPathAbs(element);
  return fs.existsSync(path);
}

function testPathAbs(element) {
  return path.join(elementsDir, element, "test", "index.html");
}

function testPathRel(element) {
  return path.join(
    "./",
    "test",
    ".wct-kludge",
    "elements",
    element,
    "test",
    "index.html"
  );
}

function formatPaths(paths) {
  return paths.map(path => `        "${path}"`).join(",\n");
}

const suitePaths = _(elementNames)
  .filter(hasTests)
  .map(testPathRel)
  .value();

console.log(
  `Injecting the following elements into ${chalk.bold("test/index.html")}`
);
console.log(
  elementNames
    .filter(hasTests)
    .map(e => ` - ${chalk.blue(e)}`)
    .join("\n")
);
console.log();

const template = fs.readFileSync(templateFile).toString();

const withPaths = template.replace(
  /\/\*\s+inject:elements\s+\*\//,
  formatPaths(suitePaths)
);

fs.writeFileSync(outFile, withPaths);

console.log(chalk.green(`Complete!`));
