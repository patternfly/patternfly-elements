import type { Plugin } from 'esbuild';

/*
 * rewritepaths
 * This esbuild plugin looks for bare imports that begin with
 * @patternfly and prepares them to be used in the browser.
 *
 * For example
 * ```
 * import { PfCard } from "@patternfly/pf-card";
 * ```
 *
 * is rewritten to
 * ```
 * import { PfCard } from "../../pf-card/pf-card.js";
 * ```
 *
 * This plugin makes these assumptions
 * - The import string is a bare import
 * - The imported modules are in the @patternfly namespace
 *
 * Usage
 * Rewrite @patternfly bare module imports
 * ```
 * esbuild.build({
 *   plugins: [ rewritepaths ]
 * })
 * ```
 */

import { readFileSync } from 'fs';

export function rewritePaths(): Plugin {
  return {
    name: 'rewritepaths',
    setup(build) {
      build.onLoad({ filter: /\.js$/ }, ({ path }) => {
        const source = readFileSync(path, 'utf8');
        const contents = source.replace(/@patternfly\/(.*);?"/g, '../../$1/$1.js"');
        return {
          contents,
        };
      });
    },
  };
}
