import type { Plugin } from '@custom-elements-manifest/analyzer';
import type { CustomElement } from 'custom-elements-manifest/schema';

/**
 * For reasons unknown, some events come back without a name
 */
export function sanitizeEventsPlugin(): Plugin {
  return {
    name: 'sanitize-events-plugin',
    moduleLinkPhase({ moduleDoc }) {
      for (const decl of moduleDoc.declarations ?? []) {
        switch (decl.kind) {
          case 'class':
          case 'mixin':
            for (const event of (decl as CustomElement).events ?? []) {
              if (!event.name) {
                (decl as CustomElement).events =
                  (decl as CustomElement).events?.filter(x => x !== event);
              }
            }
        }
      }
    },
  };
}
