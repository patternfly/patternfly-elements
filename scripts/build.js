#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { join } from 'path';
import { pfeBuild } from '@patternfly/pfe-tools/esbuild.js';

import Yargs from 'yargs';

const { argv: { production, watch } } = Yargs(process.argv)
  .options({
    production: {
      default: !!process.env.CI,
      type: 'boolean',
      conflicts: 'development',
    },
    watch: {
      type: 'boolean',
    }
  });

const mode = production ? 'production' : 'development';

const cwd = join(fileURLToPath(import.meta.url), '..', '..');

await pfeBuild({ cwd, mode, watch });
