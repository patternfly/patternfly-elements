import type Yargs from 'yargs';

import Glob from 'glob';

import { promisify } from 'node:util';
import { join } from 'node:path';
import { readFile, writeFile, stat } from 'node:fs/promises';
import chalk from 'chalk';

const glob = promisify(Glob);

const exists = (p: string) => stat(p).then(() => true, () => false);

interface Opts {
  glob: string;
  package: string;
  typescript: boolean;
  fix: boolean;
  quiet: boolean;
}

export async function handler(argv: Opts) {
  const pkgDir = join(process.cwd(), argv.package);
  const ts = argv.typescript ?? await exists(join(pkgDir, 'tsconfig.json'));
  const entryPoints = (await glob(argv.glob, { cwd: pkgDir }))
    .map(x => !ts ? x : x.replace('.js', '.ts'))
    .filter(x => !x.endsWith('.d.ts'))
    .filter(x => !x.endsWith('.map.js'));

  const PACKAGE_JSON_PATH = join(pkgDir, 'package.json');
  if (!await exists(PACKAGE_JSON_PATH)) {
    console.log('No package found at', pkgDir);
    process.exit(1);
  }

  const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf-8'));

  const fixed = packageJson;
  const missing = new Map();
  for (const entryPoint of entryPoints) {
    const js = entryPoint.replace(/\.ts$/, '.js');
    if (packageJson.exports[js] !== js) {
      missing.set(js, js);
    }
    fixed.exports[js] = js;
  }

  if (argv.fix) {
    await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n\n`, 'utf-8');
    return;
  }

  if (missing.size) {
    if (!argv.quiet) {
      for (const [, x] of missing) {
        console.log(chalk.red`missing export`, x);
      }
    }
    process.exit(1);
  }
}

export const command: Yargs.CommandModule<unknown, Opts> = {
  command: 'lint <exports> [opts]',
  describe: 'Apply code standards',
  handler(yargs) {
    (yargs as unknown as Yargs.Argv<Opts>).showHelp();
  },
  builder(yargs) {
    return yargs.options({
      glob: {
        type: 'string',
        describe: 'Glob pattern of files which must be included in package exports',
        default: './*/*.js'
      },
      quiet: {
        type: 'boolean',
        describe: 'Whether to suppress output messages',
      },
      fix: {
        type: 'boolean',
        describe: 'Whether to automatically write changes to package.json'
      }
    })
      .command({
        command: 'exports <package>',
        describe: 'Ensure package.json contains required exports',
        handler
      } as Yargs.CommandModule<unknown, Opts>) as Yargs.Argv<Opts>;
  }
};
