const fs = require('fs');
const path = require('path');

/**
 * Generate a map of files per package which should be copied to the site dir
 * @param {object} [options]
 * @param {string} [options.prefix='pfe'] element prefix e.g. 'pfe' for 'pfe-button'
 */
function getFilesToCopy(options) {
  /** best guess at abs-path to repo root */
  const repoRoot = path.join(__dirname, '..', '..', '..', '..').replace(/node_modules\/?$/g, '');

  const prefix = `${(options?.prefix ?? 'pfe').replace(/-$/, '')}-`;

  const hasElements = fs.existsSync(path.join(repoRoot, 'elements'));
  const hasCore = fs.existsSync(path.join(repoRoot, 'core'));

  if (!hasElements && !hasCore) {
    return null;
  }

  const files = {
    [path.join(repoRoot, 'node_modules/element-internals-polyfill')]: 'element-internals-polyfill',
  };

  // Copy all component and core files to _site
  if (hasElements) {
    Object.assign(files, Object.fromEntries(fs.readdirSync(path.join(repoRoot, 'elements')).map(dir => [
      `elements/${dir}`,
      `components/${dir.replace(prefix, '')}`,
    ])));
  }

  if (hasCore) {
    Object.assign(files, Object.fromEntries(fs.readdirSync(path.join(repoRoot, 'core')).map(dir => [
      `core/${dir}`,
      `core/${dir.replace(prefix, '')}`,
    ])));
  }

  return files;
}

let didFirstBuild = false;

/** Generate a single-file bundle of all the repo's components and their dependencies */
async function bundle(options) {
  if (!didFirstBuild) {
    const { singleFileBuild } = await import('@patternfly/pfe-tools/esbuild.js');
    const { pfeEnvPlugin } = await import('@patternfly/pfe-tools/esbuild-plugins/pfe-env.js');

    await singleFileBuild({
      additionalPackages: options?.additionalPackages,
      minify: process.env.NODE_ENV === 'production' || process.env.ELEVENTY_ENV?.startsWith?.('prod'),
      outfile: 'docs/pfe.min.js',
      plugins: [
        pfeEnvPlugin(),
      ]
    }).catch(() => void 0);

    didFirstBuild = true;
  }
}

/**
 * @typedef {object} EleventyTransformContext
 * @property {string} outputPath path this file will be written to
 */

/**
 * Replace paths in demo files from the dev SPA's format to 11ty's format
 * @this {EleventyTransformContext}
 */
function demoPaths(content) {
  if (this.outputPath.match(/(components|core|tools)\/.*\/demo\/index\.html$/)) {
    return content.replace(/(?<attr>href|src)="\/(?<workspace>elements|core)\/pfe-(?<unprefixed>.*)\/(?<filename>.*)\.(?<extension>[.\w]+)"/g, (...args) => {
      const [{ attr, workspace, unprefixed, filename, extension }] = args.reverse();
      return `${attr}="/${workspace === 'elements' ? 'components' : workspace}/${unprefixed}/${filename}.${extension}"`;
    });
  } else {
    return content;
  }
}

module.exports = {
  configFunction(eleventyConfig, options) {
    eleventyConfig.addPassthroughCopy('docs/bundle.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/pfe.min.{map,css}');
    eleventyConfig.addPassthroughCopy('docs/demo.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');
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


