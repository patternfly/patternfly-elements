import type { Opts } from '../command.js';

import { join, relative } from 'node:path';
import { writeFile } from 'node:fs/promises';

import chalk from 'chalk';
import { genManifest } from './gen-manifest.js';
import { modify } from './modify.js';

export async function writeManifest(options: Opts): Promise<void> {
  const [[filename, result]] = Object.entries(await genManifest(options));
  const manifest = await modify((typeof result === 'string') ? JSON.parse(result) : result);
  const packagePath = typeof options.packagePath === 'string' ? options.packagePath : options.packagePath.pathname;
  const outPath = join(process.cwd(), packagePath, filename);
  try {
    await writeFile(outPath, JSON.stringify(manifest, null, 2));
    console.log(`✏️  Wrote ${chalk.blue(relative(process.cwd(), outPath))}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
