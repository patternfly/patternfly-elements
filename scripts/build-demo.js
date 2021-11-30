/* eslint-env node */
import esbuild from 'esbuild';
import Sass from 'sass';

import { join } from 'path';
import { readdir } from 'fs/promises';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

export async function buildDemo({ cwd, watch }) {
  const transform = (data, { filePath }) => Sass.renderSync({
    data,
    file: filePath,
    includePaths: [
      join(cwd, 'node_modules'),
    ],
  }).css.toString();

  function pfeEnvPlugin() {
    return {
      name: 'pfe-env',
      setup(build) {
        build.onResolve({ filter: /@patternfly\/pfe-tools\/environment\.js/ }, () => ({
          path: '@patternfly/pfe-tools/environment.js',
          namespace: 'pfe-env',
        }));
        build.onLoad({ filter: /.*/, namespace: 'pfe-env' }, async () => ({
          contents: `
export const elements = ${JSON.stringify(await readdir(join(cwd, 'elements')))};
export const core = ${JSON.stringify(await readdir(join(cwd, 'core')))};
`,
          loader: 'js',
        }));
      },
    };
  }

  await esbuild.build({
    entryPoints: ['docs/demo/bundle.ts', 'docs/demo/demo.ts'],
    outdir: 'docs/demo',

    format: 'esm',
    target: 'es2020',

    watch,

    allowOverwrite: true,
    bundle: true,
    write: true,
    treeShaking: true,
    sourcemap: true,
    minify: false,

    logLevel: 'info',

    legalComments: 'linked',

    conditions: ['esbuild'],

    plugins: [
      // import scss files as LitElement CSSResult objects
      litCssPlugin({ filter: /.scss$/, transform }),
      pfeEnvPlugin({ cwd }),
    ],
  }).catch(() => {});
}
