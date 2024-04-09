import tseslint from 'typescript-eslint';
import { States } from '../lib.js';

import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config({
  name: '@patternfly/elements/typescript',
  files: ['**/*.ts', '**/*.mts', '**/*.cts'],
  extends: [
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    tseslint.configs.eslintRecommended,
  ],
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/member-delimiter-style': [States.ERROR, {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }],
    '@stylistic/space-infix-ops': States.ERROR,
    '@stylistic/type-annotation-spacing': States.ERROR,

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
  },
});

