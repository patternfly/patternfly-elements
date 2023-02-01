# @patternfly/elements

## 2.0.0-next.0

### Major Changes

- cc8df87b: ### Breaking Changes

  - Initial render was made [asynchronous][async].
    If your code assumes that shadow DOM is ready once the element is constructed,
    update it to `await element.updateComplete`
  - Renamed all element prefixes from `pfe-` to `pf-`.

    ```html
    <!-- BEFORE: -->
    <pfe-button>Cancel</pfe-button>

    <!-- AFTER: -->
    <pf-button>Ok</pf-button>
    ```

  [async]: https://lit.dev/docs/components/lifecycle/#reactive-update-cycle

- 2e350458: Removed `<pfe-progress-steps>` and added `<pf-progress-stepper>`.

  - Removed `color`, `disclosure`, `context` attributes
  - Removed `history` attribute and router
  - Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][pfv4] docs.

  There are more changes than these, including breaking changes. See the [docs][docs] for more info.

  [docs]: https://patternflyelements.org/components/progress-stepper/
  [pfv4]: https://patternfly.org/v4/

- aa2e369f: Combined all elements into a single new package, `@patternfly/elements`

### Minor Changes

- 80e19972: `<pf-timestamp>`: Added `time` and `isoString` readonly properties.

### Patch Changes

- 306878b5: `<pf-tabs>`: Removed `inset` attribute in favour of `tabs-container` [CSS Shadow Part](https://patternflyelements.org/components/tabs/#css-shadow-parts).
- 80e19972: `<pf-icon>`: make the `size` property abstract in `BaseIcon`
- Updated dependencies [aa2e369f]
- Updated dependencies [cc8df87b]
- Updated dependencies [baf333e5]
- Updated dependencies [aa2e369f]
  - @patternfly/pfe-core@2.0.0-next.15
