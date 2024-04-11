import globals from 'globals';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import jsdoc from 'eslint-plugin-jsdoc';

import { States } from '../lib.js';

export default [
  {

    name: '@patternfly/elements/tests',

    /** These files contain mocha tests */
    files: [
      '**/*.test.js',
      '**/*.test.ts',
      '**/*.spec.js',
      '**/*.spec.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    rules: {
      '@stylistic/max-len': States.OFF,
      '@typescript-eslint/no-non-null-assertion': States.OFF,
      'no-console': States.OFF,
      'no-invalid-this': States.OFF,
      'jsdoc/require-jsdoc': States.OFF,
      'no-only-tests/no-only-tests': States.ERROR,
    },
    plugins: {
      'no-only-tests': noOnlyTests,
      jsdoc,
    },
  },
];
