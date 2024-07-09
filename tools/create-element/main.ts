import { generateElement, PackageJSONError } from './generator/element.js';

import Chalk from 'chalk';
import Yargs from 'yargs';
import prompts from 'prompts';
import { readJson } from './generator/files.js';
import { join } from 'node:path';

export interface BaseOptions {
  /** Should console output be omitted? */
  silent: boolean;
  directory: string;
  /** Should existing files be overwritten */
  overwrite: boolean;
  /** Which type of CSS files should the generator output? */
  css: 'css' | 'postcss';
}

export interface GenerateElementOptions extends BaseOptions {
  /** The element's tagname e.g. `pf-button` */
  tagName: string;
  /** The NPM package name */
  packageName: string;
}

export type PromptOptions<T> =
  Partial<T> & BaseOptions;

const ERR_BAD_CE_TAG_NAME =
  'Custom element tag names must contain a hyphen (-)';

interface PackageJSON {
  customElements?: string;
  name: string;
  version: string;
  workspaces?: string;
}

/** generated at https://dom111.github.io/image-to-ansi/ */
function banner() {
  // eslint-disable-next-line no-console
  console.log(`\x1b[49m                          \x1b[38;5;87;49m▄\x1b[38;5;87;48;5;87m▄\x1b[38;5;87;49m▄\x1b[49m                          \x1b[m
\x1b[49m                        \x1b[38;5;81;49m▄\x1b[38;5;81;48;5;87m▄▄\x1b[49m \x1b[38;5;81;48;5;87m▄\x1b[38;5;87;48;5;87m▄\x1b[38;5;81;49m▄\x1b[49m                        \x1b[m
\x1b[49m                      \x1b[38;5;81;49m▄\x1b[38;5;81;48;5;81m▄\x1b[49;38;5;81m▀\x1b[38;5;81;48;5;81m▄▄\x1b[49m \x1b[38;5;81;48;5;81m▄▄\x1b[49;38;5;81m▀\x1b[38;5;81;48;5;81m▄\x1b[38;5;81;49m▄\x1b[49m                      \x1b[m
\x1b[49m                    \x1b[38;5;81;49m▄\x1b[38;5;81;48;5;81m▄\x1b[49;38;5;81m▀\x1b[49m \x1b[38;5;81;48;5;81m▄\x1b[49m \x1b[38;5;81;48;5;81m▄\x1b[49m \x1b[38;5;81;48;5;81m▄\x1b[49m \x1b[38;5;81;48;5;81m▄\x1b[49m \x1b[49;38;5;81m▀\x1b[38;5;81;48;5;81m▄\x1b[38;5;81;49m▄\x1b[49m                    \x1b[m
\x1b[49m                  \x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[38;5;81;48;5;81m▄\x1b[49;38;5;81m▀\x1b[49m \x1b[38;5;81;49m▄\x1b[49m  \x1b[38;5;81;48;5;81m▄\x1b[49m \x1b[38;5;81;48;5;81m▄\x1b[49m \x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m \x1b[49;38;5;81m▀\x1b[38;5;81;48;5;81m▄\x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m                  \x1b[m
\x1b[49m                \x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[49m  \x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[49m  \x1b[49;38;5;81m▀\x1b[49m \x1b[49;38;5;81m▀\x1b[49m  \x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m  \x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m                \x1b[m
\x1b[49m              \x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[49m   \x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[49m  \x1b[38;5;81;49m▄\x1b[49m   \x1b[38;5;81;49m▄\x1b[49m  \x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m   \x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m              \x1b[m
\x1b[49m           \x1b[38;5;80;49m▄\x1b[38;5;81;48;5;81m▄\x1b[49;38;5;81m▀\x1b[49m \x1b[38;5;81;49m▄\x1b[49;38;5;81m▀\x1b[49m    \x1b[49;38;5;81m▀\x1b[49m   \x1b[38;5;81;48;5;81m▄\x1b[49m   \x1b[38;5;81;48;5;81m▄\x1b[49m   \x1b[49;38;5;81m▀\x1b[49m    \x1b[49;38;5;81m▀\x1b[38;5;81;49m▄\x1b[49m \x1b[49;38;5;81m▀\x1b[38;5;81;48;5;81m▄\x1b[38;5;81;49m▄\x1b[49m           \x1b[m
\x1b[49m         \x1b[38;5;81;49m▄\x1b[38;5;81;48;5;80m▄\x1b[49;38;5;81m▀\x1b[49m \x1b[38;5;80;49m▄\x1b[49;38;5;81m▀\x1b[49m     \x1b[38;5;81;48;5;81m▄\x1b[49m    \x1b[38;5;80;48;5;81m▄\x1b[49m   \x1b[38;5;80;48;5;81m▄\x1b[49m    \x1b[38;5;80;48;5;81m▄\x1b[49m     \x1b[49;38;5;80m▀\x1b[38;5;80;49m▄\x1b[49m \x1b[49;38;5;81m▀\x1b[38;5;81;48;5;80m▄\x1b[38;5;80;49m▄\x1b[49m         \x1b[m
\x1b[49m       \x1b[38;5;80;49m▄\x1b[38;5;80;48;5;80m▄\x1b[49;38;5;81m▀\x1b[49m \x1b[38;5;74;49m▄\x1b[38;5;74;48;5;81m▄\x1b[49m      \x1b[38;5;80;48;5;80m▄\x1b[49m     \x1b[38;5;80;48;5;80m▄\x1b[49m   \x1b[38;5;80;48;5;80m▄\x1b[49m     \x1b[38;5;80;48;5;80m▄\x1b[49m      \x1b[38;5;80;48;5;80m▄\x1b[38;5;75;49m▄\x1b[49m \x1b[49;38;5;80m▀\x1b[38;5;80;48;5;81m▄\x1b[38;5;80;49m▄\x1b[49m       \x1b[m
\x1b[49m     \x1b[38;5;74;49m▄\x1b[38;5;74;48;5;80m▄\x1b[49;38;5;80m▀\x1b[49m  \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀\x1b[49m      \x1b[38;5;74;48;5;74m▄\x1b[49m      \x1b[38;5;74;48;5;74m▄\x1b[49m   \x1b[38;5;74;48;5;74m▄\x1b[49m      \x1b[38;5;74;48;5;74m▄\x1b[49m      \x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m  \x1b[49;38;5;74m▀\x1b[38;5;74;48;5;80m▄\x1b[38;5;74;49m▄\x1b[49m     \x1b[m
\x1b[49m   \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀▀\x1b[49m    \x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m     \x1b[38;5;74;49m▄\x1b[49m      \x1b[38;5;74;48;5;74m▄\x1b[49m     \x1b[38;5;74;48;5;74m▄\x1b[49m      \x1b[38;5;74;49m▄\x1b[49m     \x1b[38;5;74;49m▄\x1b[49;38;5;75m▀\x1b[49m    \x1b[49;38;5;74m▀▀\x1b[38;5;74;49m▄\x1b[49m   \x1b[m
\x1b[49m \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀▀\x1b[49m        \x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m  \x1b[38;5;74;49m▄\x1b[49m       \x1b[38;5;74;48;5;74m▄\x1b[49m     \x1b[38;5;74;48;5;74m▄\x1b[49m       \x1b[38;5;74;49m▄\x1b[49m  \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀\x1b[49m        \x1b[49;38;5;81m▀\x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m \x1b[m
\x1b[38;5;74;48;5;74m▄\x1b[49;38;5;74m▀\x1b[49m           \x1b[49;38;5;74m▀\x1b[38;5;74;49m▄▄\x1b[49;38;5;74m▀\x1b[49m       \x1b[38;5;74;48;5;74m▄\x1b[49m     \x1b[38;5;74;48;5;74m▄\x1b[49m       \x1b[49;38;5;74m▀\x1b[38;5;74;49m▄▄\x1b[49;38;5;74m▀\x1b[49m            \x1b[38;5;74;48;5;74m▄\x1b[m
\x1b[49m \x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m           \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m       \x1b[38;5;74;48;5;74m▄\x1b[49m     \x1b[38;5;74;48;5;74m▄\x1b[49m       \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀\x1b[38;5;74;49m▄\x1b[49m           \x1b[38;5;74;49m▄\x1b[49;38;5;74m▀\x1b[49m \x1b[m
\x1b[49m  \x1b[49;38;5;38m▀\x1b[38;5;38;49m▄\x1b[49m         \x1b[38;5;38;49m▄\x1b[49;38;5;74m▀\x1b[49m \x1b[49;38;5;74m▀\x1b[38;5;38;49m▄\x1b[49m      \x1b[49;38;5;74m▀\x1b[49m     \x1b[49;38;5;74m▀\x1b[49m      \x1b[38;5;38;49m▄\x1b[49;38;5;74m▀\x1b[49m \x1b[49;38;5;74m▀\x1b[38;5;38;49m▄\x1b[49m         \x1b[38;5;38;49m▄\x1b[49;38;5;74m▀\x1b[49m  \x1b[m
\x1b[49m    \x1b[38;5;38;48;5;38m▄\x1b[49m        \x1b[49;38;5;38m▀\x1b[38;5;38;49m▄\x1b[49m   \x1b[38;5;38;48;5;38m▄\x1b[38;5;38;49m▄\x1b[49m   \x1b[38;5;38;48;5;38m▄\x1b[49m       \x1b[38;5;38;48;5;38m▄\x1b[49m    \x1b[38;5;38;48;5;38m▄\x1b[49m   \x1b[38;5;38;48;5;38m▄\x1b[49;38;5;38m▀\x1b[49m        \x1b[38;5;38;48;5;38m▄\x1b[49m    \x1b[m
\x1b[49m     \x1b[49;38;5;38m▀\x1b[38;5;38;49m▄\x1b[49m        \x1b[49;38;5;38m▀\x1b[38;5;38;49m▄\x1b[49m  \x1b[49;38;5;38m▀\x1b[38;5;38;49m▄\x1b[49m  \x1b[38;5;38;48;5;38m▄\x1b[49m       \x1b[38;5;38;48;5;38m▄\x1b[49m  \x1b[38;5;38;49m▄\x1b[49;38;5;38m▀\x1b[49m  \x1b[38;5;38;49m▄\x1b[49;38;5;38m▀\x1b[49m        \x1b[38;5;38;49m▄\x1b[49;38;5;38m▀\x1b[49m     \x1b[m
\x1b[49m       \x1b[38;5;32;48;5;38m▄\x1b[49m        \x1b[49;38;5;38m▀\x1b[38;5;32;49m▄\x1b[49m   \x1b[38;5;32;48;5;38m▄\x1b[49m \x1b[38;5;32;48;5;32m▄\x1b[49m       \x1b[38;5;32;48;5;32m▄\x1b[49m \x1b[38;5;32;48;5;32m▄\x1b[49m   \x1b[38;5;32;49m▄\x1b[49;38;5;38m▀\x1b[49m        \x1b[38;5;32;48;5;32m▄\x1b[49m       \x1b[m
\x1b[49m        \x1b[49;38;5;32m▀\x1b[38;5;32;49m▄\x1b[49m        \x1b[38;5;32;48;5;32m▄\x1b[49m \x1b[38;5;32;49m▄▄\x1b[38;5;32;48;5;32m▄▄\x1b[49m       \x1b[38;5;32;48;5;32m▄▄\x1b[38;5;32;49m▄▄\x1b[49m \x1b[38;5;32;48;5;32m▄\x1b[49m        \x1b[38;5;32;49m▄\x1b[49;38;5;32m▀\x1b[49m        \x1b[m
\x1b[49m         \x1b[49;38;5;32m▀\x1b[38;5;32;49m▄\x1b[49m \x1b[38;5;32;49m▄▄▄\x1b[49m \x1b[49;38;5;32m▀▀▀▀\x1b[38;5;32;49m▄\x1b[49m   \x1b[38;5;32;48;5;32m▄\x1b[49m     \x1b[38;5;32;49m▄\x1b[49m   \x1b[38;5;32;49m▄\x1b[49;38;5;32m▀▀▀▀\x1b[49m \x1b[38;5;32;49m▄▄▄\x1b[49m \x1b[38;5;32;49m▄\x1b[49;38;5;32m▀\x1b[49m         \x1b[m
\x1b[49m                    \x1b[49;38;5;32m▀\x1b[38;5;32;48;5;32m▄\x1b[49m   \x1b[49;38;5;32m▀\x1b[38;5;32;49m▄\x1b[49m \x1b[38;5;32;49m▄\x1b[49;38;5;32m▀\x1b[49m   \x1b[38;5;32;48;5;32m▄\x1b[49m                     \x1b[m
\x1b[49m                      \x1b[49;38;5;32m▀\x1b[38;5;32;49m▄\x1b[49m  \x1b[49;38;5;32m▀\x1b[38;5;32;49m▄\x1b[49;38;5;32m▀\x1b[49m  \x1b[38;5;32;49m▄\x1b[49;38;5;32m▀\x1b[49m                      \x1b[m
\x1b[49m                       \x1b[49;38;5;32m▀\x1b[38;5;31;49m▄\x1b[49m     \x1b[38;5;31;49m▄\x1b[49;38;5;32m▀\x1b[49m                       \x1b[m
\x1b[49m                         \x1b[49;38;5;31m▀\x1b[49m   \x1b[49;38;5;31m▀\x1b[49m                         \x1b[m
\x1b[49m                          \x1b[49;38;5;31m▀\x1b[38;5;31;49m▄\x1b[49;38;5;31m▀\x1b[49m                          \x1b[m

                   ${Chalk.bold(Chalk.blue('PatternFly Elements'))}`);
}

