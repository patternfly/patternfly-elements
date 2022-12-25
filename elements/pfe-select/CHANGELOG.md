# @patternfly/pfe-select

## 2.0.0-next.5

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.4

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 2.0.0-next.3

### Patch Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.2

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.1

### Patch Changes

- 8771887d: Restores chevrom in pfe-select, and passes click events on it to the select menu.

## 2.0.0-next.0

### Major Changes

- 6246a25d: ## 🔥 Migrate to Lit

  This release migrates `<pfe-select>` to LitElement.

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfeOptions` DOM Property. Use `options`
  - Deprecates `pfe-select:change` event. Use `select`

  See [docs](https://patternflyelements.org/components/select/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
