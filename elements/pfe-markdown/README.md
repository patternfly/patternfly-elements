# PatternFly Elements Markdown
     
Use this element to take markdown and have it display as HTML. This element uses the [marked.js library](https://marked.js.org/) to convert the markdown to HTML.

Read more about Markdown in the [PatternFly Elements Markdown documentation](https://patternflyelements.org/components/markdown)

##  Installation

Load `<pfe-markdown>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-markdown?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-markdown
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-markdown';
```

## Usage

```html
<pfe-markdown>
  <div pfe-markdown-container># This is a heading</div>
</pfe-markdown>
```

It is important that the div with the `pfe-markdown-container` attribute is present. Without it, the element won't work. This element does not actually use the shadow DOM to display it's contents.

At runtime, a child div with an attribute of `pfe-markdown-render` is appended to the light DOM and the `pfe-markdown-container` div is hidden with an inline style. The purpose behind this is so that all of the styles that are present in the light DOM are available to the converted markdown.

