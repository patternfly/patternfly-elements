#!/usr/bin/env node
import Yargs from 'yargs';
import Chalk from 'chalk';
import * as Lint from './commands/lint.js';
import * as Generate from './commands/generate.js';

const { bold, red } = Chalk;

const WARNING = `
${bold`*******************************************************************`}
${bold`${red`WARNING`}`}: pfe CLI is experimental and subject to change at any time!
${bold`*******************************************************************`}
`;

console.log(WARNING);

const { argv } = await Promise.resolve(Yargs(process.argv.slice(2))
  .scriptName('pfe')
  .usage('$0 [<cmd>] [args]')
  .command(Lint.command)
  .command(Generate.command)
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .epilogue('Read the docs at https://patternflyelements.org')
  .help('help'));

argv;
