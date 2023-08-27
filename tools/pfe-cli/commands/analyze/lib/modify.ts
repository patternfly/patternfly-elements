import type { Analyzer } from '@lit-labs/analyzer';
import type { Package } from 'custom-elements-manifest';

import { elideNotImplementedModules } from './mods/not-implemented.js';
import { addDemosToManifest } from './mods/demos.js';
import { deresolveDiskPathsToExportMapPaths } from './mods/export-maps.js';

export async function modify(manifest: Package, analyzer: Analyzer): Promise<Package> {
  return (Promise.resolve(manifest)
    .then(elideNotImplementedModules)
    .then(addDemosToManifest)
    .then(manifest => deresolveDiskPathsToExportMapPaths(manifest, analyzer))
  );
}

