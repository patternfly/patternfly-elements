import { pfeDevServerConfig } from '@patternfly/pfe-tools/dev-server.js';

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
  tsconfig: 'tsconfig.settings.json',
  plugins: [
    fakePrismModule(),
  ],
});
