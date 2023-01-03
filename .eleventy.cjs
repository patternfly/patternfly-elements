const compress = require('compression');
const anchorsPlugin = require('@orchidjs/eleventy-plugin-ids');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const pfeAssetsPlugin = require('@patternfly/pfe-tools/11ty/plugins/pfe-assets.cjs');

const customElementsManifestPlugin = require('@patternfly/pfe-tools/11ty/plugins/custom-elements-manifest.cjs');
const orderTagsPlugin = require('@patternfly/pfe-tools/11ty/plugins/order-tags.cjs');
const todosPlugin = require('@patternfly/pfe-tools/11ty/plugins/todos.cjs');

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const pluginToc = require('@patternfly/pfe-tools/11ty/plugins/table-of-contents.cjs');

const markdownLib = markdownIt({ html: true })
  .use(markdownItAnchor);

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.setQuietMode(true);

  eleventyConfig.setWatchThrottleWaitTime(500);

  eleventyConfig.setBrowserSyncConfig({
    open: 'local',
    server: {
      baseDir: '_site',
      middleware: [compress()],
    },
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  /** Table of Contents Shortcode */
  eleventyConfig.addPlugin(pluginToc, { tags: ['h2', 'h3', 'h4'] });

  /** Copy and manage site assets from the monorepo */
  eleventyConfig.addPlugin(pfeAssetsPlugin);

  /** Generate and consume custom elements manifests */
  eleventyConfig.addPlugin(customElementsManifestPlugin, {
    extraDemos: [{
      slug: 'styles',
      title: 'Styles',
      url: 'demo/index.html',
      base: 'core',
      filePath: '_site/core/styles/demo/pfe-styles.html',
    }]
  });

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
      '11ty.js',
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
