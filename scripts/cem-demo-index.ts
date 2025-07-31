#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import type * as M from 'custom-elements-manifest/schema';

import manifest from '../elements/custom-elements.json' with { type: 'json' };

function isCustomElementDeclaration(decl: M.Declaration): decl is M.CustomElementDeclaration {
  return !!(decl as M.CustomElementDeclaration).customElement;
}

const RE = /^https:\/\/patternflyelements\.org\/components\/(?<slug>[\w-]+)\//;

const copy = structuredClone(manifest) as M.Package;

const getSlug = (demo: M.Demo) =>
  demo.url.match(RE)?.groups?.slug ?? '';

const isMainDemo = (tagName: string, demo: M.Demo): boolean =>
  demo.url.endsWith(`demo/${tagName}/`);

// replace all canonical demos with /
// e.g.
// from: https://patternflyelements.com/components/button/demo/button/
//   to: https://patternflyelements.com/components/button/demo/
// This is a stopgap. the ideal would be to either generate the canonical demo from the cem, aka knobs
// or to include it in the jsdoc in an @example tag
// or to rearrange the elements/*/demo/*.html file structure
await writeFile('custom-elements.json', JSON.stringify({
  ...manifest,
  modules: copy.modules.map(module => ({
    ...module,
    declarations: module.declarations?.map(decl => ({
      ...decl,
      demos:
          !isCustomElementDeclaration(decl) ? undefined
        : decl.demos?.map(demo => isMainDemo(decl.tagName!, demo) ? ({
          ...demo,
          url: `https://patternflyelements.com/components/${getSlug(demo)}/demo/`,
        }) : demo)
            .sort((a, b) =>
          isMainDemo(decl.tagName!, a) ? -1 : isMainDemo(decl.tagName!, b) ? 1 : 0),
    })),
  })),
}, null, 2), 'utf-8');
