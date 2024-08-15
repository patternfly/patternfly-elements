import { Manifest } from './lib/Manifest';

/**
 * Get all package manifests in the working dir
 * @param rootDir defaults to cwd
 */
export function getAllManifests(rootDir?: string): Manifest[] {
  return Manifest.getAll(rootDir);
}

export type { DemoRecord } from './lib/Manifest.js';
