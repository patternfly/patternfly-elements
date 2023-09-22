import type { Opts } from '../command.js';

import { join, relative } from 'node:path';
import { writeFile } from 'node:fs/promises';

import chalk from 'chalk';

import { analyze } from './analyze.js';

export async function writeManifest(options: Opts): Promise<void> {
  const packagePath =
      typeof options.packagePath === 'string' ? options.packagePath
    : options.packagePath.pathname;

  const { manifest, filename, packageJson } = await analyze(options);

  const outPath = join(process.cwd(), packagePath, filename);

  try {
    await writeFile(outPath, JSON.stringify(manifest, null, 2));
    console.log(`✏️  [${chalk.green(packageJson.name)}] Wrote ${chalk.blue(filename)}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
