---
"@patternfly/pfe-accordion": major
---

- Made `expanded-index` attribute 0-based.
- Made `single` and other boolean attributes actually boolean, instead of 
  `'true'|'false'`
- Added protected `headers` and `panels` getters
- Removed colour context
- Several performance improvements
- Moved from `BaseAccordion` to `PfeAccordion`:
  - URL/History API
  - `bordered`, `icon` and `icon-set` attributes
  - `accents` slot
