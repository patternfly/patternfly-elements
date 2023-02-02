import type { GenerateElementOptions } from '../generate.js';

import Case from 'case';
import Chalk from 'chalk';
import prompts from 'prompts';
import { $ } from 'execa';

import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import * as path from 'node:path';

import { exists, mkdirp, processTemplate, readFile, writeFile } from './files.js';
import { memoize } from './fp.js';

const { blue, green, greenBright, red, yellow } = Chalk;

const __dirname = dirname(fileURLToPath(import.meta.url));

const $$ = $({ stderr: 'inherit' });

/**
* Available filenames.
*
* To add a new file to the element template,
* 1. Add a key to this enum
* 2. Add the template file's path to `TEMPLATE_FILE_PATHS`
* 3. Add the output path to `getFilePathsRelativeToPackageDir`, interpolating as needed.
*/
enum FileKey {
  component = 'component',
  demo = 'demo',
  demoCss = 'demoCss',
  demoScript = 'demoScript',
  docs = 'docs',
  readme = 'readme',
  style = 'style',
  test = 'test',
  e2e = 'e2e',
}

enum InterpolationKey {
  /** e.g. 'PfeJazzHands' */
  className = 'className',
  /** import specifier for the element style e.g. './rh-jazz-hands.css' */
  cssRelativePath = 'cssRelativePath',
  /** The package's NPM package name. e.g. '@patternfly/pf-jazz-hands' */
  packageName = 'packageName',
  /** The import specifier used to import the element */
  importSpecifier = 'importSpecifier',
  /** e.g. 'Jazz Hands' */
  readmeName = 'readmeName',
  /** e.g. 'pf-jazz-hands' */
  tagName = 'tagName',
  /** e.g. 'pf' */
  tagPrefix = 'tagPrefix',
}

/** Available interpolation keys */
type Interpolations = Record<InterpolationKey, string>;

/** Get output files */
const getFilePathsRelativeToPackageDir =
  memoize((options: GenerateElementOptions): Record<FileKey, string> => ({
    component: `${options.tagName}.ts`,
    demo: `demo/${options.tagName}.html`,
    demoCss: `demo/demo.css`,
    demoScript: `demo/${options.tagName}.js`,
    docs: `docs/${options.tagName}.md`,
    readme: 'README.md',
    style: `${options.tagName}.${options.css === 'postcss' ? '.postcss.css' : options.css}`,
    test: `test/${options.tagName}.spec.ts`,
    e2e: `test/${options.tagName}.e2e.ts`,
  }));

/** e.g. elements/pf-jazz-hands */
const getComponentPathFromDirectoryOption =
  memoize((options: GenerateElementOptions): string =>
    join('elements', options.tagName));

/** e.g. /Users/alj/Developer/jazz-elements/elements/pf-jazz-hands */
const getComponentAbsPath =
  memoize((options: GenerateElementOptions): string =>
    join(options.directory, getComponentPathFromDirectoryOption(options)));

/** Get template interpolation data from options */
const getInterpolations =
  memoize((options: GenerateElementOptions): Interpolations => {
    const { tagName, packageName } = options;
    const [, tagPrefix] = tagName.match(/^(\w+)-(.*)/) ?? [];
    const className = Case.pascal(options.tagName);
    const readmeName = Case.title(options.tagName.replace(/^\w+-(.*)/, '$1'));
    const cssRelativePath = `./${options.css === 'postcss' ? `${tagName}.postcss.css` : `${tagName}.${options.css}`}`;
    const importSpecifier = `${packageName}/${tagName}/${tagName}.js`;
    return {
      className,
      cssRelativePath,
      importSpecifier,
      packageName,
      readmeName,
      tagName,
      tagPrefix,
    };
  });

/** e.g. /Users/alj/Developer/jazz-elements/elements/pf-jazz-hands/pf-jazz-hands.ts */
const getOutputFilePath =
  (key: FileKey, options: GenerateElementOptions): string =>
    join(getComponentAbsPath(options), getFilePathsRelativeToPackageDir(options)[key]);

