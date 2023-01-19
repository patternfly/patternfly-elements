import type { Plugin } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';
import type { InjectSetting } from '@web/dev-server-import-maps/dist/importMapsPlugin';
import type { Context, Next } from 'koa';
import type { LitCSSOptions } from 'web-dev-server-plugin-lit-css';
import type { DemoRecord } from './custom-elements-manifest/lib/Manifest.js';
import type { PfeConfig } from './config.js';

import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import rollupReplace from '@rollup/plugin-replace';
import nunjucks from 'nunjucks';
import _glob from 'glob';

import { litCss } from 'web-dev-server-plugin-lit-css';
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { createRequire } from 'module';
import { promisify } from 'node:util';

import Router from '@koa/router';
import { Manifest } from './custom-elements-manifest/lib/Manifest.js';
import { makeDemoEnv } from './esbuild-plugins/pfe-env.js';
import { getPfeConfig, deslugify } from './config.js';

const glob = promisify(_glob);
const require = createRequire(import.meta.url);
const replace = fromRollup(rollupReplace);

const env = nunjucks
  .configure(fileURLToPath(new URL('./dev-server', import.meta.url)))
  .addFilter('log', x => (console.log(x, '')))
  .addFilter('isElementGroup', (group: DemoRecord[], primary) =>
    group.every(x => !!primary && x.primaryElementName === primary));

type Base = (DevServerConfig & PfeConfig);

export interface PfeDevServerConfigOptions extends Base {
  hostname?: string;
  importMap?: InjectSetting['importMap'];
  litcssOptions?: LitCSSOptions,
  tsconfig?: string;
  /** Extra dev server plugins */
  loadDemo?: boolean;
  plugins?: Plugin[];
  watchFiles?: string;
}

type PfeDevServerInternalConfig = Required<PfeDevServerConfigOptions> & { site: Required<PfeConfig['site']> };

/** Ugly, ugly hack to resolve packages from the local monorepo */
function tryToResolve(source: string, context: import('koa').Context) {
  let resolved = '';
  try {
    resolved = require.resolve(source);
  } catch (error) {
    const { message } = error as Error;
    // try not to look
    if (message.startsWith('Cannot find module')) {
      const [, resolved] = /Cannot find module '(.*)'/.exec(message) ?? [];
      if (!resolved) {
        throw error;
      }
    } else {
      throw error;
    }
  }

  // e.g., a relative path from a file deeper in the module graph
  // `context.path` here is the abspath to the importee
  if (!resolved) {
    resolved = join(dirname(context.path), source);
  }

  return resolved;
}

function renderBasic(context: Context, demos: unknown[], options: PfeDevServerConfigOptions) {
  return env.render('index.html', { context, options, demos });
}

/**
 * Renders the demo page for a given url
 */
async function renderURL(context: Context, options: PfeDevServerInternalConfig): Promise<string> {
  const url = new URL(context.request.url, `http://${context.request.headers.host}`);
  const manifests = Manifest.getAll(options.rootDir);
  const demos = manifests
    .flatMap(manifest => manifest.getTagNames()
      .flatMap(tagName => manifest.getDemoMetadata(tagName, options as PfeDevServerInternalConfig)));
  const demo = demos.find(x => x.permalink === url.pathname);
  const manifest = demo?.manifest;

  if (!manifest || !demo || !demo.filePath || !existsSync(demo.filePath)) {
    return renderBasic(context, demos, options);
  } else {
    const templateContent = await readFile(demo.filePath, 'utf8');
    return env.render('index.html', { context, options, demo, demos, templateContent, manifest });
  }
}

/**
 * Generate HTML for each component by rendering a nunjucks template
 * Watch repository source files and reload the page when they change
 */
