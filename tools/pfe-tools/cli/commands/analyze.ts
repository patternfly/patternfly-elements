import type Yargs from 'yargs';

import {
  type AbsolutePath,
  createPackageAnalyzer,
} from '@lit-labs/analyzer';

import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { formatDiagnostics } from '../lib/ts.js';

interface Opts {
  packagePath: string | URL;
  quiet: boolean;
}

async function analyze(argv: Opts) {
  const { packagePath } = argv;
  const path = packagePath instanceof URL ? fileURLToPath(packagePath) : join(process.cwd(), packagePath);
  try {
    const analyzer = createPackageAnalyzer(path as AbsolutePath, {
      exclude: [
        '**/*.spec.ts',
        '**/*.e2e.ts',
        '**/*.d.ts',
        '**/*.js',
      ],
    });
    const p = analyzer.getPackage();
    console.log('got package', p);
  } catch (e: any) {
    if (Array.isArray(e.diagnostics)) {
      const formattedDiagnostics = formatDiagnostics(e.diagnostics);
      console.log(`${formattedDiagnostics}\n${e.diagnostics.length} errors`);
    } else {
      console.group(`Analyzer error`);
      console.error(e);
      console.groupEnd();
    }
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
