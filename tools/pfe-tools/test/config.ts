import type { TestRunnerConfig } from '@web/test-runner';

import { playwrightLauncher } from '@web/test-runner-playwright';
import { summaryReporter, defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';

import { pfeDevServerConfig, type PfeDevServerConfigOptions } from '../dev-server/config.js';

export interface PfeTestRunnerConfigOptions extends PfeDevServerConfigOptions {
  files?: string[];
  reporter?: 'summary' | 'default';
}

const isWatchMode = process.argv.some(x => x.match(/-w|--watch/));

const testRunnerHtml: TestRunnerConfig['testRunnerHtml'] = testFramework => /* html */`
  <html>
    <head>
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
      <script type="importmap">
      {
        "imports": {
          "@patternfly/icons/": "/node_modules/@patternfly/icons/"
        }
      }
      </script>
    </head>
    <body>
      <script type="module" src="${testFramework}"></script>
    </body>
  </html>
`;

export function pfeTestRunnerConfig(opts: PfeTestRunnerConfigOptions): TestRunnerConfig {
  const { open, ...devServerConfig } = pfeDevServerConfig({ ...opts, loadDemo: false });

  const configuredReporter = opts.reporter ?? 'summary';

  const reporters = [];
  if (isWatchMode) {
    if (configuredReporter === 'summary') {
      reporters.push(
        summaryReporter({ flatten: false }),
        defaultReporter({ reportTestResults: false, reportTestProgress: true }),
      );
    } else {
      reporters.push(
        defaultReporter(),
      );
    }
  } else {
    reporters.push(
      defaultReporter(),
      junitReporter({
        outputPath: './test-results/test-results.xml',
        reportLogs: true,
      }),
    );
  }

  return {
    ...devServerConfig,
    nodeResolve: true,
    files: ['**/*.spec.ts', '!**/*.e2e.ts', ...opts.files ?? [], '!**/node_modules/**/*', '!**/_site/**/*'],
    browsers: [
      playwrightLauncher({
        createBrowserContext: async ({ browser }) => {
          const context = await browser.newContext();
          // grant permissions to access the users clipboard
          await context.grantPermissions(['clipboard-read', 'clipboard-write']);
          return context;
        },
      }),
    ],
    testFramework: {
      config: {
        ui: 'bdd',
      },
    },
    testRunnerHtml,
    reporters,
    plugins: [
      ...devServerConfig.plugins ?? [],
      ...opts.plugins ?? [],
      a11ySnapshotPlugin(),
    ],
  };
}
