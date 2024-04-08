import html from 'eslint-plugin-html';

export default [
  {
    files: [
      'elements/**/*.html',
      'elements/**/*.md',
      'docs/**/*.njk',
    ],

    plugins: {
      html,
    },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    }
  }
]
