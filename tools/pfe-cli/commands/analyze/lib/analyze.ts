import type { AbsolutePath } from '@lit-labs/analyzer';
import type { Opts } from '../command.js';

import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

import { createPackageAnalyzer } from '@lit-labs/analyzer/package-analyzer.js';
import { generateManifest } from '@lit-labs/gen-manifest';

import { formatDiagnostics } from '#lib/ts.js';
import { modify, type Analysis } from './modify.js';

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
    process.exit(1);
  }
}

export async function analyze(argv: Opts): Promise<Analysis> {
  const { packagePath } = argv;
  const pkg = await getPackage(packagePath);
  const { rootDir, packageJson } = pkg;
  const [[filename, fileTreeOrString]] = Object.entries(await generateManifest(pkg));
  const manifest = (typeof fileTreeOrString === 'string') ? JSON.parse(fileTreeOrString) : fileTreeOrString;
  return modify({ manifest, filename, packageJson, rootDir });
}
