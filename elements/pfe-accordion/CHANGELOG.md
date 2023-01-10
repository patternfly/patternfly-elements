# @patternfly/pfe-accordion

## 2.0.0-next.11

### Patch Changes

- f51f8ec33: Removed an unnecessary icon import from accordion base classes
- Updated dependencies [b841afe40]
- Updated dependencies [0fe6c52db]
- Updated dependencies [0fe6c52db]
  - @patternfly/pfe-core@2.0.0-next.13

## 2.0.0-next.10

### Major Changes

- d47ecddf: - Made `expanded-index` attribute 0-based.
  - Made `single` and other boolean attributes actually boolean, instead of
    `'true'|'false'`
  - Added protected `headers` and `panels` getters
  - Removed colour context
  - Several performance improvements
  - Moved from `BaseAccordion` to `PfeAccordion`:
    - URL/History API
    - `bordered`, `icon` and `icon-set` attributes
    - `accents` slot

## 2.0.0-next.9

### Patch Changes

- 0ef73073: Removing pfe-collapse
- Updated dependencies [b6bb3818]
  - @patternfly/pfe-core@2.0.0-next.11

## 2.0.0-next.8

### Patch Changes

- e2774512: Updating the accordion to include a minor animation for screen reader accessibility in Chrome on Mac

## 2.0.0-next.7

### Patch Changes

- 7d7d6839: Uses latest version of `<pfe-icon>` internally.
- f53155bc: Moving variable specific styles directly into pfe-accordion/header/panel.scss. Updating package exports to include Base Classes.
- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [07ad1d3d]
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-icon@2.0.0-next.5
  - @patternfly/pfe-core@2.0.0-next.10
  - @patternfly/pfe-collapse@2.0.0-next.4

## 2.0.0-next.6

### Minor Changes

- 70795e85: ### pfe-accordion 1:1 with patternfly!

  With this change we are adding three base class components `BaseAccordion`, `BaseAccordionHeader`, and `BaseAccordion` panel which rhds will extend off of for functionality.

  ### Adding:

  - Single
    - Only a single accordion panel can be expanded at a time.
  - Fixed
    - Sets a fixed height for an accordion panel with a scrollbar if the context extends beyond this height.
  - Bordered
    - Sets a border between the headers of the accordion
  - Large
    - Uses the large styles along with the bordered styles (larger font, more padding, font color change, and more)

  ### Breaking Changes

  - Disclosure variant removed (will be re-implemented in rhds)

  #### Example Accordion:

  ```html
  <pfe-accordion>
    <pfe-accordion-header> Item One </pfe-accordion-header>
    <pfe-accordion-panel>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </pfe-accordion-panel>
    <pfe-accordion-header> Item Two </pfe-accordion-header>
    <pfe-accordion-panel>
      Adipiscing elit pellentesque habitant morbi tristique senectus et netus
      et.
    </pfe-accordion-panel>
  </pfe-accordion>
  ```

  #### Example Nested Accordion

  ```html
  <pfe-accordion>
    <pfe-accordion-header> Item One </pfe-accordion-header>
    <pfe-accordion-panel>
      <pfe-accordion>
        <pfe-accordion-header> Nested Item One </pfe-accordion-header>
        <pfe-accordion-panel>
          Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.
        </pfe-accordion-panel>
        <pfe-accordion-header> Nested Item Two </pfe-accordion-header>
        <pfe-accordion-panel>
          Justo donec enim diam vulputate ut pharetra sit.
        </pfe-accordion-panel>
      </pfe-accordion>
    </pfe-accordion-panel>
    <pfe-accordion-header> Item Two </pfe-accordion-header>
    <pfe-accordion-panel>
      Aliquam ultrices sagittis orci a scelerisque purus semper eget.
    </pfe-accordion-panel>
  </pfe-accordion>
  ```

## 2.0.0-next.5

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
- Updated dependencies [a423b010]
  - @patternfly/pfe-core@2.0.0-next.8
  - @patternfly/pfe-collapse@2.0.0-next.3
  - @patternfly/pfe-icon@2.0.0-next.4

## 2.0.0-next.4

### Major Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)

### Patch Changes

- Updated dependencies [6a2a0407]
- Updated dependencies [0e9a4130]
  - @patternfly/pfe-core@2.0.0-next.4
  - @patternfly/pfe-collapse@2.0.0-next.2
  - @patternfly/pfe-icon@2.0.0-next.2

## 2.0.0-next.3

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3
  - @patternfly/pfe-collapse@2.0.0-next.1
  - @patternfly/pfe-icon@2.0.0-next.1

## 2.0.0-next.2

### Patch Changes

- 87b7cd59: Fix #1914: `<pfe-accordion>` on a page with CSS normalize

## 2.0.0-next.1

### Patch Changes

- b6f89a8f: allow HTML literals to be optimized by aliasing static html tag
- Updated dependencies [999cdfdd]
  - @patternfly/pfe-core@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- eaa5361b: ## 🔥 Migrate to Lit

  This release migrates `<pfe-accordion>` to LitElement. It also fixes several keyboard accessibility bugs.

  ### NEW: CSS Shadow Parts

  - Adds `text`, `accents`, and `icon` CSS parts to `<pfe-accordion-header>`
  - Adds `container` CSS part to `<pfe-accordion-panel>`

  ### Breaking Changes

  - Initial render is now [asynchronous](https://lit.dev/docs/components/lifecycle/#reactive-update-cycle).
    If your code assumes that shadow DOM is ready once the element is constructed, update it to `await element.updateComplete`;
  - Deprecates `pfe-accordion:expand` and `pfe-accordion:collapse` events. Use `expand` and `collapse` instead

  See [docs](https://patternflyelements.org/components/autocomplete/) for more info

### Patch Changes

- Updated dependencies [15514b33]
- Updated dependencies [e8788c72]
- Updated dependencies [b7201f0f]
  - @patternfly/pfe-collapse@2.0.0-next.0
  - @patternfly/pfe-core@2.0.0-next.0
  - @patternfly/pfe-icon@2.0.0-next.0
