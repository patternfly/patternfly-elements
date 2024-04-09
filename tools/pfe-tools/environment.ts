/* globals process */
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function makeDemoEnv(cwd = process.cwd()): Promise<string> {
  const iconsDir = join(cwd, 'node_modules', '@patternfly', 'icons');
  const dirContents = await readdir(iconsDir);
  const dirNamesOrNulls = await Promise.all(dirContents.map(async x => {
    const stats = await stat(join(iconsDir, x));
    if (!x.startsWith('.') && stats.isDirectory()) {
      return x;
    } else {
      return null;
    }
  }));
  const iconSetNames = dirNamesOrNulls.filter((x): x is string => x != null);
  const iconSets = await Promise.all(iconSetNames.reverse().map(async set => {
    const files = await readdir(join(iconsDir, set));
    return [set, [...new Set(files.map(x => x.replace(/\..*$/, '')))]];
  }));
  return `
export const elements = ${JSON.stringify(await readdir(join(cwd, 'elements')))};
export const core = ${JSON.stringify(await readdir(join(cwd, 'core')))};
export const iconSets = new Map(${JSON.stringify(iconSets)});
`;
}
