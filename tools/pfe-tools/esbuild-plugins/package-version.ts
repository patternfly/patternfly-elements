import type { Plugin } from 'esbuild';

import { join, dirname } from 'path';
import { readFileSync } from 'fs';

function getPackage(path: string): { version: string } {
  try {
    const json = readFileSync(join(dirname(path), 'package.json'), 'utf8');
    return JSON.parse(json);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
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
      build.onLoad({ filter }, ({ path }) => {
        const source = readFileSync(path, 'utf8');
        const { version } = getPackage(path);
        const contents = source.replace(/{{(\s+)?version(\s+)?}}/g, version);
        return {
          contents,
          loader: path.endsWith('ts') ? 'ts' : 'js',
        };
      });
    },
  };
}
