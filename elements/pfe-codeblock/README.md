# PatternFly Element | Codeblock element
Render code in a styled and formatted way

## Usage
Describe how best to use this web component along with best practices.

```html
<h2>HTML Markup</h2>
<pfe-codeblock code-language="markup">
<pre codeblock-container>
<code>
&#x3C;h1&#x3E;example html&#x3C;/h1&#x3E;
&#x3C;p&#x3E;some paragraph text&#x3C;/p&#x3E;
</code>
</pre>
</pfe-codeblock>

<h2>Javascript Markup</h2>
<pfe-codeblock code-language="javascript">
<pre codeblock-container>
<code>
const example="javascript";
let test=null;
</code>
</pre>
</pfe-codeblock>
```
## Attributes

- `code-language`: Describe this attribute and what function is serves. Valid values include: markup, html, xml, svg, mathml, css, clike, javascript, js.
- `code-line-numbers`: Describe this attribute and what function is serves.
- `code-line-number-start`: Describe this attribute and what function is serves.
- `code-theme`: Describe this attribute and what function is serves.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-theme--font-family--code` | "Overpass Mono", Consolas, Monaco, "Andale Mono", monospace | N/A |

## Dependencies
Describe any dependent elements or libraries here too.

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
