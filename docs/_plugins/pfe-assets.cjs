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

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('docs/{bundle,demo}.js*');
    eleventyConfig.addPassthroughCopy('docs/core');
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

        for (const path of glob.sync('{core,elements}/**/*.{md,html,js,js.map,css,scss,ts,png,svg,png}')) {
          if (fs.lstatSync(path).isFile()) {
            doCopy(path);
          }
        }

        didFirstBuild = true;
      }
    });

    eleventyConfig.on('beforeWatch', changed => {
      for (const path of changed) {
        doCopy(path);
      }
    });
  },
};
