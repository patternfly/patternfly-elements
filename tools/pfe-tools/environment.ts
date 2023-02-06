import { readdir } from 'fs/promises';
import { join } from 'path';

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

