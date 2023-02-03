const fs = require('fs');
const path = require('path');

/**
 * @typedef {object} EleventyTransformContext
 * @property {string} outputPath path this file will be written to
 */

/**
 * Generate a map of files per package which should be copied to the site dir
 * @param {object} [options]
 * @param {string} [options.prefix='pfe'] element prefix e.g. 'pfe' for 'pf-button'
 */
function getFilesToCopy(options) {
  const cwd = process.cwd();
  const prefix = `${(options?.prefix ?? 'pf').replace(/-$/, '')}-`;

  const hasElements = fs.existsSync(path.join(cwd, 'elements'));
  const hasCore = fs.existsSync(path.join(cwd, 'core'));

  if (!hasElements && !hasCore) {
    return null;
  }

  const files = {
    [path.join(cwd, 'node_modules/element-internals-polyfill')]: 'element-internals-polyfill',
  };

  const tagNames = fs.readdirSync(path.join(cwd, 'elements'));
  const corePkgs = fs.readdirSync(path.join(cwd, 'core'));

  // Copy all component and core files to _site
  if (hasElements) {
    Object.assign(files, Object.fromEntries(tagNames
      .filter(x => !x.match(/node_modules|tsconfig|README\.md|(?:\.ts$)|(?:config\.js$)/))
      .map(dir => [
        `elements/${dir}`,
        `components/${dir.replace(prefix, '')}`,
      ])));
  }

  if (hasCore) {
    Object.assign(files, Object.fromEntries(corePkgs.map(dir => [
      `core/${dir}`,
      `core/${dir.replace(prefix, '')}`,
    ])));
  }

  return files;
}

/**
 * Replace paths in demo files from the dev SPA's format to 11ty's format
 * @this {EleventyTransformContext}
 */
function demoPaths(content) {
  if (this.outputPath.match(/(components|core|tools)\/.*\/demo\/index\.html$/)) {
    return content.replace(/(?<attr>href|src)="\/(?<workspace>elements|core)\/pf-(?<unprefixed>.*)\/(?<filename>.*)\.(?<extension>[.\w]+)"/g, (...args) => {
      const [{ attr, workspace, unprefixed, filename, extension }] = args.reverse();
      return `${attr}="/${workspace === 'elements' ? 'components' : workspace}/${unprefixed}/${filename}.${extension}"`;
    });
  } else {
    return content;
  }
}

/** Generate a single-file bundle of all the repo's components and their dependencies */
async function bundle() {
  const { bundle } = await import('../../scripts/bundle.js');
  await bundle();
}

module.exports = {
  configFunction(eleventyConfig, options) {
    eleventyConfig.addPassthroughCopy('docs/bundle.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/pfe.min.{map,css}');
    eleventyConfig.addPassthroughCopy({ 'elements/pfe.min.*': '/' } );
    eleventyConfig.addPassthroughCopy('docs/demo.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');
    eleventyConfig.addPassthroughCopy({ 'elements/pf-icon/icons/': 'icons' });
    eleventyConfig.addPassthroughCopy({
      'node_modules/@rhds/elements': '/assets/@rhds'
    });
    eleventyConfig.addPassthroughCopy('brand/**/*');
    const filesToCopy = getFilesToCopy(options);

    if (filesToCopy) {
      eleventyConfig.addPassthroughCopy(filesToCopy);
    }

    // The demo files are written primarily for the dev SPA (`npm start`),
    // so here we transform the paths found in those files to match the docs site's file structure
    eleventyConfig.addTransform('demo-paths', demoPaths);

    // create /docs/pfe.min.js
    eleventyConfig.on('eleventy.before', () => bundle(options));
  },
};


