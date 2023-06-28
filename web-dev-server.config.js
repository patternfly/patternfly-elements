import { pfeDevServerConfig } from '@patternfly/pfe-tools/dev-server/config.js';

export default pfeDevServerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  tsconfig: 'tsconfig.esbuild.json',
  ssrModules: [
    'elements/pf-card/pf-card.js',
  ],
});
