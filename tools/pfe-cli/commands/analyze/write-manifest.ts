import type { Package } from 'custom-elements-manifest';
import type { AbsolutePath } from '@lit-labs/analyzer';
import type { Opts } from './command.js';

import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { writeFile } from 'node:fs/promises';

import { createPackageAnalyzer } from '@lit-labs/analyzer/package-analyzer.js';
import { generateManifest } from '@lit-labs/gen-manifest';

import chalk from 'chalk';

import { formatDiagnostics } from '../../lib/ts.js';

import { notImplemented } from './mods/not-implemented.js';
import { ecmaPrivate } from './mods/ecma-private.js';
import { demos } from './mods/demos.js';

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
    const p = analyzer.getPackage();
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

function getManifest(argv: Opts) {
  const { packagePath } = argv;
  const pkg = getPackage(packagePath);
  return generateManifest(pkg);
}

async function modify(manifest: Package): Promise<Package> {
  return (Promise.resolve(manifest)
    .then(notImplemented)
    .then(ecmaPrivate)
    .then(demos)
  );
}

export async function writeManifest(options: Opts): Promise<void> {
  const [[filename, result]] = Object.entries(await getManifest(options));
  const manifest = (typeof result === 'string') ? JSON.parse(result) : result;
  const packagePath = typeof options.packagePath === 'string' ? options.packagePath : options.packagePath.pathname;
  const outPath = join(process.cwd(), packagePath, filename);
  await writeFile(outPath, JSON.stringify(await modify(manifest), null, 2));
  console.log(`✏️  Wrote ${chalk.blue(relative(process.cwd(), outPath))}`);
}
