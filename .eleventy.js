const fs = require("fs");
const path = require("path");
const glob = require("glob");
const compress = require("compression");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItContainer = require("markdown-it-container");

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
        if (a.data.title < b.data.title) {
          return -1;
        }
        if (a.data.title > b.data.title) {
          return 1;
        }
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

  eleventyConfig.addWatchTarget("./docs/**/*.{css,md,svg,png}");
  eleventyConfig.addWatchTarget("./elements/*/{dist,demo,docs}");

  eleventyConfig.addPassthroughCopy("./elements/*/demo/*");
  eleventyConfig.addPassthroughCopy("./elements/*/dist/*");
  eleventyConfig.addPassthroughCopy("./elements/*/docs/*");
  // @TODO: Migrate these to use the preview image in the docs folder
  eleventyConfig.addPassthroughCopy("./elements/*/*.{jpg,png,svg}");
  eleventyConfig.addPassthroughCopy("./brand");
  eleventyConfig.addPassthroughCopy("./storybook");


  // This copies the assets for each component into the docs folder
  glob("elements/*/docs/*", (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const capture = file.match(/elements\/([\w|-]*?)\//);
      const component = capture[1].replace("pfe-", "");
      const copyTo = `docs/components/${component}/${path.basename(file)}`;
      // Check if the folder doesn't exist and create it first
      !fs.existsSync(`docs/components/${component}`) && fs.mkdirSync(`docs/components/${component}`);
      // Copy the files for the component to the newly created folder
      fs.copyFile(file, copyTo, (error) => {
        if (error) throw error;
        else console.log(`Copied ${file} to ${copyTo}`);
      });
    });
  });

  let options = {
    html: true
  };

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
        return `<pfe-band size="${size}" color="${color}"${classes} use-grid>`
      } else {
        return `</pfe-band>\n`;
      }
    }
  });

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "./docs",
      output: "./_site"
    },
    setBrowserSyncConfig: {
      server: {
        baseDir: "./_site",
        middleware: [compress()]
      }
    },
    templateFormats: [
      "html",
      "md",
      "css",
      "js",
      "svg",
      "png"
    ]
  }
};
