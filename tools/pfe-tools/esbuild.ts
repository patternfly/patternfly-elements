import type { Plugin } from '@web/dev-server-core';
import type { Meta as LitCSSModuleMeta } from '@pwrs/lit-css';

import esbuild from 'esbuild';
import glob from 'glob';
import Sass from 'sass';
import CleanCSS from 'clean-css';

import { externalSubComponents } from './esbuild-plugins/external-sub-components.js';
import { packageVersion } from './esbuild-plugins/package-version.js';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

import { minifyHTMLLiteralsPlugin } from 'esbuild-plugin-minify-html-literals';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { readdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

export interface PfeEsbuildOptions {
  /** Extra esbuild plugins */
  plugins?: Plugin[];
  /** Whether to bundle the components and all their dependencies */
  bundle?: boolean;
  /** repository root (default: process.cwd()) */
  cwd?: string;
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

export interface PfeEsbuildSingleFileOptions {
  outfile?: string;
}

const cleanCSS = new CleanCSS({
  sourceMap: true,
  returnPromise: true,
});

/** lit-css transform plugin to process `.scss` files on-the-fly */
export async function transformSass(source: string, { filePath, minify }: LitCSSModuleMeta & { minify?: boolean }): Promise<string> {
  const loadPaths = [dirname(filePath), NODE_MODULES];
  const result = Sass.compileString(source, { loadPaths });
  // TODO: forward sourcemaps by returning an object, would probably need a PR to lit-css
  if (!minify) {
    return result.css;
  } else {
    const { styles } = await cleanCSS.minify(result.css/* , result.sourceMap */);
    return styles;
  }
}

/** abs-path to root node_modules */
const NODE_MODULES = fileURLToPath(new URL('../../node_modules', import.meta.url));

/**
 * Exclude SASS-only packages because there are no ts sources there
 */
const ALWAYS_EXCLUDE = [
  'pfe-sass',
  'pfe-styles',
];

const basePlugins = ({ minify }: { minify?: boolean } = {}) => [
  // import scss files as LitElement CSSResult objects
  litCssPlugin({ filter: /\.scss$/, transform: (source, { filePath }) => transformSass(source, { filePath, minify }) }),
  ...!minify ? [] : [
    // minify lit-html templates
    minifyHTMLLiteralsPlugin(),
  ],
  // replace `{{version}}` with each package's version
  packageVersion(),
];

/** Create a single-file production bundle of all element */
export async function singleFileBuild(options?: PfeEsbuildSingleFileOptions) {
  const cwd = fileURLToPath(new URL('../..', import.meta.url));
  try {
    const result = await esbuild.build({
      absWorkingDir: cwd,
      allowOverwrite: true,
      bundle: true,
      entryPoints: [join(cwd, 'docs', 'demo', 'components.ts')],
      format: 'esm',
      keepNames: true,
      legalComments: 'linked',
      logLevel: 'info',
      minify: true,
      minifyWhitespace: true,
      outfile: options?.outfile ?? 'pfe.min.js',
      sourcemap: true,
      treeShaking: true,
      watch: false,
      plugins: [
        ...basePlugins({ minify: true }),
      ],
    });
    result.stop?.();
    return result.outputFiles?.map(x => x.path) ?? [];
  } catch {
    process.exit(1);
  }
}

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

  try {
    const result = await esbuild.build({
      entryPoints,
      entryNames,
      absWorkingDir: cwd,
      format: 'esm',
      allowOverwrite: true,
      treeShaking: true,
      legalComments: 'linked',
      watch: Boolean(process.env.WATCH) || false,
      logLevel: 'info',
      sourcemap: true,
      bundle: options?.bundle ?? true,

      minify: mode === 'production',
      minifyWhitespace: mode === 'production',

      outdir: workspace,

      external: [
        ...options?.bundle ? [] : [
          '@patternfly*',
          'lit',
          'tslib',
        ],
        ...options?.external ?? []
      ],

      plugins: [
        ...basePlugins({ minify: mode === 'production' }),
        // ignore sub components bundling like "pfe-progress-steps-item"
        externalSubComponents(),
        // don't bundle node_module dependencies
        nodeExternalsPlugin({ packagePath }),
      ],
    });
    result.stop?.();
    return result.outputFiles?.map(x => x.path) ?? [];
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
