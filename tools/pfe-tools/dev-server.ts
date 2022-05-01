import type { Plugin } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';
import type { InjectSetting } from '@web/dev-server-import-maps/dist/importMapsPlugin';
import type { Context, Next } from 'koa';
import type { LitCSSOptions } from 'web-dev-server-plugin-lit-css';

import 'urlpattern-polyfill';

import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import rollupReplace from '@rollup/plugin-replace';
import nunjucks from 'nunjucks';
import _glob from 'glob';

import { litCss } from 'web-dev-server-plugin-lit-css';
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { transformSass } from './esbuild.js';
import { createRequire } from 'module';
import { promisify } from 'util';

const glob = promisify(_glob);
const require = createRequire(import.meta.url);
const exists = (x: string) => stat(x).then(() => true, () => false);
const replace = fromRollup(rollupReplace);
const env = nunjucks.configure(fileURLToPath(new URL('./demo', import.meta.url)));

export interface PfeDevServerConfigOptions extends DevServerConfig {
  /** Extra dev server plugins */
  loadDemo?: boolean;
  plugins?: Plugin[];
  importMap?: InjectSetting['importMap'];
  hostname?: string;
  watchFiles: string;
  litcssOptions: LitCSSOptions,
  site?: {
    tagPrefix: `${string}-`;
    title: string;
    logoUrl: string;
    githubUrl: string;
    description: string;
  };
}

const SITE_DEFAULTS = {
  title: 'PatternFly Elements',
  logoUrl: '/brand/logo/svg/pfe-icon-white-shaded.svg',
  githubUrl: 'https://github.com/patternfly/patternfly-elements/',
  description: 'PatternFly Elements: A set of community-created web components based on PatternFly design.',
};

/** Prettify a tag name, stripping the prefix and capitalizing the rest */
function prettyTag(tagName: string, prefix: `${string}-` = 'pfe-'): string {
  return tagName
    .replace(prefix, '')
    .toLowerCase()
    .replace(/(?:^|[\s-/])\w/g, x => x.toUpperCase())
    .replace(/-/g, ' ');
}

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

/**
 * Resolves local monorepo package imports. Needed because we consume our own monorepo packages
 */
export function resolveLocalFilesFromTypeScriptSources(options: PfeDevServerConfigOptions): Plugin {
  const rootDir = options.rootDir as string;
  return {
    name: 'resolve-local-monorepo-packages-from-ts-sources',
    async transformImport({ source, context }) {
      const isNodeModule = source.match(/node_modules/) || context.path.match(/node_modules/);
      if (source.endsWith('.ts.js')) {
        // already resolved, but had `.js` appended, probably by export map
        return source.replace('.ts.js', isNodeModule ? '.js' : '.ts');
      } else if (isNodeModule) {
        // don't try to resolve node_modules, they're already resolved
        return;
      } else {
        const resolved = tryToResolve(source, context);
        const absToRoot = resolved.replace(rootDir, '/');
        const replaced = absToRoot.replace(/\.js$/, '.ts');
        const fileExists = await exists(join(rootDir, replaced));
        const final = (fileExists ? replaced : resolved);
        return final;
      }
    },
  };
}

/**
 * Renders the demo page for a given url
 */
async function renderURL(ctx: Context, env: nunjucks.Environment, pattern: URLPattern, options?: PfeDevServerConfigOptions): Promise<string> {
  const url = new URL(ctx.request.url, `http://${ctx.request.headers.host}`);
  const { rootDir = process.cwd() } = options ?? {};
  const { element } = pattern.exec(url)?.pathname?.groups ?? {};
  const base = element?.match(/^pfe-(core|sass|styles)$/) ? 'core' : 'elements';
  const basePath = element && join(rootDir, base, element, 'demo');
  const demoPath = basePath && join(basePath, `${element}.html`);
  return env.render('index.njk', {
    ...SITE_DEFAULTS,
    ...options?.site,
    core: await readdir(join(rootDir, 'core')).catch(() => []),
    context: ctx,
    demo: demoPath && await readFile(demoPath, 'utf-8'),
    element,
    elements: await readdir(join(rootDir, 'elements')).catch(() => []),
    manifest: basePath && (await exists(join(basePath, '..', 'custom-elements.json')) ? `/${base}/${element}/custom-elements.json` : '/custom-elements.json'),
    title: element ? `${prettyTag(element, options?.site?.tagPrefix)} | ${options?.site?.title ?? 'PatternFly Elements'}` : (options?.site?.title ?? SITE_DEFAULTS.title),
    script: basePath && await readFile(join(basePath, `${element}.js`), 'utf-8'),
  });
}

/**
 * Generate HTML for each component by adding it's demo to a
 * Declarative Shadow DOM template.
 * @see https://web.dev/declarative-shadow-dom/
 * Watch repository source files and reload the page when they change
 */
function pfeDevServerPlugin(options?: PfeDevServerConfigOptions): Plugin {
  const pattern = new URLPattern({ pathname: '/demo/:element/' });
  const env = nunjucks.configure(fileURLToPath(new URL('./demo', import.meta.url)));
  env.addFilter('prettyTag', x => prettyTag(x, options?.site?.tagPrefix));

  return {
    name: 'pfe-dev-server',
    async serverStart({ fileWatcher, app }) {
      /** Render the demo page */
      app.use(async function nunjucksMiddleware(ctx, next) {
        if ((options?.loadDemo ?? true) && !(ctx.method !== 'HEAD' && ctx.method !== 'GET' || ctx.path.includes('.'))) {
          ctx.type = 'html';
          ctx.status = 200;
          ctx.body = await renderURL(ctx, env, pattern, options);
        }
        return next();
      });

      const files = await glob(options?.watchFiles ?? '{elements,core}/**/*.{ts,js,css,scss,html}', { cwd: process.cwd() });
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

/**
 * Creates a default config for PFE's dev server.
 */
export function pfeDevServerConfig(_options?: PfeDevServerConfigOptions): DevServerConfig {
  const { importMap, site, ...options } = _options ?? {} as PfeDevServerConfigOptions;

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

      ...importMap ? [importMapsPlugin({ inject: { importMap } })] : [],

      // ordinarily, the packages' export conditions specify to
      //   1. import the root from a '.js'
      //   2. append '.js' to any subpath imports
      // that's great when we're importing *actual* node_modules, since we want the build artifacts
      // but when we're importing a monorepo package, we want to load up the typescript sources
      // that's the whole idea of 'buildless' via esbuild plugin - no need to run a file watcher
      // so we run this cheap hack to manually resolve those file paths
      // we hope it will work in most cases. If you have a problem loading from packages in the dev
      // server, please open an issue at https://github.com/patternfly/patternfly-elements/issues/new/
      resolveLocalFilesFromTypeScriptSources({ ...options, rootDir }),

      // serve typescript sources as javascript
      esbuildPlugin({
        ts: true,
        // see https://github.com/evanw/esbuild/issues/2220
        target: 'es2020'
      }),

      // load .scss files as lit CSSResult modules
      litCss(options?.litcssOptions ?? { include: ['**/*.scss'], transform: transformSass }),

      replace({
        'preventAssignment': true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),

      // Dev server app which loads component demo files
      pfeDevServerPlugin(options),
    ],
  };
}
