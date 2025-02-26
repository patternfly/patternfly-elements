# @patternfly/pfe-tools

## 4.0.2
### Patch Changes

- 2910260: Update changesets version

## 4.0.1

### Patch Changes

- d2cd76d: **Test Runner**: prevent config exception when lightdom shims are present

## 4.0.0

### Major Changes

- f779095: Removes `EleventyRenderPlugin` from custom-elements-manifest 11ty plugin config. Ensure you add it yourself.

  Before:

  ```js
  module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(CustomElementsManifestPlugin);
  };
  ```

  After:

  ```js
  import { EleventyRenderPlugin } from "@11ty/eleventy"; // 3.0.0 only
  export default function (eleventyConfig) {
    eleventyConfig.addPlugin(CustomElementsManifestPlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  }
  ```

## 3.0.2

### Patch Changes

- 4a03ced: SSR: add shim for `ResizeObserver`

## 3.0.1

### Patch Changes

- 921e5d5: TypeScript CSS Import Transforms: allow importing from bare specifiers

## 3.0.0

### Major Changes

- 1ca3515: **Custom Elements Manifest**: Removed support for non-standard inline `{@default value}` JSDoc tags. Use standard syntax instead

  **Before**:

  ```js
  /**
   * @cssprop --foo {@default bar} Foo
   */
  ```

  **After**:

  ```js
  /**
   * @cssprop [--foo=bar] Foo
   */
  ```

- c9bd577: **Custom Elements Manifest**: added `custom-elements-manifest.js`, which exports the function `getAllManifests`

  ```js
  import { getAllManifests } from "@patternfly/pfe-tools/custom-elements-manifest/custom-elements-manifest/.js";

  for (const manifest of getAllManifests()) {
    const packageName = manifest.packageJson?.name ?? "package";
    console.log(
      `Available Elements in ${packageName}`,
      ...manifest.getTagNames()
    );
  }
  ```

### Minor Changes

- c9bd577: `a11ySnapshot`: Added chai assertions for various accessibility-tree scenarios

  Examples:

  ```ts
  describe("<pf-accordion>", function () {
    beforeEach(() =>
      fixture(html`
        <pf-accordion>
          <pf-accordion-header id="header1">header-1</pf-accordion-header>
          <pf-accordion-panel>panel-1</pf-accordion-panel>
        </pf-accordion>
      `)
    );
    describe("clicking the first heading", function () {
      beforeEach(clickFirstHeading);
      it("expands the first panel", async function () {
        expect(await a11ySnapshot()).to.axContainName("panel-1");
      });
      it("focuses the first panel", async function () {
        expect(await a11ySnapshot()).to.have.axTreeFocusOn(
          document.getElementById("header1")
        );
      });
      it("shows the collapse all button", async function () {
        expect(await a11ySnapshot()).to.axContainRole("button");
      });
    });
  });
  ```

- c9bd577: Added `querySnapshot` accessibility testing helper

  ```ts
  describe("then clicking the toggle", function () {
    beforeEach(async function () {
      await clickElementAtCenter(toggle);
    });
    it("expands the disclosure panel", async function () {
      const snapshot = await a11ySnapshot();
      const expanded = querySnapshot(snapshot, { expanded: true });
      expect(expanded).to.be.ok;
    });
  });
  ```

- c9bd577: **TypeScript**: Add static version transformer. This adds a runtime-only
  static `version` field to custom element classes.

  ```js
  import "@patternfly/elements/pf-button/pf-button.js";
  const PFE_VERSION = await customElements
    .whenDefined("pf-button")
    .then((PfButton) => PfButton.version);
  ```

### Patch Changes

- c9bd577: updated dependencies
- 9d68f3d: **Dev Server**: load lightdom shim files
- 9d68f3d: **Dev Server**: reload on typescript file changes
- f3f68c9: Windows compatibility for various tools packages
- c9bd577: **Dev Server**: use last modified time for the dev server cache
- c9bd577: **Test Runner Config**: import the production version of Lit for tests, reducing
  console chatter during test runs

