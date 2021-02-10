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

// Validate component listing
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

// Build the command out to be run
let cmd = `lerna -- run build --no-bail --include-dependencies ${components.map(el => `--scope '*/${el}'`).join(" ")}`;

// Run the command
let currentComponent;
const build = shell.exec(`npm run ${cmd}`, { silent: true, async: true }); //, (code, stdout, stderr) => {

const processStream = (data, line) => {
  line += data;
  if (line.match(/\n/)) {
    // Split lines out by newline breaks for parsing
    let lines = line.split("\n");

    // If the end of the line is not a newline, capture that part and add it back to the empty line
    if (!line.match(/\n$/)) {
      let pos = line.lastIndexOf(/\n/);
      if (pos >= 0) {
        console.log(line.substr(pos + 1));
        line = line.substr(pos + 1);
      }
    }

    // Start parsing those lines for data
    return lines.filter(l => l !== "");
  }
};

let out = "";
let colorIdx = 0;
build.stdout.on("data", data => {
  if (!data) return;

  const lines = processStream(data, out) || [];

  lines.forEach(line => {
    let color = currentColor(colorIdx);
    if (currentComponent) shell.echo("-n", chalk[color].bold(`@patternfly/${currentComponent}: `));
    shell.echo(chalk[color](line));
  });
});

// Capture the command output and organize it by component
// Object.entries(output.build).forEach(values => {
//   let key = values[0];
//   let message = values[1].message;

//   if (components.includes(key)) {
//     if (values[1].status) {
//       status = values[1].status === "success" ? 0 : 1;
//     }

//     shell.echo(chalk`{${colors[Math.floor(Math.random() * colors.length)]}.bold @patternfly/${key}}\n${message}`);

//     // if (argv.verbose) {
//     //   // Pass/fail message
//     //   if (status === 0 && !argv.verbose) shell.echo(chalk`{green.bold \u2713  ${key}}`);
//     //   else shell.echo(chalk`\n\n{red.bold \u2716  ${key} failed}\n`);

//     //   if (message) shell.echo(`${message}`);
//     // } else {
//     //   shell.echo(chalk`{green.bold \u2713  ${key}}`);
//     // }
//   }
// });

let err = "";
build.stderr.on("data", data => {
  if (!data) return;

  const lines = processStream(data, err) || [];

  lines.forEach(line => {
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
