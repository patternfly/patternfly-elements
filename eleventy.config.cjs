const { EleventyRenderPlugin } = require('@11ty/eleventy');
const AnchorsPlugin = require('@orchidjs/eleventy-plugin-ids');
const SyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const DirectoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const PfeAssetsPlugin = require('./docs/_plugins/pfe-assets.cjs');
const CustomElementsManifestPlugin = require('@patternfly/pfe-tools/11ty/plugins/custom-elements-manifest.cjs');
const OrderTagsPlugin = require('@patternfly/pfe-tools/11ty/plugins/order-tags.cjs');
const TodosPlugin = require('@patternfly/pfe-tools/11ty/plugins/todos.cjs');
const TocPlugin = require('@patternfly/pfe-tools/11ty/plugins/table-of-contents.cjs');

const markdownItAnchor = require('markdown-it-anchor');

module.exports = function(eleventyConfig) {
  eleventyConfig.amendLibrary('md', md => md.use(markdownItAnchor));

  eleventyConfig.setQuietMode(true);

  eleventyConfig.setWatchThrottleWaitTime(500);

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  /** Table of Contents Shortcode */
  eleventyConfig.addPlugin(TocPlugin, { tags: ['h2', 'h3', 'h4'] });

  /** Copy and manage site assets from the monorepo */
  eleventyConfig.addPlugin(PfeAssetsPlugin);

  /** Generate and consume custom elements manifests */
  eleventyConfig.addPlugin(CustomElementsManifestPlugin);

  /** Collections to organize alphabetically instead of by date */
  eleventyConfig.addPlugin(OrderTagsPlugin, { tags: ['component'], order: 'alphabetically' });

  /** Collections to organize by order instead of date */
  eleventyConfig.addPlugin(OrderTagsPlugin, { tags: ['develop'] });

  /** list todos */
  eleventyConfig.addPlugin(TodosPlugin);

  /** format date strings */
  eleventyConfig.addFilter('prettyDate', function(dateStr, options = {}) {
    const { dateStyle = 'medium' } = options;
    return new Intl.DateTimeFormat('en-US', { dateStyle })
      .format(new Date(dateStr));
  });

  /** fancy syntax highlighting with diff support */
  eleventyConfig.addPlugin(SyntaxHighlightPlugin);

  /** Add IDs to heading elements */
  eleventyConfig.addPlugin(AnchorsPlugin, {
    formatter(element, existingids) {
      if (
        !existingids.includes(element.getAttribute('id')) &&
        element.hasAttribute('slot') &&
        element.closest('pf-card')
      ) {
        return null;
      } else {
        return eleventyConfig.javascriptFunctions
          .slug(element.textContent)
          .replace(/[&,+()$~%.'":*?!<>{}]/g, '');
      }
    },
  });

  eleventyConfig.addPlugin(DirectoryOutputPlugin, {
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
