#!/usr/bin/env node

const shell = require("shelljs");
const argv = require("yargs")
  // Set up --help documentation.
  // You can view these by running `npm test -- --help`.
  .usage("Usage: npm test -- [options]")
  .example([
    ["npm test", "(run all tests, builds by default)"],
    ["npm test -- card", "(run one test)"],
    ["npm test -- card band", "(run multiple tests)"],
    ["npm test -- --build=false", "(do not build the component(s) prior to running tests)"]
  ])
  .options({
    build: {
      default: true,
      alias: "b",
      describe: "build the component(s) prior to running tests",
      type: "boolean"
    }
  }).argv;

// Arguments with no prefix are added to the `argv._` array.
// Check to see if any specific patterns were passed in like:
// npm test -- card band
let components = "";
if (argv._.length > 0) {
  components = " " + argv._.join(" ");
}

// Access all arguments using `argv`.
// Add commands depending on which options are provided.
const build = argv.build ? `npm run build${components}; ` : "";

console.log(`${build}./node_modules/.bin/wct --configFile wct.conf.json${components}`);

// shell.exec(`${build}./node_modules/.bin/wct --configFile wct.conf.json${components}`, function(code) {
//   process.exit(code);
// });
