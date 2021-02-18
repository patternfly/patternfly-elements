#!/usr/bin/env node

// Capture the lerna options from the config
const tools = require("./tools.js");
const shell = require("shelljs");

process.env.FORCE_COLOR = 3;

const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm run watch -- --help`.
  .usage("Usage: npm watch -- [options]")
  .example([
    ["npm run watch", "(compile all components)"],
    ["npm run watch -- pfe-card", "(compile one component)"],
    ["npm run watch -- pfe-card pfe-band", "(compile multiple components)"],
    ["npm run watch -- --build", "(compile assets before running watch)"],
    ["npm run watch -- --storybook", "(watch storybook instance)"]
  ])
  .options({
    build: {
      default: false,
      alias: "nb",
      describe: "do not build the component(s) prior to running tests",
      type: "boolean"
    },
    storybook: {
      default: false,
      alias: "s",
      describe: "watch the storybook instance",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
let components = argv._.length > 0 ? tools.validateElementNames(argv._) : [];

// Access all arguments using `argv`.
// Add commands depending on which options are provided.
const build = argv.build ? `npm run build ${components.join(" ")} && ` : "";
const parallel = cmds => `./node_modules/.bin/npm-run-all --parallel ${cmds.map(cmd => `"${cmd}"`).join(" ")}`;
const watch = `lerna -- run watch --no-bail --stream --include-dependencies ${
  components.length > 0 ? components.map(item => `--scope "*/${components}"`).join(" ") : ""
}`;

// Run the watch task for each component in parallel, include dependencies
shell.exec(`${build}${argv.storybook ? parallel(["storybook", watch, "start"]) : parallel([watch, "start"])}`, code => process.exit(code));
