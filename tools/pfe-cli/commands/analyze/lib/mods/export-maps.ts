import type { Analyzer } from '@lit-labs/analyzer';
import type { Package } from 'custom-elements-manifest';

async function deresolve(
  path: string,
  packageJson: ReturnType<Analyzer['getPackage']>['packageJson'],
) {
  // TODO: somehow deresolve export paths to disk paths,
  // until a general solution is found, fall back on convention
  switch (packageJson.name) {
    case '@patternfly/pfe-core': return path.replace(/^core/, '.');
    case '@patternfly/elements': return path.replace(/^elements/, '.');
    default: return path;
  }
}

export async function deresolveDiskPathsToExportMapPaths(manifest: Package, analyzer: Analyzer): Promise<Package> {
  const { packageJson } = analyzer.getPackage();
  return {
    ...manifest,
    modules: await Promise.all(manifest.modules.map(async module => ({
      ...module,
      path: await deresolve(module.path, packageJson),
    })))
  };
}
