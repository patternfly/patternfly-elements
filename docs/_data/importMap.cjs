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

const LIT_VERSION = readPackageVersion('lit');
const FUSE_VERSION = readPackageVersion('fuse.js');
const PRISM_VERSION = readPackageVersion('prismjs');

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
      './decorators/property.js',
      './decorators/custom-element.js',
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
      './html.js',
      './polyfill-support.js',
      './static-html.js',
    ],
  },
  {
    target: `@lit-labs/ssr-client`,
    subpaths: [
      '.',
      './lit-element-hydrate-support.js',
    ],
  },
];

module.exports = async function() {
  const { Generator } = await import('@jspm/generator');

  const generator = new Generator({
    defaultProvider: 'jsdelivr',
    env: ['production', 'browser', 'module'],
  });

  await generator.install([
    'tslib',
    '@rhds/elements',
    '@rhds/elements/rh-footer/rh-footer-universal.js',
    `prismjs@${PRISM_VERSION}`,
    'element-internals-polyfill',
    `fuse.js@${FUSE_VERSION}`,
    ...LIT_DEPS,
  ]);

  const map = generator.getMap();
  map.imports['/docs/zero-md.js'] = '/zero-md.js';
  map.imports['@patternfly/elements/'] = '/assets/@patternfly/elements/';
  map.imports['@patternfly/pfe-core/'] = '/assets/@patternfly/pfe-core/';
  map.imports['@patternfly/pfe-core'] = '/assets/@patternfly/pfe-core/core.js';
  map.imports['@patternfly/pfe-tools/'] = '/assets/@patternfly/pfe-tools/';
  map.imports['@patternfly/icons/'] = '/assets/@patternfly/icons/';
  map.imports['@lit/context'] = map.scopes['https://cdn.jsdelivr.net/']['@lit/context'];
  map.imports['lit/'] = map.imports.lit.replace('index.js', '');
  map.scopes['https://cdn.jsdelivr.net/'].lit = map.imports.lit;
  map.scopes['https://cdn.jsdelivr.net/']['lit/'] = map.imports.lit.replace('index.js', '');
  return map;
};
