import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test-runner.js';
import { fakePrismModule } from './web-dev-server.config.js';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';

export default pfeTestRunnerConfig({
  tsconfig: 'tsconfig.settings.json',
  files: ['!tools/create-element/templates/**/*'],
  // uncomment to get default wtr reporter
  // reporter: 'default',
  plugins: [
    fakePrismModule(),
    a11ySnapshotPlugin()
  ],
});
