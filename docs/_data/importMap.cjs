const fs = require('fs');
const path = require('path');

// TODO: use https://github.com/jspm/generator to generate the import map from semver ranges
module.exports = {
  'imports': {
    'lit': 'https://ga.jspm.io/npm:lit@2.0.2/index.js',
    'lit/async-directive.js': 'https://ga.jspm.io/npm:lit@2.0.2/async-directive.js',
    'lit/decorators.js': 'https://ga.jspm.io/npm:lit@2.0.2/decorators.js',
    'lit/decorators/query-all.js': 'https://ga.jspm.io/npm:lit@2.0.2/decorators/query-all.js',
    'lit/decorators/query-assigned-nodes.js': 'https://ga.jspm.io/npm:lit@2.0.2/decorators/query-assigned-nodes.js',
    'lit/decorators/query-async.js': 'https://ga.jspm.io/npm:lit@2.0.2/decorators/query-async.js',
    'lit/decorators/query.js': 'https://ga.jspm.io/npm:lit@2.0.2/decorators/query.js',
    'lit/decorators/state.js': 'https://ga.jspm.io/npm:lit@2.0.2/decorators/state.js',
    'lit/directive-helpers.js': 'https://ga.jspm.io/npm:lit@2.0.2/directive-helpers.js',
    'lit/directive.js': 'https://ga.jspm.io/npm:lit@2.0.2/directive.js',
    'lit/directives/async-append.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/async-append.js',
    'lit/directives/async-replace.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/async-replace.js',
    'lit/directives/cache.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/cache.js',
    'lit/directives/class-map.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/class-map.js',
    'lit/directives/guard.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/guard.js',
    'lit/directives/if-defined.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/if-defined.js',
    'lit/directives/live.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/live.js',
    'lit/directives/ref.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/ref.js',
    'lit/directives/repeat.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/repeat.js',
    'lit/directives/style-map.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/style-map.js',
    'lit/directives/template-content.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/template-content.js',
    'lit/directives/unsafe-html.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/unsafe-html.js',
    'lit/directives/unsafe-svg.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/unsafe-svg.js',
    'lit/directives/until.js': 'https://ga.jspm.io/npm:lit@2.0.2/directives/until.js',
    'lit/experimental-hydrate-support.js': 'https://ga.jspm.io/npm:lit@2.0.2/experimental-hydrate-support.js',
    'lit/experimental-hydrate.js': 'https://ga.jspm.io/npm:lit@2.0.2/experimental-hydrate.js',
    'lit/html.js': 'https://ga.jspm.io/npm:lit@2.0.2/html.js',
    'lit/polyfill-support.js': 'https://ga.jspm.io/npm:lit@2.0.2/polyfill-support.js',
    'lit/static-html.js': 'https://ga.jspm.io/npm:lit@2.0.2/static-html.js',

    'marked': 'https://ga.jspm.io/npm:marked@4.0.8/lib/marked.esm.js',
    'prismjs': 'https://ga.jspm.io/npm:prismjs@1.25.0/prism.js',
    '@popperjs/core': 'https://ga.jspm.io/npm:@popperjs/core@2.11.5/dist/umd/popper.js',
    'pwa-helpers': 'https://ga.jspm.io/npm:pwa-helpers@0.9.1/pwa-helpers.js',
    'pwa-helpers/router.js': 'https://ga.jspm.io/npm:pwa-helpers@0.9.1/router.js',

    '@patternfly/pfe-core': '/core/core/core.js',
    '@patternfly/pfe-core/decorators.js': '/core/core/decorators.js',
    '@patternfly/pfe-core/decorators/': '/core/core/decorators/',
    '@patternfly/pfe-core/': '/core/core/',
    '@patternfly/pfe-tools/environment.js': '/tools/environment.js',

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
      '@lit/reactive-element': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/reactive-element.js',
      '@lit/reactive-element/decorators/custom-element.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/custom-element.js',
      '@lit/reactive-element/decorators/event-options.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/event-options.js',
      '@lit/reactive-element/decorators/property.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/property.js',
      '@lit/reactive-element/decorators/query-all.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/query-all.js',
      '@lit/reactive-element/decorators/query-assigned-nodes.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/query-assigned-nodes.js',
      '@lit/reactive-element/decorators/query-async.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/query-async.js',
      '@lit/reactive-element/decorators/query.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/query.js',
      '@lit/reactive-element/decorators/state.js': 'https://ga.jspm.io/npm:@lit/reactive-element@1.0.2/development/decorators/state.js',
      'lit-element/experimental-hydrate-support.js': 'https://ga.jspm.io/npm:lit-element@3.0.2/development/experimental-hydrate-support.js',
      'lit-element/lit-element.js': 'https://ga.jspm.io/npm:lit-element@3.0.2/development/lit-element.js',
      'lit-html': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/lit-html.js',
      'lit-html/async-directive.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/async-directive.js',
      'lit-html/directive-helpers.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directive-helpers.js',
      'lit-html/directive.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directive.js',
      'lit-html/directives/async-append.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/async-append.js',
      'lit-html/directives/async-replace.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/async-replace.js',
      'lit-html/directives/cache.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/cache.js',
      'lit-html/directives/class-map.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/class-map.js',
      'lit-html/directives/guard.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/guard.js',
      'lit-html/directives/if-defined.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/if-defined.js',
      'lit-html/directives/live.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/live.js',
      'lit-html/directives/ref.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/ref.js',
      'lit-html/directives/repeat.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/repeat.js',
      'lit-html/directives/style-map.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/style-map.js',
      'lit-html/directives/template-content.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/template-content.js',
      'lit-html/directives/unsafe-html.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/unsafe-html.js',
      'lit-html/directives/unsafe-svg.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/unsafe-svg.js',
      'lit-html/directives/until.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/directives/until.js',
      'lit-html/experimental-hydrate.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/experimental-hydrate.js',
      'lit-html/static.js': 'https://ga.jspm.io/npm:lit-html@2.0.2/development/static.js'
    }
  }
};
