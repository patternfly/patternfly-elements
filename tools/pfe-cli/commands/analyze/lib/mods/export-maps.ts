import type { Analysis } from '../modify.js';

/**
 * TODO: somehow deresolve export paths to disk paths,
 * until a general solution is found, fall back on convention
 * see https://stackoverflow.com/questions/76986847/inverse-function-of-import-meta-resolve
 */
function deresolve(
  path: string,
  packageJson: Analysis['packageJson'],
) {
  switch (packageJson.name) {
    case '@patternfly/pfe-core':
      if (path === 'core.js') {
        return path;
      } else {
        return path.replace(/^core/, '.');
      }
    case '@patternfly/elements': return path.replace(/^elements/, '.');
    default: return path;
  }
}

export async function deresolveDiskPathsToExportMapPaths(
  analysis: Analysis
): Promise<Analysis> {
  await Promise.all(analysis.manifest.modules.map(
    async module => {
      module.path = deresolve(module.path, analysis.packageJson);
    },
  ));

  return analysis;
}
