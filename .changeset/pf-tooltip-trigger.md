---
"@patternfly/elements": minor
---
`<pf-tooltip>` added the `trigger` attribute to specify a tooltip-invoking 
element outside of the tooltip's children.

```html
<pf-button id="button">Button</pf-button>
<pf-tooltip trigger="button"
            content="I'm a button!"></pf-tooltip>
```
