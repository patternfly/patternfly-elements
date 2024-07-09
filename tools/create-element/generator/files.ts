import { mkdir, readFile, stat, writeFile } from 'fs/promises';

export { readFile, writeFile };

/**
 * @param [string] prop name
 */
export function getInterpolationRegExp(string?: string): RegExp {
  if (typeof string === 'string') {
    return new RegExp(`<%= ${string} %>`, 'g');
  } else {
    return /<%= (\w+) =%>/g;
  }
}

/**
 * @param template ejs-like template
 * @param interpolations record of keywords to replace.
 */
export function processTemplate(template: string, interpolations: Record<string, string>): string {
  let partial = template;

  Object.entries(interpolations).forEach(([key, value]) => {
    partial = partial.replace(getInterpolationRegExp(key), value || '');
  });

  return partial
      .replace(getInterpolationRegExp(), ''); // CYA
}

/**
 * Check if a file exists at a given absolute path
 * @param path path to file to check
 */
export async function exists(path: string): Promise<boolean> {
  try {
    return !!(await stat(path));
  } catch {
    return false;
  }
}

/**
 * $ mkdir -p path
 * @param path dir to mk, p
 */
export async function mkdirp(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

/**
 * @param path json file path
 */
export async function readJson<T = unknown>(path: string): Promise<T> {
  return readFile(path, 'utf8').then(x => JSON.parse(x));
}
