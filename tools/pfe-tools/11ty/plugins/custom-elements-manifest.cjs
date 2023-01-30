// @ts-check
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const { join, dirname } = require('node:path');
const { existsSync } = require('node:fs');
const glob = require('node:util').promisify(require('glob'));
const { stat, rm } = require('node:fs/promises');

/**
 * @param {unknown} x
 * @return {x is import('../DocsPage').DocsPage}
 */
function isDocsPage(x) {
  return (/** @type {typeof import('../DocsPage').DocsPage}*/(x?.constructor))?.isDocsPage ?? false;
}

const isDir = dir => stat(dir).then(x => x.isDirectory, () => false);

// TODO: programmable package scopes, etc
/**
 * @param {*} eleventyConfig
 * @param {import('./types').PluginOptions} _options
 */
module.exports = function configFunction(eleventyConfig, _options = {}) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addGlobalData('env', () => process.env);

  eleventyConfig.addGlobalData('demos', async function demos() {
    const { Manifest } = await import('../../custom-elements-manifest/lib/Manifest.js');
    const { getPfeConfig } = await import('../../config.js');
    const options = { ...getPfeConfig(), ..._options };
    const extraDemos = options?.extraDemos ?? [];

    // 1. get all packages
    // 2. get manifests per package
    // 3. get tagNames per manifest
    // 4. get demos per tagName
    // 5. generate demo record with tagName, slug, title, and filepath per demo
    return Manifest.getAll(options.rootDir)
      .flatMap(manifest => manifest.getTagNames()
        .flatMap(tagName => [...manifest.getDemoMetadata(tagName, options), ...extraDemos]));
  });

  eleventyConfig.addGlobalData('elements', async function elements() {
    const { Manifest } = await import('../../custom-elements-manifest/lib/Manifest.js');
    const { DocsPage } = await import('../DocsPage.js');
    const { getPfeConfig } = await import('../../config.js');
    const options = { ...getPfeConfig(), ..._options };
    const rootDir = options?.rootDir ?? process.cwd();

    // 1. get all packages
    // 2. get manifests from packages, construct manifest objects, associate packages
    // 3. get all tag names from each manifest. construct docs page for tag names w/ associates manifest and package
    return Manifest.getAll(rootDir)
      .flatMap(manifest =>
        Array.from(manifest.declarations.values(), decl => {
          // NB: not a great proxy for monorepo
          const isSinglepackage = decl.module?.path?.startsWith?.('elements/') ?? false;
          const root = isSinglepackage ? dirname(decl.module.path) : '.';
          const { tagName } = decl;
          const docsTemplatePath = join(manifest.location, root, tagName, 'docs', `${tagName}.md`);
          return new DocsPage(manifest, {
            ...options,
            tagName,
            // only include the template if it exists
            ...Object.fromEntries(Object.entries({ docsTemplatePath }).filter(([, v]) => existsSync(v)))
          });
        }));
  });

  // Netlify tends to turn html files into directories with index.html,
  // but 11ty already did that, so let's delete the html file.
  eleventyConfig.on('eleventy.after', async function({ runMode, dir }) {
    if (runMode === 'build') {
      const files = await glob(`${dir.output}/components/*/demo/*`);
      const htmls = files.filter(x => x.endsWith('.html') && !x.endsWith('/index.html'));
      for (const file of htmls) {
        const dir = file.replace(/\.html$/, '');
        if (await isDir(dir)) {
          await rm(file);
        }
      }
    }
  });

  // 11ty turn elements/pf-jazz-hands/demo/special-name.html into
  //            components/jazz-hands/demo/special-name/index.html
  // Here, we rewrite the subresource links so they point to the right files.
  eleventyConfig.addTransform('reroute-special-demo-subresources', function(content) {
    if (this.inputPath.endsWith('/demos.html')) {
      const [, one, , three, four] = this.outputPath.split('/');
      if ( one === 'components' && three === 'demo' && four !== 'index.html') {
        const cheerio = require('cheerio');
        const $ = cheerio.load(content);
        $('body link').each(function() {
          const href = $(this).attr('href');
          if (href && !href.startsWith('http')) {
            $(this).attr('href', join('..', href));
          }
        });
        $('body script').each(function() {
          const src = $(this).attr('src');
          if (src && !src.startsWith('http')) {
            $(this).attr('src', join('..', src));
          }
        });
        return $.html();
      } else {
        return content;
      }
    }
  });

  /** Rebuild the site in watch mode when the templates for this plugin change */
  eleventyConfig
    .addWatchTarget(require.resolve('@patternfly/pfe-tools/11ty')
      .replace('index.js', '**/*.{js,njk}'));

  // copied from DocsPage
  eleventyConfig.addPairedAsyncShortcode('band',
    /**
     * @param {string} content
     * @param {import('../DocsPage').RenderKwargs} kwargs
     */
    async function(content, kwargs) {
      const { renderBand } = await import('@patternfly/pfe-tools/11ty');
      return renderBand(content, kwargs);
    });

  /** @type {import('./types').RendererName} */
  const shortCodes = [
    'renderAttributes',
    'renderCssCustomProperties',
    'renderCssParts',
    'renderEvents',
    'renderMethods',
    'renderOverview',
    'renderProperties',
    'renderSlots',
  ];

  for (const shortCode of shortCodes) {
    eleventyConfig.addPairedAsyncShortcode(shortCode,
      /**
       * @this {import('./types').EleventyContext}
       * @param {string} content
       * @param {import('../DocsPage').RenderKwargs} [kwargs]
       */
      async function(content, kwargs) {
        const docsPage = isDocsPage(this.ctx?._) ? this.ctx?._ : null;
        if (!docsPage) {
          console.warn(
            `{% ${shortCode} %}: No custom elements manifest data found for ${kwargs?.for ?? 'unknown element'}`,
            `\n  inputPath: ${this.page.inputPath}`,
            `\n  URL: ${this.page.url}`,
          );
        }
        return docsPage?.[shortCode]?.(content, kwargs) ?? '';
      });
  }
};
