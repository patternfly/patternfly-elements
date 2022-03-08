# @patternfly/pfe-sass

## 2.0.0-next.1

### Major Changes

- 62a5d643: Remove `focus-ring`, `pfe-typography`, and `pfe-c-typogrpahy` mixins

  To implement focus-ring, see `pfe-accordion-header` or `pfe-jump-links`.

  ```scss
  outline: none;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    top: -2px;
    left: -2px;
    width: calc(100% + #{pfe-var(ui--border-width--active)});
    height: calc(100% + #{pfe-var(ui--border-width--active)});
    border-radius: pfe-var(ui--border-radius);
    border: pfe-var(ui--border-width--md) pfe-var(ui--border-style) transparent;
  }

  &:focus::before {
    border-color: #6b9ff0;
  }

  &:focus:not(:focus-visible)::before {
    border: unset;
  }
  ```

  To implement typography, see `core/pfe-sass/extends/_typography_extends.scss`

## 2.0.0-next.0

### Major Changes

- 8771887d: Removes `pfe-arrow` SASS mixin. This mixin was only used in one place,
  pfe-select, so it's contents were transfered to that file.
