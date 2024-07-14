import type {
  Declaration,
  ClassField,
  ClassDeclaration,
  ClassMember,
} from 'custom-elements-manifest/schema';
import type { Plugin } from '@custom-elements-manifest/analyzer';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function isClassDeclaration(decl: Declaration): decl is ClassDeclaration {
  return decl.kind === 'class';
}

function isVersionStatic(member: ClassMember): member is ClassField {
  return !!member.static && member.name === 'version';
}

/**
 * Add the static `version` field to custom element class declarations
 */
export function versionStaticFieldPlugin(): Plugin {
  return {
    name: 'version-static-field-plugin',
    packageLinkPhase({ customElementsManifest }) {
      for (const mod of customElementsManifest.modules) {
        for (const decl of mod.declarations ?? []) {
          if (isClassDeclaration(decl)) {
            const versionField = decl.members?.find(isVersionStatic);
            if (versionField) {
              try {
                const {
                  version,
                } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
                versionField.default = version;
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
                delete versionField.default;
              }
            }
          }
        }
      }
    },
  };
}
