import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test/config.js';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';

export default pfeTestRunnerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  tsconfig: 'tsconfig.esbuild.json',
  files: ['!tools/pfe-cli/commands/generate/templates/**/*'],
  // uncomment to get default wtr reporter
  // reporter: 'default',
  plugins: [
    a11ySnapshotPlugin()
  ],
});
