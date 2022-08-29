import type { Plugin } from '@custom-elements-manifest/analyzer';
import type { PfeConfig } from '../config.js';

import { isCustomElement } from './lib/Manifest.js';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, sep } from 'node:path';
import { getPfeConfig } from '../config.js';
import slugify from 'slugify';

/**
 * Adds demo entries to element declarations
 *
 * Tries to determine a custom element manifest module's 'primary' element by:
 * - in a single-package-repo: taking the path part after `/elements`
 * - in a monorepo: reading the package JSON of the local package and taking the part after the scope
 *
 * The primary element's demo is it's own tag name, e.g.
 * `/elements/pfe-jazz-hands/demo/pfe-jazz-hands.html` would be associated with
 * `/elements/pfe-jazz-hands/pfe-jazz-hands.js`.
 *
 * Demo files which match any tag name in the manifest will be associated with that tag, e.g.
 * `/elements/pfe-jazz-hands/demo/pfe-jazz-shimmy.html` would be associated with
 * `/elements/pfe-jazz-hands/pfe-jazz-shimmy.js`.
 *
 * Any remaining demos will all be added to the primary element's list, e.g.
 * `/elements/pfe-jazz-hands/demo/accessibility.html` would be associated with
 * `/elements/pfe-jazz-hands/pfe-jazz-hands.js`
 */
export function demosPlugin(options?: PfeConfig): Plugin {
  const config = { ...getPfeConfig(), ...options };
  const { rootDir, demoURLPrefix, sourceControlURLPrefix } = config;
  return {
    name: 'demos-plugin',
    packageLinkPhase({ customElementsManifest }) {
      const allTagNames = customElementsManifest.modules.flatMap(x => !x.declarations ? []
        : x.declarations.flatMap(y => (y as { tagName: string }).tagName)).filter(Boolean);

      for (const moduleDoc of customElementsManifest.modules) {
        let demoPath = join(rootDir, 'demo');
        let primaryElementName;
        if (!existsSync(demoPath) && moduleDoc.path.startsWith('elements/')) {
          [, primaryElementName] = moduleDoc.path.split(sep);
          demoPath = join('elements', primaryElementName, 'demo');
        } else {
          [, primaryElementName] = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8')).name.split('/');
        }

        if (existsSync(demoPath)) {
          const alias = config.aliases[primaryElementName] ?? primaryElementName.replace(/^\w+-/, '');
          const allDemos = readdirSync(demoPath).filter(x => x.endsWith('.html'));
          for (const decl of moduleDoc.declarations ?? []) {
            if (isCustomElement(decl) && decl.tagName) {
              decl.demos ??= [];
              const { tagName } = decl;
              for (const demo of allDemos) {
                const demoName = demo.replace(/\.html$/, '');
                const slug = slugify(alias).toLowerCase();
                const href = new URL(`elements/${primaryElementName}/demo/${demo}/`, sourceControlURLPrefix || '/').href.replace(/\/$/, '');
                if (demoName === tagName && demoName === primaryElementName) {
                // case: elements/pfe-jazz-hands/demo/pfe-jazz-hands.html
                  const { href: url } = new URL(`/components/${slug}/demo/`, demoURLPrefix || '/');
                  decl.demos.push({ url, source: { href } });
                } else if (allTagNames.includes(demoName) && demoName === tagName) {
                // case: elements/pfe-jazz-hands/demo/pfe-jazz-shimmy.html
                  const { href: url } = new URL(`/components/${slug}/demo/${demoName}/`, demoURLPrefix || '/');
                  decl.demos.push({ url, source: { href } });
                } else if (tagName === primaryElementName && !allTagNames.includes(demoName)) {
                // case: elements/pfe-jazz-hands/demo/ack.html
                  const { href: url } = new URL(`/components/${slug}/demo/${demoName}/`, demoURLPrefix || '/');
                  decl.demos.push({ url, source: { href } });
                }
              }
              if (!decl.demos.length) {
                delete decl.demos;
              } else {
                decl.demos.sort(a => a.url.endsWith('/demo/') ? -1 : 0);
              }
            }
          }
        }
      }
    },
  };
}
