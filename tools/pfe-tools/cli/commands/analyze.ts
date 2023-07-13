import type Yargs from 'yargs';

import {
  type AbsolutePath,
  createPackageAnalyzer,
} from '@lit-labs/analyzer';

import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { formatDiagnostics } from '../lib/ts.js';
import { generateManifest } from './analyzer/gen-manifest.js';

interface Opts {
  packagePath: string | URL;
  quiet: boolean;
}

function getPackage(packagePath: string | URL) {
  const path = packagePath instanceof URL ? fileURLToPath(packagePath) : join(process.cwd(), packagePath);
  const analyzer = createPackageAnalyzer(path as AbsolutePath, {
    exclude: [
      '**/*.spec.ts',
      '**/*.e2e.ts',
      '**/*.d.ts',
      '**/*.js',
    ],
  });
  try {
    return analyzer.getPackage();
  } catch (e: any) {
    console.group(`Error analyzing package ${packagePath}`);
    if (Array.isArray(e.diagnostics)) {
      console.log(e.diagnostics.at(0));
      const formattedDiagnostics = formatDiagnostics(e.diagnostics);
      console.log(`${formattedDiagnostics}\n${e.diagnostics.length} errors`);
    } else {
      console.error(e);
    }
    console.groupEnd();
    process.exit(1);
  }
}

function getManifest(argv: Opts) {
  const { packagePath } = argv;
  const pkg = getPackage(packagePath);
  return generateManifest(pkg);
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
        const manifest = getManifest(argv);
        console.log(manifest);
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
