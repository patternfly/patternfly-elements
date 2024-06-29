import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test/config.js';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';

export default pfeTestRunnerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  tsconfig: 'tsconfig.esbuild.json',
  files: ['!tools/create-element/templates/**/*'],
  // uncomment to get default wtr reporter
  reporter: 'default',
  plugins: [
    a11ySnapshotPlugin(),
  ],
  middleware: [
    async function(ctx) {
      if (ctx.path.match(/@patternfly\/icons\/.*\.js/)) {
        ctx.redirect(`/node_modules/${ctx.path}`);
      }
    },
  ],
});
