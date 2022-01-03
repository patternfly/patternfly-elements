import { pfeDevServerConfig } from '@patternfly/pfe-tools/dev-server.js';

/**
 * Resolves local monorepo package imports. Needed because we consume our own monorepo packages
 * @return {import('@web/dev-server-core').Plugin}
 */
export function resolvePFEMonorepoPlugin() {
  return {
    name: 'resolve-patternfly-elements-monorepo-packages',
    resolveImport({ source }) {
      if (source === '@patternfly/pfe-core') {
        return `/core/pfe-core/core.ts`;
      }
      const [match, pkg, path, ext] = source.match(/^@patternfly\/(pfe-?\w+)\/(.*).(js|scss)$/) ?? [];
      if (match) {
        switch (pkg) {
          case 'pfe-tools':
            return;
          case 'pfe-styles':
          case 'pfe-sass':
          case 'pfe-core':
            return `/core/${pkg}/${path}.${ext.replace('js', 'ts')}`;
          default:
            return `/elements/${pkg}/${path}.${ext.replace('js', 'ts')}`;
        }
      }
    },
  };
}

/** @return {import('@web/dev-server-core').Plugin} */
export function fakePrismModule() {
  return {
    name: 'fake-prismjs-module',
    transform(context) {
      if (context.path.endsWith('prismjs/prism.js')) {
        return `${context.body};export default window.Prism;`;
      }
    },
  };
}

export default pfeDevServerConfig({
  plugins: [
    resolvePFEMonorepoPlugin(),
    fakePrismModule(),
  ],
});
