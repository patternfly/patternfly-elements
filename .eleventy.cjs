const compress = require('compression');
const anchorsPlugin = require('@orchidjs/eleventy-plugin-ids');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const pfeAssetsPlugin = require('./docs/_plugins/pfe-assets.cjs');
const customElementsManifestPlugin = require('./docs/_plugins/custom-elements-manifest.cjs');
const orderTagsPlugin = require('./docs/_plugins/order-tags.cjs');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
    lineSeparator: '\n',
  });

  eleventyConfig.addPlugin(pfeAssetsPlugin);
  eleventyConfig.addPlugin(customElementsManifestPlugin);

  eleventyConfig.setQuietMode(process.env.npm_config_quiet);
  eleventyConfig.setWatchThrottleWaitTime(500);

  eleventyConfig.addWatchTarget('docs/**/*.{cjs,js,mjs,css,md,svg,png}');
  eleventyConfig.addWatchTarget('{elements,core}/*/{*.js,*.css,demo,docs,*.json}');

  eleventyConfig.addPassthroughCopy('brand');
  eleventyConfig.addPassthroughCopy('elements/**/*');
  eleventyConfig.addPassthroughCopy('core/**/*');
  eleventyConfig.addPassthroughCopy('docs/demo');
  eleventyConfig.addPassthroughCopy('docs/main.mjs');

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
