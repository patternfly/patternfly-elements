import globals from 'globals';

export default [
  {
    name: '@patternfly/elements/node',
    /** These files run in a nodejs context, mostly config files */
    files: [
      '*.cjs.js',
      '*.cjs',
      '.babelrc.js',
      'commitlint.config.?([cm])js',
      'karma.conf.?([cm])js',
      'postcss.config.?([cm])js',
      'rollup.config.?([cm])js',
      'web-*.config.?([cm])js',
      'workbox-config.?([cm])js',
      'scripts/build.js',
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    name: '@patternfly/elements/cjs',
    files: ['*.cjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
  },
];
