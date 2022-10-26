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

## Usage
```html
<pfe-switch id="color-scheme-toggle"></pfe-switch>
<label for="color-scheme-toggle" data-state="on">Dark Mode</label>
<label for="color-scheme-toggle" data-state="off" hidden>Light Mode</label>
```

### Without label

```html
<pfe-switch></pfe-switch>
```

### Checked with label

```html
<pfe-switch show-check-icon></pfe-switch>
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
