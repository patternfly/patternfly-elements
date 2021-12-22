import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test-runner.js';
import { resolvePFEMonorepoPlugin, fakePrismModule } from './web-dev-server.config.js';

export default pfeTestRunnerConfig({
  files: ['!tools/create-element/templates/**/*'],
  plugins: [
    resolvePFEMonorepoPlugin(),
    fakePrismModule(),
  ],
});
