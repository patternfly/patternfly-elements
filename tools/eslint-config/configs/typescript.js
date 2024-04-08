import parser from '@typescript-eslint/parser';

import typescript from '@typescript-eslint/eslint-plugin';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

import { States, compat } from '../lib.js';

const typescriptConfig = {
  files: ['**/*.ts'],
  languageOptions: {
    parser,
  },
  plugins: {
    typescript,
    unicorn,
    jsdoc,
  },
  rules: {
    'jsdoc/valid-jsdoc': States.OFF,
    'space-infix-ops': States.OFF,
    'no-invalid-this': States.OFF,

    'typescript/space-infix-ops': States.ERROR,
    'typescript/type-annotation-spacing': States.ERROR,
    'typescript/no-invalid-this': [States.ERROR],
    'typescript/no-explicit-any': [States.WARNING, {
      ignoreRestArgs: true,
    }],
    'typescript/no-unused-vars': [States.WARNING, {
      ignoreRestSiblings: true,
    }],
    'typescript/ban-ts-comment': [States.WARNING, {
      'ts-expect-error': 'allow-with-description',
    }],
    'typescript/member-delimiter-style': [States.ERROR, {
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
};

export default [
  typescriptConfig,
  ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ).map(x => ({ ...x, ...typescriptConfig })),
]
