import { generateElement } from './generator/element.js';

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
  /** The element's tagname e.g. `pfe-button` */
  tagName: string;
  /** The NPM package name */
  packageName: string;
}

export type PromptOptions<T> =
  Partial<T> & BaseOptions;

const ERR_BAD_CE_TAG_NAME =
  'Custom element tag names must contain a hyphen (-)';

const b = Chalk.cyanBright;

interface PackageJSON {
  customElements?: string;
  name: string;
  version: string;
  workspaces?: string;
}

function banner() {
  console.log(`${Chalk.cyan(`
                    ${b('`qQQQQQQg.')}
                    '${b('N@@@@@@@;')}
                    7${b('g@@@@@@@S')}
                   ^QD${b('Q@@@@@@@|')}
                  +QQQ${b('K@@@@@@@@i')}
                'jQQQQD${b('d@@@@@@@@X,')}
              ,mQQQQQQQb${b('k@@@@@@@@@b+')}
          .;7qQQQQQQQQQD~;${b('8@@@@@@@@@8}^\'')}
    =77JyU%NQQQQQQQQQNi\`  ${b('`cQ@@@@@@@@@@@BKauz|')}
    ${b('%@@@@@@QQ#')}gDR&QDL.      ${b('`iN@@@@@@@@@@@@@@Q')}
    ${b('%@@@@@@@@@@@QK')}=            ${b('+RQ@@@@@@@@@@@Q')}
    ${b('%@@@@@@@@@@@@@@B7.')}      \`?bQBRd%${b('NQQ@@@@@@Q')}
    ${b('=7uaq#@@@@@@@@@@@Qz`')}  \`|WQQQQQQQQQN%UyJ77?
          ${b('.!Ig@@@@@@@@@B!')},qQQQQQQQQQbz;.
              ${b('~A@@@@@@@@@X')}qQQQQQQQk^
                ${b(';D@@@@@@@@K')}DQQQQK;
                  ${b('*@@@@@@@@b')}NQQ*
                   ${b('=@@@@@@@Q')}dQ<
                    ${b('j@@@@@@@Wx')}
                    ${b('_@@@@@@@Q,')}
                    ${b('`bQQQQQQ%``')}

                ${Chalk.bold(Chalk.blue('PatternFly Elements'))}
`)}`);
}

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

async function getDefaultPackageName() {
  return (await readJson(join(process.cwd(), 'elements', 'package.json')) as PackageJSON)?.name ??
         (await readJson(join(process.cwd(), 'package.json')) as PackageJSON) ?? '';
}

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
        description: 'Custom element tag name. e.g. `pfe-button`',
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
    .then(generateElement);
}
