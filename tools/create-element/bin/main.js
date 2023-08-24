#!/usr/bin/env node
import Yargs from 'yargs';
import { command } from '@patternfly/pfe-tools/cli/commands/generate/command.js';

(async function() {
  try {
    const { argv } = (await Promise.resolve((Yargs(process.argv.slice(2)))
      .scriptName('npm init @patternfly/element')
      .usage('$0 [<cmd>] [args]')
      .help()
      .command({ command: '*', ...command })));
    return void argv;
  } catch (e) {
    if (e) console.error(e);
  }
})();
