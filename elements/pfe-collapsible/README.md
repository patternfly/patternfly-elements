# PFElements Collapsible Element

`pfe-collapsible`, `pfe-collapsible-toggle`, and `pfe-collapsible-panel` are all
elements that are meant to be extended. These elements contain no styling except
for the animation styles for `pfe-collapsible-panel`.

## Usage

`pfe-collapsible` automatically wires up the toggle and panel so when the
`pfe-collapsible-toggle` is toggled, it will either open or close the
`pfe-collapsible-panel`.

```
<pfe-collapsible>
  <pfe-collapsible-toggle>
    This is the toggle
  </pfe-collapsible-toggle>
  <pfe-collapsible-panel>
    This is the panel
  </pfe-collapsible-panel>
</pfe-collapsible>
```

### Collapsible with a preset ID

```
<pfe-collapsible>
  <pfe-collapsible-toggle aria-controls="panel1">
    <h3>Collapsible Toggle with preset ID</h3>
  </pfe-collapsible-toggle>
  <pfe-collapsible-panel id="panel1">
    <p>Panel content</p>
  </pfe-collapsible-panel>
</pfe-collapsible>
```

### Standalone toggle and panel (not wrapped in a pfe-collapsible)

The toggle needs an `aria-controls` attribute that links to the `id` of the
panel.

```
<pfe-collapsible-toggle aria-controls="panel">
  Toggle the Standalone Panel
</pfe-collapsible-toggle>
<p>Other content:</p>
<pfe-collapsible-panel id="panel">
  <p>Panel content</p>
</pfe-collapsible-panel>
```

### Standalone panel

A standalone panel can be opened by any action or event that toggles the
`expanded` property on the panel.

```
<button>Toggle Panel</button>

<pfe-collapsible-panel id="standalone-panel">
  <p>Panel content</p>
</pfe-collapsible-panel>

<script>
  var collapsible = document.querySelector("#standalone-panel");

  document.querySelector("button").addEventListener("click", function() {
    collapsible.expanded = !collapsible.expanded;
  });
</script>
```

## Slots

### Default slot in pfe-collapsible

Place the `pfe-collapsible-toggle` and `pfe-collapsible-panel` elements here.

### Default slot in pfe-collapsible-toggle

Add the toggle content here.

### Default slot in pfe-collapsible-panel

Add the collapsible panel content here.

## Attributes

### pfe-animation (observed)

Can turn the animation of the panel expanding and collapsing either on or off.
Animation of the panel defaults to true. Adding `pfe-animation` to the
`pfe-collapsible` tag will copy the `pfe-animation` attribute to the
`pfe-collapsible-panel`.

```
<pfe-collasible pfe-animation="false">
  ...
</pfe-collapsible>
```

`pfe-animation` can also be added to a `pfe-collasible-panel`.

```
<pfe-collasible-panel pfe-animation="false">
  ...
</pfe-collapsible-panel>
```

## Events

## pfe-collapsible:change

Fired when `pfe-collasible` is either expanded or collapsed.

```
detail: {
  expanded: Boolean,
  toggle: DOM Element,
  panel: DOM Element
}
```

### pfe-collapsible-panel:animating

Fired when `pfe-collapsible-panel` begins animating the expansion or collapse
of the panel.

```
detail: {
  state: String ("opening", "closing"),
  panel: DOM Element
}
```

### pfe-collapsible-panel:animation-complete

Fired when `pfe-collapsible-panel` begins animating the expansion or collapse
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

Collapsible (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
