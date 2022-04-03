---
"@patternfly/pfe-core": major
"@patternfly/pfe-sass": major
"@patternfly/pfe-styles": minor
"@patternfly/pfe-accordion": major
"@patternfly/pfe-band": major
"@patternfly/pfe-button": patch
"@patternfly/pfe-card": major
"@patternfly/pfe-clipboard": patch
"@patternfly/pfe-collapse": minor
"@patternfly/pfe-cta": major
"@patternfly/pfe-datetime": patch
"@patternfly/pfe-dropdown": patch
"@patternfly/pfe-health-index": patch
"@patternfly/pfe-icon-panel": patch
"@patternfly/pfe-icon": patch
"@patternfly/pfe-jump-links": major
"@patternfly/pfe-label": patch
"@patternfly/pfe-markdown": patch
"@patternfly/pfe-modal": major
"@patternfly/pfe-number": patch
"@patternfly/pfe-page-status": patch
"@patternfly/pfe-progress-indicator": patch
"@patternfly/pfe-readtime": patch
"@patternfly/pfe-select": patch
"@patternfly/pfe-tabs": patch
"@patternfly/pfe-toast": patch
---

### BREAKING CHANGES:
- Renames `ContextTheme` type to `ColorTheme`
- Renames `ColorTheme` type to `ColorPalette`
- Moves both of the above from `core.ts` to `controllers/color-context.ts`
- Moves `controllers/color-context-controller.ts` to `controllers/color-context.ts`
- Removes `ColorContextController` (see below)
- Deprecates `color` attribute in favour of `color-palette`
  affects `pfe-band`, `pfe-card`, `pfe-jump-links`, and `pfe-modal` explicitly, all others implicitly (see below)
  use `color-palette` instead or set `--context` css custom property
  `color` will still be supported in `pfe-card` and `pfe-band`, but they are deprecated
- Removes `pfe-contexts` mixin from `pfe-sass`, use controllers or decorators instead
- Removes `pfe-accordion--expanded` mixin from `pfe-sass` and inlines it
- Deprecates `context` attribute,
    Before;
    ```html
    <pfe-modal context="dark">
      <pfe-card color="lightest">...</pfe-card>
    </pfe-modal>
    ```

    After:
    ```html
    <pfe-modal color-palette="darkest">
      <pfe-card color-palette="lightest">...</pfe-card>
    </pfe-modal>

    <pfe-modal style="--context: dark;">
      <strong>🚨 Warning!</strong> May cause accessibility problems!
    </pfe-modal>
    ```

### Fixes
- Fixes animation timings in pfe-accordion on browsers which don't support `computedStyleMap`
- Fixes context styles for slotted CTAs (provided `pfe.min.css` is loaded)
- Restores reload-on-save function to dev server

### New Features:

- Adds `ColorContextProvider` and `ColorContextConsumer` controllers
- Adds `@colorContextProvider` and `@colorContextConsumer` decorators
- Adds `@deprecation` decorator
- Adds `className` and `attribute` options to `@pfelement` decorator
- Adds global (light DOM) link styling to `pfe.min.css`
- Adds `color-palette` support to `<pfe-modal>`
- Adds preliminary color context support to `<pfe-button>`
