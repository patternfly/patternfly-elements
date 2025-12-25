---
"@patternfly/elements": minor
---

✨ Added `<pf-alert>` component

An **alert** is a notification that provides brief information to the user without blocking their workflow.

```html
<pf-alert variant="warning" dismissable>
  <h3 slot="title">Custom alert title</h3>
  <span>This is the alert description.</span>
  <pf-button slot="actionLinks">Action 1</pf-button>
  <pf-button slot="actionLinks">Action 2</pf-button>
</pf-alert>
