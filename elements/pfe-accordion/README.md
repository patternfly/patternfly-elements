# PFElements Accordion Element

## Usage

```
<pfe-accordion>
  <pfe-accordion-header>
    <h2>Why do wizards need money if they could just create it?</h2>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h2>Why doesn't Harry have a portrait of his parents?</h2>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
  </pfe-accordion-panel>
</pfe-accordion>
```

## Slots

### Default slot in pfe-accordion

Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.

### Default slot in pfe-accordion-header

We expect the light DOM of the `pfe-accordion-header` to be a heading level tag
(h1, h2, h3, h4, h5, h6)

### Default slot in pfe-accordion-panel

Add the content for your accordion panel here.

## Attributes

**`pfe-theme`**
Changes the context of the accordion to one of 3 possible themes:
- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--theme` variable.

**`pfe-disclosure`**
If `pfe-accordion` has one `pfe-accordion-header`, it will get tagged with `pfe-disclosure="true"`. This applies a slightly different set of styles: chevron appears on the left side, the header has a single border on all four sides. Applying `pfe-disclosure="false"` to a `pfe-accordion` element containing only one header/panel pairing will set the element to display as a standard accordion.

## Events

### pfe-accordion:change

Fires when an pfe-accordion-header is activated. The detail object contains the
following

```
detail: {
  expanded: Boolean
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

Accordion (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
