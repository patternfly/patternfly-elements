#!/usr/bin/env node

process.env.FORCE_COLOR = 3;

const shell = require("shelljs");
const tools = require("./tools.js");
const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm run watch -- --help`.
  .usage("Usage: npm dev -- [options]")
  .example([
    ["npm run dev", "(compile and watch all components, initiate local server)"],
    ["npm run dev -- pfe-card", "(compile and watch one component, initiate local server)"],
    ["npm run dev -- pfe-card pfe-band", "(compile and watch multiple components, initiate local server)"],
    ["npm run dev -- --nobuild", "(watch assets but do not build first, initiate local server)"],
    ["npm run dev -- --storybook", "(compile and watch all components, compile storybook instance)"]
  ])
  .options({
    nobuild: {
      default: false,
      alias: "nb",
      describe: "compile the assets first",
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
const build = !argv.nobuild ? `npm run build ${components.join(" ")} && ` : "";
const storybook = (cmd) => argv.storybook ? `./node_modules/.bin/npm-run-all --parallel storybook "${cmd}"` : `npm run ${cmd}`;
const scopes =  components.length > 0 ? ` ${components.map(item => `--scope "*/${item}"`).join(" ")}` : "";


// Run the dev task for each component in parallel, include dependencies
shell.exec(`${build}${storybook(`lerna -- run "watch${argv.nobuild ? ` --nobuild` : ""}" --parallel --no-bail --include-dependencies${scopes}`)}`,
  code => process.exit(code)
);
