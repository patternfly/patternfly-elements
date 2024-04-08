import pfe from '@patternfly/eslint-config-elements';

import { States } from '@patternfly/eslint-config-elements';

export default [
  ...pfe,
  {
    files: [
      './tools/create-element/**/*'
    ],
    rules: {
      'no-console': States.OFF,
    }
  },
  {
    ignores: [
      '*.d.ts',
      '*.spec.js',

      '_site',
      'docs/_data/todos.json',
      'docs/demo.js',
      'docs/pfe.min.js',
      'docs/bundle.js',
      'docs/core',
      'docs/components',

      // 'core/**/*.js',
      // 'elements/**/*.js',
      // 'tools/**/*.js',

      'tools/create-element/templates/**/*',

      '!core/*/demo/*.js',
      '!elements/*/demo/*.js',
      '!eleventy.config.js',
    ],
  }
];

