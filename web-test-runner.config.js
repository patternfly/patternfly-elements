import { pfeTestRunnerConfig } from '@patternfly/pfe-tools/test/config.js';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';
import { getPatternflyIconNodemodulesImports } from '@patternfly/pfe-tools/dev-server/config.js';

export default pfeTestRunnerConfig({
  // workaround for https://github.com/evanw/esbuild/issues/3019
  tsconfig: 'tsconfig.esbuild.json',
  files: ['!tools/create-element/templates/**/*'],
  // uncomment to get default wtr reporter
  ...!process.env.CI && {
    reporter: 'default',
  },
  importMapOptions: {
    providers: {
      'zero-md': 'nodemodules',
      '@patternfly/icons': 'nodemodules',
      '@patternfly/elements': 'monorepotypescript',
      '@patternfly/pfe-tools': 'monorepotypescript',
      '@patternfly/pfe-core': 'monorepotypescript',
    },
    inputMap: {
      imports: {
        '@patternfly/pfe-tools/environment.js': './_site/tools/environment.js',
        ...await getPatternflyIconNodemodulesImports(import.meta.url),
      },
    },
  },
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
