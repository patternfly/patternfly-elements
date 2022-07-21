// @ts-check
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const { join } = require('node:path');
const { existsSync } = require('node:fs');
const glob = require('glob');

/**
 * @typedef {object} PluginOptions
 * @property {string} [rootDir=process.cwd()] rootDir of the package
 * @property {Record<string, string>} [aliases] object mapping custom element name to page title
 * @property {string} [sourceControlURLPrefix='https://github.com/patternfly/patternfly-elements/tree/main/'] absolute URL to the web page representing the repo root in source control, with trailing slash
 * @property {string} [demoURLPrefix='https://patternflyelements.org/'] absolute URL prefix for demos, with trailing slash
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
 * @property {string} slug
 * @property {string} filePath
 * @property {string} permalink
 * @property {string} url
 */

/**
 * @typedef {object} PackageRecord
 * @property {string} location
 * @property {import('../Manifest.js').PackageJSON} package
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

/**
 * @param {string} packagePath
 * @return {import('../Manifest.js').PackageJSON|void}
 */
function loadPackage(packagePath) {
  const pkgJsonPath = join(packagePath, 'package.json');
  if (existsSync(pkgJsonPath)) {
    return require(pkgJsonPath);
  }
}

/**
 * @param {string[]} packageSpecs
 * @param {string} rootDirectory
 * @return {PackageRecord[]}
 */
function findPackages(packageSpecs, rootDirectory) {
  return packageSpecs
    .flatMap(pkgGlob =>
      (glob.hasMagic(pkgGlob) ?
          glob.sync(join(rootDirectory, pkgGlob), { nodir: false })
          : [join(rootDirectory, pkgGlob)]))
    .map(location => ({ location, package: loadPackage(location) }))
    .filter(/** @return {x is PackageRecord} */ x => x.package && !!x.package.name);
}

/**
 * Adapted from `get-monorepo-packages` by Lucas Azzola
 * @license MIT
 * @see https://github.com/azz/get-monorepo-packages/
 * @param {string} rootDir
 * @return {PackageRecord[]}
 */
function findAllPackages(rootDir) {
  const rootPackagePath = join(rootDir, 'package.json');
  const rootPackage = require(rootPackagePath);
  return Array.isArray(rootPackage.workspaces) ? findPackages(rootPackage.workspaces, rootDir)
    : [{ package: rootPackage, location: rootDir }];
}

/**
 * @param {string} tagName
 * @param {Record<string, string>} [aliases]
 */
const pretty = (tagName, aliases) => aliases?.[tagName] ?? tagName
  .replace(/^\w+-/, '')
  .toLowerCase()
  .replace(/(?:^|[-/\s])\w/g, x => x.toUpperCase())
  .replace(/-/g, ' ');

/** @param {typeof import('../Manifest').Manifest} Manifest */
const makeManifests = Manifest =>
  /** @type {(x: {location: string; package: import('../Manifest').PackageJSON}) => (import('../Manifest').Manifest)[]} */
  x => !x.package.customElements ? [] : [Manifest.from(x)];

// TODO: programmable package scopes, etc
/**
 * @param {*} eleventyConfig
 * @param {PluginOptions} options
 */
module.exports = function configFunction(eleventyConfig, options) {
  const rootDir = options?.rootDir ?? process.cwd();

  const packages = findAllPackages(rootDir);

  // add `renderTemplate` filter
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addGlobalData('env', () => process.env);

  eleventyConfig.addGlobalData('demos', async function demos() {
    const { Manifest } = await import('../Manifest.js');

    const sourceControlURLPrefix = options?.sourceControlURLPrefix ?? 'https://github.com/patternfly/patternfly-elements/tree/main/';
    const demoURLPrefix = options?.demoURLPrefix ?? 'https://patternflyelements.org/';

    // 1. get all packages
    // 2. get manifests per package
    // 3. get tagNames per manifest
    // 4. get demos per tagName
    // 5. generate demo record with tagName, slug, title, and filepath per demo
    return packages
      .flatMap(makeManifests(Manifest))
      .flatMap(manifest => manifest.getTagNames()
        .flatMap(tagName => manifest.getDemos(tagName)
          ?.map?.(demo => ({
            tagName,
            slug: tagName.replace(/^(\w+)-/, ''),
            title: pretty(tagName),
            ...demo,
            permalink: demo.url.replace(demoURLPrefix, '/'),
            filePath: demo.source.href.replace(sourceControlURLPrefix, `${rootDir}/`)
          })) ?? [])).concat(options?.extraDemos ?? []);
  });

  eleventyConfig.addGlobalData('elements', async function elements() {
    const { Manifest } = await import('../Manifest.js');
    const { DocsPage } = await import('../DocsPage.js');

    /**
     * @param {import('../Manifest').Manifest} manifest
     * @return {import('../DocsPage').DocsPage[]}
     */
    const makeRenderers = manifest => {
      return Array.from(manifest.declarations.values(), decl => {
        const { tagName } = decl;
        const { docsTemplatePath } = Object.fromEntries(Object.entries({
          docsTemplatePath: join(manifest.location, 'docs', `${tagName}.md`),
        }).filter(([, v]) => existsSync(v)));
        return new DocsPage(manifest, {
          tagName,
          title: pretty(tagName, options?.aliases),
          docsTemplatePath,
        });
      });
    };

    // 1. get all packages
    // 2. get manifests from packages, construct manifest objects, associate packages
    // 3. get all tag names from each manifest. construct docs page for tag names w/ associates manifest and package
    return packages
      .flatMap(makeManifests(Manifest))
      .flatMap(makeRenderers);
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
