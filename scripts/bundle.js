#!/usr/bin/env node
/* eslint-env node */
import { build } from 'esbuild';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { glob } from 'glob';
import CleanCSS from 'clean-css';

const resolveDir = join(fileURLToPath(import.meta.url), '../../elements');
const files = await glob('./pf-*/pf-*.ts', { cwd: resolveDir });
const contents = files
  .filter(x => !x.endsWith('.d.ts'))
  .map(x => `export * from '@patternfly/elements/${x.replace('.ts', '.js')}';`).join('\n');

const cleanCSS = new CleanCSS({
  sourceMap: true,
  returnPromise: true,
});

export async function bundle({
  outfile = 'elements/pfe.min.js',
} = {}) {
  await build({
    stdin: {
      contents,
      loader: 'ts',
      resolveDir,
    },
    format: 'esm',
    outfile,
    allowOverwrite: true,
    treeShaking: true,
    legalComments: 'linked',
    logLevel: 'info',
    sourcemap: true,
    bundle: true,
    minify: true,
    minifyWhitespace: true,

    external: [
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
}

if (process.argv.at(1) === import.meta.url) {
  try {
    await bundle();
  } catch {
    process.exit(1);
  }
}
