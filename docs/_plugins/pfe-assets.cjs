const fs = require('fs');
const { join } = require('path');
const { bundle } = require('./bundle.cjs');

let didFirstBuild = false;

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('docs/bundle.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/demo.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');
    eleventyConfig.addPassthroughCopy('brand/**/*');

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

    eleventyConfig.addPassthroughCopy(files);

    // The demo files are written primarily for the dev SPA (`npm start`),
    // so here we transform the paths found in those files to match the docs site's file structure
    eleventyConfig.addTransform('demo-paths', function(content) {
      // eslint-disable-next-line no-invalid-this
      if (this.outputPath.match(/(components|core|tools)\/.*\/demo\/index\.html$/)) {
        return content.replace(/(?<attr>href|src)="\/(?<workspace>elements|core)\/pfe-(?<unprefixed>.*)\/(?<filename>.*)\.(?<extension>[.\w]+)"/g, (...args) => {
          const [{ attr, workspace, unprefixed, filename, extension }] = args.reverse();
          return `${attr}="/${workspace === 'elements' ? 'components' : workspace}/${unprefixed}/${filename}.${extension}"`;
        });
      } else {
        return content;
      }
    });

    eleventyConfig.on('beforeBuild', async () => {
      if (!didFirstBuild) {
        // create /docs/bundle.js
        await bundle();
        didFirstBuild = true;
      }
    });
  },
};
