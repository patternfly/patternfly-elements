---
"@patternfly/pfe-tools": minor
---
Added `querySnapshot` accessibility testing helper

```ts

describe('then clicking the toggle', function() {
  beforeEach(async function() {
    await clickElementAtCenter(toggle);
  });
  it('expands the disclosure panel', async function() {
    const snapshot = await a11ySnapshot();
    const expanded = querySnapshot(snapshot, { expanded: true });
    expect(expanded).to.be.ok;
  });
});
```
