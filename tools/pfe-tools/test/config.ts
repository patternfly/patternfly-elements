import type { TestRunnerConfig } from '@web/test-runner';

import { stat } from 'node:fs/promises';
import { chromeLauncher } from '@web/test-runner-chrome';
import puppeteer from 'puppeteer';
import { summaryReporter, defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import { a11ySnapshotPlugin } from '@web/test-runner-commands/plugins';

import { pfeDevServerConfig, type PfeDevServerConfigOptions } from '../dev-server/config.js';
import { getPfeConfig, getPrefixes } from '../config.js';

export interface PfeTestRunnerConfigOptions extends PfeDevServerConfigOptions {
  files?: string[];
  reporter?: 'summary' | 'junit' | 'default';
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
      <style>
        [data-pfe-focus-sentinel] {
          position: fixed;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }
      </style>
    </head>
    <body>
      <!--
        Trailing focus sentinel: gives Tab a destination outside the fixture.
        Without it, Chromium wraps focus onto the sole tabbable control, so Tab
        appears to be a no-op after the first successful blur-to-body.
        Do not add a leading sentinel — that steals initial Tab into the page.
      -->
      <script type="module" src="${testFramework}"></script>
      <span data-pfe-focus-sentinel="end" tabindex="0"></span>
      <script>
        (() => {
          const end = document.querySelector('[data-pfe-focus-sentinel="end"]');
          if (!end) return;
          new MutationObserver(() => {
            if (document.body.lastElementChild !== end) {
              document.body.append(end);
            }
          }).observe(document.body, { childList: true });
        })();
      </script>
    </body>
  </html>
`;

const exists = async (path: string | URL) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

/**
 * @param opts test runner options
 */
export function pfeTestRunnerConfig(opts: PfeTestRunnerConfigOptions): TestRunnerConfig {
  const { open, ...devServerConfig } = pfeDevServerConfig({ ...opts, loadDemo: false });

  const config = getPfeConfig();
  const { elementsDir } = config;
  const tagPrefixes = getPrefixes(config);

  const configuredReporter = opts.reporter ?? 'default';

  const reporters = configuredReporter === 'summary' && isWatchMode ? [
    summaryReporter({ flatten: !!process.env.CI }),
    defaultReporter(),
  ] : configuredReporter === 'summary' ? [
    summaryReporter({ flatten: !!process.env.CI }),
  ] : [
    defaultReporter(),
  ];

  if (process.env.CI) {
    reporters.push(
      junitReporter({
        outputPath: './test-results/test-results.xml',
        reportLogs: true,
      })
    );
  }

  return {
    ...devServerConfig,
    nodeResolve: {
      exportConditions: ['production'],
    },
    files: [
      '**/*.spec.ts',
      '!**/*.e2e.ts',
      ...opts.files ?? [],
      '!**/node_modules/**/*',
      '!**/_site/**/*',
    ],
    browsers: [
      chromeLauncher({
        puppeteer: puppeteer as never,
        launchOptions: {
          args: process.env.CI ? ['--no-sandbox'] : [],
        },
        createBrowserContext: async ({ browser }) => {
          const context = await browser.defaultBrowserContext();
          await context.overridePermissions('http://localhost', [
            'clipboard-read',
            'clipboard-write',
          ]);
          return context;
        },
      }),
    ],
    concurrency: 1,
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
    middleware: [
      /**
       * redirect `.js` to `.ts` when the typescript source exists
       * @param ctx koa context
       * @param next next middleware
       */
      async function(ctx, next) {
        if (ctx.path.endsWith('.js')
            && tagPrefixes.some(p => ctx.path.startsWith(`/${elementsDir}/${p}-`))
            && await exists(`./${ctx.path}`.replace('.js', '.ts').replace('//', '/'))) {
          ctx.redirect(ctx.path.replace('.js', '.ts'));
        } else {
          return next();
        }
      },
    ],
  };
}
