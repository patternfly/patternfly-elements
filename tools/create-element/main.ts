import { generateElement } from './generator/element.js';

import Chalk from 'chalk';
import Yargs from 'yargs';
import inquirer from 'inquirer';

export interface BaseOptions {
  silent: boolean;
  directory: string;
  overwrite: boolean;
}

export interface AppOptions extends BaseOptions {
  packageDefaults: boolean;
  install: boolean;
  start: boolean;
}

export interface GenerateElementOptions extends BaseOptions {
  /** The element's tagname e.g. `pfe-button` */
  tagName: string;
  /** The element's npm package scope e.g. `patternfly` */
  scope: string;
}
export type PromptOptions<T> =
  Partial<T> & BaseOptions;

const ERR_BAD_CE_TAG_NAME =
  'Custom element tag names must contain a hyphen (-)';

const b = Chalk.cyanBright;

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
    ...await inquirer.prompt([{
      type: 'input',
      name: 'tagName',
      message: 'What is the element\'s tag name?',
      validate: name => name.includes('-') || ERR_BAD_CE_TAG_NAME,
    }, {
      type: 'input',
      name: 'scope',
      message: 'What is the package\'s NPM scope?',
    }], options),
  } as GenerateElementOptions;
}

export async function main(): Promise<void> {
  return Promise.resolve(
    Yargs(process.argv)
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
      .option('scope', {
        alias: 's',
        type: 'string',
        description: 'NPM package scope. e.g. `@patternfly`',
      })
      .option('overwrite', {
        type: 'boolean',
        default: false,
        description: 'Overwrite files without prompting',
      })
      .help()
      .check(({ name }) => {
        if (typeof name === 'string' && !name.includes('-'))
          throw new Error(ERR_BAD_CE_TAG_NAME);
        else
          return true;
      }))
    .then(({ argv }) => argv)
    .then(promptForElementGeneratorOptions)
    .then(generateElement);
}
