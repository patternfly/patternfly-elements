---
"@patternfly/elements": minor
---

✨ Added `<pf-table>`

```html
<pf-table>
  <pf-thead>
    <pf-tr>
      <pf-th>Repositories</pf-th>
      <pf-th>Branches</pf-th>
      <pf-th>Pull requests</pf-th>
      <pf-th>Workspaces</pf-th>
      <pf-th>Last commit</pf-th>
    </pf-tr>
  </pf-thead>
  <pf-tr>
    <pf-th>one</pf-th>
    <pf-td>two</pf-td>
    <pf-td>three</pf-td>
    <pf-td>four</pf-td>
    <pf-td>five</pf-td>
  </pf-tr>
  <pf-tr>
    <pf-th>one - 2</pf-th>
    <pf-td></pf-td>
    <pf-td></pf-td>
    <pf-td>four - 2</pf-td>
    <pf-td>five - 2</pf-td>
  </pf-tr>
  <pf-tr>
    <pf-th>one - 3</pf-th>
    <pf-td>two - 3</pf-td>
    <pf-td>three - 3</pf-td>
    <pf-td>four - 3</pf-td>
    <pf-td>five - 3</pf-td>
  </pf-tr>
</pf-table>
```

This is an initial release, that implements a subset of the features of upstream
PatternFly's table component. APIs can be expected to change.
