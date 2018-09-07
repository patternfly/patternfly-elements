# WIP 🐣: RHElements Card Element

## Usage

```html
<rh-card>
  <h2 slot="header">RH Card</h2>
  This is the rh-card body.
  <div slot="footer">Text in footer</div>
</rh-card>
```

## Slots

### header
If this slot is used, we expect a heading level tag (h1, h2, h3, h4, h5, h6) to
be used here.

### Default slot (body)
Any content that is not designated for the header or footer slot, will go to this slot.

### footer
Use this slot for anything that you want in the footer of the card.

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Card (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
