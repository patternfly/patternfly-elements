import globals from 'globals';
import html from 'eslint-plugin-html';

export default [
  {
    name: '@patternfly/elements/html',

    files: [
      '**/*.html',
      '**/*.md',
      '**/*.njk',
    ],

    plugins: {
      html,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
