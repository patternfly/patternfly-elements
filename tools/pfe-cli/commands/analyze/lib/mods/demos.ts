import type { Package } from 'custom-elements-manifest';

import _slugify from 'slugify';

// typescript nonsense
const slugify = _slugify as unknown as typeof _slugify.default;

import { readdir } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { getPfeConfig } from '@patternfly/pfe-tools/config.js';

import { exists } from '#lib/fs.js';
import { isCustomElementDeclaration } from '../tools/predicates.js';
import type { Analysis } from '../modify.js';

export async function addDemosToManifest(analysis: Analysis) {
  const { aliases, rootDir, demoURLPrefix, site, sourceControlURLPrefix } = getPfeConfig();
  const subpath = site.componentSubpath ?? 'components';

  const allTagNames = analysis.manifest.modules.flatMap(x => !x.declarations ? []
    : x.declarations.flatMap(y => (y as { tagName: string }).tagName)).filter(Boolean);

  for (const moduleDoc of analysis.manifest.modules) {
    const primaryElementName = moduleDoc.path.split(sep).find(x => x !== 'elements') ?? '';
    let demoPath = join(rootDir, 'elements', primaryElementName, 'demo');

    if (!await exists(demoPath)) {
      demoPath = join('elements', primaryElementName, 'demo');
    }

    if (primaryElementName && await exists(demoPath)) {
      const alias = aliases[primaryElementName] ?? primaryElementName.replace(/^\w+-/, '');
      const allDemos = (await readdir(demoPath)).filter(x => x.endsWith('.html'));
      for (const decl of moduleDoc.declarations ?? []) {
        if (isCustomElementDeclaration(decl) && decl.tagName) {
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

  return analysis;
}
