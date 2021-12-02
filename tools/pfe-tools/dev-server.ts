import type { Plugin } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';
import type { InjectSetting } from '@web/dev-server-import-maps/dist/importMapsPlugin';
import type { Meta as LitCSSModuleMeta } from '@pwrs/lit-css';

import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import Sass from 'sass';
import litcssRollup from 'rollup-plugin-lit-css';

import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

export interface PfeDevServerConfigOptions {
  /** Extra dev server plugins */
  plugins?: Plugin[];
  /** repository root (default: process.cwd()) */
  cwd?: string;
  importMap?: InjectSetting['importMap'];
  hostname?: string;
}

const litcss = fromRollup(litcssRollup);

const rootDir = fileURLToPath(new URL('../..', import.meta.url));

// allow for imports in scss from node_modules
const NODE_MODULES = join(rootDir, 'node_modules');

function appendLines(body: string, ...lines: string[]): string {
  return [body, ...lines].join('\n');
}

/**
 * Binds data from the node context to the dev-server's browser context.
 * exposed data is available by importing `@patternfly/pfe-tools/environment.js`.
 */
function bindNodeDataToBrowser(options?: PfeDevServerConfigOptions): Plugin {
  const { cwd = process.cwd() } = options ?? {};
  return {
    name: 'bind-node-data-to-browser',
    async transform(context) {
      if (context.path.endsWith('pfe-tools/environment.js')) {
        const elements = await readdir(join(cwd, 'elements'));
        const core = await readdir(join(cwd, 'core'));
        const transformed = appendLines(
          context.body as string,
          `export const elements = ${JSON.stringify(elements)};`,
          `export const core = ${JSON.stringify(core)};`
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

/** Transform `.scss` sources on-the-fly */
function transform(source: string, { filePath }: LitCSSModuleMeta): string {
  const result = Sass.compileString(source, {
    loadPaths: [dirname(filePath), NODE_MODULES],
  });
  // TODO: forward sourcemaps by returning an object
  return result.css;
}

/**
 * Creates a default config for PFE's dev server.
 */
export function pfeDevServerConfig(options?: PfeDevServerConfigOptions): DevServerConfig {
  const cwd = options?.cwd ?? process.cwd();

  /** Default set of import maps */
  const imports = {
    'lit': '/node_modules/lit/index.js',
    'lit/': '/node_modules/lit/',

    'html-include-element': '/node_modules/html-include-element/html-include-element.js',
    'api-viewer-element': '/node_modules/api-viewer-element/lib/api-viewer.js',
    '@vaadin/split-layout': '/node_modules/@vaadin/split-layout/vaadin-split-layout.js',

    '@patternfly/pfe-tools/': '/node_modules/@patternfly/pfe-tools/',
    '@patternfly/pfe-core': '/node_modules/@patternfly/pfe-core/core.js',
    '@patternfly/pfe-core/': '/node_modules/@patternfly/pfe-core/',
    ...options?.importMap?.imports,
  };

  return {
    ...options?.hostname && { hostname: options?.hostname },
    nodeResolve: {
      exportConditions: ['esbuild', 'import', 'default'],
      extensions: ['.ts', '.mjs', '.js', '.scss'],
    },
    rootDir,
    appIndex: 'index.html',
    ...options ?? {},
    middleware: [
      function rewriteIndex(context, next) {
        context.set('Access-Control-Allow-Origin', '*');
        return next();
      },
    ],
    plugins: [
      ...options?.plugins ?? [],
      scssMimeType(),
      importMapsPlugin({ inject: { importMap: { imports } } }),
      // serve typescript sources as javascript
      esbuildPlugin({ ts: true }),
      // bind data from node to the browser
      // e.g. the file listing of the `elements/` dir
      // so that we can list the elements by name
      bindNodeDataToBrowser({ cwd }),
      // load .scss files as lit CSSResult modules
      litcss({ include: ['**/*.scss'], transform }),
    ],
  };
}
