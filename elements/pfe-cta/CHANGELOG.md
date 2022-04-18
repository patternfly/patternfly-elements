# @patternfly/pfe-cta

## 2.0.0-next.3

### Major Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)

### Patch Changes

- f66ba580: Add color context support via explicitly defined attributes. See https://github.com/patternfly/patternfly-elements/pull/1976
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.2

### Patch Changes

- 70bfd93f: build pfe-card and pfe-cta's light dom CSS during the `build` command

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- 1209e865: ## 🔥 Migrate to Lit

  This release migrates `<pfe-ctg>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `container` CSS part to `<pfe-cta>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-cta:select` event. Use `select`
  - Removes `click` listener from the element. Only clicks registered on the slotted button or link
    will fire `select`

  See [docs](https://patternflyelements.org/components/cta/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
