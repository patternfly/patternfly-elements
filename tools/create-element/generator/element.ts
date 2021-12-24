import type { GenerateElementOptions } from '../main';
import type { CompilerOptions, ProjectReference } from 'typescript';

import Case from 'case';
import Chalk from 'chalk';
import inquirer from 'inquirer';
import execa from 'execa';

import { fileURLToPath } from 'url';
import { dirname, join, relative } from 'path';

import { exists, mkdirp, processTemplate, readFile, readJson, writeFile } from './files.js';
import { memoize } from './fp.js';

interface Tsconfig {
  compilerOptions: CompilerOptions;
  references: ProjectReference[];
}

const { green, greenBright } = Chalk;

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Available filenames.
 *
 * To add a new file to the element template,
 * 1. Add a key to this enum
 * 2. Add the template file's path to `TEMPLATE_FILE_PATHS`
 * 3. Add the output path to `getFilePathsRelativeToPackageDir`, interpolating as needed.
 */
enum FileKey {
  cemConfig = 'cemConfig',
  component = 'component',
  demo = 'demo',
  demoCss = 'demoCss',
  demoScript = 'demoScript',
  package = 'package',
  readme = 'readme',
  style = 'style',
  test = 'test',
  tsconfig = 'tsconfig',
}

enum InterpolationKey {
  /** e.g. 'PfeJazzHands' */
  className = 'className',
  /** e.g. 'jazz-hands' */
  cssName = 'cssName',
  /** The package's NPM package name. e.g. '@patternfly/pfe-jazz-hands' */
  packageName = 'packageName',
  /** e.g. 'Jazz Hands' */
  readmeName = 'readmeName',
  /** The package's NPM scope name based on user options. e.g. 'patternfly' */
  scope = 'scope',
  /** e.g. 'pfe-jazz-hands' */
  tagName = 'tagName',
  /** e.g. 'pfe' */
  tagPrefix = 'tagPrefix',
}

/** Available interpolation keys */
type Interpolations = Record<InterpolationKey, string>;

/** Input files */
const TEMPLATE_FILE_PATHS: Record<FileKey, string> = {
  cemConfig: 'custom-elements-manifest.config.js',
  component: 'element.ts',
  demo: 'demo/element.html',
  demoCss: 'demo/element.css',
  demoScript: 'demo/element.js',
  package: 'package.json',
  readme: 'README.md',
  style: 'element.scss',
  test: 'test/element.spec.ts',
  tsconfig: 'tsconfig.json',
};

/** Get output files */
const getFilePathsRelativeToPackageDir =
  memoize((options: GenerateElementOptions): Record<FileKey, string> => ({
    cemConfig: 'custom-elements-manifest.config.js',
    component: `${options.tagName}.ts`,
    demo: `demo/${options.tagName}.html`,
    demoCss: `demo/demo.css`,
    demoScript: `demo/${options.tagName}.js`,
    package: 'package.json',
    readme: 'README.md',
    style: `${options.tagName}.scss`,
    test: `test/${options.tagName}.spec.ts`,
    tsconfig: 'tsconfig.json',
  }));

/** e.g. elements/pfe-jazz-hands */
const getComponentPathFromDirectoryOption =
  memoize((options: GenerateElementOptions): string =>
    join('elements', options.tagName));

/** e.g. /Users/alj/Developer/jazz-elements/elements/pfe-jazz-hands */
const getComponentAbsPath =
  memoize((options: GenerateElementOptions): string =>
    join(options.directory, getComponentPathFromDirectoryOption(options)));

/**
 * Returns a 'fully qualified' NPM package scope e.g. `@patternfly/`,
 * whether or not the user provides one as such,
 * or just the scope name e.g. `patternfly`.
 * If no scope is provided, returns the empty string.
 */
const normalizeScope = (scope: string): string =>
  scope ? `@${scope.replace(/^@(.*)\/$/, '$1')}/` : '';

