# WIP 🐣: RHElements Accordion Element

## Usage

```
<rh-accordion>
  <rh-accordion-header>
    <h2>Why do wizards need money if they could just create it?</h2>
  </rh-accordion-header>
  <rh-accordion-panel>
    <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
  </rh-accordion-panel>
  <rh-accordion-header>
    <h2>Why doesn't Harry have a portrait of his parents?</h2>
  </rh-accordion-header>
  <rh-accordion-panel>
    <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
  </rh-accordion-panel>
</rh-accordion>
```

## Slots

### Default slot in rh-accordion
Place the `rh-accordion-header` and `rh-accordion-panel` elements here.

### Default slot in rh-accordion-header
We expect the light DOM of the `rh-accordion-header` to be a heading level tag
(h1, h2, h3, h4, h5, h6)

### Default slot in rh-accordion-panel
Add the content for your accordion panel here.

## Attributes

### theme (observed)

Change the theme of the accordion. Options for this attribute are:
- `striped`: zebra striping for each rh-accordion-header

## Events

### rh-accordion-change

Fires when an rh-accordion-header is activated. The detail object contains the
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

From the RHElements root directory, run:

    npm start

## Code style

Accordion (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
