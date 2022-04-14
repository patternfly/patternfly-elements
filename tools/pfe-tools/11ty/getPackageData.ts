import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import { DocsPage } from './DocsPage.js';

const cwd = process.cwd();

const readJson = (path: string) => readFile(path, 'utf-8').then(x => JSON.parse(x));

export async function getPackageData(workspace: 'core'|'elements'|'tools') {
  try {
    const map = new Map<string, DocsPage>();
    const dirs = await readdir(join(cwd, workspace));
    await Promise.allSettled(dirs.map(async dir => {
      const packagePath = join(cwd, workspace, dir);
      const packageJson = await readJson(join(packagePath, 'package.json'));
      const renderer = new DocsPage(packageJson.name, packagePath);
      await renderer.init();
      map.set(packageJson.name, renderer);
      map.set(packageJson.name.replace('@patternfly/', ''), renderer);
      renderer.manifest?.getTagNames().forEach(tagName => map.set(tagName, renderer));
    }));
    return map;
  } catch (e) {
    return new Map();
  }
}
