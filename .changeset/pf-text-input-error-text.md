---
"@patternfly/elements": minor
---
`<pf-text-input>`: adds `helper-text`, `error-text`, and `validate-on` attributes. Forwards `pattern` attribute

```html
<pf-text-input id="validated"
               error-text="Enter a three digit integer"
               helper-text="How much wood could a woodchuck chuck?"
               validate-on="blur"
               pattern="\d{3}"
               required></pf-text-input>
<pf-button id="validate">Validate</pf-button>
```
