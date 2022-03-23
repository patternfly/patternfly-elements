---
"@patternfly/pfe-tools": major
---

Remove support for custom `esbuild` export condition

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