function pfeDevServerPlugin(options: PfeDevServerInternalConfig): Plugin {
  return {
    name: 'pfe-dev-server',
    async serverStart({ fileWatcher, app }) {
      app.use(new Router()
        .get('/elements/:tagName/:fileName.js', async ctx => {
          return ctx.redirect(`/elements/${ctx.params.tagName}/${ctx.params.fileName}.ts`);
        })
        .get('/tools/pfe-tools/environment.js(.js)?', async ctx => {
          ctx.body = await makeDemoEnv(options.rootDir);
          ctx.type = 'application/javascript';
        })
        // redirect /components/jazz-hands/pfe-timestep/index.html to /elements/pfe-jazz-hands/demo/pfe-timestep.html
        // redirect /components/jazz-hands/index.html to /elements/pfe-jazz-hands/demo/pfe-jazz-hands.html
        .get('/components/:slug/demo/:sub?/:fileName', (ctx, next) => {
          const { slug, fileName } = ctx.params;
          if (fileName.includes('.')) {
            const tagName = deslugify(slug, options.rootDir);
            const redir = `/elements/${tagName}/demo/${fileName === 'index.html' ? tagName : fileName}`;
            ctx.redirect(redir);
          }
          return next();
        })
        // redirect /components/jazz-hands/pfe-jazz-hands-lightdom.css to /elements/pfe-jazz-hands/pfe-jazz-hands-lightdom.css
        // redirect /components/jazz-hands/demo/demo.css to /elements/pfe-jazz-hands/demo/demo.css
        .get('/components/:slug/demo/:sub?/:fileName.css', (ctx, next) => {
          // FIXME: will probably break if one component links to another's lightdom css.
          //        better to find out why it's requesting from /components/ in the first place
          const { slug, fileName } = ctx.params;
          const tagName = deslugify(slug);
          let redir = `/elements/${tagName}/demo/${fileName}.css`;
          if (fileName.includes('-lightdom')) {
            redir = `/elements/${tagName}/${fileName}.css`;
          }
          if (tagName) {
            return ctx.redirect(redir);
          }
          return next();
        })
        .routes());

      // Render the demo page whenever there's a trailing slash
      app.use(async function nunjucksMiddleware(ctx, next) {
        const { method, path } = ctx;
        if (options.loadDemo && !(method !== 'HEAD' && method !== 'GET' || path.includes('.'))) {
          ctx.cwd = process.cwd();
          ctx.type = 'html';
          ctx.status = 200;
          ctx.body = await renderURL(ctx, options);
        }
        return next();
      });

      const files = await glob(options.watchFiles, { cwd: process.cwd() });
      for (const file of files) {
        fileWatcher.add(file);
      }
    }
  };
}

/** CORS middleware */
function cors(ctx: Context, next: Next) {
  ctx.set('Access-Control-Allow-Origin', '*');
  return next();
}

function normalizeOptions(options?: PfeDevServerConfigOptions): PfeDevServerInternalConfig {
  const config = { ...getPfeConfig(), ...options ?? {} };
  config.site = { ...config.site, ...options?.site ?? {} };
  config.loadDemo ??= true;
  config.watchFiles ??= '{elements,core}/**/*.{css,html}';
  config.litcssOptions ??= { include: /\.css$/, exclude: /((fonts|demo)|(demo\/.*))\.css$/ };
  return config as PfeDevServerInternalConfig;
}

/**
 * Creates a default config for PFE's dev server.
 */
export function pfeDevServerConfig(options?: PfeDevServerConfigOptions): DevServerConfig {
  const config = normalizeOptions(options);

  /**
   * Plain case: this file is running from `/node_modules/@patternfly/pfe-tools`.
   *             two dirs up from here is `node_modules`, so we just shear it clean off the path string
   * Other case: this file is running in the `patternfly/patternfly-elements` monorepo
   *             two dirs up from here is the project root. There is no `/node_modules$` to replace,
   *             so we get the correct path
   * Edge/Corner cases: all other cases must set the `rootDir` option themselves so as to avoid 404s
   */
  const rootDir = options?.rootDir ?? fileURLToPath(new URL('../..', import.meta.url))
    .replace(/node_modules\/$/, '/')
    .replace(/\/node_modules$/, '/')
    .replace('//', '/');

  const tsconfig = options?.tsconfig;

  return {
    rootDir,

    nodeResolve: true,

    ...options ?? {},

    middleware: [
      cors,
      ...options?.middleware ?? [],
    ],

    plugins: [
      ...options?.plugins ?? [],

      ...options?.importMap ? [importMapsPlugin({ inject: { importMap: options.importMap } })] : [],

      // serve typescript sources as javascript
      esbuildPlugin({
        ts: true,
        tsconfig,
      }),

      replace({
        'process.env.NODE_ENV': '"production"',
      }),

      // load .css files as lit CSSResult modules
      litCss(config.litcssOptions),

      // Dev server app which loads component demo files
      pfeDevServerPlugin(config),
    ],
  };
}
