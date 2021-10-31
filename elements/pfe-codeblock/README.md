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
### Caveats
This component, when imported, disabled Prism.js global autoHighlighting. To restore the default behaviour,
enable auto highlight _before_ loading `<pfe-codeblock>`'s script

```js
window.Prism = { manual: false };
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

```bash
npm run dev
```

## Test

```bash
npm run tests
```

## Build

```bash
npm run build
```

## Demo

From the PFElements root directory, run:

```bash
npm run demo
