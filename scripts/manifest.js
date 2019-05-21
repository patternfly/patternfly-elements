#!/usr/bin/env node

const { resolve } = require("path");

/**
 * When provided with an element name (ie, 'pfe-card'), will return an object containing paths to many files within that element's directory.
 *
 * @param {String} tagName the name of the element's tag, ex: `pfe-card`
 * @return {Object} an object with paths to various important files within the element's directory
 */
function manifest(tagName) {
  const dir = elementDir(tagName);
  return {
    dir,
    README: resolve(dir, `README.md`),
    package: resolve(dir, "package.json"),
    umd: resolve(dir, `${tagName}.umd.js`),
    umdMin: resolve(dir, `${tagName}.umd.min.js`),
    module: resolve(dir, `${tagName}.js`),
    moduleMin: resolve(dir, `${tagName}.min.js`),
    srcFile: resolve(dir, "src", `${tagName}.js`),
    schema: resolve(dir, `${tagName}.json`)
  };
}

/**
 * Given a tagName, return the path to the element dir.
 * @param {String} tagName the name of the tag, ex: `pfe-card`
 */
function elementDir(tagName) {
  return resolve(__dirname, "..", "elements", tagName);
}

module.exports = manifest;
