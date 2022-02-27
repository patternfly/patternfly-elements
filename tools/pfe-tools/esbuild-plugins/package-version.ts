import type { Plugin } from 'esbuild';

import { join, dirname } from 'path';
import { readFile } from 'fs/promises';

async function getPackage(path: string): Promise<{ version: string }> {
  try {
    const json = await readFile(join(dirname(path), 'package.json'), 'utf8');
    return JSON.parse(json);
  } catch (e) {
    if ((e as Error & { code: string }).code === 'ENOENT') {
      return getPackage(dirname(path));
    } else {
      throw e;
    }
  }
}

/*
 * Replaces `{{version}}` with the associated package version
 */
export function packageVersion({ filter = /pfe-(.*)\.[j|t]s$/ } = {}): Plugin {
  return {
    name: 'packageVersion',
    setup(build) {
      build.onLoad({ filter }, async ({ path }) => {
        const source = await readFile(path, 'utf8');
        const { version } = await getPackage(path);
        const contents = source.replace(/{\{(\s+)?version(\s+)?}}/g, version);
        return {
          contents,
          loader: path.endsWith('ts') ? 'ts' : 'js',
        };
      });
    },
  };
}
