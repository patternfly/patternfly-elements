import { States } from '@patternfly/eslint-config-elements';

import tseslint from 'typescript-eslint';
import pfe from '@patternfly/eslint-config-elements';
import pfePlugin from '@patternfly/eslint-plugin-elements';

export default tseslint.config(
  ...pfe,
  {
    name: 'local/ignores',
    ignores: [
      '**/*.d.ts',
      '**/*.(spec|e2e).js',
      'elements/**/*.js',
      'core/**/*.js',
      '_site',
      'docs/_data/todos.json',
      'docs/demo.js',
      'docs/pfe.min.js',
      'docs/bundle.js',
      'docs/core',
      'docs/components',
      'tools/create-element/templates/**/*',
      'tools/pfe-tools/*.js',
      'tools/pfe-tools/custom-elements-manifest/*.js',
      'tools/pfe-tools/custom-elements-manifest/**/*.js',
      'tools/pfe-tools/dev-server/*.js',
      'tools/pfe-tools/dev-server/**/*.js',
      'tools/pfe-tools/react/*.js',
      'tools/pfe-tools/react/**/*.js',
      'tools/pfe-tools/test/*.js',
      'tools/pfe-tools/test/**/*.js',
    ],
  },

  {
    name: 'local/elements/package.json',
    files: ['elements/package.json'],
    plugins: { '@patternfly/elements': pfePlugin },
    rules: {
      '@patternfly/elements/no-missing-package-exports': [States.ERROR, {
        matches: ['elements/*/pf-*.js', 'elements/*/Base*.js'],
      }],
    },
  },
  {
    name: 'local/tools/create-element',
    files: [
      'tools/create-element/**/*.js',
    ],
    rules: {
      'no-console': States.OFF,
    },
  },
);

