# @patternfly/pfe-modal

## 2.0.0-next.2

### Major Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)

### Patch Changes

- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- 5982b7a9: ## 🔥 Migrate to Lit

  This release migrates `<pfe-modal>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `overlay`, `dialog`, `content`, and `close-button` CSS parts
  -

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-modal--trigger` slot. Use `trigger`
  - Deprecates `pfe-modal--header` slot. Use `header`
  - Deprecates `pfe-modal:open` event. Use `open`
  - Deprecates `pfe-modal:close` event. Use `close`
  - Passing an event to `open()` and `toggle()` no longer assigns the trigger element.
    use `setTrigger(triggerElement)` instead,
    or set the `trigger` attribute to the id of a trigger element in the same root as the modal.

  ### HTMLDialogElement Interface

  `<pfe-modal>` now implements the `HTMLDialogElement` interface. As such, a number of element APIs have changed:

  - renames the private `isOpen` property to `open` and make it public, and make it reflect to the `open` attribute
  - renames the `open()` method to `show()`
  - adds `showModal()` as an alias of `show()`
  - adds a `cancel` event, distinguishing between `close` and `cancel` events
  - adds a `returnValue` property, which can be set by passing a string to `close(returnValue)`

  See [docs](https://patternflyelements.org/components/modal/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
