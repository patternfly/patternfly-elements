---
"@patternfly/pfe-modal": major
---

Several changes align `<pfe-modal>` to PatternFly v4.

The `pfelement` attribute and `PFElement` class are **removed** from the `<pfe-modal>` element by default
The `width` attribute is **deprecated** in favour of `variant`.
_All_ the `--pfe-*` css variables are **removed** in favour of their `--pf-*` equivalents.
The `trigger` slot is **removed**. Use the `trigger` attribute instead, or the `setTrigger`, `toggle`, or `showModal` methods.
   ```diff
   - <pfe-modal>
   + <pfe-modal trigger="trigger-modal">
   -   <pfe-button slot="trigger"><button>Open Modal</button></pfe-button>
       Modals can have content
     </pfe-modal>
     Arbitrary content can intervene between modals and their triggers
   + <pfe-button id="trigger-modal"><button>Open Modal</button></pfe-button>
   ```

See the [docs](https://patternflyelements.org/components/modal) for more info
