import { mkdir, readFile, stat } from 'node:fs/promises';

export const exists = (p: string) => stat(p).then(() => true, () => false);

/** $ mkdir -p path */
export async function mkdirp(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function readJson<T = unknown>(path: string): Promise<T> {
  return readFile(path, 'utf8').then(x => JSON.parse(x));
}

