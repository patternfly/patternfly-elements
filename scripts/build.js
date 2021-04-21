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
    ["npm run build -- --docs", "(build documentation)"],
    ["npm run build -- --preview", "(spin up the localhost preview)"]
  ])
  .options({
    storybook: {
      alias: "s",
      describe: "build the storybook instance",
      type: "boolean"
    },
    docs: {
      alias: "d",
      describe: "build the documentation",
      type: "boolean"
    },
    preview: {
      alias: "p",
      describe: "spin up the server to preview",
      type: "boolean"
    }
  }).argv;

// Default to _all_ elements.
let components = [];

// Arguments with no prefix are added to the `argv._` array.
if (argv._.length > 0) {
  // If someone passes in `*` we treat it like _all_ elements.
  if (argv._[0] === "*") {
    // Use the default already defined above.
    // i.e. `components = [];`
  } else if (argv._[0].includes(",")) {
    // Support components passed in seperated by a comma.
    // i.e. `npm run build "{pfe-select,pfe-accordion}"`
    let elements = [];
    argv._.forEach(item => {
      // Remove any `{}`.
      const el = item.replace(/{|}/g, "");
      const individualElements = el.split(",");
      // Add individual elements to the array.
      elements = [
        ...elements,
        ...individualElements
      ];
    });
    // Validate that these components are actually elements.
    components = tools.validateElementNames(elements);
  }
}

// Build the command out to be run
const build = tools.lernaRun("build", components);
const docs = argv.docs ? ` "build:docs"` : "";
const storybook = argv.storybook ? ` "build-storybook"` : "";
const preview = argv.preview ? ` "start"` : "";

// Run the command
shell.exec(
  `./node_modules/.bin/npm-run-all --serial "${build}"${storybook}${docs}${preview}`, code => process.exit(code));
