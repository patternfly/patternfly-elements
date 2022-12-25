---
"@patternfly/pfe-core": minor
"@patternfly/pfe-tabs": major
---

### pfe-tabs: Rewrites `<pfe-tabs>` to align with Patternfly v4.

With this change we are adding base class components `BaseTabs`, `BaseTab`, and `BaseTabPanel` which
can be extended for uses in other components in child repositories such as RHDS. Also aligns the API 
and style closer to that of PatternFly v4.

```html
  <pfe-tabs>
    <pfe-tab slot="tab" id="users">Users</pfe-tab>
    <pfe-tab-panel>Users</pfe-tab-panel>
    <pfe-tab slot="tab">Containers</pfe-tab>
    <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
    <pfe-tab slot="tab">Database</pfe-tab>
    <pfe-tab-panel>
      <pfe-icon slot="icon" icon="rh-atom"></pfe-icon> <!-- <pfe-icon> or <svg> -->
      Database
    </pfe-tab-panel>
    <pfe-tab slot="tab" disabled>Disabled</pfe-tab>
    <pfe-tab-panel>Disabled</pfe-tab-panel>
    <pfe-tab slot="tab" aria-disabled="true">Aria Disabled</pfe-tab>
    <pfe-tab-panel>Aria Disabled</pfe-tab-panel>
  </pfe-tabs>
```

For now, does not implement:
 - sub tabs feature
 - nav element feature
 - separate content (trigger) feature
 - child tab-panel mounting features
 - dynamic closable tabs feature
 - loading a tab via external toggle

 These feature sets can be added retroactively.

 ### pfe-core: Adds `isElementInView.ts` function to pfe-core

 The `isElementInView` function is borrowed from the [Patternfly React core helper utilities](https://github.com/patternfly/patternfly-react/blob/main/packages/react-core/src/helpers/util.ts).