const fs = require('fs/promises');
const leasot = require('leasot');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const cache = new Map();

module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('todos', async function generateTodos() {
    const start = performance.now();

    const todos = [];

    const files = await glob('{elements,core,tools}/**/*[!.spec].ts', {
      ignore: '**/node_modules/**/*',
    });

    const cacheKey = files.join('--');
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    for (const filename of files) {
      const contents = await fs.readFile(filename, 'utf8');
      const extension = path.extname(filename);
      const parsed = leasot.parse(contents, { extension, filename });
      const output = leasot.report(parsed, 'raw');
      todos.push(...output);
    }

    cache.set(cacheKey, todos);

    const end = performance.now();

    // eslint-disable-next-line no-console
    console.log(`[TODOs] Generated in ${(end - start) / 1000}s`);

    return todos;
  });
};
