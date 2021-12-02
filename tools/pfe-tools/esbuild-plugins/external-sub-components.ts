import type { Plugin } from 'esbuild';

/**
 * This plugin will target internal .js imports and will
 * add them to externals. This will prevent sub-components from
 * being bundled. This does NOT affect node_modules dependencies.
 */
export function externalSubComponents(): Plugin {
  return {
    name: 'externalSubComponents',
    setup(build) {
      /** look for .js imports and add all of them as 'external' */
      build.onResolve({ filter: /.js$/ }, () => {
        return { external: true };
      });
    },
  };
}
