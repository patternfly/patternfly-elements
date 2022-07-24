# @patternfly/pfe-progress-indicator

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
