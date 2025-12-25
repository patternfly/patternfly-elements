import type { Plugin, Context, Middleware } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';

import { readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import rollupReplace from '@rollup/plugin-replace';

import { litCss, type LitCSSOptions } from 'web-dev-server-plugin-lit-css';
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';

import { getPfeConfig, type PfeConfig } from '../config.js';
import {
  importMapGeneratorPlugin,
  type Options as ImportMapOptions,
} from './plugins/import-map-generator.js';

import { pfeDevServerPlugin } from './plugins/pfe-dev-server.js';
import { join } from 'node:path';

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
    exclude: /(?:@patternfly\/pfe-tools\/dev-server\/(?:fonts|demo).css)|-lightdom(?:-shim)?\.css$/,
  };
  return config as Required<PfeDevServerConfigOptions> & { site: Required<PfeConfig['site']> };
}

/**
 * CORS middleware
 * @param ctx koa context
 * @param next middleware
 */
function cors(ctx: Context, next: () => Promise<any>) {
  ctx.set('Access-Control-Allow-Origin', '*');
  return next();
}

async function cacheBusterMiddleware(ctx: Context, next: () => Promise<any>) {
  await next();
  if (ctx.path.match(/(elements|pfe-core)\/.*\.js$/)) {
    const stats = await stat(join(process.cwd(), ctx.path));
    const mtime = stats.mtime.getTime();
    const etag = `modified-${mtime}`;
    ctx.response.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    ctx.response.set('Pragma', 'no-cache');
    ctx.response.set('Last-Modified', mtime.toString());
    ctx.response.etag = etag;
  }
}

function liveReloadTsChangesMiddleware(
  config: ReturnType<typeof normalizeOptions>,
): Middleware {
  /**
   * capture group 1:
   *   Either config.elementsDir or `pfe-core`
   * `/`
   * **ANY** (_>= 0x_)
   * `.js`
   */
  const TYPESCRIPT_SOURCES_RE = new RegExp(`(${config.elementsDir}|pfe-core)/.*\\.js`);

  return function(ctx, next) {
    if (!ctx.path.includes('node_modules') && ctx.path
        .match(TYPESCRIPT_SOURCES_RE)) {
      ctx.redirect(ctx.path.replace('.js', '.ts'));
    } else {
      return next();
    }
  };
}

/**
 * Creates a default config for PFE's dev server.
 * @param options dev server config
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
      liveReloadTsChangesMiddleware(config),
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
          '@lit/context': 'nodemodules',
          ...config.importMapOptions?.providers,
        },
        resolveHtmlUrl(fileUrl, rootUrl) {
          const override = config.importMapOptions.resolveHtmlUrl?.(fileUrl, rootUrl);
          if (override) {
            return override;
          } else {
            return fileUrl.replace('/components/', '/elements/pf-');
          }
        },
      }),

      ...config?.plugins ?? [],

    ],
  };
}

/**
 * Returns an import map `imports` section containing the entire
 * `@patternfly/icons` collection, pointing to node_modules
 * @param rootUrl repository root
 */
export async function getPatternflyIconNodemodulesImports(
  rootUrl: string,
): Promise<Record<string, string>> {
  const files = await readdir(new URL('./node_modules/@patternfly/icons', rootUrl));
  const dirs = [];

  for (const dir of files) {
    if (!dir.startsWith('.') && (await stat(new URL(`./node_modules/@patternfly/icons/${dir}`, rootUrl))).isDirectory()) {
      dirs.push(dir);
    }
  }

  const specs = await Promise.all(dirs.flatMap(dir =>
    readdir(new URL(`./node_modules/@patternfly/icons/${dir}`, rootUrl))
        .then(files => files.filter(x => x.endsWith('.js')))
        .then(icons => icons.flatMap(icon => `@patternfly/icons/${dir}/${icon}`))
  ));

  return Object.fromEntries(specs.flat().map(spec => [spec, `./node_modules/${spec}`]));
}
