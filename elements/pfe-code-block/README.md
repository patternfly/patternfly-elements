# PatternFly Elements Code Block
`<pfe-code-block>` is a component that contains two or more lines of ready-only 
code. The code in a code block can be copied to the clipboard.

Read more about Code Block in the [PatternFly Elements Code Block 
documentation](https://patternflyelements.org/components/code-block)

##  Installation

Load `<pfe-code-block>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pfe-code-block/pfe-code-block.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-code-block
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-code-block';
```

## Usage
### Basic

Place your code in a `script` tag with a [non-javascript mimetype][mime].
JavaScript snippets **must** use the `text/javascript-sample` script type. 
Script text content will be automatically dedented.


To add copy-to-clipboard functionality, be sure to import 
`@patternfly/pfe-clipboard` and add the `pfe-clipboard` to the `action` slot.

```html
<pfe-code-block>
  <script type="application/openshift">
    apiVersion: helm.openshift.io/v1beta1/
    kind: HelmChartRepository
    metadata:
    name: azure-sample-repo0oooo00ooo
    spec:
    connectionConfig:
    url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
  </script>
</pfe-code-block>
```

### Expandable

If a block of code is long and you'd like to hide some of the code to take up 
less height on the page, place the code you'd like to hide in a `script` with 
`data-expand` attribute present.

It is important that you place the span right next to the first `script`, 
because of how the whitespace will be handled. Failing to do this can result in 
unwanted line breaks. 

```html
<pfe-code-block id="expandable-code">
  <script type="application/openshift">
    apiVersion: helm.openshift.io/v1beta1/
    kind: HelmChartRepository
    metadata:
    name: azure-sample-repo</script><script type="application/openshift" 
    data-expand>
    spec:
    connectionConfig:
    url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
  </script>
  <pfe-clipboard slot="actions" copy-from="#expandable-code"></pfe-clipboard>
</pfe-code-block>
```
