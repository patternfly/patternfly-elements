import parser from '@typescript-eslint/parser';
import html from 'eslint-plugin-html';

export default [
  {
    files: [
      '**/*.html',
      '**/*.md',
      '**/*.njk',
    ],
    plugins: {
      html,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser,
    }
  }
]
