const compress = require('compression');
const anchorsPlugin = require('@orchidjs/eleventy-plugin-ids');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const pfeAssetsPlugin = require('./docs/_plugins/pfe-assets.cjs');
const customElementsManifestPlugin = require('./docs/_plugins/custom-elements-manifest.cjs');
const orderTagsPlugin = require('./docs/_plugins/order-tags.cjs');
const todosPlugin = require('./docs/_plugins/todos.cjs');

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const pluginToc = require('eleventy-plugin-toc');

const markdownLib = markdownIt({ html: true })
  .use(markdownItAnchor);

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.setQuietMode(process.env.npm_config_quiet);

  eleventyConfig.setWatchThrottleWaitTime(500);

  eleventyConfig.setBrowserSyncConfig({
    open: 'local',
    server: {
      baseDir: '_site',
      middleware: [compress()],
    },
  });

  /** Table of Contents Shortcode */
  eleventyConfig.addPlugin(pluginToc, { tags: ['h2', 'h3', 'h4'] });

  /** Copy and manage site assets from the monorepo */
  eleventyConfig.addPlugin(pfeAssetsPlugin);

  /** Generate and consume custom elements manifests */
  eleventyConfig.addPlugin(customElementsManifestPlugin);

  /** Collections to organize alphabetically instead of by date */
  eleventyConfig.addPlugin(orderTagsPlugin, { tags: ['component'], order: 'alphabetically' });

  /** Collections to organize by order instead of date */
  eleventyConfig.addPlugin(orderTagsPlugin, { tags: ['develop'] });

  /** list todos */
  eleventyConfig.addPlugin(todosPlugin);

  /** format date strings */
  eleventyConfig.addFilter('prettyDate', function(dateStr, options = {}) {
    const { dateStyle = 'medium' } = options;
    return new Intl.DateTimeFormat('en-US', { dateStyle })
      .format(new Date(dateStr));
  });

  /** fancy syntax highlighting with diff support */
  eleventyConfig.addPlugin(syntaxHighlight);

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

  eleventyConfig.addPlugin(directoryOutputPlugin, {
    // Customize columns
    columns: {
      filesize: true, // Use `false` to disable
      benchmark: true, // Use `false` to disable
    },

    // Will show in yellow if greater than this number of bytes
    warningFileSize: 400 * 1000,
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
