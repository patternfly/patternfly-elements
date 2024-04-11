import type { Plugin } from '@custom-elements-manifest/analyzer';
import type { JSDoc } from 'typescript';

/**
 * provides the summary field on classes
 */
export function summaryPlugin(): Plugin {
  return {
    name: 'summary-plugin',
    analyzePhase({ ts, node, moduleDoc }) {
      if (ts.isClassDeclaration(node)) {
        const name = node.name?.getText();
        if (name) {
          const decl = moduleDoc.declarations?.find?.(x => x.name === name);
          if (decl && !decl.summary) {
            const summary = (node as typeof node & { jsDoc: JSDoc })
                ?.jsDoc
                ?.tags
                ?.find?.(x => x.tagName.getText() === 'summary')
                ?.comment;
            if (summary) {
              decl.summary = summary.toString();
            }
          }
        }
      }
    },
  };
}
