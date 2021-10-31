# PatternFly Elements Modal
     
`pfe-modal` is a self-contained modal window that is hidden on page load and (when activated) restricts the user from interacting with content in the main window.

Read more about Modal in the [PatternFly Elements Modal documentation](https://patternflyelements.org/components/modal)

##  Installation

Load `<pfe-modal>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-modal?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-modal
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-modal';
```

## Usage

### With a trigger
```html
<pfe-modal>
  <button slot="trigger">Open modal</button>
  <h2 slot="header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
```

### Without a trigger
```html
<pfe-modal>
  <h2 slot="header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
```

### With a separate trigger
```html
<pfe-button>
  <button id="modal-trigger">Open modal</button>
</pfe-button>

<pfe-modal trigger="modal-trigger">
  <h2 slot="header">Modal with a header</h2>
  <p>Lorem ipsum dolor sit amet, <a href="#foo">consectetur adipisicing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <pfe-cta>
    <a href="#bar">Learn more</a>
  </pfe-cta>
</pfe-modal>
```

