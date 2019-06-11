# PatternFly Element | Markdown Element

Use this element to take markdown and have it display as HTML. This element uses the [marked.js library](https://marked.js.org/#/README.md#README.md) to convert the markdown to HTML.

## Usage

```
<pfe-markdown>
  <div pfe-markdown-container># This is a heading</div>
</pfe-markdown>
```

It is important that the div with the `pfe-markdown-container` attribute is present. Without it, the element won't work. This element does not actually use the shadow DOM to display it's contents.

At runtime, a child div with an attribute of `pfe-markdown-render` is appended to the light DOM and the `pfe-markdown-container` div is hidden with an inline style. The purpose behind this is so that all of the styles that are present in the light DOM are available to the converted markdown.

## Slots

There is a default slot but it is just used to capture the light DOM and hide it.

## Attributes

None.

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
