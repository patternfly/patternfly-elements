const fs = require("fs");
const path = require("path");
const glob = require("glob");
const compress = require("compression");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItContainer = require("markdown-it-container");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(process.env.npm_config_quiet);
  eleventyConfig.setWatchThrottleWaitTime(500);

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

  eleventyConfig.addPassthroughCopy("./elements/*/demo/**");
  eleventyConfig.addPassthroughCopy("./elements/*/dist/*");
  eleventyConfig.addPassthroughCopy("./elements/*/docs/*");
  // @TODO: Migrate these to use the preview image in the docs folder
  eleventyConfig.addPassthroughCopy("./elements/*/*.{jpg,png,svg}");

  eleventyConfig.addPassthroughCopy("./brand");

  // Check if the components folder needs to be created
  if(!fs.existsSync(`docs/components/`)) {
    fs.mkdirSync(`docs/components/`);
  }

  // This copies the assets for each component into the docs folder
  glob("elements/*/docs/*", (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const capture = file.match(/elements\/([\w|-]*?)\//);
      const component = capture[1].replace("pfe-", "");
      const copyTo = `docs/components/${component}/${path.basename(file)}`;

      // Check if the folder needs to be created
      if(!fs.existsSync(`docs/components/${component}`)) {
        fs.mkdirSync(`docs/components/${component}`);
      }
      
      // Copy the files for the component to the newly created folder
      fs.copyFileSync(file, copyTo, (error) => {
        if (error) throw error;
        // else console.log(`Copied ${file} to ${copyTo}`);
      });
    });
  });

  // @TODO
  // eleventyConfig.addPassthroughCopy({
  //   "./elements/pfe-sass/demo": "theming/pfe-sass",
  //   "./elements/pfe-styles/demo": "theming/pfe-styles"
  // });

  let markdownLib = markdownIt({
    html: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang) return `<pfe-codeblock code-language="${lang}"><pre codeblock-container><code editable>${markdownLib.utils.escapeHtml(str)}</code></pre></pfe-codeblock>`
      else return `<pre class="hljs"><code>${markdownLib.utils.escapeHtml(str)}</code></pre>`;
    }
  }).disable(["code"]);
  markdownLib.use(markdownItAnchor);
  markdownLib.use(markdownItAttrs);

  markdownLib.use(markdownItContainer, "section", {
    validate: params => {
      return params.trim().match(/^section+(.*)$/);
    },
    render: (tokens, idx) => {
      // let m = tokens[idx].info.trim().match(/^section+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return `<div class="section pfe-c-content">`
      } else {
        return `</div>\n`;
      }
    }
  });


  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "./docs",
    },
    setBrowserSyncConfig: {
      open: "local",
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
