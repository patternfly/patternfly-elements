const compress = require('compression');
const anchorsPlugin = require('@orchidjs/eleventy-plugin-ids');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const pfeAssetsPlugin = require('./docs/_plugins/pfe-assets.cjs');
const customElementsManifestPlugin = require('./docs/_plugins/custom-elements-manifest.cjs');
const orderTagsPlugin = require('./docs/_plugins/order-tags.cjs');

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const pluginToc = require('eleventy-plugin-toc');

module.exports = function(eleventyConfig) {
  const markdownLib = markdownIt({ html: true })
    .use(markdownItAnchor);

  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.setQuietMode(process.env.npm_config_quiet);
  eleventyConfig.setWatchThrottleWaitTime(500);

  /** Table of Contents Shortcode */
  eleventyConfig.addPlugin(pluginToc, {
    tags: ['h2', 'h3', 'h4'],
  });

  /** Copy and manage site assets from the monorepo */
  eleventyConfig.addPlugin(pfeAssetsPlugin);

  /** Generate and consume custom elements manifests */
  eleventyConfig.addPlugin(customElementsManifestPlugin);

  /** Collections to organize alphabetically instead of by date */
  eleventyConfig.addPlugin(orderTagsPlugin, { tags: ['component'], order: 'alphabetically' });

  /** Collections to organize by order instead of date */
  eleventyConfig.addPlugin(orderTagsPlugin, { tags: ['develop'] });

  /** Add IDs to heading elements */
  eleventyConfig.addPlugin(anchorsPlugin, {
    formatter(element, existingids) {
      if (
        !existingids.includes(element.getAttribute('id')) &&
        element.hasAttribute('slot') &&
        element.closest('pfe-card')
      ) {
        return null;
      } else {
        return eleventyConfig.javascriptFunctions
          .slug(element.textContent)
          .replace(/[&,+()$~%.'":*?!<>{}]/g, '');
      }
    },
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin, {
    // Customize columns
    columns: {
      filesize: true, // Use `false` to disable
      benchmark: true, // Use `false` to disable
    },

    // Will show in yellow if greater than this number of bytes
    warningFileSize: 400 * 1000,
  });

  eleventyConfig.on('eleventy.before', async function generateTodos() {
    const start = performance.now();
    const fs = require('fs/promises');
    const leasot = require('leasot');
    const path = require('path');
    const { promisify } = require('util');
    const glob = promisify(require('glob'));

    const todos = [];

    const files = await glob('{elements,core,tools}/**/*[!.spec].ts', {
      ignore: '**/node_modules/**/*',
    });

    for (const filename of files) {
      const contents = await fs.readFile(filename, 'utf8');
      const extension = path.extname(filename);
      const parsed = leasot.parse(contents, { extension, filename });
      const output = leasot.report(parsed, 'raw');
      todos.push(...output);
    }

    await fs.writeFile(
      path.join(__dirname, 'docs', '_data', 'todos.json'),
      JSON.stringify(todos, null, 2),
      'utf8'
    );
    const end = performance.now();
    // eslint-disable-next-line no-console
    console.log(`Generated TODOs in ${(end - start) / 1000}s`);
  });

  eleventyConfig.setBrowserSyncConfig({
    open: 'local',
    server: {
      baseDir: '_site',
      middleware: [compress()],
    },
  });

  return {
    dir: {
      input: './docs',
    },
    markdownTemplateEngine: 'njk',
    templateFormats: [
      'html',
      'njk',
      'md',
      'css',
      'js',
      'svg',
      'png',
    ],
  };
};
