---
"@patternfly/elements": minor
---
`<pf-tabs>`: adds ability to place tabs outside of the element. This can be used
with custom tab/panel containers.

```html
<custom-panel-holder>
  <pf-tab id="for-a" for="a" slot="tabs" disabled>A</pf-tab>
  <pf-tab id="for-b" for="b" slot="tabs">B</pf-tab>
  <pf-tab id="for-c" for="c" slot="tabs">C</pf-tab>
  <pf-tabs>
    <pf-tab-panel id="a">A</pf-tab-panel>
    <pf-tab-panel id="b">B</pf-tab-panel>
    <pf-tab-panel id="c">C</pf-tab-panel>
  </pf-tabs>
</custom-panel-holder>
```
