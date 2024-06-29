/**
 * @license Apache-2.0
 * Portions copyright https://github.com/orchidjs/eleventy-plugin-ids
 */

const cheerio = require('cheerio');

/**
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig
 * @param {{ prefix: string; formatter: (element: *, existingIds: string[]) => string; selectors: string[]; exclude: RegExp; }} config
 */
module.exports = function(eleventyConfig, config = {}) {
  let { selectors, prefix, formatter } = config;
  selectors ??= ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  prefix ??= '';
  formatter ??= function(element) {
    return prefix + eleventyConfig.javascriptFunctions
        .slug(element.textContent)
        .replace(/[&,+()$~%.'":*?!<>{}]/g, '');
  };

  eleventyConfig.addTransform('ids', async function(rawContent, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html') || config.exclude?.test?.(outputPath)) {
      return rawContent;
    } else {
      const $ = cheerio.load(rawContent);
      const ids = [];
      for (const selector of selectors) {
        $(selector).each(function() {
          const el = $(this);
          const id = el.attr('id');
          if (id) {
            ids.push(id);
          } else {
            el.attr('id', formatter(el, ids));
          }
        });
      }
      return $.html();
    }
  });
};
