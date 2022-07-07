import type { Plugin } from 'esbuild';
import type { Meta as LitCSSModuleMeta } from '@pwrs/lit-css';
import type { LitCSSOptions } from 'esbuild-plugin-lit-css';

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
import { readdir, readFile, stat } from 'fs/promises';

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
  mode?: 'development' | 'production';
  /** Packages to treat as external, i.e. not to bundle */
  external: string[];
}

export interface PfeEsbuildSingleFileOptions {
  /** list of NPM package names to bundle alongside the repo's components */
  additionalPackages?: string[];
  /** String contents of an entry point file for all elements to be bundled. Defaults to an entry point containing all installed pfe-* elements. */
  componentsEntryPointContents?: string;
  outfile?: string;
  litCssOptions?: LitCSSOptions;
  plugins?: Plugin[];
  minify?: boolean;
  external?: string[];
}

export interface PfeBasePluginOptions {
  minify?: boolean,
  litCssOptions?: LitCSSOptions;
}

/** best guess at abs-path to repo root */
const REPO_ROOT = fileURLToPath(new URL('../..', import.meta.url)).replace(/node_modules\/$/, '');

/** abs-path to root node_modules */
const NODE_MODULES = join(REPO_ROOT, 'node_modules/');

/** memoization cache for temporary component entrypoint files */
const COMPONENT_ENTRYPOINTS_CACHE = new Map();

const cleanCSS = new CleanCSS({
  sourceMap: true,
  returnPromise: true,
});

/**
 * Exclude SASS-only packages because there are no ts sources there
 */
const ALWAYS_EXCLUDE = [
  'pfe-sass',
  'pfe-styles',
];

const exists = (filePath: string) => stat(filePath).then(() => true, () => false);

/** lit-css transform plugin to process `.scss` files on-the-fly */
export async function transformSass(
  source: string,
  { filePath, minify }: LitCSSModuleMeta & { minify?: boolean }
): Promise<string> {
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

/**
 * The basic set of plugins that all esbuild jobs should apply
 * - Transform (and optionally minify) SCSS
 * - optionally minify HTML
 * - replace the package version in component sources
 */
export function getBasePlugins({ minify, litCssOptions }: PfeBasePluginOptions = {}) {
  return [
    // import scss files as LitElement CSSResult objects
    litCssPlugin(litCssOptions ?? {
      filter: /\.scss$/,
      transform: (source, { filePath }) =>
        transformSass(source, { filePath, minify }),
    }),
    ...!minify ? [] : [
      // minify lit-html templates
      minifyHTMLLiteralsPlugin(),
    ],
    // replace `{{version}}` with each package's version
    packageVersion(),
  ];
}

/** Generate a temporary file containing namespace exports of all pfe components */
export async function componentsEntryPoint(options?: { additionalPackages?: string[] }) {
  const componentDirs = (await readdir(join(REPO_ROOT, 'node_modules', '@patternfly')).catch(() => [] as string[]))
    .filter((x: string) => x.startsWith('pfe'))
    .filter((x: string) => !x.match(/pfe-(core|styles|sass|tools)$/));

  const cacheKey = componentDirs.join('--');

  const additionalImports =
    options?.additionalPackages
      ?.reduce((acc, specifier) => `${acc}\nexport * from '${specifier}';`, '') ?? '';

  if (!cacheKey) {
    return additionalImports;
  }

  if (!COMPONENT_ENTRYPOINTS_CACHE.get(cacheKey)) {
    try {
      const imports = await componentDirs.reduce(async (last, dir) => {
        const acc = await last;
        const elementPath = join(REPO_ROOT, 'elements', dir);
        const packageJsonPath = join(elementPath, 'package.json');
        if (!await exists(packageJsonPath)) {
          return acc;
        } else {
          const { name } = JSON.parse(await readFile(packageJsonPath, 'utf8'));
          return `${acc}\nexport * from '${name}';`;
        }
      }, Promise.resolve(additionalImports));

      COMPONENT_ENTRYPOINTS_CACHE.set(cacheKey, imports);
      return imports;
    } catch (error) {
      console.error(error);
    }
  }

  return COMPONENT_ENTRYPOINTS_CACHE.get(cacheKey);
}

/** Create a single-file production bundle of all elements */
export async function singleFileBuild(options?: PfeEsbuildSingleFileOptions) {
  try {
    const contents = options?.componentsEntryPointContents ?? await componentsEntryPoint({ additionalPackages: options?.additionalPackages });
    const result = await esbuild.build({
      absWorkingDir: REPO_ROOT,
      allowOverwrite: true,
      bundle: true,
      stdin: {
        contents,
        resolveDir: REPO_ROOT,
        sourcefile: 'components.ts',
        loader: 'ts',
      },
      external: options?.external,
      format: 'esm',
      keepNames: true,
      legalComments: 'linked',
      logLevel: 'info',
      minify: options?.minify ?? true,
      minifyWhitespace: options?.minify ?? true,
      outfile: options?.outfile ?? 'pfe.min.js',
      sourcemap: true,
      treeShaking: true,
      watch: false,
      define: {
        // eslint-disable-next-line no-useless-escape
        'process.env.NODE_ENV': JSON.stringify( 'production' ),
      },
      plugins: [
        ...getBasePlugins(options),
        ...options?.plugins ?? []
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

  /** List of dir names of all packages which should be included in the build */
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

  /**
   * if we're only `--include`ing a single element, prefix the entryNames,
   * in order to build into that element's package
   */
  const entryNames =
    join(...options?.include?.length === 1 ? [options.include[0]] : [], '[dir]', '[name]');

  /** list of paths to package.json files */
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
      define: {
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      },
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
        ...getBasePlugins({ minify: mode === 'production' }),
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
