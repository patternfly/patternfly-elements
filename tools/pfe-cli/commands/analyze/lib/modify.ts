import type { Package } from 'custom-elements-manifest';
import type { Analyzer } from '@lit-labs/analyzer';

import { elideNotImplementedModules } from './mods/not-implemented.js';
import { addDemosToManifest } from './mods/demos.js';
import { deresolveDiskPathsToExportMapPaths } from './mods/export-maps.js';

type PackageJson = ReturnType<Analyzer['getPackage']>['packageJson'];

export interface Analysis {
  manifest: Package;
  packageJson: PackageJson;
  filename: string;
  rootDir: string;
}

export async function modify(analysis: Analysis): Promise<Analysis> {
  return (Promise.resolve(analysis)
    .then(elideNotImplementedModules)
    .then(addDemosToManifest)
    .then(deresolveDiskPathsToExportMapPaths)
  );
}

