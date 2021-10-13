import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  browsers: [
    playwrightLauncher({
      createBrowserContext: async ({ browser, config }) => {
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
      // override default of 2000 miliseconds to support testing
      // state changes in pfe-clipboard
      timeout: '3500',
    }
  },
  files: "elements/*/test/*.spec.js",
  testRunnerHtml: testFramework =>
    `<html>
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
  groups: [
    {
      name: 'with-vue',
      testRunnerHtml: testFramework =>
        `<html>
          <head>
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
            <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js" crossorigin></script>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="${testFramework}"></script>
          </body>
        </html>`,
    },
    {
      name: 'with-react',
      testRunnerHtml: testFramework =>
        `<html>
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
        </html>`,
    }
  ]
};
