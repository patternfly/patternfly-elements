import parser from 'jsonc-eslint-parser';
import jsonc from 'eslint-plugin-jsonc';
import jsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import stylistic from '@stylistic/eslint-plugin-js';

import { States } from '../lib.js';

export default [
  {
    name: '@patternfly/elements/json',
    files: [
      '*.json',
      '**/*.json',
      '*.json5',
      '**/*.json5',
      '*.jsonc',
      '**/*.jsonc',
    ],
    languageOptions: {
      parser,
    },
    plugins: {
      jsonc,
      'json-schema-validator': jsonSchemaValidator,
      '@stylistic/js': stylistic,
    },
    rules: {
      '@stylistic/js/max-len': States.OFF,

      // TODO: re-enable when it's possible to filter by key
      // 'jsonc/array-bracket-newline': [States.ERROR, { multiline: true, minItems: 2 }],
      // 'jsonc/object-curly-newline': [States.WARNING, { multiline: false, minProperties: 2, consistent: false }],
      'jsonc/no-bigint-literals': States.ERROR,
      'jsonc/no-binary-expression': States.ERROR,
      'jsonc/no-binary-numeric-literals': States.ERROR,
      'jsonc/no-dupe-keys': States.ERROR,
      'jsonc/no-escape-sequence-in-identifier': States.ERROR,
      'jsonc/no-floating-decimal': States.ERROR,
      'jsonc/no-hexadecimal-numeric-literals': States.ERROR,
      'jsonc/no-infinity': States.ERROR,
      'jsonc/no-multi-str': States.ERROR,
      'jsonc/no-nan': States.ERROR,
      'jsonc/no-number-props': States.ERROR,
      'jsonc/no-numeric-separators': States.ERROR,
      'jsonc/no-octal-numeric-literals': States.ERROR,
      'jsonc/no-octal': States.ERROR,
      'jsonc/no-parenthesized': States.ERROR,
      'jsonc/no-plus-sign': States.ERROR,
      'jsonc/no-regexp-literals': States.ERROR,
      'jsonc/no-sparse-arrays': States.ERROR,
      'jsonc/no-template-literals': States.ERROR,
      'jsonc/no-undefined-value': States.ERROR,
      'jsonc/no-unicode-codepoint-escapes': States.ERROR,
      'jsonc/no-useless-escape': States.ERROR,
      'jsonc/quote-props': States.ERROR,
      'jsonc/quotes': States.ERROR,
      'jsonc/space-unary-ops': States.ERROR,
      'jsonc/valid-json-number': States.ERROR,
      'jsonc/vue-custom-block/no-parsing-error': States.ERROR,
      'jsonc/comma-dangle': States.ERROR,
      'jsonc/auto': States.ERROR,
      'jsonc/object-curly-spacing': [States.ERROR, States.ALWAYS],
      'jsonc/object-property-newline': [States.ERROR, {
        allowAllPropertiesOnSameLine: true,
      }],
      'jsonc/sort-keys': [States.ERROR, {
        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$|^compilerOptions.paths$',
        order: {
          type: 'asc',
        },
      }],

      'json-schema-validator/no-invalid': [States.ERROR, {
        useSchemastoreCatalog: true,
        schemas: [
          {
            fileMatch: ['**/tsconfig.json', '**/tsconfig.*.json'],
            schema: 'https://json.schemastore.org/tsconfig.json',
          },
          {
            fileMatch: ['**/package.json'],
            schema: 'https://json.schemastore.org/package.json',
          },
        ],
      }],

      'strict': States.OFF,
      'no-unused-expressions': States.OFF,
      'no-unused-vars': States.OFF,

    },
  },
];