## 2.0.3

### Patch Changes

- aca8409: **React**: ensure that only classes which are exported get wrapped

## 2.0.2

### Patch Changes

- c57c5dd: Dev Server: redirect demo links to css lightdom subresources
- 9995136: **React**: corrected syntax error in some generated modules

## 2.0.1

### Patch Changes

- d50a651: Dev Server: update icon and theme colours
- 65079fb: Update typescript types

## 2.0.0

### Major Changes

- de4cfa4: Remove `DocsPage` render functions
- de4cfa4: Dev server config no longer uses `nodeResolution`. Instead you must provide configuration for the import map plugin.

  ```js
  import {
    pfeDevServerConfig,
    getPatternflyIconNodemodulesImports,
  } from "@patternfly/pfe-tools/dev-server/config.js";

  export default pfeDevServerConfig({
    importMapOptions: {
      providers: {
        "zero-md": "nodemodules",
        "@patternfly/icons": "nodemodules",
        "@patternfly/elements": "nodemodules",
        "@patternfly/pfe-tools": "nodemodules",
        "@patternfly/pfe-core": "nodemodules",
      },
      inputMap: {
        imports: {
          ...(await getPatternflyIconNodemodulesImports(import.meta.url)),
        },
      },
    },
  });
  ```

- de4cfa4: Remove react and vue test wrapper helpers. Use React wrapper components instead.

### Minor Changes

- 502e931: React wrapper generator: add parameters to support different packages

### Patch Changes

- e6ca914: Update dependencies
- fd1202d: `typescript/css-imports`: prevent shared css modules from being inlined to files; emit them instead.
- 22d7536: Update typescript version
- 50f462c: Update dependencies, including Lit version 3

## 1.5.0

### Minor Changes

- 57b7dba20: Test: add `clickElementAtOffset` utility function for tests
- dcdbce66d: Test: add `clickElementAtCenter` utility function for tests

## 1.4.2

### Patch Changes

- 91850fbf8: fixed TypeScript typings for react wrappers

## 1.4.1

### Patch Changes

- 1924229ea: Generate TypeScript typings for React wrapper components

## 1.4.0

### Minor Changes

- f4a7ae7d7: **React**: adds `@patternfly/pfe-tools/react/generate-wrappers.js`

  Use this to generate React component wrappers for Lit custom elements,
  based on their `custom-elements.json` manifest.

  ```js
  import { generateReactWrappers } from "@patternfly/pfe-tools/react/generate-wrappers.js";

  const inURL = new URL("../elements/custom-elements.json", import.meta.url);
  const outURL = new URL("../elements/react/", import.meta.url);

  await generateReactWrappers(inURL, outURL);
  ```

### Patch Changes

- 699a812bf: `11ty`: prevent duplicate IDs on code pages when multiple elements are documented

## 1.3.2

### Patch Changes

