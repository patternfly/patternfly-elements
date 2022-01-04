import type { PfeDevServerConfigOptions } from './dev-server';
import type { TestRunnerConfig } from '@web/test-runner';

import { defaultReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { junitReporter } from '@web/test-runner-junit-reporter';

import { pfeDevServerConfig } from './dev-server.js';
import { summaryReporter } from './test/summary-reporter.js';

export interface PfeTestRunnerConfigOptions extends PfeDevServerConfigOptions {
  files?: string[];
}

export function pfeTestRunnerConfig(opts: PfeTestRunnerConfigOptions): TestRunnerConfig {
  const { open, ...devServerConfig } = pfeDevServerConfig(opts);
  return {
    ...devServerConfig,
    files: ['**/*.spec.ts', '!**/*.e2e.spec.ts', '!**/node_modules/**/*', ...opts.files ?? []],
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
    testRunnerHtml: testFramework => `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
        </head>
        <body>
          <script type="module" src="${testFramework}"></script>
        </body>
      </html>
    `,
    groups: [
      {
        name: 'with-vue',
        testRunnerHtml: testFramework => `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
              <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js" crossorigin></script>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="${testFramework}"></script>
            </body>
          </html>
        `,
      },
      {
        name: 'with-react',
        testRunnerHtml: testFramework => `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
              <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
              <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
            </head>
            <body>
              <div id="root"></div>
              <script type="module" src="${testFramework}"></script>
            </body>
          </html>
        `,
      },
    ],
    reporters: [
      process.argv.some(x => x.match(/-w|--watch/)) ? defaultReporter({ reportTestProgress: true }) : summaryReporter({ flatten: false }),
      junitReporter({
        outputPath: './test-results/test-results.xml',
        reportLogs: true,
      }),
    ]
  };
}
