import type { Plugin } from '@web/dev-server-core';
import type { DevServerConfig } from '@web/dev-server';
import type { InjectSetting } from '@web/dev-server-import-maps/dist/importMapsPlugin';

import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

import litcssRollup from 'rollup-plugin-lit-css';
import rollupReplace from '@rollup/plugin-replace';

import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { transformSass } from './esbuild.js';

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

/**
 * Binds data from the node context to the dev-server's browser context.
 * exposed data is available by importing `@patternfly/pfe-tools/environment.js`.
 */
function bindNodeDataToBrowser(options?: PfeDevServerConfigOptions): Plugin {
  const { rootDir = process.cwd() } = options ?? {};
  return {
    name: 'bind-node-data-to-browser',
    async transform(context) {
      if (context.path.endsWith('pfe-tools/environment.js')) {
        // TODO: calculate export names from npm workspaces
        //       for now, `elements` is the only conventionally-supported workspace
        const elements = await readdir(join(rootDir, 'elements'));
        const core = await readdir(join(rootDir, 'core'));
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

/**
 * Creates a default config for PFE's dev server.
 */
export function pfeDevServerConfig(options?: PfeDevServerConfigOptions): DevServerConfig {
  /**
   * Plain case: this file is running from `/node_modules/@patternfly/pfe-tools`.
   *             two dirs up from here is `node_modules`, so we just shear it clean off the path string
   * Other case: this file is running in the `patternfly/patternfly-elements` monorepo
   *             two dirs up from here is the project root. There is no `/node_modules$` to replace,
   *             so we get the correct path
   * Edge/Corner cases: all other cases must set the `rootDir` option themselves so as to avoid 404s
   */
  const rootDir = options?.rootDir ?? fileURLToPath(new URL('../..', import.meta.url))
    .replace(/\/node_modules$/, '');

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
    appIndex: 'index.html',

    nodeResolve: {
      exportConditions: ['esbuild', 'import', 'default'],
      extensions: ['.ts', '.mjs', '.js', '.scss'],
    },

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
      scssMimeType(),
      importMapsPlugin({ inject: { importMap: { imports } } }),
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
      })
    ],
  };
}
