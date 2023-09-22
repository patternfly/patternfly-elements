const fs = require('fs/promises');
const path = require('path');
const { glob } = require('glob');

const cache = new Map();

module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('todos', async function generateTodos() {
    const { parse, report } = await import('leasot');
    const start = performance.now();

    const todos = [];

    const files = await glob('{elements,core,tools}/**/*.ts', {
      ignore: ['**/node_modules/**/*', '*.spec.ts', '*.test.ts'],
    });

    const cacheKey = files.join('--');
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    for (const filename of files) {
      const contents = await fs.readFile(filename, 'utf8');
      const extension = path.extname(filename);
      const parsed = await parse(contents, { extension, filename });
      const output = await report(parsed, 'raw');
      todos.push(...output);
    }

    cache.set(cacheKey, todos);

    const end = performance.now();

    // eslint-disable-next-line no-console
    console.log(`[TODOs] Generated in ${(end - start) / 1000}s`);

    return todos;
  });
};
