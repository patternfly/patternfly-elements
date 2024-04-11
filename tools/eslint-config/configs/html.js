import globals from 'globals';
import html from 'eslint-plugin-html';

export default [
  {
    name: '@patternfly/elements/html',

    files: [
      '**/*.html',
      // These have parsing errors with the current plugin version
      // '**/*.md',
      // '**/*.njk',
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
