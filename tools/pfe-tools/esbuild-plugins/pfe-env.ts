import type { Plugin } from 'esbuild';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));

/**
 * Generates the contents of `environment.js`,
 * a file which contains metadata about the monorepo.
 */
export function pfeEnvPlugin({ cwd = REPO_ROOT, } = {}): Plugin {
  return {
    name: 'pfe-env',
    setup(build) {
      build.onResolve({ filter: /@patternfly\/pfe-tools\/environment\.js/ }, () => ({
        path: '@patternfly/pfe-tools/environment.js',
        namespace: 'pfe-env',
      }));
      build.onLoad({ filter: /.*/, namespace: 'pfe-env' }, async () => ({
        contents: `
export const elements = ${JSON.stringify(await readdir(join(cwd, 'elements')))};
export const core = ${JSON.stringify(await readdir(join(cwd, 'core')))};
`,
        loader: 'js',
      }));
    },
  };
}

