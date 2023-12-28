import type { Plugin } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';
import type { Context, Next } from 'koa';

import { fileURLToPath } from 'node:url';

import rollupReplace from '@rollup/plugin-replace';

import { litCss, type LitCSSOptions } from 'web-dev-server-plugin-lit-css';
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';

import { getPfeConfig, type PfeConfig } from '../config.js';
import { importMapGeneratorPlugin, type Options as ImportMapOptions } from './plugins/import-map-generator.js';

import { pfeDevServerPlugin } from './plugins/pfe-dev-server.js';

const replace = fromRollup(rollupReplace);

type BaseConfig = DevServerConfig & PfeConfig;
export interface PfeDevServerConfigOptions extends BaseConfig {
  hostname?: string;
  litcssOptions?: LitCSSOptions;
  tsconfig?: string;
  /** Extra dev server plugins */
  loadDemo?: boolean;
  plugins?: Plugin[];
  watchFiles?: string;
  importMapOptions?: ImportMapOptions;
}

function normalizeOptions(options?: PfeDevServerConfigOptions) {
  const config: PfeDevServerConfigOptions = {
    ...getPfeConfig(),
    ...options ?? {},
  };
  /**
   * Plain case: this file is running from `/node_modules/@patternfly/pfe-tools`.
   *             two dirs up from here is `node_modules`, so we just shear it clean off the path string
   * Other case: this file is running in the `patternfly/patternfly-elements` monorepo
   *             two dirs up from here is the project root. There is no `/node_modules$` to replace,
   *             so we get the correct path
   * Edge/Corner cases: all other cases must set the `rootDir` option themselves so as to avoid 404s
   */
  config.rootDir = options?.rootDir ?? fileURLToPath(new URL('../../..', import.meta.url))
    .replace(/node_modules\/$/, '/')
    .replace(/\/node_modules$/, '/')
    .replace('//', '/');
  config.importMapOptions ??= {} as PfeDevServerConfigOptions['importMapOptions'];
  config.importMapOptions!.providers ??= {};
  config.site = { ...config.site, ...options?.site ?? {} };
  config.loadDemo ??= true;
  config.watchFiles ??= '{elements,core}/**/*.{css,html}';
  config.litcssOptions ??= {
    include: /\.css$/,
    exclude: /(((fonts|demo)|(demo\/.*))\.css$)|(.*(-lightdom.css$))/
  };
  return config as Required<PfeDevServerConfigOptions> & { site: Required<PfeConfig['site']> };
}

/** CORS middleware */
function cors(ctx: Context, next: Next) {
  ctx.set('Access-Control-Allow-Origin', '*');
  return next();
}

async function cacheBusterMiddleware(ctx: Context, next: Next) {
  await next();
  if (ctx.path.match(/elements\/[\w-]+\/[\w-]+.js$/)) {
    const lm = new Date().toString();
    const etag = Date.now().toString();
    ctx.response.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    ctx.response.set('Pragma', 'no-cache');
    ctx.response.set('Last-Modified', lm);
    ctx.response.etag = etag;
  }
}

/**
 * Creates a default config for PFE's dev server.
 */
export function pfeDevServerConfig(options?: PfeDevServerConfigOptions): DevServerConfig {
  const config = normalizeOptions(options);

  const tsconfig = config?.tsconfig;

  return {
    ...options ?? {},

    rootDir: config.rootDir,

    middleware: [
      cors,
      cacheBusterMiddleware,
      ...config?.middleware ?? [],
    ],

    plugins: [
      // Dev server app which loads component demo files
      pfeDevServerPlugin(config),

      // serve typescript sources as javascript
      esbuildPlugin({
        ts: true,
        tsconfig,
      }),

      replace({
        'preventAssignment': true,
        'process.env.NODE_ENV': '"production"',
      }),

      // load .css files as lit CSSResult modules
      litCss(config.litcssOptions),

      importMapGeneratorPlugin({
        ...config.importMapOptions,
        providers: {
          'construct-style-sheets-polyfill': 'nodemodules',
          'element-internals-polyfill': 'nodemodules',
          'lit-html': 'nodemodules',
          'lit': 'nodemodules',
          '@lit/reactive-element': 'nodemodules',
          ...config.importMapOptions?.providers,
        },
        resolveHtmlUrl(fileUrl, rootUrl) {
          const override = config.importMapOptions.resolveHtmlUrl?.(fileUrl, rootUrl);
          if (override) {
            return override;
          } else {
            console.log(fileUrl);
            const fromRoot = fileUrl.replace(rootUrl, '');
            return fileUrl.replace('/components/', '/elements/pf-');
          }
        },
      }),

      ...config?.plugins ?? [],

    ],
  };
}
