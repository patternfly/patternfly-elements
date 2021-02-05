#!/usr/bin/env node

process.env.FORCE_COLOR = 3;

const shell = require("shelljs");
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

// Access all arguments using `argv`.
// Add commands depending on which options are provided.
const build = !argv.nobuild ? `npm run build ${components.join(" ")} && ` : "";

// Run the dev task for each component in parallel, include dependencies
shell.exec(
  `
  ${argv.build ? `npm run build ${components.join(" ")} &&` : ""}\
  ${
    argv.storybook ? `./node_modules/.bin/npm-run-all --parallel storybook "` : `npm run`
  } lerna -- run dev --parallel --no-bail --include-dependencies ${
    scope.length > 0 ? scope.map(item => `--scope "*/${item}"`).join(" ") : ""
  }${argv.storybook ? `"` : ``}`,
  code => process.exit(code)
);
