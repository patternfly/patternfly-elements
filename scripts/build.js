#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { join } from 'path';
import { pfeBuild } from '@patternfly/pfe-tools/esbuild.js';

import glob from 'glob';
import Yargs from 'yargs';


const { argv: { exclude, include, outdir, production, watch, workspace } } = Yargs(process.argv)
  .options({
    production: {
      default: !!process.env.CI,
      type: 'boolean',
      conflicts: 'development',
    },
    exclude: { type: 'array' },
    include: { type: 'array' },
    workspace: { type: 'string' },
    outdir: { type: 'string' },
    watch: {
      type: 'boolean',
    }
  });

const entryPointFilesExcludes = Array.isArray(exclude) ? exclude.map(x => glob(x, { cwd })) : undefined;

const mode = production ? 'production' : 'development';

const cwd = join(fileURLToPath(import.meta.url), '..', '..');

await pfeBuild({ cwd, entryPointFilesExcludes, include, mode, outdir, watch, workspace });
