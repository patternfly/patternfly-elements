# `@patternfly/pfe-tools`

Tools and utilities for building PatternFly Elements and other design systems.

## 11ty Helpers

Helpers for collating and rendering
[custom-elements manifests](https://github.com/webcomponents/custom-elements-manifest/)
in 11ty sites.

## custom-elements-manifest

Plugins and helpers for working with custom-elements-manifest analyzer

## esbuild-plugins

Helpers for working with esbuild in design system monorepos

## test

Helpers for testing web components using [web test runner](https://modern-web.dev/docs/test-runner/overview/)

## dev-server

Preset [web-dev-server](https://modern-web.dev/docs/dev-server/overview/) configuration.

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
