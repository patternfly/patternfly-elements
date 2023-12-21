import * as path from 'path';
import { glob } from 'glob';
import { Generator } from '@jspm/generator';

export function importMap() {
  const generator = new Generator({
    defaultProvider: 'jspm.io',
    env: ['production', 'browser', 'module']
  });

  const map = generator.getMap();

  const __dirname = new URL('.', import.meta.url).pathname;
  // add imports for all icon files in /node_modules/@patternfly/icons/{far, fas, fab, patternfly}/
  const iconsImports = glob.sync('./{fab,far,fas,patternfly}/*.js', { cwd: path.join(__dirname, '../../../node_modules/@patternfly/icons') })
    .filter((x: string) => !x.endsWith('.d.ts'))
    .map((x: string) => x);

  map.imports = {}; // Initialize map.imports as an empty object

  for (const icon of iconsImports) {
    map.imports[`@patternfly/icons/${icon}`] = `/node_modules/@patternfly/icons/${icon}`;
  }

  return map;
}
