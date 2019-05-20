#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const wca = path.resolve(__dirname, "../node_modules/.bin/wca");
const outDir = "../.tmp";

console.log(`outDir: ${outDir}`);

/**
 * Get an object representing the JSDOC metadata about an element.
 *
 * @param {String} file A path to the element's source file, containing the
 * jsdoc annotations.  The path should be relative to current working
 * directory.
 * @returns {Object} an object containing the JSDOC metadata, as emitted by
 * [web-component-analyzer](https://github.com/runem/web-component-analyzer)
 * @async
 */
async function getElementJSDOC(file) {
  const absFile = path.resolve(process.cwd(), file);
  console.log(absFile);
  console.log(wca);
  console.log(outDir);
  const cmd = await exec(
    `node ${wca} analyze ${absFile} --format json --outDir=${outDir}`
  );

  // derive a filename and path for the new json file
  const schemaFile = path.basename(file).replace(path.extname(file), ".json");
  const schemaPath = path.join(__dirname, outDir, schemaFile);

  // get the JSON representation fo the element's jsdoc
  const jsonJSDOC = require(schemaPath);

  // remove the json file
  await unlink(schemaPath);

  return jsonJSDOC;
}

/**
 * Get the templatized JSON schema file.
 * @returns
 * @async
 */
function getSchemaTemplate() {
  return readFile(path.resolve(__dirname, "schema-template.json"));
}

async function buildSchema(file) {
  console.log(`building schema for ${file}`);
  // const template = await getSchemaTemplate();
  // console.log(template);
  const jsdoc = await getElementJSDOC(file);
  console.log(jsdoc);
}

// allow running this from the command line, such as:
// $ node schema-build.js ../elements/pfe-tabs/src/pfe-tabs.js
if (require.main === module) {
  buildSchema(process.argv[2]);
}

module.exports = buildSchema;
