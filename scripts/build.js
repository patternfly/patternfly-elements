#!/usr/bin/env node

process.env.FORCE_COLOR = 3;

const shell = require("shelljs");
const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm run build -- --help`.
  .usage("Usage: npm build -- [options]")
  .example([
    ["npm run build", "(compile all components)"],
    ["npm run build -- pfe-card", "(compile one component)"],
    ["npm run build -- pfe-card pfe-band", "(compile multiple components)"],
    ["npm run build -- --storybook", "(build storybook instance)"]
  ])
  .options({
    storybook: {
      default: false,
      alias: "s",
      describe: "build the storybook instance",
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

// @TODO: docs?
// source scripts/hugo-check.sh
// if hugoCheck; then
//   pushd docs > /dev/null
//   hugo server &
//   popd > /dev/null
// else
//   echo "Not running Hugo server (docs site) because Hugo is not installed."
// fi

// Run the build task for each component in parallel, include dependencies
shell.exec(
  `npm run lerna -- run build --stream --no-bail --include-dependencies --scope "*/pfe-sass" && \
   npm run lerna -- run build --parallel --no-bail --include-dependencies ${
     scope.length > 0 ? scope.map(item => `--scope "*/${item}"`).join(" ") : ""
   } ${argv.storybook ? "npm run build-storybook" : ""}`,
  code => process.exit(code)
);
