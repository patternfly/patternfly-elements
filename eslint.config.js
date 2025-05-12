import { States } from '@patternfly/eslint-config-elements';

import tseslint from 'typescript-eslint';
import pfe from '@patternfly/eslint-config-elements';
import pfePlugin from '@patternfly/eslint-plugin-elements';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';

export default tseslint.config(
  ...pfe,
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  {
    name: 'local/ignores',
    ignores: [
      'elements/pf-icon/demo/icons/**/*.js',
      'tools/create-element/templates/**/*',
      'tools/create-element/**/*.js',
      'tools/create-element/templates/**/*',
    ],
  },
  {
    name: 'local/elements/package.json',
    files: ['elements/package.json'],
    plugins: { '@patternfly/elements': pfePlugin },
    rules: {
      '@patternfly/elements/no-missing-package-exports': [States.ERROR, {
        matches: ['elements/*/pf-*.js'],
      }],
    },
  },
  {
    name: 'local/tools/create-element',
    files: [
      'tools/create-element/**/*.ts',
    ],
    rules: {
      'no-console': States.OFF,
    },
  },
);

