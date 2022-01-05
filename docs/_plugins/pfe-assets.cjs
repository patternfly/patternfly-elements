const fs = require('fs');
const glob = require('glob');
const { join } = require('path');

const { dirname } = require('path');

const getComponentName = path => {
  const [, , component] = path.match(/(core|elements)\/pfe-([-\w]+)\//) ?? [];
  return component;
};

function doCopy(path) {
  const component = getComponentName(path);
  if (component) {
    const copyTo = join('docs', path)
      .replace('/elements/', '/components/')
      .replace('/pfe-', '/')
      .replace(/^(.*)\/docs\/([\w-]+\.\w+)$/, '$1/$2');

    // Check if the folder needs to be created
    fs.mkdirSync(dirname(copyTo), { recursive: true });

    // Copy the files for the component to the newly created folder
    fs.copyFileSync(path, copyTo);
  }
}

let didFirstBuild = false;

const WATCH_EXTENSIONS = [
  'cjs',
  'css',
  'html',
  'js',
  'json',
  'map',
  'md',
  'mjs',
  'png',
  'scss',
  'svg',
  'ts',
].join(',');
const MONOREPO_ASSETS = `{elements,core}/**/*.{${WATCH_EXTENSIONS}}`;

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('docs/{bundle,demo}.js*');
    eleventyConfig.addPassthroughCopy('docs/core');
    eleventyConfig.addPassthroughCopy('brand');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');

    eleventyConfig.addWatchTarget('docs/{bundle,demo}.js*');
    eleventyConfig.addWatchTarget(`docs/**/*.{${WATCH_EXTENSIONS}}`);
    eleventyConfig.addWatchTarget(MONOREPO_ASSETS);

    eleventyConfig.addTransform('demo-paths', function(content) {
      if (this.outputPath.match(/(components|core)\/.*\/demo\/index\.html$/)) {
        return content.replace(/href="\/(?<workspace>elements|core)\/pfe-(?<unprefixed>.*)\/(?<filename>.*).css"/g, (...args) => {
          const [{workspace, unprefixed, filename}] = args.reverse();
          return `href="/${workspace === 'elements' ? 'components' : workspace}/${unprefixed}/${filename}.css"`;
        })
      } else {
        return content
      }
    });

    eleventyConfig.on('beforeBuild', () => {

      if (!didFirstBuild) {

        for (const path of glob.sync(MONOREPO_ASSETS)) {
          if (fs.lstatSync(path).isFile()) {
            doCopy(path);
          }
        }

        didFirstBuild = true;
      }
    });

    eleventyConfig.on('beforeWatch', changed => {
      console.log(changed)
      for (const path of changed) {
        doCopy(path);
      }
    });
  },
};