- cdd1d4232: `DocsPage`: renders headings as markdown ([PR](https://github.com/patternfly/patternfly-elements/pull/2516))
- d7dd0353b: `dev-server`: Corrects aliased elements redirects

## 1.3.1

### Patch Changes

- d5c6c199f: **Dev Server**: fixes `*-lightdom.css` support in config

## 1.3.0

### Minor Changes

- 4832b29ab: **Test Helpers**: Added `allUpdates` test helper, which waits until an element
  completely finishes updating.

  ```js
  const element = await fixture(html`<my-el></my-el>`);
  await allUpdates(element);
  ```

### Patch Changes

- a4c20b70d: **Dev Server**: updates router to use project subpath configuration

## 1.2.0

### Minor Changes

- 69e7f5b9e: Added `site.componentSubpath` config to `.pfe.config.json`, representing the
  site subpath for component pages and demos. Default is `'components'`.

## 1.1.1

### Patch Changes

- 90b3ade12: Removes special characters from component slugs ie. `special (characters)` becomes `special-characters`

## 1.1.0

### Minor Changes

- 79f30b8f6: `11ty/plugins/custom-elements-manifest.cjs`: added `renderTitleInOverview`
  option, a boolean flag which defaults to `true`.

  When true, this option renders an `<h1>` in the element's docs page's "Overview"
  section.

  Note: the next major release will switch this option to `false` by default, so
  to prepare your docs pages, add your own headings:

  BEFORE:

  ```md
  {% renderOverview %}
  <pf-jazz-hands></pf-jazz-hands>
  {% endrenderOverview %}
  ```

  AFTER:

  ```md
  <section class="band">
    <h1 id="jazz-hands">Jazz Hands</h1>
  </section>

  {% renderOverview %}
  <pf-jazz-hands></pf-jazz-hands>
  {% endrenderOverview %}
  ```

## 1.0.1

### Patch Changes

- cfc5913c6: `pfe-tools`:
  - Updated dev server header styles to match look and feel of 11ty documentation site
  - Added `repoHost` to `PfeConfig` which enables customizing the dev server repository host name and icon

## 1.0.0

### Major Changes

- d01c7e067: Removed and deprecated esbuild and cem/a features

  ### Breaking Changes

  - ❌ Removed esbuild helpers
  - 💱 Moved custom-elements-manifest config helper to `custom-elements-manifest/config.js`
  - 💱 Moved dev-server config helper to `dev-server/config.js`
  - 💱 Moved test-runner config helper to `test-runner/config.js`
  - ⚠️ Deprecated custom-elements-manifest helpers

### Minor Changes

- c76a65b93: ✨ Added `minify` option to `@patternfly/pfe-tools/typescript/transformers/css-imports.cjs`
- 99db432f4: ✨ Added `anchors` 11ty plugin, based on [@orchidjs/eleventy-plugin-ids][npm]

  [npm]: https://npm.im/@orchidjs/eleventy-plugin-ids

- d4a99f6c2: ✨ Added `@patternfly/pfe-tools` package

  - ✨ Added dev server and test runner configs
  - ✨ Added custom-elements-manifest analyzer configs and plugins
  - ✨ Added typescript transform to inline css imports
  - ✨ Added 11ty plugins to render custom element manifests, etc.
  - ✨ Added test helpers like `a11ySnapshot`
  - ✨ Added `Logger` stub for quieter tests
  - ✨ Added `colored(colorString)` assertion to chai when using `createFixture`
    ```js
    expect("rgba(0,0,0,0)").to.be.colored("transparent");
    ```
  - ✨ Added an optional unified config file for custom elements manifest, dev
    server, and docs pages

    Create a `.pfe.config.json` file at the root of your project to customize the
    pfe tools builds.

    The default values are:

    ```json
    {
      "tagPrefix": "pfe",
      "demoURLPrefix": "https://patternflyelements.org/",
      "sourceControlURLPrefix": "https://github.com/patternfly/patternfly-elements/tree/main/",
      "aliases": {},
      "site": {
        "title": "PatternFly Elements",
        "description": "PatternFly Elements: A set of community-created web components based on PatternFly design.",
        "favicon": "/brand/logo/svg/pfe-icon-blue.svg",
        "logoUrl": "/brand/logo/svg/pfe-icon-white-shaded.svg",
        "stylesheets": []
      }
    }
    ```

    See `@patternfly/pfe-tools/config.d.ts` for more information.

### Patch Changes

- 0a22a3375: `dev-server`: refresh element css when files change
- 3ab1de179: Allowed TypeScript modules to import multiple CSS modules when inlining CSS.
- f03a41941: 11ty plugin: calculate path to demo files in more circumstances
- 42d5cd9fb: `a11ySnapshot`: fixed typescript types
- 5d3315fd4: Prepared release candidate
- b3b472ef6: update 11ty
- 3035d9163: analyzer: find demos in different repo setups
- 66b025d86: dev-server: fixed demo script import and styles

## 1.0.0-rc.8

### Patch Changes

- 0a22a3375: `dev-server`: refresh element css when files change
- f03a41941: 11ty plugin: calculate path to demo files in more circumstances
- 42d5cd9fb: `a11ySnapshot`: fixed typescript types

## 1.0.0-rc.7

### Patch Changes

- b3b472ef6: update 11ty

## 1.0.0-rc.6

### Patch Changes

- 66b025d86: dev-server: fixed demo script import and styles

## 1.0.0-rc.5

### Patch Changes

- 3035d9163: analyzer: find demos in different repo setups

## 1.0.0-rc.4

### Minor Changes

- c76a65b93: ✨ Added `minify` option to `@patternfly/pfe-tools/typescript/transformers/css-imports.cjs`

### Patch Changes

- 3ab1de179: Allowed TypeScript modules to import multiple CSS modules when inlining CSS.

## 1.0.0-rc.3

### Minor Changes

- 99db432f4: ✨ Added `anchors` 11ty plugin, based on [@orchidjs/eleventy-plugin-ids][npm]

  [npm]: https://npm.im/@orchidjs/eleventy-plugin-ids

## 1.0.0-rc.2

### Major Changes

- d01c7e067: Removed and deprecated esbuild and cem/a features

  ### Breaking Changes

  - ❌ Removed esbuild helpers
  - 💱 Moved custom-elements-manifest config helper to `custom-elements-manifest/config.js`
  - 💱 Moved dev-server config helper to `dev-server/config.js`
  - 💱 Moved test-runner config helper to `test-runner/config.js`
  - ⚠️ Deprecated custom-elements-manifest helpers

## 1.0.0-rc.1

### Patch Changes

- 5d3315fd: Prepared release candidate

## 1.0.0-next.41

### Patch Changes

- 457eaa9d0: `pfe-tools`: Set typescript compilerOptions `composite: true`

  `pfe-tooltip`: Added return type for anonymous function for content in constructor

## 1.0.0-next.40

### Patch Changes

- 6369ee00d: load elementinternals polyfill in dev server
- fb96c92ed: Added `disabled` property to a11y snapshot type
- b841afe40: tools: made `a11ySnapshot` helper a bit more ergonomic
- 0fe6c52db: Added constructible stylesheets polyfill to dev server
- b841afe40: tools: fixed demo server hamburger buttons

## 1.0.0-next.39

### Minor Changes

- d47ecddf: Added `A11ySnapshot` type to pfe-tools

## 1.0.0-next.38

### Patch Changes

- 8294d385: Fixed package publishing automation scripts.

## 1.0.0-next.37

### Patch Changes

- 6b6e2617: Updates use of pfe-button

## 1.0.0-next.36

### Patch Changes

- fcdcc274: Removing pfe-page-status

## 1.0.0-next.35

### Patch Changes

- 0ef73073: Removing pfe-collapse

## 1.0.0-next.34

### Minor Changes

- 4400866a: Adds a11y tree testing to test runner config

### Patch Changes

- 9d10155b: Update element internals polyfill, fixes clicking on label in safari
- 4400866a: update dependencies

## 1.0.0-next.33

### Minor Changes

- daba8a53: Changing from pfe-datetime to pfe-timestamp

## 1.0.0-next.32

### Minor Changes

- 07ad1d3d: Adds testing utilities to stub Logger methods

## 1.0.0-next.31

### Patch Changes

- b1c439d5: Removed esbuild target configuration relying on tsconfig.json for configuration options.

## 1.0.0-next.30

### Minor Changes

- dcb85646: Adds tsconfig option to dev server config
- 4ccd1ff8: Adds `deslugify` function to config module
  Fixes demo manifest utility functions - gets the correct path by deslugifying the demo url.

### Patch Changes

- 29c0b6cd: Update the TS target in dev server
- eeebb45d: Replace `<pfe-progress-indicator>` with `<pfe-spinner>`

## 1.0.0-next.29

### Minor Changes

- 3f0c6ca2: Adds an optional unified config file for custom elements manifest, dev server, and docs pages

  Create a `.pfe.config.json` file at the root of your project to customize the pfe tools builds.

  The default values are:

  ```json
  {
    "tagPrefix": "pfe",
    "demoURLPrefix": "https://patternflyelements.org/",
    "sourceControlURLPrefix": "https://github.com/patternfly/patternfly-elements/tree/main/",
    "aliases": {},
    "site": {
      "title": "PatternFly Elements",
      "description": "PatternFly Elements: A set of community-created web components based on PatternFly design.",
      "favicon": "/brand/logo/svg/pfe-icon-blue.svg",
      "logoUrl": "/brand/logo/svg/pfe-icon-white-shaded.svg",
      "stylesheets": []
    }
  }
  ```

  See `@patternfly/pfe-tools/config.d.ts` for more information.

## 1.0.0-next.28

### Patch Changes

- bfad8b4b: Updates dependencies
- bfad8b4b: fix local module resolution in dev server
- a423b010: fix typescript config and update dependencies
- bfad8b4b: dev server: Resolve local elements from their source files

## 1.0.0-next.27

### Patch Changes

- c625b329: Store nav state
- a44b5484: Serve changes to TypeScript sources

## 1.0.0-next.26

### Patch Changes

- 58fe3a75: Include dev server webfonts in npm tarball

## 1.0.0-next.25

### Patch Changes

- 4ff704d4: Add html template to npm tarball

## 1.0.0-next.24

### Major Changes

- 654a9489: Remove `githubUrl` site option - uses sourceControlPrefixURL instead
- e3de6bde: Adds `site.stylesheets` option to dev server config. REMOVES `site.tagPrefix` option in favor of `tagPrefix` option

## 1.0.0-next.23

### Patch Changes

- 017bcb52: Fixes use of custom elements manifest and related 11ty plugins in daughter repos

## 1.0.0-next.22

### Major Changes

- c2f867fd: Rename cssCustomPropertyDefaultPlugin to jsdocDescriptionDefaultPlugin and render colour swatches on docs site

### Minor Changes

- fce3a836: Allow for multiple demos.

  Elements can now have multiple demos, and the demos now load their scripts using script tags,
  instead of inlining them via nunjucks using filename conventions.

  BREAKING CHANGES: dev server urls now use `/components` instead of `/demo`

- fce3a836: Adds demo plugin for custom-elements-manifests
- 05a4fab9: Add custom-elements-manifest plugins to mark ECMAScript private fields and to read the version number from package.json

## 1.0.0-next.21

### Patch Changes

- 921e7999: Remove pfe-specific styles from demo pages

## 1.0.0-next.20

### Minor Changes

- b8da03e8: `singleFileBuild` now scans `node_modules` for installed
  `@patternfly/pfe-*` packages (except `core`, `tools`, `sass`, and
  `styles`) and generates an entrypoint file for them.

  Users can alternatively pass `componentsEntryPointsContent`, which is
  the string contents of a javascript module that exports the desired
  components.

  These changes make using `singleFileBuild` more useful and ergonomic for
  daughter repositories (e.g. RHDS)

  ```js
  const elements = await readdir(new URL("../elements", import.meta.url));

  /**
   * @example
   * export * from '/path/to/redhat-ux/red-hat-design-system/elements/rh-alert/rh-alert.js';
   * export * from '/path/to/redhat-ux/red-hat-design-system/elements/rh-table/rh-table.js';
   */
  const componentsEntryPointContents = elements.reduce(
    (acc, x) => `${acc}
  export * from '${fileURLToPath(
      new URL(`../elements/${x}/${x}.js`, import.meta.url)
    )}';`,
    ""
  );

  await singleFileBuild({
    componentsEntryPointContents,
    outfile: "rhds.min.js",
  });
  ```

## 1.0.0-next.19

### Patch Changes

- f2ffb072: pass user options to dev server

## 1.0.0-next.18

### Major Changes

- d7128af3: Use declarative shadow DOM for dev server, remove SPA code, calculate demo variables on the server side

### Minor Changes

- 2b2aeb57: Adds `colored(colorString)` assertion to chai when using `createFixture`

  ```js
  expect("rgba(0,0,0,0)").to.be.colored("transparent");
  ```

- 15051be0: Use web-dev-server-plugin-lit-css.
  By default, config will transform all .scss files using `dart-sass`.
  Users may customize the options for lit-css:

  ```js
  export default pfeDevServerConfig({
    litcssOptions: {
      include: ["**/elements/*/*.css"],
    },
  });
  ```

### Patch Changes

- 4a597fed: Add package exports for test helpers
- b4ac6f24: Updates dependencies

## 1.0.0-next.17

### Patch Changes

- b595cafb: corrects passing options to `nunjucksSPAMiddleware(_options)` for repo demo configuration

## 1.0.0-next.16

### Minor Changes

- bb5b6265: Add `additionalPackages` option to `singleFileBundle`
- effe009a: Adds a maximize toggle to the dev SPA

### Patch Changes

- 4997735b: update dependencies

## 1.0.0-next.15

### Patch Changes

- c10f6783: Publish 11ty plugin files

## 1.0.0-next.14

### Minor Changes

- 621fcb38: Adds table-of-contents 11ty plugin
  Fixes bugs in 11ty plugins
- cd04ae82: Adds 11ty plugins to pfe-tools

## 1.0.0-next.13

### Patch Changes

- dd9b1128: Include dev server assets in the package bundle

## 1.0.0-next.12

### Minor Changes

- 9a957683: Moves development server wholly into pfe-tools, and exposes some customization properties so daughter repos can customize the page

## 1.0.0-next.11

### Minor Changes

- 6c39715c: Automatically replaces `process.env.NODE_ENV` with `production` both in the development server and in the production bundles.

### Patch Changes

- f1e4d5a9: Correctly resolve all node_modules sources in dev server

## 1.0.0-next.10

### Major Changes

- 447b2d75: Remove support for custom `esbuild` export condition

  Previously, the dev-server config would try to import typescript sources using
  the `esbuild` export condition, but this proved awkward when daughter repos
  would try to import the same packages by the esbuild condition, only to
  discover that there was no typescript source file because it was compiled away
  before hitting NPM

  Therefore, removed export conditions entirely and now rely on a hacky mod to
  the built-in web dev server node-resolution algorithm

  In our tests, this appeared to work in both primary cases:

  1. Developing local packages in `patternfly/patternfly-elements`
  2. Developing local packages in a 'daughter' repo which installed
     `@patternfly/pfe-tools`

  If you find that you're getting 404 errors to modules you're sure exist, or
  other such weird behaviour when resolving js sources from your monorepo, please
  open a [new
  issue](https://github.com/patternfly/patternfly-elements/issues/new/choose)

### Patch Changes

- f26d5ab5: fail gracefully when dev server can't find workspace packages
- f71bfa9c: update dependencies

## 0.1.0-next.9

### Patch Changes

- b5d40799: try to guess repository root dir when computing dev server config

## 0.1.0-next.8

### Minor Changes

- f726d147: Add `reporter` option to test runner config factory

## 0.1.0-next.7

### Patch Changes

- d9df3236: Update dependencies

## 0.1.0-next.6

### Patch Changes

- 0f235f7e: Update documentation

## 0.1.0-next.5

### Patch Changes

- 049aaca6: Update dependencies

## 0.1.0-next.4

### Minor Changes

- cd6ca2f0: minify lit-html template literals in builds

### Patch Changes

- a6253d3c: Generate the single-file bundle entrypoint at runtime

## 0.1.0-next.3

### Minor Changes

- cfd010ff: add `singleFileBuild` to esbuild helpers

## 0.1.0-next.2

### Patch Changes

- cbf0c490: Update dependencies

## 0.1.0-next.1

### Minor Changes

- a1da0422: export `transformSass` helper from esbuild.js

## 0.0.2-next.0

### Patch Changes

- 9765268c: Ship built files instead of sources
