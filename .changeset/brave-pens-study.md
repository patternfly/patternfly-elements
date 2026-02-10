---
"@patternfly/pfe-core": patch
---
`ATFocusController`: fix keyboard focus wrapping and dynamic item support

- Fix arrow up/down focus wrapping when a non-focusable placeholder occupies
  index 0 (e.g. a disabled "Select a value" option)
- Fix dynamically added options not receiving keyboard focus until the listbox
  is reopened
