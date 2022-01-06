const fs = require('fs');
const glob = require('glob');
const chokidar = require('chokidar');
const { join, dirname } = require('path');
const { bundle } = require('./bundle.cjs');

/**
 * Debounce helper function
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * @param  func Function to be debounced
 * @param  delay How long until it will be run
 * @param  immediate Whether it should be run at the start instead of the end of the debounce
 */
function debounce(delay, func) {
  let timeout;
  return function(...args) {
    // eslint-disable-next-line no-invalid-this
    const context = this;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    const callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

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
const MONOREPO_ASSETS = `./{elements,core}/**/*.{${WATCH_EXTENSIONS}}`;

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('docs/bundle.{js,map,ts}');
    eleventyConfig.addPassthroughCopy('docs/demo.{js,map,ts}');
    eleventyConfig.addPassthroughCopy(`docs/core/**/*.{${WATCH_EXTENSIONS}}`);
    eleventyConfig.addPassthroughCopy('brand');
    eleventyConfig.addPassthroughCopy('docs/main.mjs');

    eleventyConfig.addWatchTarget('docs/{bundle,demo}.js*');
    eleventyConfig.addWatchTarget(`docs/!(core)/*.{${WATCH_EXTENSIONS}}`);
    // eleventyConfig.addWatchTarget(MONOREPO_ASSETS);

    eleventyConfig.addTransform('demo-paths', function(content) {
      // eslint-disable-next-line no-invalid-this
      if (this.outputPath.match(/(components|core)\/.*\/demo\/index\.html$/)) {
        return content.replace(/(?<attr>href|src)="\/(?<workspace>elements|core)\/pfe-(?<unprefixed>.*)\/(?<filename>.*).css"/g, (...args) => {
          const [{ attr, workspace, unprefixed, filename }] = args.reverse();
          return `${attr}="/${workspace === 'elements' ? 'components' : workspace}/${unprefixed}/${filename}.css"`;
        });
      } else {
        return content;
      }
    });

    eleventyConfig.on('beforeBuild', async () => {
      if (!didFirstBuild) {
        for (const path of glob.sync(MONOREPO_ASSETS)) {
          if (fs.lstatSync(path).isFile()) {
            doCopy(path);
          }
        }
        await bundle();
        didFirstBuild = true;
      }
    });

    const paths = new Set();

    const copyPaths = debounce(2000, function copyPaths() {
      for (const path of paths) {
        doCopy(path);
        paths.delete(path);
      }
    });

    if (process.argv.includes('--serve')) {
      chokidar.watch(MONOREPO_ASSETS, {
        awaitWriteFinish: {
          stabilityThreshold: 2000,
          pollInterval: 100
        }
      }).on('change', path => {
        // We'd like to know about this
        // eslint-disable-next-line no-console
        console.log('File Queued: ', path);
        paths.add(path);
        copyPaths();
        if (path.match(/elements|core/)) {
          bundle();
        }
      });
    }
  },
};
