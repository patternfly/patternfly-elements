#!/usr/bin/env node
process.env.FORCE_COLOR = 3;

// @TODO: Incorporate docs compile?
const shell = require("shelljs");
const chalk = require("chalk");
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
    ["npm run build -- --quiet", "(reduce console output)"],
    ["npm run build -- --verbose", "(noisy console output)"]
  ])
  .options({
    storybook: {
      alias: "s",
      describe: "build the storybook instance",
      type: "boolean"
    },
    quiet: {
      describe: "reduce noise in console output",
      type: "boolean",
      default: true
    },
    verbose: {
      describe: "increase noise in console output",
      type: "boolean",
      default: false
    }
  }).argv;

const processStream = (data, output = {}) => {
  data.split("\n").forEach(line => {
    // Now cleanse the data and parse for content
    let capture = line.match(/^(?:[\u0000-\u007F]*)@patternfly\/([\w-]+)(?:[\u0000-\u007F]*)\:/);

    const message = `${line}\n`;

    if (capture && capture.length > 0) {
      const name = capture[1];
      // if (!name || !message) return output;

      if (name && message) {
        if (!output[name])
          output[name] = {
            message: message
          };
        else {
          output[name].message += message;
        }
      }
    } else {
      capture = line.match(/^lerna\s+([\w-]+)\s-\s@patternfly\/([\w-]+)/);
      if (capture && capture.length > 2) output[capture[2]].status = capture[1];
    }
  });
  return output;
};

// Arguments with no prefix are added to the `argv._` array.
let components = argv._.length > 0 ? argv._ : tools.getElementNames();

// Build the command out to be run
let cmd = `lerna -- run build --stream --no-bail --include-dependencies ${components
  .map(el => `--scope '*/${el}'`)
  .join(" ")}`;

shell.exec(`npm run ${cmd}`, { silent: true }, (code, stdout, stderr) => {
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
    let status = code;

    if (values[1].status) {
      status = values[1].status === "success" ? 0 : 1;
    }

    if (!argv.quiet || argv.verbose || status !== 0) {
      // Pass/fail message
      if (status === 0) shell.echo(chalk`{green.bold \u2713  ${key}}`);
      else shell.echo(chalk`\n\n{red.bold \u2716  ${key} failed}\n`);

      if (message) shell.echo(`${message}`);
    } else {
      shell.echo(chalk`{green.bold \u2713  ${key}}`);
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
