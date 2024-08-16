import { readdir } from 'node:fs/promises';

const normalizeWorkspace = async x => {
  const ents = await readdir(new URL(x, import.meta.url).pathname, { withFileTypes: true });
  return ents
      .filter(ent => ent.isDirectory())
      .map(ent => ent.name.replace('pf-', ''));
};


export default ({
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [0],
    'body-max-line-length': [0],
    'scope-enum': [2, 'always', [
      'ci',
      'config',
      'create',
      'dependencies',
      'deps',
      'docs',
      'scripts',
      'elements',
      'core',
      'tools',
      ...await normalizeWorkspace('elements'),
      ...await normalizeWorkspace('core'),
      ...await normalizeWorkspace('tools'),
    ]],
  },
});
