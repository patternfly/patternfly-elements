# `@patternfly/pfe-tools`

Tools and utilities for building PatternFly Elements and other design systems.

## Config

Repos using pfe-tools can customize the docs pages, dev server, and custom-elements manifest
generator by adding a `.pfe.config.json` file to the repository root.

See [config.ts](./config.ts) for info on what that file can contain.

## 11ty Helpers

- Helpers for collating and rendering [custom-elements manifests][cem] in 11ty
  sites.
- Various 11ty utility plugins

## test

Helpers for testing web components using [web test runner][wtr]

## dev-server

Preset [web-dev-server][wds] configuration.

### Troubleshooting

> I ran `npm start` but get `404 not found` when the dev server launches the browser

The dev server config in pfe-tools tries its best to find the root directory of your project,
but there are cases where this may not work. If you get a 404 error to index.html, 

1. Confirm that you have an `index.html` file in your repository root
2. Set the `rootDir` option to `pfeDevServerConfig`, e.g.
    ```js
    // web-dev-server.config.js
    import { pfeDevServerConfig } from '@patternfly/pfe-tools/dev-server.js';

    export default pfeDevServerConfig({
      rootDir: '.',
    });
    ```

Make sure to do the same in `web-test-runner.config.js` as well, for your unit tests

[cem]: https://github.com/webcomponents/custom-elements-manifest/
[wds]: https://modern-web.dev/docs/dev-server/overview/
[wtr]: https://modern-web.dev/docs/test-runner/overview/
