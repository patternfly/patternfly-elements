#!/usr/bin/env node
process.env.FORCE_COLOR = "1";

const shell = require("shelljs");
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
      alias: "b",
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
let components = argv._;
let scope = [];

// If pfe-sass is the only component provided, add it to the scope
if (components.length === 1 && components.includes("pfe-sass")) {
  scope.push(components[0]);
} else if (components.length > 0) {
  // Remove pfe-sass from the array but maintain the others
  scope = components.filter(item => item !== "pfe-sass");
}

// Run the watch task for each component in parallel, include dependencies
shell.exec(
  `
  ${argv.build ? `npm run build ${components.join(" ")} &&` : ""}\
  ${
    argv.storybook ? `./node_modules/.bin/npm-run-all --parallel storybook "` : `npm run`
  } lerna -- run watch --parallel --no-bail --include-dependencies ${
    scope.length > 0 ? scope.map(item => `--scope "*/${item}"`).join(" ") : ""
  }${argv.storybook ? `"` : ``}`,
  code => process.exit(code)
);
