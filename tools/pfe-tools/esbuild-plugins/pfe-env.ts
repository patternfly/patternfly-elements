import type { Plugin } from 'esbuild';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));

export async function makeDemoEnv(cwd = process.cwd()): Promise<string> {
  const iconsDir = join(cwd, 'elements', 'pf-icon', 'icons');
  const iconSetNames = await readdir(iconsDir);
  const iconSets = await Promise.all(iconSetNames.reverse().map(async set => {
    const files = await readdir(join(iconsDir, set));
    const icons = files.map(x => x.replace('.js', ''));
    return [set, icons];
  }));
  return `
export const elements = ${JSON.stringify(await readdir(join(cwd, 'elements')))};
export const core = ${JSON.stringify(await readdir(join(cwd, 'core')))};
export const iconSets = new Map(${JSON.stringify(iconSets)});
`;
}

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
        contents: await makeDemoEnv(cwd),
        loader: 'js'
      }));
    },
  };
}

