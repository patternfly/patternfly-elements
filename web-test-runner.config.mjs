export default {
  testFramework: {
    config: {
      ui: 'bdd'
    }
  },
  files: "elements/*/test/*.spec.js",
  groups: [
    {
      name: 'with-vue',
      testRunnerHtml: testFramework =>
        `<html>
          <head>
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
