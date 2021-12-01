const fs = require('fs');
const glob = require('glob');

const { basename } = require('path');

const getComponentName = path => {
  const [, , component] = path.match(/(elements|core)\/pfe-([-\w]+)\//) ?? [];
  return component;
};

function doCopy(path) {
  const component = getComponentName(path);
  if (component) {
    const copyTo = `docs/components/${component}/${basename(path)}`;

    // Check if the folder needs to be created
    fs.mkdirSync(`docs/components/${component}`, { recursive: true });

    // Copy the files for the component to the newly created folder
    fs.copyFileSync(path, copyTo);
  }
}

let didFirstBuild = false;

module.exports = {
  configFunction(eleventyConfig) {
    eleventyConfig.on('beforeBuild', () => {
      if (!didFirstBuild) {
        // Copy the assets for each component into the docs folder
        for (const path of glob.sync('{elements,core}/*/docs/*')) {
          doCopy(path);
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
