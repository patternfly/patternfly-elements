# PatternFly Elements Switch
     
`<pf-v5-switch>` is a switch that toggles the state of a setting (between on and 
off). Switches provide a more explicit, visible representation on a setting.

Read more about Switch in the [PatternFly Elements Switch documentation](https://patternflyelements.org/components/switch)

##  Installation

Load `<pf-v5-switch>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-switch/pf-v5-switch.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-switch/pf-v5-switch.js';
```

### Note
For `<pf-v5-switch>` to work in Safari, you'll need to load the [element-internals-polyfill](https://www.npmjs.com/package/element-internals-polyfill). Safari is in the process of [adding element internals to WebKit](https://bugs.webkit.org/show_bug.cgi?id=197960) so this polyfill should be temporary.

## Usage
```html
<pf-v5-switch id="switch"></pf-v5-switch>
<label for="switch" data-state="on">Message when on</label>
<label for="switch" data-state="off" hidden>Message when off</label>
```

### Form Associated

`<pf-v5-switch>` is a form-associated custom element. That means that it can
participate in HTML forms just like a native `<input>`. For example, if you add
the `name` attribute, or the `id` attribute, the element will appear in the
FormData object. For example, if you add the `name` attribute, or the `id`
attribute, the element will appear in the `FormData` object.

```html
<form>
  <label> Dark Mode
    <pf-v5-switch name="dark"></pf-v5-switch>
  </label>
  <script>
  document.currentScript.closest('form').addEventListener('submit', function() {
    console.log(this.elements.dark) // <pf-v5-switch>
  })
  </script>
</form>
```


### Without label

```html
<pf-v5-switch></pf-v5-switch>
```

### Checked with label

```html
<pf-v5-switch show-check-icon></pf-v5-switch>
<label for="switch" data-state="on">Message when on</label>
<label for="switch" data-state="off" hidden>Message when off</label>
```

### Disabled Switches

```html
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pf-v5-switch id="checked-disabled" checked disabled></pf-v5-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>

  <fieldset>
    <pf-v5-switch id="disabled" disabled></pf-v5-switch>
    <label for="disabled" data-state="on">Message when on</label>
    <label for="disabled" data-state="off">Message when off</label>
  </fieldset>
</form>
```
