import type { ClassMember } from 'custom-elements-manifest/schema';
import type { Plugin } from '@custom-elements-manifest/analyzer';

import dedent from 'dedent';

const DESCRIBABLES = [
  'members',
  'events',
  'slots',
  'cssProperties',
  'cssParts',
  'fields',
];

/**
 * Traverse sources for PFElement.create() calls
 * @see https://github.com/open-wc/custom-elements-manifest/blob/master/packages/analyzer/src/features/analyse-phase/custom-elements-define-calls.js
 */
export function deprecatedDescriptionInlineTagPlugin(): Plugin {
  return {
    name: 'deprecated-description-inline-tag-plugin',
    moduleLinkPhase({ moduleDoc }) {
      moduleDoc.description &&= dedent(moduleDoc.description);
      for (const decl of moduleDoc.declarations ?? []) {
        decl.description &&= dedent(moduleDoc.description ?? '');
        switch (decl.kind) {
          case 'class':
          case 'mixin':
            for (const key of DESCRIBABLES as (keyof typeof decl)[]) {
              const collection = decl[key];
              if (Array.isArray(collection)) {
                for (const item of collection as ClassMember[]) {
                  const DEPRECATED_RE = /{@deprecated(.*)}/;

                  const match = item.description?.match?.(DEPRECATED_RE);

                  if (match) {
                    const [, reason] = match;
                    // @ts-expect-error: https://github.com/webcomponents/custom-elements-manifest/pull/89
                    item.deprecated = reason?.trim?.() || true;
                    item.description = item.description?.replace(DEPRECATED_RE, '') ?? '';
                  }
                }
              }
            }
        }
      }
    },
  };
}
