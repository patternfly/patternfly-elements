import { join } from 'node:path';
import { readJson } from '#lib/fs.js';

interface PackageJSON {
  customElements?: string;
  name: string;
  version: string;
  workspaces?: string;
}

export const readJsonOrVoid = (path: string) => readJson(path).catch(() => void 0);

export async function getDefaultPackageName() {
  return (await readJsonOrVoid(join(process.cwd(), 'elements', 'package.json')) as PackageJSON)?.name ??
         (await readJsonOrVoid(join(process.cwd(), 'package.json')) as PackageJSON)?.name ?? '';
}

