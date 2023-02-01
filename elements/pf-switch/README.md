# PatternFly Elements Switch
     
`<pf-switch>` is a switch that toggles the state of a setting (between on and 
off). Switches provide a more explicit, visible representation on a setting.

Read more about Switch in the [PatternFly Elements Switch documentation](https://patternflyelements.org/components/switch)

##  Installation

Load `<pf-switch>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-switch/pf-switch.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-switch/pf-switch.js';
```

### Note
For `<pf-switch>` to work in Safari, you'll need to load the [element-internals-polyfill](https://www.npmjs.com/package/element-internals-polyfill). Safari is in the process of [adding element internals to WebKit](https://bugs.webkit.org/show_bug.cgi?id=197960) so this polyfill should be temporary.

## Usage
```html
<pf-switch id="switch"></pf-switch>
<label for="switch" data-state="on">Message when on</label>
<label for="switch" data-state="off" hidden>Message when off</label>
```

### Form Associated

`<pf-switch>` is a form-associated custom element. That means that it can
participate in HTML forms just like a native `<input>`. For example, if you add
the `name` attribute, or the `id` attribute, the element will appear in the
FormData object. For example, if you add the `name` attribute, or the `id`
attribute, the element will appear in the `FormData` object.

```html
<form>
  <label> Dark Mode
    <pf-switch name="dark"></pf-switch>
  </label>
  <script>
  document.currentScript.closest('form').addEventListener('submit', function() {
    console.log(this.elements.dark) // <pf-switch>
  })
  </script>
</form>
```


### Without label

```html
<pf-switch></pf-switch>
```

### Checked with label

```html
<pf-switch show-check-icon></pf-switch>
<label for="switch" data-state="on">Message when on</label>
<label for="switch" data-state="off" hidden>Message when off</label>
```

### Disabled Switches

```html
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pf-switch id="checked-disabled" checked disabled></pf-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>

  <fieldset>
    <pf-switch id="disabled" disabled></pf-switch>
    <label for="disabled" data-state="on">Message when on</label>
    <label for="disabled" data-state="off">Message when off</label>
  </fieldset>
</form>
```
