#!/usr/bin/env node
import { build } from 'esbuild';

import CleanCSS from 'clean-css';

import { litCssPlugin } from 'esbuild-plugin-lit-css';

const cleanCSS = new CleanCSS({
  sourceMap: true,
  returnPromise: true,
});

await build({
  entryPoints: ['elements/pfe.ts'],
  format: 'esm',
  outfile: 'elements/pfe.min.js',
  allowOverwrite: true,
  treeShaking: true,
  legalComments: 'linked',
  logLevel: 'info',
  sourcemap: true,
  bundle: true,
  minify: true,
  minifyWhitespace: true,

  external: [
    '@patternfly*',
    'lit',
    'tslib',
    '@floating-ui*'
  ],

  plugins: [
    litCssPlugin({
      filter: /\.css$/,
      transform: source => cleanCSS.minify(source).then(x => x.styles)
    }),
  ],
});


