# @patternfly/pfe-avatar

## 2.0.0-next.3

### Major Changes

- 21f7fa8b: Redesigned `<pfe-avatar>` to bring it in line with [PatternFly v4 Avatar](https://patternfly.org/v4/components/avatar)

  The new `<pfe-avatar>` has three attributes: `src`, `alt` (like `<img>`) and
  `border="dark|light"` for adding a border on dark or light backgrounds.

## 2.0.0-next.2

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 2.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3

## 2.0.0-next.0

### Major Changes

- 216beeb8: ## 🔥 Migrate to Lit

  This release migrates `<pfe-avatar>` to LitElement.

  ### NEW: CSS Shadow Parts

  - Adds `canvas` and `img` CSS parts to `<pfe-avatar>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
  - Deprecates `pfe-avatar:connected` event. Use `await pfeAvatar.updateComplete` instead
  - Deprecates `pfe-avatar:options-shown`, `pfe-avatar:option-cleared`, `pfe-avatar:search-event`, and `pfe-avatar:option-selected` events.

  See [docs](https://patternflyelements.org/components/avatar/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
