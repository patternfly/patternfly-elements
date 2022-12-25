# @patternfly/pfe-switch

## 2.0.0-next.0

### Major Changes

- 4400866a: Added `<pfe-switch>`, a control that toggles the state of a setting between on and off.
  Switches provide a more explicit, visible representation on a setting than checkboxes.

  ```html
  <form>
    <pfe-switch id="color-scheme-toggle"></pfe-switch>
    <label for="color-scheme-toggle" data-state="on">Dark Mode</label>
    <label for="color-scheme-toggle" data-state="off" hidden>Light Mode</label>
  </form>
  ```

### Patch Changes

- dc34cf51: Prevented clicks and other interactions when the switch is disabled
