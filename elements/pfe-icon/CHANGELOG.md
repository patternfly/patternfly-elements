# @patternfly/pfe-icon

## 2.0.0-next.6

### Patch Changes

- 7b9eb03a: Added `BaseIcon` and package exports for `<pfe-icon>` to improve import map support and downstream development

## 2.0.0-next.5

### Major Changes

- 07ad1d3d: Rewrites `<pfe-icon>`

  Previously, icon names and icon sets were expressed as hyphenated pairs:

  ```html
  <pfe-icon icon="rh-leaf"></pfe-icon>
  ```

  Now, icon sets are specified with the `set` attribute:

  ```html
  <pfe-icon set="rh" icon="leaf"></pfe-icon>
  ```

  There are more changes, especially to icon loading and custom icon sets, so be sure to read
  [the docs](https://patternflyelements.org/components/icon/).

### Patch Changes

- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.4

### Patch Changes

- bfad8b4b: Updates dependencies
- a423b010: fix typescript config and update dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 2.0.0-next.3

### Minor Changes

- e3de6bde: Adds a small subset of font-awesome icons

## 2.0.0-next.2

### Patch Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- b7201f0f: ## 🔥 Migrate to Lit

  This release migrates `<pfe-icon>` to LitElement.

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`

  See [docs](https://patternflyelements.org/components/icon/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
