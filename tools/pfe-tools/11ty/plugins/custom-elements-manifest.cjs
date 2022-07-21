// @ts-check
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const { join } = require('node:path');
const { existsSync } = require('node:fs');

/**
 * @typedef {object} PluginOptions
 * @property {string} [rootDir=process.cwd()] rootDir of the package
 * @property {Record<string, string>} [aliases] object mapping custom element name to page title
 * @property {string} [sourceControlURLPrefix='https://github.com/patternfly/patternfly-elements/tree/main/'] absolute URL to the web page representing the repo root in source control, with trailing slash
 * @property {string} [demoURLPrefix='https://patternflyelements.org/'] absolute URL prefix for demos, with trailing slash
 * @property {string} [tagPrefix='pfe'] custom elements namespace
 * @property {DemoRecord[]} [extraDemos=[]] list of extra demo records not included in the custom-elements-manifest
 */

/**
 * NB: New with 11ty 1.0.0? Maybe it's the pagination value?
 * @typedef {object} EleventyContext
 * @property {{_: *}} ctx
 */

/**
 * @typedef {object} DemoRecord
 * @property {string} title
 * @property {string} tagName
 * @property {string} tagPrefix
 * @property {string} slug
 * @property {string} filePath
 * @property {string} permalink
 * @property {string} url
 */

/**
 * @param {string} tagName
 * @return {Promise<import('../DocsPage').DocsPage>}
 * @this {EleventyContext}
 */
async function getDocsPage(tagName) {
  // Not sure how bad of an abuse this is
  if (this.ctx._?.constructor?.name === 'DocsPage') {
    return this.ctx._;
  } else {
    throw new Error(`Could not load data for ${tagName}`);
  }
}

// TODO: programmable package scopes, etc
/**
 * @param {*} eleventyConfig
 * @param {PluginOptions} options
 */
module.exports = function configFunction(eleventyConfig, options) {
  const rootDir = options?.rootDir ?? process.cwd();
  const sourceControlURLPrefix = options?.sourceControlURLPrefix ?? 'https://github.com/patternfly/patternfly-elements/tree/main/';
  const demoURLPrefix = options?.demoURLPrefix ?? 'https://patternflyelements.org/';
  const tagPrefix = options?.tagPrefix ?? 'pfe';

  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addGlobalData('env', () => process.env);

  eleventyConfig.addGlobalData('demos', async function demos() {
    const { Manifest } = await import('../../custom-elements-manifest/lib/Manifest.js');

    // 1. get all packages
    // 2. get manifests per package
    // 3. get tagNames per manifest
    // 4. get demos per tagName
    // 5. generate demo record with tagName, slug, title, and filepath per demo
    return Manifest.getAll(rootDir)
      .flatMap(manifest => manifest.getTagNames()
        .flatMap(tagName => manifest.getDemoMetadata(tagName, { rootDir, sourceControlURLPrefix, demoURLPrefix, tagPrefix })
          .concat(options?.extraDemos ?? [])));
  });

  eleventyConfig.addGlobalData('elements', async function elements() {
    const { Manifest } = await import('../../custom-elements-manifest/lib/Manifest.js');
    const { DocsPage } = await import('../DocsPage.js');

    // 1. get all packages
    // 2. get manifests from packages, construct manifest objects, associate packages
    // 3. get all tag names from each manifest. construct docs page for tag names w/ associates manifest and package
    return Manifest.getAll(rootDir)
      .flatMap(manifest =>
        Array.from(manifest.declarations.values(), decl => {
          const { tagName } = decl;
          return new DocsPage(manifest, {
            tagName,
            // only include the template if it exists
            ...Object.fromEntries(Object.entries({
              docsTemplatePath: join(manifest.location, 'docs', `${tagName}.md`),
            }).filter(([, v]) => existsSync(v)))
          });
        }));
  });

  /** Rebuild the site in watch mode when the templates for this plugin change */
  eleventyConfig
    .addWatchTarget(require.resolve('@patternfly/pfe-tools/11ty')
      .replace('index.js', '**/*.{js,njk}'));

  // copied from DocsPage
  eleventyConfig.addPairedAsyncShortcode('band',
    /**
     * @param {string} content
     * @param {Record<string, string>} kwargs
     */
    async function(content, kwargs) {
      const { renderBand } = await import('@patternfly/pfe-tools/11ty');
      return renderBand(content, kwargs);
    });

  for (const shortCode of [
    'renderAttributes',
    'renderCssCustomProperties',
    'renderCssParts',
    'renderEvents',
    'renderMethods',
    'renderOverview',
    'renderProperties',
    'renderSlots',
  ]) {
    eleventyConfig.addPairedAsyncShortcode(shortCode,
      /**
       * @this {EleventyContext}
       * @param {string} content
       * @param {Record<string, string>} kwargs
       */
      async function(content, kwargs) {
        const page = await getDocsPage.call(this, kwargs?.for);
        return page[shortCode](content, kwargs);
      });
  }
};
