import type { Plugin } from '@custom-elements-manifest/analyzer';
import type { PfeConfig } from '../config.js';

import { isCustomElement } from './lib/Manifest.js';
import { readdirSync, existsSync } from 'node:fs';
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
 * `/elements/pf-jazz-hands/demo/pf-jazz-hands.html` would be associated with
 * `/elements/pf-jazz-hands/pf-jazz-hands.js`.
 *
 * Demo files which match any tag name in the manifest will be associated with that tag, e.g.
 * `/elements/pf-jazz-hands/demo/pf-jazz-shimmy.html` would be associated with
 * `/elements/pf-jazz-hands/pf-jazz-shimmy.js`.
 *
 * Any remaining demos will all be added to the primary element's list, e.g.
 * `/elements/pf-jazz-hands/demo/accessibility.html` would be associated with
 * `/elements/pf-jazz-hands/pf-jazz-hands.js`
 */
export function demosPlugin(options?: PfeConfig): Plugin {
  const fileOptions = getPfeConfig(options?.rootDir);
  const config = { ...fileOptions, ...options };
  const subpath = config.site.componentSubpath ?? 'components';
  const { rootDir, demoURLPrefix, sourceControlURLPrefix } = config;
  return {
    name: 'demos-plugin',
    packageLinkPhase({ customElementsManifest }) {
      const allTagNames = customElementsManifest.modules.flatMap(x => !x.declarations ? []
        : x.declarations.flatMap(y => (y as { tagName: string }).tagName)).filter(Boolean);

      for (const moduleDoc of customElementsManifest.modules) {
        const primaryElementName = moduleDoc.path.split(sep).find(x => x !== 'elements') ?? '';
        let demoPath = join(rootDir, 'elements', primaryElementName, 'demo');

        if (!existsSync(demoPath)) {
          demoPath = join('elements', primaryElementName, 'demo');
        }

        if (primaryElementName && existsSync(demoPath)) {
          const alias = config.aliases[primaryElementName] ?? primaryElementName.replace(/^\w+-/, '');
          const allDemos = readdirSync(demoPath).filter(x => x.endsWith('.html'));
          for (const decl of moduleDoc.declarations ?? []) {
            if (isCustomElement(decl) && decl.tagName) {
              decl.demos ??= [];
              const { tagName } = decl;
              for (const demo of allDemos) {
                const demoName = demo.replace(/\.html$/, '');
                const slug = slugify(alias, { strict: true, lower: true });
                const href = new URL(`elements/${primaryElementName}/demo/${demo}/`, sourceControlURLPrefix || '/').href.replace(/\/$/, '');
                if (demoName === tagName && demoName === primaryElementName) {
                // case: elements/pf-jazz-hands/demo/pf-jazz-hands.html
                  const { href: url } = new URL(`/${subpath}/${slug}/demo/`, demoURLPrefix || '/');
                  decl.demos.push({ url, source: { href } });
                } else if (allTagNames.includes(demoName) && demoName === tagName) {
                // case: elements/pf-jazz-hands/demo/pf-jazz-shimmy.html
                  const { href: url } = new URL(`/${subpath}/${slug}/demo/${demoName}/`, demoURLPrefix || '/');
                  decl.demos.push({ url, source: { href } });
                } else if (tagName === primaryElementName && !allTagNames.includes(demoName)) {
                // case: elements/pf-jazz-hands/demo/ack.html
                  const { href: url } = new URL(`/${subpath}/${slug}/demo/${demoName}/`, demoURLPrefix || '/');
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
