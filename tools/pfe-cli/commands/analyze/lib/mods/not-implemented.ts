import type { Analysis } from '../modify.js';

/**
 * Guard against weird lit-labs/analyzer artifacts.
 * Probably remove when analyzer goes 1.0
 */
export function elideNotImplementedModules(analysis: Analysis): Analysis {
  return {
    ...analysis,
    manifest: {
      ...analysis.manifest,
      modules: analysis.manifest.modules.filter(x =>
        x.path !== 'not/implemented'),
    }
  };
}
