---
"@patternfly/pfe-tools": minor
---
`a11ySnapshot`: Added chai assertions for various accessibility-tree scenarios

Examples:
```ts
describe('<pf-accordion>', function() {
  beforeEach(() => fixture(html`
    <pf-accordion>
      <pf-accordion-header id="header1">header-1</pf-accordion-header>
      <pf-accordion-panel>panel-1</pf-accordion-panel>
    </pf-accordion>
  `))
  describe('clicking the first heading', function() {
    beforeEach(clickFirstHeading);
    it('expands the first panel', async function() {
      expect(await a11ySnapshot())
        .to.have.axTreeNodeWithName('panel-1');
    });
    it('focuses the first panel', async function() {
      expect(await a11ySnapshot())
        .to.have.axTreeFocusOn(document.getElementById('header1'));
    });
  })
})

```
