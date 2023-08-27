import type * as Yargs from 'yargs';
import { writeManifest } from './lib/write-manifest.js';

export interface Opts {
  packagePath: string | URL;
  quiet: boolean;
}

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
    return yargs
      .positional('packagePath', {
        describe: 'relative path to the package root folder. If a tsconfig.json is found or specified as the path, the project will be analyzed as TypeScript',
        type: 'string',
      })
      .options({
        quiet: {
          type: 'boolean',
          describe: 'Whether to suppress output messages',
        },
      })
      .check(argv => !!argv.packagePath);
  },
};
