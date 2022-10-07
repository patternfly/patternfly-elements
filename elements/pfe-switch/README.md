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
<pfe-switch label="Message when on" label-off="Message when off">
  <input type="checkbox">
</pfe-switch>
```

### Reversed layout

```html
<pfe-switch label="Message when on" label-off="Message when off" reversed>
  <input type="checkbox">
</pfe-switch>
```

### Without label

```html
<pfe-switch>
  <input type="checkbox">
</pfe-switch>
```

### Checked with label

```html
<pfe-switch label="Message when on" label-off="Message when off" has-check-icon>
  <input type="checkbox">
</pfe-switch>
```

### Disabled

```html
<pfe-switch label="Message when on" label-off="Message when off" checked disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch label="Message when on" label-off="Message when off" disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch checked disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch disabled>
  <input type="checkbox">
</pfe-switch>
```