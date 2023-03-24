---
"@patternfly/elements": patch
---

`<pf-accordion-header>`: 
  - Fixed `header-tag`, `header-text` attributes not functioning as expected.
  - **BREAKING**: Fixed issue where slotted headings would have duplicated headings in the `shadow-root`.  There will no longer be a heading in the `shadow-root` if there is a slotted element in the `pf-accordion-header`.
