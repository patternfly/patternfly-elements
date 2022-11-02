# @patternfly/pfe-timestamp

## 2.0.0-next.5

### Minor Changes

- daba8a53: Changing from pfe-datetime to pfe-timestamp

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

- 1e89269b: document `time-zone-name` attribute

## 2.0.0-next.0

### Major Changes

- 48e48655: ## 🔥 Migrate to Lit

  This release migrates `<pfe-datetime>` to LitElement.

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`

  See [docs](https://patternflyelements.org/components/datetime/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
