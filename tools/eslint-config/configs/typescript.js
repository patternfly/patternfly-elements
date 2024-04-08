import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

import { States } from '../lib.js';

const typescriptConfig = {
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    unicorn,
    jsdoc,
  },
};

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    ...typescriptConfig,
    rules: {
      'jsdoc/valid-jsdoc': States.OFF,
      'space-infix-ops': States.OFF,
      'no-invalid-this': States.OFF,

      '@typescript-eslint/space-infix-ops': States.ERROR,
      '@typescript-eslint/type-annotation-spacing': States.ERROR,
      '@typescript-eslint/no-invalid-this': [States.ERROR],
      '@typescript-eslint/no-explicit-any': [States.WARNING, {
        ignoreRestArgs: true,
      }],
      '@typescript-eslint/no-unused-vars': [States.WARNING, {
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/ban-ts-comment': [States.WARNING, {
        'ts-expect-error': 'allow-with-description',
      }],
      '@typescript-eslint/member-delimiter-style': [States.ERROR, {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      }],
    },
  }
);
