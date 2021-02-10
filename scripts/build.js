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
    },
    // quiet: {
    //   describe: "reduce noise in console output",
    //   type: "boolean",
    //   default: true
    // },
    verbose: {
      alias: "v",
      describe: "increase noise in console output",
      type: "boolean",
      default: false
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
  shell.echo(chalk`{red No component directory found for: ${invalid.join(", ")}}`);
  // Remove invalid items from the array
  components = components.filter(item => allComponents.includes(item));
}

let currentComponent;
let colorIdx = 0;

// Build the command out to be run
let cmd = `lerna -- run build --no-bail --include-dependencies ${components.map(el => `--scope '*/${el}'`).join(" ")}`;
// Run the command
const build = shell.exec(`npm run ${cmd}`, { silent: true, async: true }); //, (code, stdout, stderr) => {

const processStream = (line, stack) => {
  if (!line.match(/\n/)) return [];

  let lines = line.split("\n");

  // If the end of the line is not a newline, capture that part and add it back to the empty line
  if (!line.match(/\n$/)) {
    // Pop the last item off the array
    lines.pop();

    // Reset the stack equal to the substring
    let pos = line.lastIndexOf(/\n/);
    stack = stack.substr(pos + 1);
  }

  // Split lines out by newline breaks for parsing
  return lines;
};

let out = "";
build.stdout.on("data", data => {
  if (!data) return;

  processStream((out += data), out).forEach(line => {
    let color = currentColor(colorIdx);
    if (currentComponent) shell.echo("-n", chalk[color].bold(`@patternfly/${currentComponent}: `));
    shell.echo(chalk.reset(line));
  });
});

let err = "";
build.stderr.on("data", data => {
  if (!data) return;

  processStream((err += data), err).forEach((line, idx, lines) => {
    // Capture component name being built
    let match = line.trim().match(/'build' in '@patternfly\/([\w-]+)' in (.*?):$/);
    // Update the name of the component currently being built
    if (match && match[1] && match[1] !== currentComponent) {
      currentComponent = match[1];
      shell.echo("");
      if (++colorIdx > colors.length - 1) colorIdx = 0;
    }
    // if (match[2]) @TODO do something with the build time
    shell.echo(chalk.gray(line));
  });
});

if (argv.storybook) shell.exec(`npm run build-storybook`);
