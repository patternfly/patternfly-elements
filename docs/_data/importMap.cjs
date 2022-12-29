const fs = require('fs');
const path = require('path');

const packageLock = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package-lock.json')));

function readPackageVersion(module) {
  return packageLock.packages[`node_modules/${module}`].version;
}

const LIT_VERSION = readPackageVersion('lit');
const FUSE_VERSION = readPackageVersion('fuse.js');
const ZERO_MD_VERSION = readPackageVersion('zero-md');
const MARKED_VERSION = readPackageVersion('marked');
const PRISM_VERSION = readPackageVersion('prismjs');
const PWA_HELPER_VERSION = readPackageVersion('pwa-helpers');

const LIT_DEPS = [
  {
    target: `lit@${LIT_VERSION}`,
    subpaths: [
      '.',
      './decorators/query-all.js',
      './decorators/query-assigned-nodes.js',
      './decorators/query-assigned-elements.js',
      './decorators/query-async.js',
      './decorators/query.js',
      './decorators/state.js',
      './directives/async-append.js',
      './directives/async-replace.js',
      './directives/cache.js',
      './directives/class-map.js',
      './directives/guard.js',
      './directives/if-defined.js',
      './directives/live.js',
      './directives/ref.js',
      './directives/repeat.js',
      './directives/style-map.js',
      './directives/template-content.js',
      './directives/unsafe-html.js',
      './directives/unsafe-svg.js',
      './directives/until.js',
      './async-directive.js',
      './decorators.js',
      './directive.js',
      './directive-helpers.js',
      './experimental-hydrate-support.js',
      './experimental-hydrate.js',
      './html.js',
      './polyfill-support.js',
      './static-html.js'
    ]
  }
];

const PWA_DEPS = [
  {
    target: `pwa-helpers@${PWA_HELPER_VERSION}`,
    subpaths: [
      '.',
      './router.js'
    ]
  }
];

module.exports = async function() {
  const { Generator } = await import('@jspm/generator');

  const generator = new Generator({
    defaultProvider: 'jspm',
    env: ['production', 'browser', 'module']
  });

  await generator.install([
    'tslib',
    'element-internals-polyfill',
    `zero-md@${ZERO_MD_VERSION}`,
    `fuse.js@${FUSE_VERSION}`,
    ...LIT_DEPS,
    ...PWA_DEPS
  ]);

  const map = generator.getMap();

  map.imports['@floating-ui/dom'] = `https://ga.jspm.io/npm:@floating-ui/dom@1.0.5/dist/floating-ui.dom.mjs`;
  map.imports['@floating-ui/core'] = `https://ga.jspm.io/npm:@floating-ui/core@1.0.2/dist/floating-ui.core.browser.mjs`;
  map.imports['marked'] = `https://ga.jspm.io/npm:marked@${MARKED_VERSION}/lib/marked.esm.js`;
  map.imports['prismjs'] = `https://ga.jspm.io/npm:prismjs@${PRISM_VERSION}/prism.js`;

  map.imports['@patternfly/pfe-core'] = '/core/core/core.js';
  map.imports['@patternfly/pfe-core/decorators.js'] = '/core/core/decorators.js';
  map.imports['@patternfly/pfe-core/decorators/'] = '/core/core/decorators/';
  map.imports['@patternfly/pfe-core/'] = '/core/core/';
  map.imports['@patternfly/pfe-tools/environment.js'] = '/tools/environment.js';

  fs.readdirSync(path.join(__dirname, '..', '..', 'elements')).flatMap(component => {
    const base = component.replace('pfe-', '');
    map.imports[`@patternfly/${component}`] = `/components/${base}/${component}.js`;
    map.imports[`@patternfly/${component}/`] = `/components/${base}/`;
  });

  return map;
};
