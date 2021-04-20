
const _ = require("lodash");
const path = require("path");
const chalk = require("chalk");
const shell = require("shelljs");
const fs = require("fs");
const elementsDir = path.join(__dirname, "../elements");

module.exports.printOpts = (key, value) =>
  `--${_.kebabCase(key)}${
    typeof value === "boolean" && value === true
      ? ""
      : typeof value === "boolean" && value === false
      ? `="${value}"}`
      : typeof value === "number"
      ? `=${value}`
      : `="${value}"`
  }`;

module.exports.lernaRun = (command, components) => `lerna -- run ${command} --no-bail --parallel --include-dependencies ${
  components.length > 0 ? components.map(item => `--scope '*/${item}'`).join(" ") : ""}`;


// Optional filter input
module.exports.getElementNames = (filterHandler = undefined) => {
  let elementNames = fs
    .readdirSync(elementsDir)
    .filter(file => fs.statSync(path.join(elementsDir, file)).isDirectory());

  if (typeof filterHandler === "function") {
    elementNames.filter(filterHandler);
  } else if (filterHandler !== undefined) {
    console.warn("The getElementNames tool uses a function for the filterHandler input (optional).");
  }

  return elementNames;
};

module.exports.validateElementNames = (components) => {
  let allComponents = this.getElementNames();

  // Validate component inputs
  let invalid = components.filter(item => !allComponents.includes(item));
  if (invalid.length > 0) {
    // Try adding the pfe- prefix and check again
    invalid = components.filter((item, idx) => {
      let isValid = allComponents.includes(`pfe-${item}`);
      // Replace the entry in components if it is valid
      if (isValid) components.splice(idx, 1, `pfe-${item}`);
      return !isValid;
    });
  }

  if (invalid.length > 0) {
    shell.echo(chalk`{bold No component directory found for: {red ${invalid.join(", ")}}}\n`);
    // Remove invalid items from the array
    components = components.filter(item => !invalid.includes(item));
    // If the array is now empty, exit the script
    if (components.length === 0) shell.exit(1);
  }

  return components;
}
