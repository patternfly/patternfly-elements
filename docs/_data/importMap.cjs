const fs = require('node:fs');
const path = require('node:path');

const packageLock = JSON.parse(fs.readFileSync(path.join(
  __dirname,
  '..',
  '..',
  'package-lock.json',
)));

function readPackageVersion(module) {
  return packageLock.packages[`node_modules/${module}`].version;
}

const LOCAL_PACKAGES = [
  '@patternfly/elements',
  '@patternfly/pfe-core',
  '@patternfly/pfe-tools',
  '@patternfly/icons',
];

module.exports = async function() {
  const { generate } = await import('@pwrs/mappa');

  const map = await generate({
    dependencies: {
      'tslib': readPackageVersion('tslib'),
      '@rhds/elements': readPackageVersion('@rhds/elements'),
      'prismjs': readPackageVersion('prismjs'),
      'element-internals-polyfill': readPackageVersion('element-internals-polyfill'),
      'fuse.js': readPackageVersion('fuse.js'),
      'lit': readPackageVersion('lit'),
      '@lit-labs/ssr-client': readPackageVersion('@lit-labs/ssr-client'),
    },
  }, {
    cdn: 'jsdelivr',
    exclude: LOCAL_PACKAGES,
  });

  for (const key of Object.keys(map.imports)) {
    for (const pkg of LOCAL_PACKAGES) {
      if (key === pkg || key.startsWith(`${pkg}/`)) {
        delete map.imports[key];
      }
    }
  }

  map.imports['/docs/zero-md.js'] = '/zero-md.js';
  map.imports['@patternfly/elements/'] = '/assets/@patternfly/elements/';
  map.imports['@patternfly/pfe-core/'] = '/assets/@patternfly/pfe-core/';
  map.imports['@patternfly/pfe-core'] = '/assets/@patternfly/pfe-core/core.js';
  map.imports['@patternfly/pfe-tools/'] = '/assets/@patternfly/pfe-tools/';
  map.imports['@patternfly/icons/'] = '/assets/@patternfly/icons/';
  return map;
};
