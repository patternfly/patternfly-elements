import type { IconSpec } from './icons.js';

import { mkdir, writeFile } from 'node:fs/promises';
import * as SETS from './icons.js';

// const getContent = (name: string, { height, width, path, xOffset = 0, yOffset = 0 }: IconSpec) =>
//   `import{svg}from'lit';export default svg\`<svg xmlns="http://www.w3.org/2000/svg" data-icon-name="${name}" height="${height}" width="${width}" viewBox="${[xOffset, yOffset, width, height].join(' ')}"><path d="${path}" /></svg>\`;`;

const getContent = (name: string, { height, width, path, xOffset = 0, yOffset = 0 }: IconSpec) =>
  `const t = document.createElement('template');t.innerHTML=\`<svg xmlns="http://www.w3.org/2000/svg" data-icon-name="${name}" height="${height}" width="${width}" viewBox="${[xOffset, yOffset, width, height].join(' ')}"><path d="${path}" /></svg>\`;export default t.content.cloneNode(true);`;

for (const [setName, icons] of Object.entries(SETS)) {
  const dir = new URL(`../../elements/pf-icon/icons/${setName}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  for (const [name, icon] of Object.entries(icons)) {
    await writeFile(new URL(`./${name}.js`, dir), getContent(name, icon), 'utf8');
  }
}
