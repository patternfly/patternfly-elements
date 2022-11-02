# @patternfly/pfe-spinner

## 2.0.0-next.6

### Patch Changes

- ddf052bd: Added BaseSpinner.js to exports
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.5

### Minor Changes

- b7602c2c: BREAKING CHANGE:

  Renames `<pfe-progress-indicator>` to `<pfe-spinner>` and changes it's HTML and
  CSS APIs to more closely match PatternFly v4 design specs.

  ```html
  <!-- BEFORE -->
  <pfe-progress-indicator indeterminate>Loading...</pfe-progress-indicator>
  <!-- AFTER -->
  <pfe-spinner>Loading...</pfe-spinner>
  ```

### Patch Changes

- Updated dependencies [166ecee1]
  - @patternfly/pfe-core@2.0.0-next.9

## 2.0.0-next.4

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 2.0.0-next.3

### Major Changes

- 94a8eb9a: Removes `-Height` and `-Width` CSS custom properties in favour of `size`.

  ```css
  pfe-progress-indicator {
    /* --pfe-progress-indicator--Height: 2rem; */
    /* --pfe-progress-indicator--Width: 2rem; */
    --pfe-progress-indicator-size: 2rem;
  }
  ```

### Patch Changes

- Updated dependencies [34ecd410]
  - @patternfly/pfe-core@2.0.0-next.6

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

- 47c03201: ## 🔥 Migrate to Lit

  This release migrates `<pfe-progress-indicator>` to LitElement.

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`

  See [docs](https://patternflyelements.org/components/progress-indicator/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
