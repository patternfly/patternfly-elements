const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const packageLock = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package-lock.json')));

function readPackageVersion(module) {
  return packageLock.packages[`node_modules/${module}`].version;
}

const LIT_VERSION = readPackageVersion('lit');
const FUSE_VERSION = readPackageVersion('fuse.js');
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
    ]
  },
  {
    target: `@lit-labs/ssr-client`,
    subpaths: [
      '.',
      './lit-element-hydrate-support.js',
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
    defaultProvider: 'jspm.io',
    env: ['production', 'browser', 'module']
  });

  await generator.install([
    'tslib',
    '@floating-ui/dom',
    '@floating-ui/core',
    '@rhds/elements',
    '@rhds/elements/rh-footer/rh-global-footer.js',
    `prismjs@${PRISM_VERSION}`,
    'element-internals-polyfill',
    `fuse.js@${FUSE_VERSION}`,
    ...LIT_DEPS,
    ...PWA_DEPS
  ]);

  const map = generator.getMap();
  map.imports['/docs/zero-md.js'] = '/zero-md.js';
  map.imports['@patternfly/elements'] = '/pfe.min.js';

  // add imports for imports under pfe-core
  const pfeCoreImports = (await glob('./{functions,controllers,decorators}/*.ts', { cwd: path.join(__dirname, '../../core/pfe-core') }))
    .filter(x => !x.endsWith('.d.ts'))
    .map(x => x.replace('.ts', '.js'));
  for (const file of pfeCoreImports) {
    map.imports[path.join('@patternfly/pfe-core', file)] = '/pfe.min.js';
  }

  map.imports['@patternfly/pfe-core/decorators.js'] = '/pfe.min.js';
  map.imports['@patternfly/pfe-core'] = '/pfe.min.js';

  const elementsPath = path.join(__dirname, '..', '..', 'elements');
  for (const tagName of fs.readdirSync(elementsPath)) {
    const elementPath = path.join(elementsPath, tagName);
    if (fs.statSync(elementPath).isDirectory()) {
      for (const fileName of fs.readdirSync(elementPath)) {
        if (fileName.endsWith('.ts') && !fileName.endsWith('.d.ts')) {
          map.imports[`@patternfly/elements/${tagName}/${fileName.replace('.ts', '')}.js`] = `/pfe.min.js`;
        }
      }
    }
  }

  map.imports['@patternfly/pfe-tools/environment.js'] = '/tools/environment.js';


  // add imports for all icon files in /node_modules/@patternfly/icons/{far, fas, fab, patternfly}/
  const iconsImports = (await glob('./{far,fas,fab,patternfly}/*.js', { cwd: path.join(__dirname, '../../node_modules/@patternfly/icons') }))
    .filter(x => !x.endsWith('.d.ts'))
    .map(x => x);

  for (const icon of iconsImports) {
    map.imports[`@patternfly/icons/${icon}`] = `/assets/@patternfly/icons/${icon}`;
  }

  return map;
};
