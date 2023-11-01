---
"@patternfly/elements": major
---

### Breaking Changes

- ✨ Added `TabsController.ts`
- ❌ Removed `BaseTabs.ts`
- ❌ Removed `BaseTab.ts`
- ❌ Removed `BaseTabPanel.ts`
- ❌ Removed `BaseTabs.css`
- ❌ Removed `BaseTab.css`
- ❌ Removed `BaseTabPanel.css`

- 🔥 Tabs base classes have been removed.  These class files are no longer exported
by the project. `<pf-tabs>` implements the new `TabsController`. Downstream
consumers that import `BaseTabs` will need to update their code to use the new controller.
- 🔥 TabExpandEvent has moved from `BaseTabs` to `TabsController`.  Downstream
consumers that import `BaseTabs` will need to update their code to reimplement the import.
- 🔥 Tabs base CSS files have been removed. The CSS files are no longer exported by
the project. The CSS rules contained have moved into the Patternfly Elements
implementation files `pf-tabs.css`, `pf-tab.css` and `pf-tab-panel.css` Downstream
consumers that import `BaseTabs` will need to update their code to implement these 
base styles if needed.
- 🔥 Tabs overflow: `OverflowController` implementation has moved from the `BaseTabs` 
to the implemented tabs class: `pf-tabs.ts`. Downstream consumers will need to update 
their code to reimplement overflow features.  