/** Get template interpolation data from options */
const getInterpolations =
  memoize((options: GenerateElementOptions): Interpolations => {
    const { tagName } = options;
    const [, tagPrefix, cssName] = tagName.match(/^(\w+)-(.*)/);
    const className = Case.pascal(options.tagName);
    const readmeName = Case.title(options.tagName.replace(/^\w+-(.*)/, '$1'));
    const scope = !options.scope ? '' : normalizeScope(options.scope);
    const packageName = `${scope}${tagName}`;
    return {
      className,
      cssName,
      packageName,
      readmeName,
      scope,
      tagName,
      tagPrefix,
    };
  });

/** e.g. /Users/alj/Developer/jazz-elements/elements/pfe-jazz-hands/pfe-jazz-hands.ts */
const getOutputFilePath =
  (key: FileKey, options: GenerateElementOptions): string =>
    join(getComponentAbsPath(options), getFilePathsRelativeToPackageDir(options)[key]);

async function shouldWriteToDir(options: GenerateElementOptions): Promise<boolean> {
  if (options.overwrite || !await exists(getComponentAbsPath(options))) {
    return true;
  } else {
    return await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      default: false,
      message: `Directory ${getComponentPathFromDirectoryOption(options)} exists. Overwrite?`,
    }]).then(({ overwrite = false }) => overwrite);
  }
}

async function getTemplate(key: FileKey): Promise<string> {
  const TEMPLATE_DIR = join(__dirname, '..', 'templates', 'element');
  return await readFile(join(TEMPLATE_DIR, TEMPLATE_FILE_PATHS[key]), 'utf8');
}

async function writeComponentFile(key: FileKey, options: GenerateElementOptions) {
  const PATH = getOutputFilePath(key, options);
  const TEMPLATE = await getTemplate(key);
  const DATA = getInterpolations(options);
  const OUTPUT = processTemplate(TEMPLATE, DATA);

  // $ mkdir -p PATH
  await mkdirp(dirname(PATH));

  await writeFile(PATH, OUTPUT, 'utf-8');

  if (!options.silent) {
    console.log(`✏️ Wrote ${green(relative(options.directory, PATH))}`);
  }
}

async function writeElementFiles(options: GenerateElementOptions) {
  if (!await shouldWriteToDir(options)) {
    return;
  }

  if (!options.silent) {
    console.log(`\nCreating ${green(options.tagName)} in ${getComponentPathFromDirectoryOption(options)}\n`);
  }

  // $ mkdir -p /Users/alj/jazz-elements/elements/pfe-jazz-hands
  await mkdirp(getComponentAbsPath(options));

  for (const key of Object.keys(FileKey).sort() as FileKey[]) {
    await writeComponentFile(key, options);
  }

  if (!options.silent) {
    console.log(`\n${greenBright('Done!')}`);
  }
}

async function analyzeElement(options: GenerateElementOptions): Promise<void> {
  if (!options.silent) {
    console.log(`\nAnalyzing ${greenBright(options.tagName)}`);
  }

  const { stderr, stdout } =
    await execa('npm', ['run', 'analyze', '--prefix', getComponentAbsPath(options)], {
      all: true,
      cwd: options.directory,
    });

  if (stderr) {
    console.log(stderr);
    throw new Error(`Could not analyze ${options.tagName}`);
  } else if (!options.silent) {
    console.log(stdout);
  }
}

async function updateTsconfig(options: GenerateElementOptions): Promise<void> {
  const configPath = join(process.cwd(), 'tsconfig.settings.json');
  const { packageName, tagName } = getInterpolations(options);
  const config = await readJson<Tsconfig>(configPath);
  config.compilerOptions.paths[packageName] = [join(`./elements/${tagName}/${tagName}.ts`)];
  if (!config.references.some(x => x.path === `./elements/${tagName}`)) {
    config.references.push({ 'path': `./elements/${tagName}` });
  }
  await writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
  await execa.command(`npx eslint --fix ${configPath}`);
}

/**
 * Generate an Element
 */
export async function generateElement(options: GenerateElementOptions): Promise<void> {
  if (!options) {
    return;
  } // ctrl-c

  // Quit if trying to scaffold an element in an uninitialized non-monorepo
  if (!await exists(join(options.directory, 'package.json'))) {
    return console.log('‼️ No package.json found.', '� Scaffold a repository first');
  } else {
    await writeElementFiles(options);
    await analyzeElement(options);
    await updateTsconfig(options);
  }
}
