# PFElements Collapse Element

`pfe-collapse`, `pfe-collapse-toggle`, and `pfe-collapse-panel` are all
elements that are meant to be extended. These elements contain no styling except
for the animation styles for `pfe-collapse-panel`.

## Usage

`pfe-collapse` automatically wires up the toggle and panel so when the
`pfe-collapse-toggle` is toggled, it will either open or close the
`pfe-collapse-panel`.

```
<pfe-collapse>
  <pfe-collapse-toggle>
    This is the toggle
  </pfe-collapse-toggle>
  <pfe-collapse-panel>
    This is the panel
  </pfe-collapse-panel>
</pfe-collapse>
```

### Collapse with a preset ID

```
<pfe-collapse>
  <pfe-collapse-toggle aria-controls="panel1">
    <h3>Collapse Toggle with preset ID</h3>
  </pfe-collapse-toggle>
  <pfe-collapse-panel id="panel1">
    <p>Panel content</p>
  </pfe-collapse-panel>
</pfe-collapse>
```

### Standalone toggle and panel (not wrapped in a pfe-collapse)

The toggle needs an `aria-controls` attribute that links to the `id` of the
panel.

```
<pfe-collapse-toggle aria-controls="panel">
  Toggle the Standalone Panel
</pfe-collapse-toggle>
<p>Other content:</p>
<pfe-collapse-panel id="panel">
  <p>Panel content</p>
</pfe-collapse-panel>
```

### Standalone panel

A standalone panel can be opened by any action or event that toggles the
`expanded` property on the panel.

```
<button>Toggle Panel</button>

<pfe-collapse-panel id="standalone-panel">
  <p>Panel content</p>
</pfe-collapse-panel>

<script>
  var collapse = document.querySelector("#standalone-panel");

  document.querySelector("button").addEventListener("click", function() {
    collapse.expanded = !collapse.expanded;
  });
</script>
```

## Slots

### Default slot in pfe-collapse

Place the `pfe-collapse-toggle` and `pfe-collapse-panel` elements here.

### Default slot in pfe-collapse-toggle

Add the toggle content here.

### Default slot in pfe-collapse-panel

Add the collapse panel content here.

## Attributes

### animation (observed)

Can turn the animation of the panel expanding and collapsing either on or off.
Animation of the panel defaults to true. Adding `animation` to the
`pfe-collapse` tag will copy the `animation` attribute to the
`pfe-collapse-panel`.

```
<pfe-collasible animation="false">
  ...
</pfe-collapse>
```

`animation` can also be added to a `pfe-collasible-panel`.

```
<pfe-collasible-panel animation="false">
  ...
</pfe-collapse-panel>
```

## Events

### pfe-collapse:change

Fired when `pfe-collasible` is either expanded or collapsed.

```
detail: {
  expanded: Boolean,
  toggle: DOM Element,
  panel: DOM Element
}
```

### pfe-collapse-panel:animation-start

Fired when `pfe-collapse-panel` begins animating the expansion or collapse
of the panel.

```
detail: {
  state: String ("opening", "closing"),
  panel: DOM Element
}
```

### pfe-collapse-panel:animation-end

Fired when `pfe-collapse-panel` ends animating the expansion or collapse
of the panel.

```
detail: {
  expanded: Boolean,
  panel: DOM Element
}
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Collapse (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
