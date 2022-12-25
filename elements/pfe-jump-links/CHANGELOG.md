## 1.0.0-prerelease.50 ( TBD )

## 2.0.0-next.6

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [7d7d6839]
- Updated dependencies [f53155bc]
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-accordion@2.0.0-next.7
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.5

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8
  - @patternfly/pfe-accordion@2.0.0-next.5

## 2.0.0-next.4

### Patch Changes

- 8fb76bb1: Fix predicate which updates light DOM

## 2.0.0-next.3

### Major Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)

### Patch Changes

- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4
  - @patternfly/pfe-accordion@2.0.0-next.4

## 2.0.0-next.2

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3
  - @patternfly/pfe-accordion@2.0.0-next.3

## 2.0.0-next.1

### Patch Changes

- 63f45224: Applies aria-label to nav links (#1765)

## 2.0.0-next.0

### Major Changes

- 378dadc6: ## 🔥 Migrate to Lit

  This release migrates `<pfe-jump-links>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `nav` and `content` CSS parts to `<pfe-jump-links>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-jump-links-panel:active-navItem` event. Use `change`
  - Deprecates `pfe-jump-links-nav:stuck` event. Use `stuck`

  See [docs](https://patternflyelements.org/components/jump-links/) for more info

### Patch Changes

- Updated dependencies [eaa5361b]
- Updated dependencies [e8788c72]
  - @patternfly/pfe-accordion@2.0.0-next.0
  - @patternfly/pfe-core@2.0.0-next.0

Tag: [1.0.0-prerelease.50](https://github.com/patternfly/patternfly-elements/releases/tag/1.0.0-prerelease.50)

- [code](url) offset - fixed offset attribute to work more reliably and updated docs

## 1.0.0-prerelease.39 ( TBD )

Tag: [1.0.0-prerelease.39](https://github.com/patternfly/patternfly-elements/releases/tag/1.0.0-prerelease.39)

- [code](url) Init - new component pfe-jump-links
