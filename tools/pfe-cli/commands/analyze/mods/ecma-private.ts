import type { Package } from 'custom-elements-manifest';

export function ecmaPrivate(manifest: Package): Package {
  return {
    ...manifest,
    modules: manifest.modules.map(module => ({
      ...module,
      declarations: module.declarations?.map(decl => {
        if (decl.kind !== 'class') {
          return decl;
        } else {
          return ({
            ...decl,
            members: decl.members?.map(member => ({
              ...member,
              privacy: member.name.startsWith('#') ? 'private' : member.privacy,
            })),
          });
        }
      }),
    })),
  };
}
