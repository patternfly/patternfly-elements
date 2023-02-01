---
"@patternfly/pfe-tools": minor
---
✨ Added `@patternfly/pfe-tools` package

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
