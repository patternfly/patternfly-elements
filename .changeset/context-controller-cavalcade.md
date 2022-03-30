---
"@patternfly/pfe-core": major
"@patternfly/pfe-sass": major
"@patternfly/pfe-styles": minor
"@patternfly/pfe-accordion": major
"@patternfly/pfe-card": major
"@patternfly/pfe-band": major
"@patternfly/pfe-cta": major
---

### Fixes
- Fixes animation timings in pfe-accordion on browsers which don't support `computedStyleMap`

### BREAKING CHANGES:
- Renames `ContextTheme` type to `ColorTheme`
- Renames `ColorTheme` type to `ColorPalette`
- Moves both of the above from `core.ts` to `controllers/color-context.ts`
- Removes `ColorContextController` (see below)
- Renames `color` attribute to `color-palette`
    affects `pfe-band`, `pfe-card`, `pfe-jump-links`, and `pfe-modal` explicitly, all others implicitly (see below)
  use `color-palette` instead or set `--context` css custom property
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

### New Features:

- Adds `ColorContextProvider` and `ColorContextConsumer` controllers
- Adds `@colorContextProvider` and `@colorContextConsumer` decorators
- Adds `context` option to `@pfelement` decorator
- Adds `className` and `attribute` options to `@pfelement` decorator
- Adds `color-palette` to all PFElements which don't explicitly opt-out
- Adds global (light DOM) link styling to `pfe.min.css`
