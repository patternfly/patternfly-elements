# PFElements Accordion Element

## Usage

```
<pfe-accordion>
  <pfe-accordion-header>
    <h3>Consetetur sadipscing elitr?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Labore et dolore magna aliquyam erat?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
  </pfe-accordion-panel>
</pfe-accordion>
```

## Slots

### Default slot in pfe-accordion

Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.

### Default slot in pfe-accordion-header

We expect the light DOM of the `pfe-accordion-header` to be a heading level tag (h1, h2, h3, h4, h5, h6). This content is copied into shadow DOM and so most external styles will not penetrate.

### Default slot in pfe-accordion-panel

Add the content for your accordion panel here. This content remains in the light DOM; external styles will penetrate this region.

## Attributes

**`context`**
Changes the context of the accordion to one of 3 possible options:
- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--context` variable.

**`disclosure`**
If `pfe-accordion` has one `pfe-accordion-header`, it will get tagged with `disclosure="true"`. This applies a slightly different set of styles: chevron appears on the left side, the header has a single border on all four sides. Applying `disclosure="false"` to a `pfe-accordion` element containing only one header/panel pairing will set the element to display as a standard accordion.

**`history`**
Updates window.history and the URL to create sharable links. With the `history` attribute, the accordion *must* have an `id`.

The URL pattern will be `?{id-of-tabs}={index-of-expanded-items}`. In the example
below, selecting "Accordion 2" will update the URL as follows: `?lorem-ipsum=2`. The index value for the expanded items starts at 1.

```html
<pfe-accordion history id="lorem-ipsum">
  <pfe-accordion-header>
    <h3>Accordion 1</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Accordion 1 panel content.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Accordion 2</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Accordion 2 panel content.</p>
  </pfe-accordion-panel>
</pfe-accordion>
```

To expand multiple sets, you can dash separate indexes: `?lorem-ipsum=1-2`.

*Note:* This feature is not supported in IE11.

**`expanded-index`**
Sets and reflects the currently expanded accordion indexes. Use commas to separate multiple indexes.  The index value for the expanded items starts at 1.

```html
<pfe-accordion expanded-index="2,3">
  ...
</pfe-accordion>
```

## Events

### pfe-accordion:change

Fires when an pfe-accordion-header is activated. The detail object contains the
following

```
detail: {
  expanded: Boolean
}
```

## API

### toggle(index)

Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.

### expand(index)

Accepts a 0-based index value (integer) for the set of accordion items to expand.

### expandAll()

Expands all accordion items.

### collapse(index)

Accepts a 0-based index value (integer) for the set of accordion items to collapse.

### collapseAll()

Collapse all accordion items.

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Accordion (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
