import type { Plugin } from '@web/dev-server-core';
import type { LitCSSOptions } from 'esbuild-plugin-lit-css';

import esbuild from 'esbuild';
import glob from 'glob';
import Sass from 'sass';

import { externalSubComponents } from './esbuild-plugins/external-sub-components.js';
import { packageVersion } from './esbuild-plugins/package-version.js';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { readdirSync } from 'fs';
import { resolve, join } from 'path';

type Transformer = LitCSSOptions['transform'];

export interface PfeEsbuildOptions {
  /** Extra esbuild plugins */
  plugins?: Plugin[];
  /** repository root (default: process.cwd()) */
  cwd?: string
  /** exclude these directories (under the workspace) from the build */
  entryPointFilesExcludes?: string[];
  /** packages to include */
  include?: string[];
  /** workspace directory from and into which to build elements. (default: `elements`) */
  workspace?: string;
  /** production bundles are minified */
  mode?: 'development'|'production';
  /** Packages to treat as external, i.e. not to bundle */
  external: string[];
}

/**
 * Exclude SASS-only packages because there are no ts sources there
 */
const ALWAYS_EXCLUDE = [
  'pfe-sass',
  'pfe-styles',
];

/**
 * Build all components in a monorepo
 */
export async function pfeBuild(options?: PfeEsbuildOptions) {
  const entryPointFilesExcludes = [...ALWAYS_EXCLUDE, ...options?.entryPointFilesExcludes ?? []];
  const workspace = options?.workspace ?? 'elements';
  const mode = options?.mode ?? 'development';
  const cwd = options?.cwd ?? process.cwd();

  const packageDirs = (
      // includes specified as an array
      Array.isArray(options?.include) ? options?.include as Array<string>
      // includes specified as a string
    : typeof options?.include === 'string' ? [options.include]
      // default: exclude `entryPointFilesExcludes` and get all the dirs in the workspace
    : readdirSync(resolve(workspace), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !entryPointFilesExcludes.includes(dirent.name))
      .flatMap(dirent => dirent.name)
  );

  /**
   * grab all of the directories in the workspace excluding directories
   * in entryPointFilesExcludes and generate an array that gets the
   * TypeScript src files for each element
   */
  const entryPoints = packageDirs.flatMap(dir =>
    glob.sync(`${workspace}/${dir.replace(`${workspace}/${workspace}`, `${workspace}/`)}/**/*.ts`, {
      absolute: true,
      cwd,
      ignore: ['**/*.d.ts', '**/*.spec.ts'],
    }));

  /** if we're only `--include`ing a single element, prefix the entryNames, so tot build into that element's package */
  const entryNames =
    join(...options?.include?.length === 1 ? [options.include[0]] : [], '[dir]', '[name]');

  const packagePath = packageDirs.flatMap(dir =>
    glob.sync(`${workspace}/${dir}/package.json`, { absolute: true, cwd }));

  const transform: Transformer = (data, { filePath }) => Sass.renderSync({
    data,
    file: filePath,
    includePaths: [
      join(options?.cwd ?? process.cwd(), 'node_modules'),
    ],
  }).css.toString();

  try {
    const result = await esbuild.build({
      entryPoints,
      entryNames,
      absWorkingDir: cwd,
      outdir: workspace,
      format: 'esm',
      allowOverwrite: true,
      bundle: true,
      external: ['@patternfly*', 'lit', 'tslib', ...options?.external ?? []],
      treeShaking: true,
      legalComments: 'linked',
      watch: Boolean(process.env.WATCH) || false,
      logLevel: 'info',
      sourcemap: true,

      minify: mode === 'production',
      minifyWhitespace: mode === 'production',

      plugins: [
        // import scss files as LitElement CSSResult objects
        litCssPlugin({ filter: /.scss$/, transform }),
        // replace `{{version}}` with each package's version
        packageVersion(),
        // ignore sub components bundling like "pfe-progress-steps-item"
        externalSubComponents(),
        // don't bundle node_module dependencies
        nodeExternalsPlugin({ packagePath }),
      ],
    });
    result.stop?.();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
