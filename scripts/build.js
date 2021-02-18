#!/usr/bin/env node
process.env.FORCE_COLOR = 3;

// @TODO: Incorporate docs compile?
const shell = require("shelljs");
const chalk = require("chalk");
const colors = ["cyan", "yellow", "magenta", "blue"];
const tools = require("./tools.js");
const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm run build -- --help`.
  .usage("Usage: npm build -- [options]")
  .example([
    ["npm run build", "(compile all components)"],
    ["npm run build -- pfe-card", "(compile one component)"],
    ["npm run build -- pfe-card pfe-band", "(compile multiple components)"],
    ["npm run build -- --storybook", "(build storybook instance)"],
    // ["npm run build -- --quiet", "(reduce console output)"],
    ["npm run build -- --verbose", "(noisy console output)"]
  ])
  .options({
    storybook: {
      alias: "s",
      describe: "build the storybook instance",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
let components = argv._.length > 0 ? argv._ : [];
let allComponents = tools.getElementNames();
let currentColor = idx => colors[idx];

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

let currentComponent;
let colorIdx = 0;

// Build the command out to be run
let cmd = `lerna -- run build --no-bail --stream --include-dependencies ${components.map(el => `--scope '*/${el}'`).join(" ")}`;

// Run the command
const build = shell.exec(`npm run ${cmd}`);

if (argv.storybook) shell.exec(`npm run build-storybook`);
