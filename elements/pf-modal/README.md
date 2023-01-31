# PatternFly Elements Modal
     
`pf-modal` is a self-contained modal window that is hidden on page load and (when activated) restricts the user from interacting with content in the main window.

Read more about Modal in the [PatternFly Elements Modal documentation](https://patternflyelements.org/components/modal)

##  Installation

Load `<pf-modal>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-modal/pf-modal.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-modal/pf-modal.js';
```

## Usage

Open a modal dialog with the `showModal()` method, or by setting the `open` boolean attribute.

```html
<pf-modal>
  <h2 slot="header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <a slot="footer" href="#bar">Learn more</a>
</pf-modal>

<script>
document.querySelector('pf-modal').showModal();
</script>
```

### With a trigger

You may assign a button-like trigger element to the modal by setting the modal element's `trigger` attribute to the trigger's ID.

```html
<pf-modal trigger="trigger-button">
  <h2 slot="header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <a slot="footer" href="#bar">Learn more</a>
</pf-modal>

<button id="trigger-button">Open modal</button>
```

You may also imperatively set the trigger element with the `setTrigger()` method:
```js
const modal = document.querySelector('pf-modal');
const trigger = document.querySelector('button#my-trigger');
modal.setTrigger(trigger);
```

