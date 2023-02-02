import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test/config.js';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';

export default pfeTestRunnerConfig({
  tsconfig: 'tsconfig.settings.json',
  files: ['!tools/**/templates/**/*'],
  // uncomment to get default wtr reporter
  // reporter: 'default',
  plugins: [
    a11ySnapshotPlugin()
  ],
});
