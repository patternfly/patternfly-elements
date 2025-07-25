---
"@patternfly/elements": minor
---

✨ Added `<pf-search-input>`.

A search input consists of a text field where users can type to find specific content or items. Unlike selects or dropdowns, which offer predefined options, a search input lets users enter their own keywords to filter or locate results. It includes a clear (×) button to easily remove the current input, allowing users to start a new search quickly.

Use this when users need to search freely using their own terms — ideal for large or frequently changing sets of content.
Do not use when the options are limited and known ahead of time — consider a dropdown or select instead

```html
<pf-search-input>
  <pf-option value="Alabama"> Alabama </pf-option>
  <pf-option value="New Jersey"> New Jersey </pf-option>
  <pf-option value="New York"> New York </pf-option>
  <pf-option value="New Mexico"> New Mexico </pf-option>
  <pf-option value="North Carolina"> North Carolina </pf-option>
</pf-search-input>
```