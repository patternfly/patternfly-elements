---
"@patternfly/pfe-tools": minor
---

Adds an optional unified config file for custom elements manifest, dev server, and docs pages

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
