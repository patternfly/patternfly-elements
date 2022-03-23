import type { Plugin } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';
import type { InjectSetting } from '@web/dev-server-import-maps/dist/importMapsPlugin';

import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import litcssRollup from 'rollup-plugin-lit-css';
import rollupReplace from '@rollup/plugin-replace';

import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { transformSass } from './esbuild.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const exists = (x: string) => stat(x).then(() => true, () => false);

export interface PfeDevServerConfigOptions extends DevServerConfig {
  /** Extra dev server plugins */
  plugins?: Plugin[];
  importMap?: InjectSetting['importMap'];
  hostname?: string;
}

const litcss = fromRollup(litcssRollup);
const replace = fromRollup(rollupReplace);

function appendLines(body: string, ...lines: string[]): string {
  return [body, ...lines].join('\n');
}

async function tryRead(pathname: string) {
  return readdir(pathname).catch(() => []);
}

/**
 * Binds data from the node context to the dev-server's browser context.
 * exposed data is available by importing `@patternfly/pfe-tools/environment.js`.
 */
function bindNodeDataToBrowser(options?: PfeDevServerConfigOptions): Plugin {
  const { rootDir = process.cwd() } = options ?? {};
  return {
    name: 'bind-node-data-to-browser',
    async transform(context) {
      if (context.path.match(/pfe-tools\/environment\.(?:j|t)s$/)) {
        // TODO: calculate export names from npm workspaces
        //       for now, `elements` is the only conventionally-supported workspace
        const elements = await tryRead(join(rootDir, 'elements'));
        const core = await tryRead(join(rootDir, 'core'));
        const transformed = appendLines(
          context.body as string,
          `export const elements = ${JSON.stringify(elements)};`,
          `export const core     = ${JSON.stringify(core)};`
        );
        return transformed;
      }
    },
  };
}

function scssMimeType(): Plugin {
  return {
    name: 'scss-mime-type',
    resolveMimeType(context) {
    // ensure .scss files are loaded by the browser as javascript
      if (context.path.endsWith('.scss')) {
        return 'js';
      }
    },
  };
}

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
      // already resolved, but had `.js` appended, probably by export map
      if (source.endsWith('.ts.js')) {
        return source.replace('.ts.js', '.ts');
      // don't try to resolve node_modules, they're already resolved
      } else if (source.match(/node_modules/) || context.path.match(/node_modules/)) {
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
 * Creates a default config for PFE's dev server.
 */
export function pfeDevServerConfig(_options?: PfeDevServerConfigOptions): DevServerConfig {
  const { importMap, ...options } = _options ?? {};

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
    appIndex: 'index.html',

    nodeResolve: true,

    rootDir,

    ...options ?? {},

    middleware: [
      function cors(context, next) {
        context.set('Access-Control-Allow-Origin', '*');
        return next();
      },
      ...options?.middleware ?? [],
    ],

    plugins: [
      ...options?.plugins ?? [],
      ...(importMap) ? [importMapsPlugin({ inject: { importMap } })] : [],
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
      // importMapsPlugin({ inject: { importMap: { imports } } }),
      // serve typescript sources as javascript
      esbuildPlugin({ ts: true }),
      // bind data from node to the browser
      // e.g. the file listing of the `elements/` dir
      // so that we can list the elements by name
      bindNodeDataToBrowser({ rootDir }),
      // load .scss files as lit CSSResult modules
      litcss({ include: ['**/*.scss'], transform: transformSass }),
      replace({
        'preventAssignment': true,
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
      // Ensure .scss files are loaded as js modules, as `litcss` plugin transforms them to such
      scssMimeType()
    ],
  };
}
