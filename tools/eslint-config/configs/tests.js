import globals from 'globals';
import tseslint from 'typescript-eslint';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import jsdoc from 'eslint-plugin-jsdoc';

import { States } from '../lib.js';

export default [
  {
    /** These files contain mocha tests */
    files: [
      '**/*.@(test,spec).[jt]s',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      }
    },
    rules: {
      'max-len': States.OFF,
      'no-console': States.OFF,
      'no-invalid-this': States.OFF,
      'jsdoc/require-jsdoc': States.OFF,
      'noOnlyTests/no-only-tests': States.ERROR,
    },
    plugins: {
      noOnlyTests,
      jsdoc,
    }
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': States.OFF,
    },
  },
];
