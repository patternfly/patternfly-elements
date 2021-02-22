#!/usr/bin/env node
process.env.FORCE_COLOR = 3;

// @TODO: Incorporate docs compile?
const shell = require("shelljs");
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
    ["npm run build -- --preview", "(spin up the localhost preview)"]
  ])
  .options({
    storybook: {
      alias: "s",
      describe: "build the storybook instance",
      type: "boolean"
    },
    preview: {
      describe: "spin up the server to preview",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
const components = argv._.length > 0 ? tools.validateElementNames(argv._) : [];

// Build the command out to be run
const cmd = tools.lernaRun("build", components);

// Run the command
shell.exec(
  `./node_modules/.bin/npm-run-all --serial "${cmd}"${
    argv.storybook ? ` "build-storybook"` : ""
  }${
    argv.preview ? ` "start"` : ""
  }`, code => process.exit(code));
