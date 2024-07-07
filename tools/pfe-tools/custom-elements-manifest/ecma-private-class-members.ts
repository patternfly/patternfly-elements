import type { CustomElement } from 'custom-elements-manifest/schema';
import type { Plugin } from '@custom-elements-manifest/analyzer';

/**
 * cem plugin to mark ecma #private members as private
 */
export function ecmaPrivateClassMembersPlugin(): Plugin {
  return {
    name: 'ecma-private-class-members-plugin',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassElement(node)) {
        return;
      }
      const className = ts.isClassDeclaration(node?.parent) && node.parent.name?.getText();
      const classDoc = moduleDoc?.declarations?.find(declaration =>
        declaration.name === className) as CustomElement;

      const memberName = node?.name?.getText();
      const memberDoc = classDoc?.members?.find(member =>
        member.name === memberName);

      if (memberName?.startsWith('#') && memberDoc) {
        memberDoc.privacy = 'private';
      }
    },
  };
}
