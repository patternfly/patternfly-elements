# Table
A **table** is used to display large data sets that can be easily laid out in a simple grid with column headers.

## Usage
Use the `<pf-v5-table>` elements the way you would native HTML table elements.
See the [docs][docs] for more info.

```html
<pf-v5-table>
  <pf-v5-thead>
    <pf-v5-tr>
      <pf-v5-th>Repositories</pf-v5-th>
      <pf-v5-th>Branches</pf-v5-th>
      <pf-v5-th>Pull requests</pf-v5-th>
      <pf-v5-th>Workspaces</pf-v5-th>
      <pf-v5-th>Last commit</pf-v5-th>
    </pf-v5-tr>
  </pf-v5-thead>
  <pf-v5-tr>
    <pf-v5-th>one</pf-v5-th>
    <pf-v5-td>two</pf-v5-td>
    <pf-v5-td>three</pf-v5-td>
    <pf-v5-td>four</pf-v5-td>
    <pf-v5-td>five</pf-v5-td>
  </pf-v5-tr>
  <pf-v5-tr>
    <pf-v5-th>one - 2</pf-v5-th>
    <pf-v5-td></pf-v5-td>
    <pf-v5-td></pf-v5-td>
    <pf-v5-td>four - 2</pf-v5-td>
    <pf-v5-td>five - 2</pf-v5-td>
  </pf-v5-tr>
  <pf-v5-tr>
    <pf-v5-th>one - 3</pf-v5-th>
    <pf-v5-td>two - 3</pf-v5-td>
    <pf-v5-td>three - 3</pf-v5-td>
    <pf-v5-td>four - 3</pf-v5-td>
    <pf-v5-td>five - 3</pf-v5-td>
  </pf-v5-tr>
</pf-v5-table>
```

[docs]: https://patternflyelements.org/components/table/
