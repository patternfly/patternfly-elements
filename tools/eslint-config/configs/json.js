import jsonc from 'eslint-plugin-jsonc';
import jsonSchemaValidator from 'eslint-plugin-json-schema-validator';

import { States, compat } from '../lib.js';

const jsonConfig = {
  files: [
    '**/*.json',
    '!**/package-lock.json'
  ],
  plugins: { jsonc, jsonSchemaValidator },
  rules: {
    'max-len': States.OFF,
    'comma-dangle': States.OFF,
    'jsonc/comma-dangle': States.ERROR,
    'jsonc/object-curly-spacing': [States.ERROR, States.ALWAYS],
    // TODO: re-enable when it's possible to filter by key
    // 'jsonc/array-bracket-newline': [States.ERROR, { multiline: true, minItems: 2 }],
    // 'jsonc/object-curly-newline': [States.WARNING, { multiline: false, minProperties: 2, consistent: false }],
    'jsonc/object-property-newline': [States.ERROR, { allowAllPropertiesOnSameLine: true }],
    'jsonc/sort-keys': [States.ERROR, { pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$|^compilerOptions\.paths$', order: { type: 'asc' } }],
    'jsonSchemaValidator/no-invalid': [States.ERROR, {
      useSchemastoreCatalog: true,
      schemas: [
        {
          fileMatch: [
            '**/tsconfig.json',
            '**/tsconfig.*.json',
          ],
          schema: 'https://json.schemastore.org/tsconfig.json'
        },
        {
          fileMatch: ['**/package.json'],
          schema: 'https://json.schemastore.org/package.json'
        },
      ],
    }],
  },
};

export default [
  {
    files: ['./elements/package.json'],
    plugins: { jsonc },
    rules: {
      '@patternfly/elements/no-missing-package-exports': [States.ERROR, {
        matches: ['elements/*/pf-*.js', 'elements/*/Base*.js'],
      }],
    },
  },
  ...compat.extends('plugin:jsonc/recommended-with-jsonc')
    .map(x => ({...x, ...jsonConfig}))
];
