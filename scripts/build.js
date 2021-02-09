#!/usr/bin/env node
process.env.FORCE_COLOR = 3;

// @TODO: Incorporate docs compile?
const shell = require("shelljs");
const chalk = require("chalk");
const tools = require("./tools.js");
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
      alias: "s",
      describe: "build the storybook instance",
      type: "boolean"
    },
    quiet: {
      describe: "reduce noise in console output",
      type: "boolean"
    }
  }).argv;

const processStream = (data, output = {}) => {
  data.split("\n").forEach(line => {
    // Capture the color from the command output
    // let capture = data.match(/^([\u0000-\u007F]+)@patternfly/);

    // if (capture.length > 0) {
    // const color = capture[1].replace(/\u001b\[(0|1)m/, "");

    // Now cleanse the data and parse for content
    let capture = line.match(/^(?:[\u0000-\u007F]*)@patternfly\/([\w-]+)(?:[\u0000-\u007F]*)\:/);

    const message = `${line}\n`;

    if (capture && capture.length > 0) {
      const name = capture[1];
      if (!name || !message) return output;

      if (!output[name])
        output[name] = {
          message: message
        };
      else {
        output[name].message += message;
      }
    }
  });
  return output;
};

// Arguments with no prefix are added to the `argv._` array.
let components = argv._.length > 0 ? argv._ : tools.getElementNames();

// Run the build task for each component in parallel, include dependencies
let result = {};

components.map(el => {
  // Build the command out to be run
  let cmd = `lerna -- run build --stream --no-bail --include-dependencies --scope '*/${el}'`;

  // Fire off the command async
  // const child = shell.exec(`npm run ${cmd}`, { silent: true, async: true });

  const child = shell.exec(`npm run ${cmd}`, { silent: true }, (code, stdout, stderr) => {
    let output = {
      build: {}
    };

    // Capture the command output and organize it by component
    if (stdout) output.build = processStream(stdout, output.build);

    // Capture the error output for debugging
    if (stderr) output.build = processStream(stderr, output.build);

    // Capture the dependencies that were built
    output.dependencies = Object.keys(output.build).filter(key => key !== el) || [];

    // Capture outcome of the build
    output.status = code === 0 ? "success" : "fail";

    // Map output to the overall results
    result[el] = output;
  });

  child.on("close", () => {
    if (result[el].status === "success") shell.echo(chalk`{green.bold \u2713  ${el}}`);
    else shell.echo(chalk`\n\n{red.bold \u2716  ${el} failed}\n`);

    if (!argv.quiet || result[el].status === "fail") {
      // Capture the command output and organize it by component
      Object.values(result[el].build).forEach(item => {
        if (item.message) shell.echo(`${item.message}`);
      });
    } else if (argv.quiet) {
      if (result[el].dependencies.length > 0)
        result[el].dependencies.forEach(name => shell.echo(chalk`{gray    > ${name}}`));
    }
  });
});

if (argv.storybook) {
  let story = shell.exec(`npm run build-storybook`, { silent: true, async: true });
  story.on("exit", code => {
    if (code === 0) shell.echo(chalk`{green.bold ${code === 0 ? `\u2713` : `\u2716`}  Storybook built}`);
    else shell.echo(chalk`{red.bold ${code === 0 ? `\u2713` : `\u2716`}  Storybook build failed}`);
  });
}
