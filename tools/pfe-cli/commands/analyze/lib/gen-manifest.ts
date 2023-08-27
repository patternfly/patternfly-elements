import type { AbsolutePath } from '@lit-labs/analyzer';
import type { Opts } from '../command.js';

import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

import { createPackageAnalyzer } from '@lit-labs/analyzer/package-analyzer.js';
import { generateManifest } from '@lit-labs/gen-manifest';

import { formatDiagnostics } from '#lib/ts.js';

async function getPackage(packagePath: string | URL) {
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
    const p = await analyzer.getPackage();
    return p;
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

export async function genManifest(argv: Opts): ReturnType<typeof generateManifest> {
  const { packagePath } = argv;
  const pkg = await getPackage(packagePath);
  return generateManifest(pkg);
}
