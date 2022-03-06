const fs = require('fs');
const { join } = require('path');

/** Generate a map of files per package which should be copied to the site dir */
function getFilesToCopy() {
  const repoRoot = join(__dirname, '..', '..');

  // Copy all component and core files to _site
  const files = Object.fromEntries([
    ...fs.readdirSync(join(repoRoot, 'elements')).map(dir => [
      `elements/${dir}`,
      `components/${dir.replace('pfe-', '')}`,
    ]),
    ...fs.readdirSync(join(repoRoot, 'core')).map(dir => [
      `core/${dir}`,
      `core/${dir.replace('pfe-', '')}`,
    ]),
  ]);

  return files;
}

let didFirstBuild = false;
/** Generate a single-file bundle of all pfe components and their dependencies */
async function bundle() {
  if (!didFirstBuild) {
    const { singleFileBuild } = await import('@patternfly/pfe-tools/esbuild.js');
    const { pfeEnvPlugin } = await import('@patternfly/pfe-tools/esbuild-plugins/pfe-env.js');

    await singleFileBuild({
      minify: process.env.NODE_ENV === 'production' || process.env.ELEVENTY_ENV?.startsWith?.('prod'),
      outfile: 'docs/pfe.min.js',
      conditions: ['esbuild'],
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
  configFunction(eleventyConfig) {
    eleventyConfig.addWatchTarget('tools/pfe-tools/11ty/**/*.{js,njk}');
    eleventyConfig.addPassthroughCopy('docs/bundle.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/pfe.min.{map,css}');
    eleventyConfig.addPassthroughCopy('docs/demo.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');
    eleventyConfig.addPassthroughCopy('brand/**/*');
    eleventyConfig.addPassthroughCopy(getFilesToCopy());

    // The demo files are written primarily for the dev SPA (`npm start`),
    // so here we transform the paths found in those files to match the docs site's file structure
    eleventyConfig.addTransform('demo-paths', demoPaths);

    // create /docs/pfe.min.js
    eleventyConfig.on('eleventy.before', bundle);
  },
};
