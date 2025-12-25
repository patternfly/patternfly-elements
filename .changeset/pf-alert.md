---
"@patternfly/elements": minor
---

✨ Added `<pf-alert>` component

An **alert** is a notification that provides brief information to the user without blocking their workflow.

```html
<pf-alert variant="warning"
          title-text="Custom alert title"
          dismissable>
  This is the alert description.
  <pf-button slot="actions">Ok</pf-button>
  <pf-button slot="actions">Cancel</pf-button>
</pf-alert>
