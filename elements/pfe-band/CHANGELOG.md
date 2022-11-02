# @patternfly/pfe-band

## 2.0.0-next.4

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 2.0.0-next.3

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

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

- 82338db4: ## 🔥 Migrate to Lit

  This release migrates `<pfe-band>` to LitElement.

  ### NEW: CSS Shadow Parts!

  Use the `aside`, `header`, `body`, and `footer` CSS parts to customize `<pfe-band>`

  ```css
  /* Blue header background bands */
  pfe-band.blue-header::part(header) {
    background-color: cornflowerblue;
  }

  /* bands with three or more footer elements should stack them */
  pfe-band:has([slot="footer"]:nth-of-type(3))::part(footer) {
    display: flex;
    gap: 14px;
    flex-flow: column nowrap;
  }
  ```

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
  - Deprecates `pfe-band--header` slot - use `header`.
  - Deprecates `pfe-band--footer` slot - use `footer`.
  - Deprecates `pfe-band--aside` slot - use `aside`.
  - Removes `has_header`, `has_footer`, `has_body`, `has_aside` attributes

  See [docs](https://patternflyelements.org/components/band/) for more info

### Patch Changes

- Updated dependencies [e8788c72]
  - @patternfly/pfe-core@2.0.0-next.0
