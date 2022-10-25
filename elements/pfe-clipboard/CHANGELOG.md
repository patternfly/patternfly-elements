# @patternfly/pfe-clipboard

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
- 6883aa36: pfe-clipboard: add fallback check for http traffic on browsers that support navigator.
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.2

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.1

### Major Changes

- ce7ed4e7: Update pfe-clipboard to function with mouse, keyboard, and screen reader and meet WCAG 2.1 A - AA Guidelines ✨♿

  BREAKING CHANGE:
  `role="button"` and `tabindex=0` attributes must _no longer_ be applied to `<pfe-clipboard>`, make sure all instances
  on your page are updated

  ```diff
  - <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
  + <pfe-clipboard></pfe-clipboard>
  ```

  `pfe-clipboard.spec.ts`

  - Updated tests based on a11y changes

  `README.md`

  - Updated readme based on a11y updates

  `pfe-clipboard.ts`

  - Added new state property for aria-disabled to added aria features
  - Added comments for changes
  - Updated the HTML in render() to add aria features
  - Cleaned up some comment typos

  `pfe-clipboard.scss`

  - Added sr-only class to utilize with pfe-clipboard to improve the success message output for screen readers
  - Adjusted the padding and changes some ids to be classes to go with new HTML structure

  `pfe-clipboard.html`

  - Removed role button and tabindex from pfe-clipboard tags because that is being set within the shadowDom now
    pfe-clipboard.js
  - Removed role button and tabindex from pfe-clipboard tags because that is being set within the shadowDom now

  See [docs](https://patternflyelements.org/components/clipboard/) for more info

## 2.0.0-next.0

### Major Changes

- cd3917e0: ## 🔥 Migrate to Lit

  This release migrates `<pfe-clipboard>` to LitElement.

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `text` slot (use `label`) and `text--success` (use `success`) slots
  - Deprecates `pfe-clipboard:connected` event (use `await el.updateComplete`)
  - Deprecates `pfe-clipboard:copied` event (use `copied`)

  See [docs](https://patternflyelements.org/components/clipboard/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
