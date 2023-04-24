const { EleventyRenderPlugin } = require('@11ty/eleventy');
const SyntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const DirectoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');

const PfeAssetsPlugin = require('./docs/_plugins/pfe-assets.cjs');
const EmptyParagraphPlugin = require('./docs/_plugins/empty-p.cjs');

const AnchorsPlugin = require('@patternfly/pfe-tools/11ty/plugins/anchors.cjs');
const CustomElementsManifestPlugin = require('@patternfly/pfe-tools/11ty/plugins/custom-elements-manifest.cjs');
const OrderTagsPlugin = require('@patternfly/pfe-tools/11ty/plugins/order-tags.cjs');
const TodosPlugin = require('@patternfly/pfe-tools/11ty/plugins/todos.cjs');
const TocPlugin = require('@patternfly/pfe-tools/11ty/plugins/table-of-contents.cjs');

const markdownItAnchor = require('markdown-it-anchor');

/** @param {import('@11ty/eleventy/src/UserConfig')} eleventyConfig */
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
  eleventyConfig.addPlugin(OrderTagsPlugin, { tags: ['component'], order: 'alphabetical' });

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

  /** Strip empty paragraphs */
  eleventyConfig.addPlugin(EmptyParagraphPlugin);

  /** Add IDs to heading elements */
  eleventyConfig.addPlugin(AnchorsPlugin, {
    exclude: /\/components\/.*\/demo\//,
    formatter($, existingids) {
      if (
        !existingids.includes($.attr('id')) &&
        $.attr('slot') &&
        $.closest('pf-card')
      ) {
        return null;
      } else {
        return eleventyConfig.javascriptFunctions
          .slug($.text())
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

  function dedent(str) {
    const stripped = str.replace(/^\n/, '');
    const match = stripped.match(/^\s+/);
    return match ? stripped.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str;
  }

  eleventyConfig.addPairedShortcode('htmlexample', function(content, kwargs) {
    return `
<div class="example-preview">
  ${content}
</div>
<details class="html-example ${kwargs?.class ?? ''}"${!kwargs?.style ? '' : ` style="${kwargs.style}"`}>
  <summary>View HTML Source</summary>

~~~html
${dedent(content)}
~~~

</details>`;
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
