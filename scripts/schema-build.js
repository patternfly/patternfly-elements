#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const _ = require("lodash");

const manifest = require("./manifest.js");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const wca = path.resolve(__dirname, "../node_modules/.bin/wca");
const tmpDir = ".tmp";

/**
 * Get an object representing the JSDOC metadata about an element.
 *
 * @param {String} tagName the element's tag name, ex: `pfe-card`
 * @returns {Object} an object containing the JSDOC metadata, as emitted by
 * [web-component-analyzer](https://github.com/runem/web-component-analyzer)
 * @async
 */
async function getElementAnalysis(tagName) {
  const tagManifest = manifest(tagName);

  const cmdText = `node ${wca} analyze ${
    tagManifest.module
  } --format json --outDir=${tmpDir}`;

  await exec(cmdText);

  // derive a filename and path for the new json file
  const tmpSchemaFile = path.basename(tagManifest.schema);
  const tmpSchemaPath = path.join(process.cwd(), tmpDir, tmpSchemaFile);

  // get the JSON representation fo the element's jsdoc
  const jsonJSDOC = require(tmpSchemaPath);

  // remove the json file
  try {
    // await unlink(tmpSchemaPath);
  } catch (e) {
    console.warn(
      `Harmless warning: could not remove temporary JSON schema file ${tmpSchemaPath}, full error below.`
    );
    console.error(e);
  }

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

async function buildSchema(tagName) {
  // the dir to write the schema(s)
  const dir = manifest(tagName).dir;
  const schemaTemplate = await getSchemaTemplate();
  // console.log(template);
  const analyses = await getElementAnalysis(tagName);

  const schemas = analyses.map(analysis =>
    _.template(schemaTemplate)(analysis)
  );
  return Promise.all(
    schemas.map(async schema => await writeSchema(schema, dir))
  );
  // return schemas;
}

/**
 * Write the schema to disk.
 * @param {Object} schema The JS object containing the schema, to be JSON.stringified.
 * @param {String} dir the directory path into which the schema file will be written
 * @async
 */
function writeSchema(schema, dir) {
  const tagName = JSON.parse(schema).tag;
  const schemaFormatted = formatSchema(schema);
  const schemaPath = path.resolve(dir, `${tagName}.json`);
  return writeFile(schemaPath, schemaFormatted);
}

/**
 * Format the JSON schema.  This takes a JSON string, parses and re-stringifies it to apply the desired formatting.  The main reason for this function is so we don't have to awkwardly position template syntax in order to achieve the desired whitespace.
 * @param {String} the JSON string.
 * @return {String} the formatted JSON string.
 */
function formatSchema(schema) {
  return JSON.stringify(JSON.parse(schema), null, 2);
}

// allow running this from the command line, such as:
// $ node schema-build.js ../elements/pfe-tabs/src/pfe-tabs.js
if (require.main === module) {
  buildSchema(process.argv[2]);
}

module.exports = buildSchema;
