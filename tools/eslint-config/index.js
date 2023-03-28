/* eslint-env node */
// @ts-check
const OFF = 'off';
const WARNING = 'warn';
const ERROR = 'error';

const ALWAYS = 'always';
const NEVER = 'never';
const IGNORE = 'ignore';
/* eslint-enable no-unused-vars, no-multi-spaces */

/** These files run in a nodejs context, mostly config files */
const NODE_FILES = [
  '*.cjs.js',
  '*.cjs',
  '.babelrc.js',
  'commitlint.config.?([cm])js',
  'karma.conf.?([cm])js',
  'postcss.config.?([cm])js',
  'rollup.config.?([cm])js',
  'web-*.config.?([cm])js',
  'workbox-config.?([cm])js',
  'custom-elements-manifest.config.js',
  'scripts/build.js',
];

/** These files contain mocha tests */
const TEST_FILES = [
  '**/*.@(test,spec).[jt]s',
];

const JSON_FILES = [
  '**/*.json',
  '!**/package-lock.json'
];

const TSCONFIG_FILES = [
  '**/tsconfig.json',
  '**/tsconfig.*.json',
];

/** @type{import('eslint').Linter.Config} */
const config = {

  extends: [
    'google',
    'eslint:recommended',
    'plugin:lit-a11y/recommended',
  ],

  env: {
    browser: true,
    es6: true,
  },

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },

  plugins: [
    'html',
    'no-only-tests',
    'lit-a11y',
    '@patternfly/elements'
  ],

  rules: {
    // brevity
    'arrow-parens': [ERROR, 'as-needed'],
    // brevity
    'brace-style': [ERROR, '1tbs', { allowSingleLine: false }],
    // clarity
    'block-spacing': [ERROR, ALWAYS],

    // git diffs
    'comma-dangle': [ERROR, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: IGNORE,
    }],

    'comma-spacing': ERROR,
    'comma-style': [ERROR, 'last'],
    'curly': [ERROR, 'all'],
    'eqeqeq': [ERROR, ALWAYS, { null: IGNORE }],

    'indent': [ERROR, 2, {
      flatTernaryExpressions: true,
      SwitchCase: 1,
      ignoredNodes: [
        `ConditionalExpression`,
        `TaggedTemplateExpression[tag.name="html"] > TemplateLiteral CallExpression > ObjectExpression`,
        `TaggedTemplateExpression[tag.name="html"] > TemplateLiteral ObjectExpression`,
        `TaggedTemplateExpression[tag.name="html"] > TemplateLiteral CallExpression > TaggedTemplateLiteral`,
        `TaggedTemplateExpression[tag.name="html"] > TemplateLiteral ArrowFunctionExpression > BlockStatement`,
      ],
    }],

    'linebreak-style': [ERROR, 'unix'],
    'lines-between-class-members': [ERROR, ALWAYS, { exceptAfterSingleLine: true }],

    'max-len': [ERROR, 100, {
      ignoreComments: true,
      ignoreTemplateLiterals: true,
      ignorePattern: '^import (type )?\\{? ?\\w+ ?\\}? from \'(.*)\';$',
      ignoreUrls: true,
    }],

    'new-cap': OFF,

    'no-unused-vars': [WARNING, { ignoreRestSiblings: true }],
    'no-var': ERROR,
    'no-console': ERROR,
    'no-extend-native': ERROR,

    'no-only-tests/no-only-tests': ERROR,

    'object-curly-spacing': [ERROR, ALWAYS],

    'operator-linebreak': [ERROR, 'after', { 'overrides': { '?': 'after', ':': 'before' } }],

    'prefer-const': ERROR,
    'prefer-destructuring': ERROR,
    'prefer-object-spread': ERROR,
    'prefer-promise-reject-errors': OFF,
    'prefer-spread': ERROR,
    'prefer-template': ERROR,

    'require-jsdoc': OFF,

    'valid-jsdoc': OFF,

    'spaced-comment': [ERROR, ALWAYS, { markers: ['/'] }],
    'space-before-function-paren': [ERROR, { anonymous: NEVER, named: NEVER, asyncArrow: ALWAYS }],
    'space-infix-ops': ERROR,
    'space-unary-ops': ERROR,

    'template-tag-spacing': ERROR,
    'template-curly-spacing': ERROR,

    'unicorn/no-for-loop': ERROR,
    'unicorn/no-instanceof-array': ERROR,
    'unicorn/prefer-add-event-listener': ERROR,
    'unicorn/prefer-array-flat-map': ERROR,
    'unicorn/prefer-array-flat': ERROR,
    'unicorn/prefer-array-some': ERROR,
    'unicorn/prefer-includes': ERROR,
    'unicorn/prefer-keyboard-event-key': ERROR,
    'unicorn/prefer-modern-dom-apis': ERROR,
    'unicorn/prefer-object-from-entries': ERROR,

    '@patternfly/elements/no-lit-decorators-index-import': ERROR,
  },
  overrides: [{
    files: NODE_FILES,
    env: { node: true },
  }, {
    files: ['**/*.ts'],
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'unicorn',
    ],
    extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'valid-jsdoc': OFF,
      'space-infix-ops': OFF,
      '@typescript-eslint/space-infix-ops': ERROR,
      '@typescript-eslint/type-annotation-spacing': ERROR,
      'no-invalid-this': OFF,
      '@typescript-eslint/no-invalid-this': [ERROR],
      '@typescript-eslint/no-explicit-any': [WARNING, {
        ignoreRestArgs: true,
      }],
      '@typescript-eslint/no-unused-vars': [WARNING, {
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/ban-ts-comment': [WARNING, {
        'ts-expect-error': 'allow-with-description',
      }],
      '@typescript-eslint/member-delimiter-style': [ERROR, {
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
  }, {
    files: TEST_FILES,
    env: { node: true, mocha: true },
    rules: {
      'max-len': OFF,
      'no-console': OFF,
      'no-invalid-this': OFF,
      'require-jsdoc': OFF,
    },
  }, {
    files: ['**/*.spec.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': OFF,
    },
  }, {
    files: ['*.mjs'],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  }, {
    files: ['*.cjs'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
    },
    env: { node: true },
  }, {
    files: JSON_FILES,
    plugins: ['jsonc', 'json-schema-validator'],
    extends: ['plugin:jsonc/recommended-with-jsonc'],
    rules: {
      'max-len': OFF,
      'comma-dangle': OFF,
      'jsonc/comma-dangle': ERROR,
      'jsonc/object-curly-spacing': [ERROR, ALWAYS],
      // TODO: re-enable when it's possible to filter by key
      // 'jsonc/array-bracket-newline': [ERROR, { multiline: true, minItems: 2 }],
      // 'jsonc/object-curly-newline': [WARNING, { multiline: false, minProperties: 2, consistent: false }],
      'jsonc/object-property-newline': [ERROR, { allowAllPropertiesOnSameLine: true }],
      'jsonc/sort-keys': [ERROR, { pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$|^compilerOptions\.paths$', order: { type: 'asc' } }],
      'json-schema-validator/no-invalid': [ERROR, {
        useSchemastoreCatalog: true,
        schemas: [
          { fileMatch: TSCONFIG_FILES, schema: 'https://json.schemastore.org/tsconfig.json' },
          { fileMatch: ['**/package.json'], schema: 'https://json.schemastore.org/package.json' },
        ],
      }],
    },
  }, {
    files: ['./elements/package.json'],
    plugins: ['jsonc'],
    rules: {
      '@patternfly/elements/no-missing-package-exports': [ERROR, {
        matches: ['elements/*/pf-*.js', 'elements/*/Base*.js'],
      }],
    },
  }],
};

module.exports = config;
