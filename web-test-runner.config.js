import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test-runner.js';
import { fakePrismModule } from './web-dev-server.config.js';

export default pfeTestRunnerConfig({
  files: ['!tools/create-element/templates/**/*'],
  // uncomment to get default wtr reporter
  // reporter: 'default',
  plugins: [
    fakePrismModule(),
  ],
});
