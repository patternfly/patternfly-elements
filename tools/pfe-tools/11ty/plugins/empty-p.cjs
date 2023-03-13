const cheerio = require('cheerio');

/**
 * @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig
 */
module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform('delete-empty-p', async function(rawContent, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) {
      return rawContent;
    } else {
      const $ = cheerio.load(rawContent);
      $('p:empty').each(function() {
        if (!this.attributes.length) {
          $(this).remove();
        }
      });
      return $.html();
    }
  });
};
