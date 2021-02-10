#!/usr/bin/env node
process.env.FORCE_COLOR = 3;

// @TODO: Incorporate docs compile?
const shell = require("shelljs");
const chalk = require("chalk");
let colors = ["cyan", "yellow", "magenta", "blue"];
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

const processStream = (data, output = {}) => {
  // Hardcoded but this could be dynamic in the future
  const parallel = false;
  // Initialize
  let component = "";
  let capture = "";

  // Split the data by line and parse
  data.split("\n").forEach((line, idx) => {
    // Capture the entire line as-is
    const message = `${line}\n`;

    if (!parallel) {
      //-- Use this if building in series
      //> @patternfly/pfe-accordion@1.1.1 build /Users/carobert/repos/patternfly-elements/elements/pfe-accordion
      capture = line.match(/^> @patternfly\/([\w-]+)@(?:[0-9.]+) build/);
    } else {
      //-- Use this if building in parallel
      // capture = line.match(/^(?:[\u0000-\u007F]*)@patternfly\/([\w-]+)(?:[\u0000-\u007F]*)\:/);
    }

    if (capture && capture.length > 0 && capture[1]) component = capture[1];

    capture = line.match(/^lerna\s+([\w-]+)\s-\s@patternfly\/([\w-]+)/);

    // Store the lerna status in the output object
    if (capture && capture.length > 3) {
      console.log(`${component} ?= ${capture[2]}`);
      output[capture[2]].status = capture[1];
    }

    // lerna info run Ran npm script 'build' in '@patternfly/pfe-sass' in 2.3s:
    capture = line.match(/^lerna info run (?:.*) in '@patternfly\/([\w-]+)' in ([0-9.]+?)s:$/);
    if (capture && capture.length > 3) {
      output[capture[1]].time = capture[2];
    }

    if (component && message) {
      if (!output[component])
        output[component] = {
          message: message
        };
      else {
        output[component].message += message;
      }
    }
  });
  return output;
};

// Arguments with no prefix are added to the `argv._` array.
let components = argv._.length > 0 ? argv._ : [];
let allComponents = tools.getElementNames();

// Validate component listing
let invalid = components.filter(item => !allComponents.includes(item));
if (invalid.length > 0) {
  shell.echo(chalk`{red No component directory found for: ${invalid.join(", ")}}`);
  // Remove invalid items from the array
  components = components.filter(item => allComponents.includes(item));
}

// Build the command out to be run
let cmd = `lerna -- run build --no-bail --include-dependencies ${components.map(el => `--scope '*/${el}'`).join(" ")}`;

shell.exec(`npm run ${cmd}`, { silent: true }, (code, stdout, stderr) => {
  let status = code;
  let output = {
    build: {}
  };

  // Capture the command output and organize it by component
  if (stdout) output.build = processStream(stdout, output.build);

  // Capture the error output for debugging
  if (stderr) output.build = processStream(stderr, output.build);

  // Capture the command output and organize it by component
  Object.entries(output.build).forEach(values => {
    let key = values[0];
    let message = values[1].message;

    if (components.includes(key)) {
      if (values[1].status) {
        status = values[1].status === "success" ? 0 : 1;
      }

      shell.echo(chalk`{${colors[Math.floor(Math.random() * colors.length)]}.bold @patternfly/${key}}\n${message}`);

      // if (argv.verbose) {
      //   // Pass/fail message
      //   if (status === 0 && !argv.verbose) shell.echo(chalk`{green.bold \u2713  ${key}}`);
      //   else shell.echo(chalk`\n\n{red.bold \u2716  ${key} failed}\n`);

      //   if (message) shell.echo(`${message}`);
      // } else {
      //   shell.echo(chalk`{green.bold \u2713  ${key}}`);
      // }
    }
  });
});

if (argv.storybook) {
  let story = shell.exec(`npm run build-storybook`, { silent: true, async: true });
  story.on("exit", code => {
    if (code === 0) shell.echo(chalk`{green.bold ${code === 0 ? `\u2713` : `\u2716`}  Storybook built}`);
    else shell.echo(chalk`{red.bold ${code === 0 ? `\u2713` : `\u2716`}  Storybook build failed}`);
  });
}
