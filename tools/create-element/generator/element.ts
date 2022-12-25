import type { GenerateElementOptions } from '../main';
import type { CompilerOptions, ProjectReference } from 'typescript';

import Case from 'case';
import Chalk from 'chalk';
import prompts from 'prompts';
import { execa, execaCommand } from 'execa';

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
  docs = 'docs',
  package = 'package',
  readme = 'readme',
  style = 'style',
  test = 'test',
  e2e = 'e2e',
  tsconfig = 'tsconfig',
}

enum InterpolationKey {
  /** e.g. 'PfeJazzHands' */
  className = 'className',
  /** e.g. 'jazz-hands' */
  scssName = 'scssName',
  /** import specifier for the element style e.g. './rh-jazz-hands.css' */
  cssRelativePath = 'cssRelativePath',
  /** The package's NPM package name. e.g. '@patternfly/pfe-jazz-hands' */
  packageName = 'packageName',
  /** The import specifier used to import the element */
  importSpecifier = 'importSpecifier',
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

function isMonorepoFileKey(key: FileKey): boolean {
  switch (key) {
    case FileKey.package:
    case FileKey.cemConfig:
    case FileKey.tsconfig:
      return true;
    default:
      return false;
  }
}

/** Get output files */
const getFilePathsRelativeToPackageDir =
  memoize((options: GenerateElementOptions): Record<FileKey, string> => ({
    cemConfig: 'custom-elements-manifest.config.js',
    component: `${options.tagName}.ts`,
    demo: `demo/${options.tagName}.html`,
    demoCss: `demo/demo.css`,
    demoScript: `demo/${options.tagName}.js`,
    docs: `docs/${options.tagName}.md`,
    package: 'package.json',
    readme: 'README.md',
    style: `${options.tagName}.${options.css === 'postcss' ? '.postcss.css' : options.css}`,
    test: `test/${options.tagName}.spec.ts`,
    e2e: `test/${options.tagName}.e2e.spec.ts`,
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
  scope ? `@${scope.replace(/^(@+)([-.\w]+)\/?$/, '$2')}/` : '';

/** Get template interpolation data from options */
const getInterpolations =
  memoize((options: GenerateElementOptions): Interpolations => {
    const { tagName } = options;
    const [, tagPrefix, scssName] = tagName.match(/^(\w+)-(.*)/) ?? [];
    const className = Case.pascal(options.tagName);
    const readmeName = Case.title(options.tagName.replace(/^\w+-(.*)/, '$1'));
    const scope = !options.scope ? '' : normalizeScope(options.scope);
    const packageName = `${scope}${tagName}`;
    const cssRelativePath = `./${options.css === 'postcss' ? `${tagName}.postcss.css` : `${tagName}.${options.css}`}`;
    const importSpecifier = options.monorepo ? packageName : `@rhds/elements/${tagName}/${tagName}.js`;
    return {
      className,
      scssName,
      cssRelativePath,
      importSpecifier,
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
  if (!options.monorepo && isMonorepoFileKey(key)) {
    return;
  }

  const PATH = getOutputFilePath(key, options);
  const TEMPLATE = await getTemplate(key, options);
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

  const monorepoArgs = !options.monorepo ? [] : ['--prefix', getComponentAbsPath(options)];

  const { stderr, stdout } =
    await execa('npm', ['run', 'analyze', ...monorepoArgs], {
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

  if (config?.compilerOptions?.paths) {
    config.compilerOptions.paths[packageName] = [`./elements/${tagName}/${tagName}.ts`];
  }

  if (!config.references?.some(x => x.path === `./elements/${tagName}`)) {
    config.references.push({ 'path': `./elements/${tagName}` });
  }

  await writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
  await execaCommand(`npx eslint --fix ${configPath}`);
}

/**
 * Generate an Element
 */
export async function generateElement(options: GenerateElementOptions): Promise<void> {
  // ctrl-c
  if (!options || !options.tagName) {
    return;
  }

  // Quit if trying to scaffold an element in an uninitialized non-monorepo
  if (!await exists(join(options.directory, 'package.json'))) {
    return console.log('‼️ No package.json found.', '� Scaffold a repository first');
  } else {
    await writeElementFiles(options);
    analyzeElement; // skip this for now, come back to fix later
    // await analyzeElement(options);
    if (options.monorepo) {
      await updateTsconfig(options);
      await execaCommand('npm install');
    }
  }
}
