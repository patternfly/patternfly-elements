import type { CustomElement } from 'custom-elements-manifest/schema';
import type { ClassDeclaration, JSDoc } from 'typescript';
import type { Plugin } from '@custom-elements-manifest/analyzer';

import { parse } from 'comment-parser';

import dedent from 'dedent';

const DEFAULT_RE = /{@default ([^}]*)}/;

export function cssCustomPropertiesDefaultPlugin(): Plugin {
  return {
    name: 'css-custom-properties-default-plugin',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) {
        return;
      }
      const className = node?.name?.getText();
      const classDoc = moduleDoc?.declarations?.find(declaration =>
        declaration.name === className) as CustomElement;

      /**
       * Because we use a bunch of 'non-standard' JSDoc annotations, TS doesn't recognize most of them.
       * Instead we use `comment-parser` to parse the JSDoc.
       *
       * Loops through each JSDoc (yes, there can be multiple) above a class, and parses every JSDoc annotation
       *
       * Checks to see if the item is already in the classDoc, and if so merge and overwrite (JSDoc takes precedence)
       */
      (node as unknown as ClassDeclaration & { jsDoc: JSDoc[] })?.jsDoc?.forEach(jsDoc => {
        const parsed = parse(jsDoc?.getFullText(), { spacing: 'preserve' });
        parsed?.forEach(parsedJsDoc => {
          /**
           * If any of the tags is a `@typedef`, we ignore it; this JSDoc comment may be above a class,
           * it probably doesnt _belong_ to the class, but something else in the file
           */
          if (parsedJsDoc?.tags?.some(tag => tag?.tag === 'typedef')) {
            return;
          }

          parsedJsDoc?.tags?.forEach(jsDoc => {
            switch (jsDoc.tag) {
              case 'cssprop':
              case 'cssproperty': {
                const existing = classDoc?.cssProperties?.find?.(x => x.name === jsDoc.name);
                if (!existing) {
                  return;
                }

                // @ts-expect-error: exactly my point!
                if (existing.type) {
                  // @ts-expect-error: it does in the draft spec
                  existing.syntax = existing.type.text;
                  // @ts-expect-error: exactly my point!
                  delete existing.type;
                }

                const [, defaultTag] = existing.description?.match?.(DEFAULT_RE) ?? [];

                if (defaultTag) {
                  existing.default = defaultTag;
                  existing.description =
                    dedent(existing.description?.replace(DEFAULT_RE, '') ?? '');
                }
              }
            }
          });
        });
      });
    },
  };
}
