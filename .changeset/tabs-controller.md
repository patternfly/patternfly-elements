---
"@patternfly/pfe-core": minor
---

`TabsAriaController`: Added TabsAriaController, used to manage the accesibility tree for tabs and panels. 

```ts
#tabs = new TabsAriaController(this, {
  isTab: (x: Node): x is PfTab => x instanceof PfTab,
  isPanel: (x: Node): x is PfTabPanel => x instanceof PfTabPanel,
});
```

Please review the [Tabs 2.4 to 3.0 migration guide](https://patternflyelements.org/migration/3.0/tabs) for more 
information.
