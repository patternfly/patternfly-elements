const fs = require('fs');
const path = require('path');

function readPackageVersion(modulePath) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', modulePath, 'package.json'))).version;
}

const LIT_VERSION = readPackageVersion('lit');
const LIT_ELEMENT_VERSION = readPackageVersion('lit-element');
const LIT_HTML_VERSION = readPackageVersion('lit-html');
const LIT_REACTIVE_ELEMENT_VERSION = readPackageVersion('@lit/reactive-element');

// TODO: use https://github.com/jspm/generator to generate the import map from semver ranges
module.exports = {
  'imports': {
    'lit': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/index.js`,
    'lit/async-directive.js': `https://ga.jspm.io/npm:lit@@${LIT_VERSION}/async-directive.js`,
    'lit/decorators.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators.js`,
    'lit/decorators/query-all.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators/query-all.js`,
    'lit/decorators/query-assigned-nodes.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators/query-assigned-nodes.js`,
    'lit/decorators/query-assigned-elements.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators/query-assigned-elements.js`,
    'lit/decorators/query-async.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators/query-async.js`,
    'lit/decorators/query.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators/query.js`,
    'lit/decorators/state.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/decorators/state.js`,
    'lit/directive-helpers.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directive-helpers.js`,
    'lit/directive.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directive.js`,
    'lit/directives/async-append.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/async-append.js`,
    'lit/directives/async-replace.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/async-replace.js`,
    'lit/directives/cache.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/cache.js`,
    'lit/directives/class-map.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/class-map.js`,
    'lit/directives/guard.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/guard.js`,
    'lit/directives/if-defined.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/if-defined.js`,
    'lit/directives/live.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/live.js`,
    'lit/directives/ref.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/ref.js`,
    'lit/directives/repeat.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/repeat.js`,
    'lit/directives/style-map.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/style-map.js`,
    'lit/directives/template-content.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/template-content.js`,
    'lit/directives/unsafe-html.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/unsafe-html.js`,
    'lit/directives/unsafe-svg.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/unsafe-svg.js`,
    'lit/directives/until.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/directives/until.js`,
    'lit/experimental-hydrate-support.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/experimental-hydrate-support.js`,
    'lit/experimental-hydrate.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/experimental-hydrate.js`,
    'lit/html.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/html.js`,
    'lit/polyfill-support.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/polyfill-support.js`,
    'lit/static-html.js': `https://ga.jspm.io/npm:lit@${LIT_VERSION}/static-html.js`,

    'marked': 'https://ga.jspm.io/npm:marked@4.0.8/lib/marked.esm.js',
    'prismjs': 'https://ga.jspm.io/npm:prismjs@1.25.0/prism.js',
    '@popperjs/core': 'https://ga.jspm.io/npm:@popperjs/core@2.11.5/dist/umd/popper.js',
    'pwa-helpers': 'https://ga.jspm.io/npm:pwa-helpers@0.9.1/pwa-helpers.js',
    'pwa-helpers/router.js': 'https://ga.jspm.io/npm:pwa-helpers@0.9.1/router.js',

    '@patternfly/pfe-core': '/core/core/core.js',
    '@patternfly/pfe-core/decorators.js': '/core/core/decorators.js',
    '@patternfly/pfe-core/decorators/': '/core/core/decorators/',
    '@patternfly/pfe-core/': '/core/core/',

    ...Object.fromEntries(fs.readdirSync(path.join(__dirname, '..', '..', 'elements')).flatMap(dirname => [
      [
        `@patternfly/${dirname}`,
        `/components/${dirname.replace('pfe-', '')}/${dirname}.js`,
      ], [
        `@patternfly/${dirname}/`,
        `/components/${dirname.replace('pfe-', '')}/`,
      ]
    ])),
  },
  'scopes': {
    'https://ga.jspm.io/': {
      '@lit/reactive-element': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/reactive-element.js`,
      '@lit/reactive-element/decorators/custom-element.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/custom-element.js`,
      '@lit/reactive-element/decorators/event-options.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/event-options.js`,
      '@lit/reactive-element/decorators/property.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/property.js`,
      '@lit/reactive-element/decorators/query-all.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/query-all.js`,
      '@lit/reactive-element/decorators/query-assigned-nodes.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/query-assigned-nodes.js`,
      '@lit/reactive-element/decorators/query-assigned-elements.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/query-assigned-elements.js`,
      '@lit/reactive-element/decorators/query-async.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/query-async.js`,
      '@lit/reactive-element/decorators/query.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/query.js`,
      '@lit/reactive-element/decorators/state.js': `https://ga.jspm.io/npm:@lit/reactive-element@${LIT_REACTIVE_ELEMENT_VERSION}/development/decorators/state.js`,
      'lit-element/experimental-hydrate-support.js': `https://ga.jspm.io/npm:lit-element@${LIT_ELEMENT_VERSION}/development/experimental-hydrate-support.js`,
      'lit-element/lit-element.js': `https://ga.jspm.io/npm:lit-element@${LIT_ELEMENT_VERSION}/development/lit-element.js`,
      'lit-html': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/lit-html.js`,
      'lit-html/async-directive.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/async-directive.js`,
      'lit-html/directive-helpers.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directive-helpers.js`,
      'lit-html/directive.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directive.js`,
      'lit-html/directives/async-append.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/async-append.js`,
      'lit-html/directives/async-replace.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/async-replace.js`,
      'lit-html/directives/cache.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/cache.js`,
      'lit-html/directives/class-map.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/class-map.js`,
      'lit-html/directives/guard.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/guard.js`,
      'lit-html/directives/if-defined.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/if-defined.js`,
      'lit-html/directives/live.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/live.js`,
      'lit-html/directives/ref.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/ref.js`,
      'lit-html/directives/repeat.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/repeat.js`,
      'lit-html/directives/style-map.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/style-map.js`,
      'lit-html/directives/template-content.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/template-content.js`,
      'lit-html/directives/unsafe-html.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/unsafe-html.js`,
      'lit-html/directives/unsafe-svg.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/unsafe-svg.js`,
      'lit-html/directives/until.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/directives/until.js`,
      'lit-html/experimental-hydrate.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/experimental-hydrate.js`,
      'lit-html/static.js': `https://ga.jspm.io/npm:lit-html@${LIT_HTML_VERSION}/development/static.js`
    }
  }
};
