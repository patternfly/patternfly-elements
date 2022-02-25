---
"@patternfly/pfe-clipboard": major
---

Update pfe-clipboard to function with mouse, keyboard, and screen reader and meet WCAG 2.1 A - AA Guidelines ✨♿

BREAKING CHANGE:
`role="button"` and `tabindex=0` attributes must *no longer* be applied to `<pfe-clipboard>`, make sure all instances 
on your page are updated

```diff
- <pfe-clipboard role="button" tabindex="0"></pfe-clipboard>
+ <pfe-clipboard></pfe-clipboard>
```

`pfe-clipboard.spec.ts`
 - Updated tests based on a11y changes

`README.md`
 - Updated readme based on a11y updates

`pfe-clipboard.ts`
 - Added new state property for aria-disabled to added aria features
 - Added comments for changes
 - Updated the HTML in render() to add aria features
 - Cleaned up some comment typos

`pfe-clipboard.scss`
 - Added sr-only class to utilize with pfe-clipboard to improve the success message output for screen readers
 - Adjusted the padding and changes some ids to be classes to go with new HTML structure

`pfe-clipboard.html`
 - Removed role button and tabindex from pfe-clipboard tags because that is being set within the shadowDom now
pfe-clipboard.js
 - Removed role button and tabindex from pfe-clipboard tags because that is being set within the shadowDom now

See [docs](https://patternflyelements.org/components/clipboard/) for more info
