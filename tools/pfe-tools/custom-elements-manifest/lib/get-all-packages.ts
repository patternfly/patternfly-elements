/**
 * Adapted from `get-monorepo-packages` by Lucas Azzola
 * @license MIT
 * @see https://github.com/azz/get-monorepo-packages/
 */

import type { PackageJSON } from './Manifest';

import { join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { globSync, hasMagic } from 'glob';

interface PackageRecord {
  location: string;
  package: PackageJSON;
}

const readJsonSync = (path: string) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
};

function loadPackage(packagePath: string): PackageJSON | void {
  const pkgJsonPath = join(packagePath, 'package.json');
  if (existsSync(pkgJsonPath)) {
    return readJsonSync(pkgJsonPath);
  }
}

function findPackages(packageSpecs: string[], rootDirectory: string): PackageRecord[] {
  return packageSpecs
      .flatMap(pkgGlob =>
        (hasMagic(pkgGlob) ?
          globSync(join(rootDirectory, pkgGlob), { nodir: false })
          : [join(rootDirectory, pkgGlob)]))
      .map(location => ({ location, package: loadPackage(location) }))
      .filter((x): x is PackageRecord => !!x.package?.name);
}

export function getAllPackages(rootDir: string): PackageRecord[] {
  const rootPackagePath = join(rootDir, 'package.json');
  const rootPackage = readJsonSync(rootPackagePath);
  if (Array.isArray(rootPackage?.workspaces)) {
    return findPackages(rootPackage.workspaces, rootDir);
  } else if (rootPackage) {
    return [{ package: rootPackage, location: rootDir }];
  } else {
    return [];
  }
}

