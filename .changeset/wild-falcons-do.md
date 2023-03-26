---
"@patternfly/elements": patch
---

`<pf-accordion>`: fixed issue where accent would not display full height if the following conditions were met:
    - `pf-accordion` was set to `large` 
    - `pf-accordion-panel` slotted content had padding or margins 
