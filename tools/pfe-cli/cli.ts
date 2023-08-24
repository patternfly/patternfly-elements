#!/usr/bin/env node
import Yargs from 'yargs';
import * as Generate from './commands/generate/command.js';
import * as Analyze from './commands/analyze/command.js';

const { argv } = await Promise.resolve(Yargs(process.argv.slice(2))
  .scriptName('pfe')
  .usage('$0 [<cmd>] [args]')
  .command(Generate.command)
  .command(Analyze.command)
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .epilogue('Read the docs at https://patternflyelements.org')
  .help('help'));

argv;