async function shouldWriteToDir(options: GenerateElementOptions): Promise<boolean> {
  if (options.overwrite || !await exists(getComponentAbsPath(options))) {
    return true;
  } else if (!options?.directory) {
    return false;
  } else {
    const { overwrite = false } = await prompts([{
      type: 'confirm',
      name: 'overwrite',
      initial: options.overwrite,
      message: `Directory ${getComponentPathFromDirectoryOption(options)} exists. Overwrite?`,
    }]);
    return overwrite;
  }
}

async function getTemplate(key: FileKey, options: GenerateElementOptions): Promise<string> {
  const TEMPLATE_DIR = join(__dirname, '..', 'templates', 'element');
  const TEMPLATE_FILE_PATHS = getFilePathsRelativeToPackageDir({ ...options, tagName: 'element' });
  return await readFile(join(TEMPLATE_DIR, TEMPLATE_FILE_PATHS[key]), 'utf8');
}

async function writeComponentFile(key: FileKey, options: GenerateElementOptions) {
  const PATH = getOutputFilePath(key, options);
  const TEMPLATE = await getTemplate(key, options);
  const DATA = getInterpolations(options);
  const OUTPUT = processTemplate(TEMPLATE, DATA);

  // $ mkdir -p PATH
  await mkdirp(dirname(PATH));

  await writeFile(PATH, OUTPUT, 'utf-8');

  if (!options.silent) {
    console.log(`  ✏️  ${green(relative(options.directory, PATH))}`);
  }
}

async function getElementPackageJsonPath(options: GenerateElementOptions) {
  const abspath = getComponentAbsPath(options);
  const { root } = path.parse(abspath);
  let packageJsonPath;
  let currentdir = abspath;
  while (currentdir !== root && !packageJsonPath) {
    const possible = join(currentdir, 'package.json');
    if (await exists(possible)) {
      packageJsonPath = possible;
    } else {
      currentdir = dirname(currentdir);
    }
  }
  return packageJsonPath;
}

export class PackageJSONError extends Error {}

/**
 * Generate an Element
 */
export async function generateElement(options: GenerateElementOptions): Promise<void> {
  const log = (...args: unknown[]) => void (!options?.silent && console.log(...args));
  const start = performance.now();
  if (!options || !options.tagName) {
    // ctrl-c
    return;
  } else if (!await exists(join(options.directory, 'package.json'))) {
    // Quit if trying to scaffold an element in an uninitialized non-monorepo
    throw new PackageJSONError('‼️ No package.json found. � Scaffold a repository first');
  } else if (!await shouldWriteToDir(options)) {
    return log(red`Skipping`, 'file write!');
  } else {
    const packageJsonPath = await getElementPackageJsonPath(options) ?? './**/package.json ./package.json';
    if (!await exists(packageJsonPath)) {
      throw new PackageJSONError(`Could not find package at ${packageJsonPath}`);
    }
    log(`\nCreating ${green(options.tagName)} in ${getComponentPathFromDirectoryOption(options)}\n`);
    log(blue`Writing`, 'files...');
    // $ mkdir -p /Users/alj/jazz-elements/elements/pf-jazz-hands
    await mkdirp(getComponentAbsPath(options));
    for (const key of Object.keys(FileKey).sort() as FileKey[]) {
      await writeComponentFile(key, options);
    }
    log(blue`Linting`, `${relative(options.directory, packageJsonPath)} for package exports...`);
    await $$`npx eslint ${packageJsonPath} --fix`;
    log(blue`Analyzing`, 'elements...');
    await $$`npm run analyze`;
    const end = performance.now();
    const seconds = (end - start) / 1000;
    log(`\n${greenBright`Done`} in ${yellow(seconds.toFixed(2))} seconds`);
  }
}
