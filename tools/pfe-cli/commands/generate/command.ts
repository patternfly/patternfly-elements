import type * as Yargs from 'yargs';

import Banner from '#lib/banner.js';

import prompts from 'prompts';

import { generateElement } from './lib/element.js';
import { getDefaultPackageName } from './lib/utils.js';

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

export async function promptForElementGeneratorOptions(
  options?: PromptOptions<GenerateElementOptions>
): Promise<GenerateElementOptions> {
  console.log(Banner);

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

export async function handler(argv: GenerateElementOptions) {
  await promptForElementGeneratorOptions(argv)
    .then(generateElement);
}

export async function builder(yargs: Yargs.Argv) {
  return yargs.options({
    directory: {
      type: 'string',
      default: process.cwd(),
      demandOption: false,
      description: 'Output directory',
    },
    silent: {
      type: 'boolean',
      default: false,
      description: 'Do not log anything to stdout',
    },
    tagName: {
      alias: 'n',
      type: 'string',
      description: 'Custom element tag name. e.g. `pf-button`',
    },
    packageName: {
      alias: 'p',
      type: 'string',
      description: 'NPM package name e.g. `@patternfly/elements`',
      default: await getDefaultPackageName(),
    },
    overwrite: {
      type: 'boolean',
      default: false,
      description: 'Overwrite files without prompting',
    },
    css: {
      type: 'boolean',
      default: 'css',
      description: 'Which type of CSS files to output',
    }
  })
    .check(function validateCustomElementTagName({ tagName }) {
      if (typeof tagName === 'string' && !tagName.includes('-')) {
        throw new Error(ERR_BAD_CE_TAG_NAME);
      } else {
        return true;
      }
    });
}

export const command = {
  command: 'generate [args]',
  aliases: ['new'],
  describe: 'Generate an element',
  handler,
  builder,
} as Yargs.CommandModule<unknown, GenerateElementOptions>;
