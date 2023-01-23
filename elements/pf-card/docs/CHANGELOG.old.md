# @patternfly/pfe-card

## 2.0.0-next.7

### Major Changes

- 02989530: ## Patternfly Card 1:1 🎉

  This release migrates Patternfly Card `pfe-card` to Patternfly 1:1 and matches the style and functionality to PFv4.

  This will have several breaking changes from the existing `pfe-card`. Many of the attributes will be moving to `rh-card`.

  ### NEW: Features and Updates

  - Styles now match PFv4 Card.
  - Size Attribute: `small` is updated to `compact` and `large` is now an option
    - Example: `<pfe-card size='large'></pfe-card>`.
  - Rounded Attribute: NEW! Optionally applies a border radius for the drop shadow and/or border of the card.
    - Example: `<pfe-card rounded></pfe-card>`
  - FullHeight Attribute: NEW! Optionally allow the card to take up the full height of the parent element.
    - Example: `<pfe-card fullHeight></pfe-card>`
  - Plain Attribute: NEW! Removes the border on the card element.
    - Example: `<pfe-card plain></pfe-card>`

  ### Breaking Changes

  - No longer includes an `imgSrc` attribute.
  - No longer has a dark mode theme.
  - No longer includes a `border` attribute.

## 2.0.0-next.6

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.5

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 2.0.0-next.4

### Patch Changes

- 9caed6ad: [Issue #1984] Adding padding to top of image if header is present in card and image is set to overflow top.

## 2.0.0-next.3

### Major Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)

### Patch Changes

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

- cc006c44: ## 🔥 Migrate to Lit

  This release migrates `<pfe-card>` to LitElement.

  ### NEW: CSS Shadow Parts!

  - Adds `header`, `body`, and `footer` CSS parts to `<pfe-card>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle)
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`
  - Deprecates `pfe-card--header` and `pfe-card--footer` slots. Use `header` and `footer` instead

  See [docs](https://patternflyelements.org/components/card/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
