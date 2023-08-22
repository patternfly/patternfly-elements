#!/usr/bin/env node
import Yargs from 'yargs';
import * as Generate from './commands/generate.js';
import * as Lint from './commands/lint.js';
import * as Analyze from './commands/analyze.js';

const { argv } = await Promise.resolve(Yargs(process.argv.slice(2))
  .scriptName('pfe')
  .usage('$0 [<cmd>] [args]')
  .command(Lint.command)
  .command(Generate.command)
  .command(Analyze.command)
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .epilogue('Read the docs at https://patternflyelements.org')
  .help('help'));

argv;
