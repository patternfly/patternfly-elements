#!/usr/bin/env node
/* eslint-env node */
import { build } from 'esbuild';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import Glob from 'glob';
import CleanCSS from 'clean-css';

const glob = promisify(Glob);

const resolveDir = join(fileURLToPath(import.meta.url), '../../elements');
const entryPoints = (await glob('./pf-*/pf-*.ts', { cwd: resolveDir })).map(x => x.replace('.ts', '.js'));
const contents = entryPoints.map(x => `export * from '${x}';`).join('\n');

const cleanCSS = new CleanCSS({
  sourceMap: true,
  returnPromise: true,
});

export async function bundle() {
  await build({
    stdin: {
      contents,
      loader: 'ts',
      resolveDir,
    },
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
}

if (process.argv.at(1) === import.meta.url) {
  try {
    await bundle();
  } catch {
    process.exit(1);
  }
}
