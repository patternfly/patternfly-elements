#!/usr/bin/env node

process.env.FORCE_COLOR = 3;

const shell = require("shelljs");
const chalk = require("chalk");
const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm test -- --help`.
  .usage("Usage: npm run test:new -- [options]")
  .example([
    ["npm run test:new", "(run all tests, builds by default)"],
    ["npm run test:new -- --watch", "(run all tests, builds by default)"],
    ["npm run test:new -- pfe-card", "(run one test)"],
    ["npm run test:new -- pfe-card pfe-band", "(run multiple tests)"],
    ["npm run test:new -- --nobuild", "(do not build the component(s) prior to running tests)"]
  ])
  .options({
    nobuild: {
      default: false,
      alias: "nb",
      describe: "do not build the component(s) prior to running tests",
      type: "boolean"
    },
    watch: {
      default: false,
      describe: "run tests and then watch for changes to test files",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
// Check to see if any specific patterns were passed in like:
// npm run test:new -- pfe-select
const components = argv._.length > 0 ? argv._ : [];

// Access all arguments using `argv`.
// Add commands depending on which options are provided.
const build = !argv.nobuild ? `npm run build ${components.join(" ")} && ` : "";

shell.exec(
  // Prepend the build command if that option was provided.
  `${build}./node_modules/.bin/web-test-runner ${
    // Support running individual element tests.
    components ? components.map(item => `\"elements/**/${item}.spec.js\"`).join(" ") : ""
  } --node-resolve --playwright`,
  (code, stdout, stderr) => {
    // If there is a code see if we can show the user the relevant information.
    if (code === 1) {
      // There was an error, let's see if it's because we couldn't find the file.
      const wrongRegEx = /Could not find.+.spec\.js/g;
      const found = stderr.match(wrongRegEx);
      if (found) {
        // Yes it was because we couldn't find the file.
        // Figure out what file name we couldn't find..
        const wrongFile = found[0].match(/pfe-.+\.js/g)[0];
        const wrongFolder = wrongFile.match(/pfe-[^.]+/g)[0];
        // The indentation on this is weird so it appears correctly in the console.
        console.error(`
${chalk.red.bold("No element found")} 🚫🔎
No test file found named ${chalk.bold(wrongFile)}.
Does it exist within ${chalk.inverse(`./src/elements/${wrongFolder}/test`)}?
          `
        );
      }
    }
    process.exit(code);
  }
);
