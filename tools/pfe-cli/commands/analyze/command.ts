import type Yargs from 'yargs';
import { writeManifest } from './write-manifest.js';

export const command = {
  command: 'analyze [opts] <packagePath>',
  aliases: ['analyze'],
  describe: 'Analyze web component sources and produce custom elements manifest.',
  async handler(argv: any) {
    if (!argv.packagePath) {
      argv.showHelp();
    } else {
      try {
        await writeManifest(argv);
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    }
  },
  builder(yargs: Yargs.Argv) {
    return yargs.options({
      quiet: {
        type: 'boolean',
        describe: 'Whether to suppress output messages',
      },
    }).check(argv => !!argv.packagePath);
  },
};
