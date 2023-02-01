---
"@patternfly/elements": major
---
✨ Added `<pf-modal>` and removed `<pfe-modal>`. Modal now closely follows the 
PatternFly design spec.

```html
<pf-modal>
  <h2 slot="header">Modal with a header</h2>
  <p>Modals can contain arbitrary content</p>
  <a slot="footer" href="#bar">Learn more</a>
</pf-modal>
```

- ✨ Added `overlay`, `dialog`, `content`, `description`, `header`, `footer`, 
  and `close-button` CSS parts
- ✨ Added `position="top"` attribute
- ✨ Added `description` slot

### HTMLDialogElement Interface

`<pf-modal>` now implements the `HTMLDialogElement` interface. As such, a number 
of element APIs have changed:

- 💱 Renamed the private `isOpen` property to `open` and make it public, and 
  make it reflect to the `open` attribute
- 💱 Renamed the `open()` method to `show()`
- ✨ Added `showModal()` as an alias of `show()`
- ✨ Added a `cancel` event, distinguishing between `close` and `cancel` events
- ✨ Added a `returnValue` property, which can be set by passing a string to 
  `close(returnValue)`

### Breaking Changes

- ❌ Removed `pfe-modal:open` event. Use `open`
- ❌ Removed `pfe-modal:close` event. Use `close`
- ❌ Removed `width` attribute in favour of `variant`
- Passing an event to `open()` and `toggle()` no longer assigns the trigger element. use `setTrigger(triggerElement)` instead, or set the `trigger` attribute to the id of a trigger element in the same root as the modal.
- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See [PFv4][PFv4] docs.
- ❌ Removed the `trigger` slot. Use the `trigger` attribute instead, or the `setTrigger`, `toggle`, or `showModal` methods.
   ```diff
   - <pfe-modal>
   + <pf-modal trigger="trigger-modal">
   -   <pfe-button slot="trigger"><button>Open Modal</button></pfe-button>
       <p>Modals can have content</p>
   - </pfe-modal>
   + </pf-modal>
   + <p>Arbitrary content can intervene between modals and their triggers.</p>
   + <pf-button id="trigger-modal">Open Modal</pfe-button>
   ```

There are more changes than this, including breaking changes. See [docs][docs] 
for more info

[docs]: https://patternflyelements.org/components/modal/
[PFv4]: https://patternfly.org/v4/
