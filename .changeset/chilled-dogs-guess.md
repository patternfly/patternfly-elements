---
"@patternfly/elements": patch
---
`<pf-tabs>`:
- Added `roving-tab-index-controller` to handle the focus on tabs.
- Moved `role="tab"` from shadow dom to the host BaseTab using element internals.  
- Added `manual` boolean attribute to allow for [manual tab activation](https://w3c.github.io/aria-practices/examples/tabs/tabs-manual.html) option.