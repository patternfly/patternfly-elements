import pfe from '@patternfly/eslint-config-elements';

export default [
  ...pfe,
  {
    files: [
      "./tools/create-element/**/*"
    ],
    rules: {
      "no-console": "off"
    }
  },
  {
    ignores: [
      '!.eleventy.cjs',
      '!eleventy.config.js',

      '*.css',
      '*.d.ts',
      '*.ico',
      '*.jpeg',
      '*.jpg',
      '*.map',
      '*.patch',
      '*.png',
      '*.sh',
      '*.spec.js',
      '*.svg',
      '*.toml',
      '*.tsbuildinfo',
      '*.txt',
      '*.yml',
      '*.yaml',
      '*.woff*',

      '_site/**/*',
      'docs/_data/todos.json',
      'docs/demo.js',
      'docs/pfe.min.js',
      'docs/bundle.js',
      'docs/core',
      'docs/components',

      'core/**/*.js',
      'elements/**/*.js',
      'tools/**/*.js',

      '!core/*/demo/*.js',
      '!elements/*/demo/*.js',

      'tools/create-element/templates/**/*',
    ],
  }
];
