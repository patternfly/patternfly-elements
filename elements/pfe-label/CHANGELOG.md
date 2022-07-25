# @patternfly/pfe-label

## 1.0.0-next.3

### Major Changes

- c619f99f: Changes to `<pfe-label>` to align it with [PatternFly v4](https://patternfly.org/components/label).

  NEW:
  Added `variant` attribute for `filled` and `outline` style variants
  Added `compact` boolean attribute for compact style version

  BREAKING CHANGES:
  The `pfelement` attribute and `PFElement` class are **removed** from the `<pfe-label>` element by default.
  The `outline` boolean attribute is **removed**
  _All_ the `--pfe-*` css variables are **removed** in favour of their `--pf-*` equivalents.

  See the [docs](https://patternflyelements.org/components/label) for more info,
  and the [demo](https://patternflyelements.org/components/label/demo) for usage examples.

### Patch Changes

- Updated dependencies [34ecd410]
- Updated dependencies [a730678c]
  - @patternfly/pfe-core@2.0.0-next.6
  - @patternfly/pfe-button@2.0.0-next.4

## 1.0.0-next.2

### Patch Changes

- 6a2a0407: [View commit message here](https://gist.github.com/heyMP/200fc0b840690541475923facba393ab)
- Updated dependencies [6a2a0407]
  - @patternfly/pfe-core@2.0.0-next.4
  - @patternfly/pfe-icon@2.0.0-next.2

## 1.0.0-next.1

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error
- Updated dependencies [447b2d75]
  - @patternfly/pfe-core@2.0.0-next.3
  - @patternfly/pfe-icon@2.0.0-next.1

## 1.0.0-next.0

### Major Changes

- 92257735: Initial release of pfe-label.

  `<pfe-label>` is an inline-block element component that provides a distinct visual style for metadata in a UI. Commonly used as visual representations for tags, labels can include an optional pfe-icon and are available in a solid and outline style variant.

  ### NEW: Component!

  - Adds `<pfe-label>` component with `color`, `icon` and `outline` attributes.

  See [docs](https://patternflyelements.org/components/label/) for more info
