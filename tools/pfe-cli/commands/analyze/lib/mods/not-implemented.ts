import type { Package } from 'custom-elements-manifest';

/**
 * Guard against weird lit-labs/analyzer artifacts.
 * Probably remove when analyzer goes 1.0
 */
export function elideNotImplementedModules(manifest: Package): Package {
  return {
    ...manifest,
    modules: manifest.modules.filter(x => x.path !== 'not/implemented'),
  };
}
