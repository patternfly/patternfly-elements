---
"@patternfly/core": minor
---

- `OverflowController`: 
  - Added window resize event listener to recalculate overflow, due to removal of `BaseTabs` classes.
  - Fixed bug where dynamic tab creation would not trigger recalculation of overflow.

- `TabsController`:
  - Added TabsController. This controller is used to manage the state of the tabs and panels. 
  ```typescript
    #tabs = new TabsController(this, {
      isTab: (x: Node): x is PfTab => x instanceof PfTab,
      isPanel: (x: Node): x is PfTabPanel => x instanceof PfTabPanel,
    });
  ```

Please review the [Tabs 2.4 to 3.0 migration guide](https://patternflyelements.org/migration/3.0/tabs) for more 
information.