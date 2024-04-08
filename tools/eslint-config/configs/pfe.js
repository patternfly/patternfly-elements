import globals from 'globals';
import litA11y from 'eslint-plugin-lit-a11y';
import pfe from '@patternfly/eslint-plugin-elements';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc'

import { States } from '../lib.js';

export default [
  {

    ignores: [
      '.wireit',
      'custom-elements.json',
      'package-lock.json',
      'node_modules',
      '**/node_modules/**/*',
    ],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      'lit-a11y': litA11y,
      jsdoc,
      pfe,
      unicorn,
    },

    rules: {

      'no-cond-assign': States.OFF,
      'no-irregular-whitespace': States.ERROR,
      'no-unexpected-multiline': States.ERROR,
      'jsdoc/valid-jsdoc': [
        States.ERROR,
        {
          requireParamDescription: false,
          requireReturnDescription: false,
          requireReturn: false,
          prefer: {
            returns: 'return'
          }
        }
      ],
      'guard-for-in': States.ERROR,
      'no-caller': States.ERROR,
      'no-extra-bind': States.ERROR,
      'no-invalid-this': States.ERROR,
      'no-multi-spaces': States.ERROR,
      'no-multi-str': States.ERROR,
      'no-new-wrappers': States.ERROR,
      'no-throw-literal': States.ERROR,
      'no-with': States.ERROR,
      'array-bracket-newline': States.OFF,
      'array-bracket-spacing': [ States.ERROR, 'never' ],
      'array-element-newline': States.OFF,
      'camelcase': [ States.ERROR, { properties: 'never' } ],
      'computed-property-spacing': States.ERROR,
      'eol-last': States.ERROR,
      'func-call-spacing': States.ERROR,

      'key-spacing': States.ERROR,
      'keyword-spacing': States.ERROR,

      'no-array-constructor': States.ERROR,
      'no-mixed-spaces-and-tabs': States.ERROR,
      'no-multiple-empty-lines': [ States.ERROR, { max: 2 } ],
      "no-new-object": States.ERROR,
      'no-tabs': States.ERROR,
      'no-trailing-spaces': States.ERROR,
      'one-var': [
        States.ERROR,
        {
          'var': States.NEVER,
          'let': States.NEVER,
          'const': States.NEVER
        }
      ],
      'padded-blocks': [ States.ERROR, States.NEVER ],
      'quote-props': [ States.ERROR, 'consistent' ],
      'quotes': [
        States.ERROR,
        'single',
        {
          'allowTemplateLiterals': true
        }
      ],
      'semi': States.ERROR,
      'semi-spacing': States.ERROR,
      'space-before-blocks': States.ERROR,
      'spaced-comment': [ States.ERROR, States.ALWAYS ],
      'switch-colon-spacing': States.ERROR,
      'constructor-super': States.ERROR,
      'generator-star-spacing': [ States.ERROR, 'after' ],
      'no-new-symbol': States.ERROR,
      'no-this-before-super': States.ERROR,
      'prefer-rest-params': States.ERROR,
      'rest-spread-spacing': States.ERROR,
      'yield-star-spacing': [ States.ERROR, 'after' ],

      // brevity
      'arrow-parens': [States.ERROR, 'as-needed'],
      // brevity
      'brace-style': [States.ERROR, '1tbs', { allowSingleLine: false }],
      // clarity
      'block-spacing': [States.ERROR, States.ALWAYS],

      // git diffs
      'comma-dangle': [States.ERROR, {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: States.IGNORE,
      }],

      'comma-spacing': States.ERROR,
      'comma-style': [States.ERROR, 'last'],
      'curly': [States.ERROR, 'all'],
      'eqeqeq': [States.ERROR, States.ALWAYS, { null: States.IGNORE }],

      'indent': [States.ERROR, 2, {
        CallExpression: { arguments: 2 },
        FunctionDeclaration: {
          body: 1,
          parameters: 2,
        },
        FunctionExpression: {
          body: 1,
          parameters: 2,
        },
        MemberExpression: 2,
        ObjectExpression: 1,
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

      'linebreak-style': [States.ERROR, 'unix'],
      'lines-between-class-members': [States.ERROR, States.ALWAYS, { exceptAfterSingleLine: true }],

      'max-len': [States.ERROR, 100, {
        tabWidth: 2,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignorePattern: '^import (type )?\\{? ?\\w+ ?\\}? from \'(.*)\';$',
        ignoreUrls: true,
      }],

      'new-cap': States.OFF,

      'no-unused-vars': [States.WARNING, { ignoreRestSiblings: true }],
      'no-var': States.ERROR,
      'no-console': States.ERROR,
      'no-extend-native': States.ERROR,

      'object-curly-spacing': [States.ERROR, States.ALWAYS],

      'operator-linebreak': [States.ERROR, 'after', {
        overrides: {
          '?': 'after',
          ':': 'before'
        }
      }],

      'prefer-const': States.ERROR,
      'prefer-destructuring': States.ERROR,
      'prefer-object-spread': States.ERROR,
      'prefer-promise-reject-errors': States.OFF,
      'prefer-spread': States.ERROR,
      'prefer-template': States.ERROR,

      'jsdoc/require-jsdoc': States.OFF,

      'jsdoc/valid-jsdoc': States.OFF,

      'spaced-comment': [States.ERROR, States.ALWAYS, { markers: ['/'] }],
      'space-before-function-paren': [
        States.ERROR,
        {
          asyncArrow:States.ALWAYS,
          anonymous: States.NEVER,
          named: States.NEVER,
        }
      ],
      'space-infix-ops': States.ERROR,
      'space-unary-ops': States.ERROR,

      'template-tag-spacing': States.ERROR,
      'template-curly-spacing': States.ERROR,

      'unicorn/no-for-loop': States.ERROR,
      'unicorn/no-instanceof-array': States.ERROR,
      'unicorn/prefer-add-event-listener': States.ERROR,
      'unicorn/prefer-array-flat-map': States.ERROR,
      'unicorn/prefer-array-flat': States.ERROR,
      'unicorn/prefer-array-some': States.ERROR,
      'unicorn/prefer-includes': States.ERROR,
      'unicorn/prefer-keyboard-event-key': States.ERROR,
      'unicorn/prefer-modern-dom-apis': States.ERROR,
      'unicorn/prefer-object-from-entries': States.ERROR,

      'pfe/no-lit-decorators-index-import': States.ERROR,
    },
  },
  {
    files: ['*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
];
