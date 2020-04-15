# PatternFly Element | Codeblock element
A component to display formatted and prettified code

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-codeblock pfe-language="markup">
    <pre pfe-codeblock-container>
    <code>
       Code to be styled in the codeblock is here!
    </code>
    </pre>
</pfe-codeblock> 
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

There is a default slot but it is just used to capture the light DOM and hide it.

## Attributes

- `pfe-language`: Passed to Prism.js to be used to correctly format code, valid values are [
      "markup",
      "html",
      "xml",
      "svg",
      "mathml",
      "css",
      "clike",
      "javascript",
      "js"
    ]
- `pfe-codeblock-container`: Used on the pre tag to denote content to format is inside in a code block


## Dependencies
Prism.js is used to format and style the codeblock, https://prismjs.com/

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Codeblock (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