/**
 * @param options the tag and package names, among others
 */
export async function promptForElementGeneratorOptions(
  options?: PromptOptions<GenerateElementOptions>
): Promise<GenerateElementOptions> {
  banner();

  return {
    ...options,
    ...await prompts([{
      type: () => !options?.tagName && 'text',
      name: 'tagName',
      message: 'What is the element\'s tag name?',
      initial: options?.tagName ?? '',
      validate: name => name.includes('-') || ERR_BAD_CE_TAG_NAME,
    }]),
  } as GenerateElementOptions;
}

const readJsonOrVoid = (path: string) => readJson(path).catch(() => void 0);

async function getDefaultPackageName() {
  return (await readJsonOrVoid(join(
    process.cwd(),
    'elements',
    'package.json',
  )) as PackageJSON)?.name
         ?? (await readJsonOrVoid(join(process.cwd(), 'package.json')) as PackageJSON)?.name ?? '';
}

/**
 * Prompt to generate an element definition
 */
export async function main(): Promise<void> {
  return Promise.resolve(
    (Yargs(process.argv) as Yargs.Argv<GenerateElementOptions>)
        .scriptName('npm init @patternfly/element')
        .usage('$0 [<cmd>] [args]')
        .option('directory', {
          type: 'string',
          default: process.cwd(),
          demandOption: false,
          description: 'Output directory',
        })
        .option('silent', {
          type: 'boolean',
          default: false,
          description: 'Do not log anything to stdout',
        })
        .option('tagName', {
          alias: 'n',
          type: 'string',
          description: 'Custom element tag name. e.g. `pf-button`',
        })
        .option('packageName', {
          alias: 'p',
          type: 'string',
          description: 'NPM package name e.g. `@patternfly/elements`',
          default: await getDefaultPackageName(),
        })
        .option('overwrite', {
          type: 'boolean',
          default: false,
          description: 'Overwrite files without prompting',
        })
        .option('css', {
          type: 'boolean',
          default: 'css',
          description: 'Which type of CSS files to output',
        })
        .help()
        .check(({ name }) => {
          if (typeof name === 'string' && !name.includes('-')) {
            throw new Error(ERR_BAD_CE_TAG_NAME);
          } else {
            return true;
          }
        }))
      .then(({ argv }) => argv as GenerateElementOptions)
      .then(promptForElementGeneratorOptions)
      .then(generateElement)
      .catch(e => {
        if (e instanceof PackageJSONError) {
          // eslint-disable-next-line no-console
          console.log(e.message);
          process.exit(1);
        } else {
          throw e;
        }
      });
}
