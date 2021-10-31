# PatternFly Elements Codeblock
     
Render code in a styled and formatted way

Read more about Codeblock in the [PatternFly Elements Codeblock documentation](https://patternflyelements.org/components/codeblock)

##  Installation

Load `<pfe-codeblock>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-codeblock?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-codeblock
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-codeblock';
```

## Usage

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

