---
"@patternfly/elements": patch
---
`<pf-table>`: fix accessibility audit failures

- Fix column header ARIA role (`colheader` -> `columnheader`)
- Add accessible label to the row expand/collapse toggle button
- Add `aria-controls` linking the toggle button to its expansion content
