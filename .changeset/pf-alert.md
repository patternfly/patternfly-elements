---
"@patternfly/elements": minor
---

### Minor Changes

- Added `pf-alert` component for displaying alert messages of different types:
  - Types: info, warning, danger, success, neutral, custom
  - Features: optional title, description, actions, dismiss button
- Enables consistent alert messaging across apps and demos

```html
<pf-alert ouia-id="CustomAlert" variant="warning" onClose>
  <h3 slot="title">Custom alert title</h3>
  <span>This is the alert description.</span>
  <div slot="actionLinks">
    <pf-button>Action 1</pf-button>
    <pf-button>Action 2</pf-button>
  </div>
</pf-alert>