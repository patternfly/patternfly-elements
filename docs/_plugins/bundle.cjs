/* eslint-env node */
const esbuild = require('esbuild');

const { join } = require('path');
const { readdir } = require('fs/promises');
const { litCssPlugin } = require('esbuild-plugin-lit-css');

module.exports = {
  async bundle() {
    const cwd = process.cwd();
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

    const { packageVersion } = await import('@patternfly/pfe-tools/esbuild-plugins/package-version.js');
    const { transformSass } = await import('@patternfly/pfe-tools/esbuild.js');

    await esbuild.build({
      entryPoints: ['docs/demo/bundle.ts'],
      outdir: 'docs',

      format: 'esm',
      target: 'es2020',

      allowOverwrite: true,
      bundle: true,
      write: true,
      treeShaking: true,
      sourcemap: true,
      minify: !!process.env.CI,

      logLevel: 'info',

      legalComments: 'linked',

      conditions: ['esbuild'],

      plugins: [
        // import scss files as LitElement CSSResult objects
        litCssPlugin({ filter: /.scss$/, transform: transformSass }),
        pfeEnvPlugin({ cwd }),
        // replace `{{version}}` with each package's version
        packageVersion(),
      ],
    }).catch(() => void 0);
  },
};
