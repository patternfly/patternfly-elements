#!/usr/bin/env node

process.env.FORCE_COLOR = 3;

const shell = require("shelljs");
const tools = require("./tools.js");
const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm test -- --help`.
  .usage("Usage: npm test -- [options]")
  .example([
    ["npm test", "(run all tests, builds by default)"],
    ["npm test -- pfe-card", "(run one test)"],
    ["npm test -- pfe-card pfe-band", "(run multiple tests)"],
    ["npm test -- --nobuild", "(do not build the component(s) prior to running tests)"]
  ])
  .options({
    nobuild: {
      default: false,
      alias: "nb",
      describe: "do not build the component(s) prior to running tests",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
// Check to see if any specific patterns were passed in like:
// npm test -- card band
const components = argv._.length > 0 ? tools.validateElementNames(argv._) : [];

// Access all arguments using `argv`.
// Add commands depending on which options are provided.
const build = !argv.nobuild ? `npm run build ${components.join(" ")} && ` : "";

shell.exec(
  `${build}./node_modules/.bin/wct --config-file wct.conf.json --npm ${
    components ? components.map(item => `\"./elements/${item}/test\"`).join(" ") : ""
  }`,
  code => process.exit(code)
);
