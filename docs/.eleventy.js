let compress = require("compression");
let markdownIt = require("markdown-it");
let markdownItAnchor = require("markdown-it-anchor");
let markdownItContainer = require("markdown-it-container");

module.exports = function (eleventyConfig) {
  /**
   * Collections to organize by alphabetical instead of date
   */
  const tagsToAlphabetize = [
    'component'
  ];

  for (let i = 0; i < tagsToAlphabetize.length; i++) {
    const tag = tagsToAlphabetize[i];

    eleventyConfig.addCollection(tag, collection => {
      return collection.getFilteredByTag(tag).sort((a, b) => {
        if (a.data.title < b.data.title) { return -1; }
        if (a.data.title > b.data.title) { return 1; }
        return 0;
      });
    });
  }

  /**
   * Collections to organize by order instead of date
   */
  const tagsToOrderByOrder = [
    "develop"
  ];

  for (let i = 0; i < tagsToOrderByOrder.length; i++) {
    const tag = tagsToOrderByOrder[i];

    eleventyConfig.addCollection(tag, collection => {
      return collection.getFilteredByTag(tag).sort((a, b) => a.data.order - b.data.order);
    });
  }

  eleventyConfig.setTemplateFormats([
    "html",
    "md",
    "css",
    "js",
    "svg",
    "png"
  ]);

  eleventyConfig.setBrowserSyncConfig({
    server: {
      baseDir: "./_site",
      middleware: [compress()]
    }
  });

  eleventyConfig.addWatchTarget("**/*.css");
  eleventyConfig.addPassthroughCopy("node_modules/@patternfly/**/*");

  let options = { html: true };
  let markdownLib = markdownIt(options);
  markdownLib.use(markdownItAnchor);
  markdownLib.use(markdownItContainer, "section", {
    validate: params => {
      return params.trim().match(/^section+(.*)$/);
    },
    render: (tokens, idx) => {
      let m = tokens[idx].info.trim().match(/^section+(.*)$/);
      let color = m && m[1].trim() === "header" ? "" : "lightest";
      let size = m && m[1].trim() === "header" ? "" : "small";
      let classes = m && m[1].trim() === "header" ? `class="header"` : "";

      if (tokens[idx].nesting === 1) {
        return `<pfe-band size="${size}" color="${color}"${classes}><div class="band-container">`
      } else {
        return `</div></pfe-band>\n`;
      }
    }
  });

  eleventyConfig.setLibrary("md", markdownLib);
};