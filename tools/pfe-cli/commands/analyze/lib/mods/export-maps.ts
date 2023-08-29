import type { Analysis } from '../modify.js';

async function deresolve(
  path: string,
  packageJson: Analysis['packageJson'],
) {
  // TODO: somehow deresolve export paths to disk paths,
  // until a general solution is found, fall back on convention
  switch (packageJson.name) {
    case '@patternfly/pfe-core': return path.replace(/^core/, '.');
    case '@patternfly/elements': return path.replace(/^elements/, '.');
    default: return path;
  }
}

export async function deresolveDiskPathsToExportMapPaths(
  analysis: Analysis
): Promise<Analysis> {
  const modules =
    await Promise.all(analysis.manifest.modules.map(async module => ({
      ...module,
      path: await deresolve(module.path, analysis.packageJson),
    })));

  return {
    ...analysis,
    manifest: { ...analysis.manifest, modules }
  };
}
