---
"@patternfly/elements/pf-alert": minor
---

### Minor Changes

- Added `pf-alert` component for displaying alert messages of different types:
  - Types: info, warning, danger, success, cogear, neutral, custom
  - Features: optional heading, description, actions, dismiss button
- Enables consistent alert messaging across apps and demos

```html
<pf-alert type="warning" heading="Attention!">
  This is a warning alert with optional description and actions.
</pf-alert>