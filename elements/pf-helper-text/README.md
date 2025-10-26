# `<pf-helper-text>`

The **pf-helper-text** component provides contextual feedback messages for form fields or other UI elements.
It visually communicates states such as success, warning, error, or informational messages.
The component can display a default status icon or a fully custom icon provided through a slot or property.

Read more about dropdown in the [PatternFly Elements Dropdown 
documentation](https://patternflyelements.org/components/dropdown)

---
##  Installation

Load `<pf-helper-text>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-helper-text/pf-helper-text.js"></script>

<script src="https://jspm.dev/@patternfly/elements/pf-icon/pf-icon.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-helper-text/pf-helper-text.js';
import '@patternfly/elements/pf-icon/pf-icon.js';

```

##  Usage

```html
<script type="module">
  import '@patternfly/elements/pf-icon/pf-icon.js';
  import '@patternfly/elements/pf-helper-text/pf-helper-text.js';

  // Optional: add FontAwesome icon set
  PfIcon.addIconSet('fas', (set, icon) => {
    return new URL(`@fortawesome/fontawesome-free/svgs/solid/${icon}.svg`, import.meta.url);
  });
</script>

<pf-helper-text>
  This is default helper text
</pf-helper-text>

<pf-helper-text status="indeterminate" icon="minus" icon-set="fas">
  This is indeterminate helper text
</pf-helper-text>

<pf-helper-text status="warning" icon="exclamation-triangle" icon-set="fas">
  This is warning helper text
</pf-helper-text>

<pf-helper-text status="success" icon="check-circle" icon-set="fas">
  This is success helper text
</pf-helper-text>

<pf-helper-text status="error" icon="exclamation-circle" icon-set="fas">
  This is error helper text
</pf-helper-text>

<style>
pf-helper-text {
  display: block;
  margin: 1rem 0;
  font-family: var(--pf-global--FontFamily--sans-serif, Arial, sans-serif);
}

pf-helper-text:not([status]) {
  color: var(--pf-global--Color--100, #151515);
}
pf-helper-text[status="indeterminate"] {
  color: var(--pf-global--Color--200, #6a6e73);
}
pf-helper-text[status="warning"] {
  color: var(--pf-global--warning-color--100, #f0ab00);
}
pf-helper-text[status="success"] {
  color: var(--pf-global--success-color--100, #3e8635);
}
pf-helper-text[status="error"] {
  color: var(--pf-global--danger-color--100, #c9190b);
}

pf-helper-text [slot="icon"],
pf-icon {
  fill: currentColor;
}
</style>


```
## Slots

| Name       | Description                                                                            |
|------------|----------------------------------------------------------------------------------------|
| `icon`     | Optional named slot for providing a custom icon.<br>Overrides the default status icon. |
| (default)  | Default unnamed slot for the helper text content (text or other inline elements).      |

Properties

|Name   |	Type                                                | Default |	Description|
| ----- |-----------------------------------------------------|---------|-------------------------- 
|status |'default','success','warning','error','indeterminate'|'default'|	Defines the visual state of the helper text and determines which default icon is shown if no custom icon is provided.|
|icon   |	string                                              |undefined|	Custom icon name to display. Overrides the default icon derived from status. Requires pf-icon to be imported.|
|iconSet|	string                                              |undefined|	Icon set to use when specifying a custom icon (e.g., 'fas').|

## Events

| Event Name   | Description                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `icon-load`  | Fired when a custom or default icon successfully loads.                          |
| `icon-error` | Fired if the icon fails to load. The event’s `detail` contains the error object. |

## Default Icons by Status

| Status          | Default Icon           |
| --------------- | ---------------------- |
| `default`       | *(none)*               |
| `indeterminate` | `minus-circle`         |
| `warning`       | `exclamation-triangle` |
| `success`       | `circle-check`         |
| `error`         | `exclamation-circle`   |

## Notes

Providing a custom <slot name="icon"> overrides the default icon.

Icons are lazy-loaded (loading="lazy") to optimize performance.

The pf-icon element must be imported if using built-in icons.

The component emits icon-load and icon-error events to track icon state.


