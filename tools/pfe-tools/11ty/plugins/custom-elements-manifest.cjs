// @ts-check
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const { join } = require('node:path');
const { existsSync } = require('node:fs');
const glob = require('glob');

let elements;

function getTagName(url) {
  const [, , tagName] = url.match(/\/(\w+)\/(\w+)/);
  return `pfe-${tagName}`;
}

// it's an 11ty api
/* eslint-disable no-invalid-this */

async function getDocsPage(tagName) {
  // NB: I think this is new with 11ty 1.0.0. Maybe it's the pagination value? Not sure how bad of an abuse this is
  if (this.ctx._?.constructor?.name === 'DocsPage') {
    return this.ctx._;
  } else {
    elements ??= await elementsPackages();
    tagName ??= getTagName(this.page.url);
    return elements.get(tagName);
  }
}

const loadPackage = packagePath => {
  const pkgJsonPath = join(packagePath, 'package.json');
  if (existsSync(pkgJsonPath)) {
    return require(pkgJsonPath);
  }
};

/**
 * Adapted from `get-monorepo-packages` by Lucas Azzola
 * @license MIT
 * @see https://github.com/azz/get-monorepo-packages/
 */
const findPackages = (packageSpecs, rootDirectory) => packageSpecs
  .flatMap(pkgGlob =>
    (glob.hasMagic(pkgGlob) ?
        glob.sync(join(rootDirectory, pkgGlob), { nodir: false })
        : [join(rootDirectory, pkgGlob)]))
  .map(location => ({ location, package: loadPackage(location) }))
  .filter(({ package: { name } = {} }) => name);

// TODO: programmable package scopes, etc
module.exports = function configFunction(eleventyConfig, options) {
  const cwd = options?.rootDir ?? process.cwd();

  // add `renderTemplate` filter
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  eleventyConfig.addGlobalData('env', () => process.env);

  eleventyConfig.addGlobalData('elements', async function elements() {
    const { Manifest } = await import('../Manifest.js');
    const { DocsPage } = await import('../DocsPage.js');
    const { readFile } = await import('node:fs/promises');


    const maybeRead = async filePath => existsSync(filePath) ? readFile(filePath, 'utf8') : null;
    const rootPackagePath = join(cwd, 'package.json');
    const rootPackage = require(rootPackagePath);

    // 1. get all packages
    const packages =
        Array.isArray(rootPackage.workspaces) ? findPackages(rootPackage.workspaces, cwd)
      : [{ package: rootPackage, location: rootPackagePath }];

    // 2. get manifests from packages, construct manifest objects, associate packages
    /** @type {import('../Manifest.js').Manifest[]} */
    const manifests = packages.flatMap(x =>
        !x.package.customElements ? []
      : [Manifest.from(x.package, x.location)]);

    // 3. get all tag names from each manifest. construct docs page for tag names w/ associates manifest and package
    const docsPages = await Promise.all(manifests.flatMap(manifest => {
      return Array.from(manifest.declarations.values(), async decl => {
        const demoPath = join(manifest.location, 'demo', `${decl.tagName}.html`);
        const docsPath = join(manifest.location, 'docs', 'index.md');
        const modulePath = join(manifest.location, `${decl.tagName}.js`);
        const scriptPath = join(manifest.location, 'demo', `${decl.tagName}.js`);

        return new DocsPage(
          decl.tagName,
          manifest,
          await maybeRead(demoPath),
          await maybeRead(docsPath),
          await maybeRead(modulePath),
          await maybeRead(scriptPath)
        );
      });
    }));

    return docsPages;
  });

  const toolsFiles = require.resolve('@patternfly/pfe-tools/11ty').replace('index.js', '**/*.{js,njk}');
  eleventyConfig.addWatchTarget(toolsFiles);

  // copied from DocsPage
  eleventyConfig.addPairedAsyncShortcode('band', async function(content, kwargs) {
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
    eleventyConfig.addPairedAsyncShortcode(shortCode, async function(content, kwargs) {
      const page = await getDocsPage.call(this, kwargs?.for);
      return page[shortCode](content, kwargs);
    });
  }
};
