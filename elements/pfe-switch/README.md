# PatternFly Elements Switch
     
`pfe-switch` is a switch that toggles the state of a setting (between on and off). Switches provide a more explicit, visible representation on a setting.

Read more about Switch in the [PatternFly Elements Switch documentation](https://patternflyelements.org/components/switch)

##  Installation

Load `<pfe-switch>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-switch?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-switch
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-switch';
```

### Note
For `<pfe-switch>` to work in Safari, you'll need to load the [element-internals-polyfill](https://www.npmjs.com/package/element-internals-polyfill). Safari is in the process of [adding element internals to WebKit](https://bugs.webkit.org/show_bug.cgi?id=197960) so this polyfill should be temporary.

## Usage
```html
<pfe-switch id="switch"></pfe-switch>
<label for="switch" data-state="on">Message when on</label>
<label for="switch" data-state="off" hidden>Message when off</label>
```

### Form Associated

`<pfe-switch>` is a form-associated custom element. That means that it can
participate in HTML forms just like a native `<input>`. For example, if you add
the `name` attribute, or the `id` attribute, the element will appear in the
FormData object. For example, if you add the `name` attribute, or the `id`
attribute, the element will appear in the `FormData` object.

```html
<form>
  <label> Dark Mode
    <pfe-switch name="dark"></pfe-switch>
  </label>
  <script>
  document.currentScript.closest('form').addEventListener('submit', function() {
    console.log(this.elements.dark) // <pfe-switch>
  })
  </script>
</form>
```


### Without label

```html
<pfe-switch></pfe-switch>
```

### Checked with label

```html
<pfe-switch show-check-icon></pfe-switch>
<label for="switch" data-state="on">Message when on</label>
<label for="switch" data-state="off" hidden>Message when off</label>
```

### Disabled Switches

```html
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pfe-switch id="checked-disabled" checked disabled></pfe-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>

  <fieldset>
    <pfe-switch id="disabled" disabled></pfe-switch>
    <label for="disabled" data-state="on">Message when on</label>
    <label for="disabled" data-state="off">Message when off</label>
  </fieldset>
</form>
```
