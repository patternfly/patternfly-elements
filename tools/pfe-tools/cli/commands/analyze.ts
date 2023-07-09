import type Yargs from 'yargs';

import { type AbsolutePath, createPackageAnalyzer } from '@lit-labs/analyzer';

import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

interface Opts {
  packagePath: string | URL;
  quiet: boolean;
}

async function analyze(argv: Opts) {
  const { packagePath } = argv;
  const path = packagePath instanceof URL ? fileURLToPath(packagePath) : join(process.cwd(), packagePath);
  const analyzer = createPackageAnalyzer(path as AbsolutePath);
  try {
    const p = analyzer.getPackage();
    console.log(p);
  } catch (e: any) {
    console.log(`Analyzer error: ${e.message}`);
    console.group(`original error`);
    console.error(e);
    console.groupEnd();
  }
}

export const command = {
  command: 'analyze [opts] <packagePath>',
  aliases: ['analyze'],
  describe: 'Analyze web component sources and produce custom elements manifest.',
  async handler(argv: any) {
    if (!argv.packagePath) {
      argv.showHelp();
    } else {
      await analyze(argv);
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
