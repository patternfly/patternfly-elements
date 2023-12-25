import { pfeDevServerConfig } from '@patternfly/pfe-tools/dev-server/config.js';

export default pfeDevServerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  tsconfig: 'tsconfig.esbuild.json',
  providers: {
    '@patternfly/icons': 'nodemodules',
    '@patternfly/elements': 'monorepotypescript',
    '@patternfly/pfe-tools': 'monorepotypescript',
    '@patternfly/pfe-core': 'monorepotypescript',
  },
});
