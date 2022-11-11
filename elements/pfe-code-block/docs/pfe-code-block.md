{% renderOverview %}
  Code Block is a component that contains two or more lines of read-only code. The code in a code block can be copied to the clipboard.

  <pfe-code-block id="code">
    <span slot="code">apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo
spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs</span>
    <pfe-clipboard slot="actions" copy-from="#code"></pfe-clipboard>
  </pfe-code-block>
{% endrenderOverview %}

{% band header="Usage" %}
### Basic

Place your code in a `span` with `slot="code"`.

To add copy-to-clipboard functionality, be sure to import `@patternfly/pfe-clipboard` and add the `pfe-clipboard` to the `action` slot.

<pfe-code-block id="basic">
  <span slot="code">apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo
spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs</span>
  <pfe-clipboard slot="actions" copy-from="#basic"></pfe-clipboard>
</pfe-code-block>

```html
<pfe-code-block id="basic">
  <span slot="code">apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo
spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs</span>
  <pfe-clipboard slot="actions" copy-from="#basic"></pfe-clipboard>
</pfe-code-block>
```

### Expandable

If a block of code is long and you'd like to hide some of the code to take us less height on the page, place the code you'd like to hide in a `span` with `slot="expandable-code"`. 

It is important that you place the span right next to the `<span slot="code">` because of how the whitespace will be handled. Failing to do this can result in unwanted line breaks. 

<pfe-code-block id="expandable">
  <span slot="code">apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo</span><span slot="expandable-code">spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs</span>
  <pfe-clipboard slot="actions" copy-from="#expandable"></pfe-clipboard>
</pfe-code-block>

```html
<pfe-code-block id="expandable">
  <span slot="code">apiVersion: helm.openshift.io/v1beta1/
kind: HelmChartRepository
metadata:
name: azure-sample-repo</span><span slot="expandable-code">spec:
connectionConfig:
url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs</span>
  <pfe-clipboard slot="actions" copy-from="#expandable"></pfe-clipboard>
</pfe-code-block>
```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}