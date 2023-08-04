{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  Code Block is a component that contains two or more lines of read-only code. The code in a code block can be copied to the clipboard.

  <pf-code-block id="code">
    <script type="application/openshift">
      apiVersion: helm.openshift.io/v1beta1/
      kind: HelmChartRepository
      metadata:
      name: azure-sample-repo
      spec:
      connectionConfig:
      url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
    </script>
    <pf-clipboard slot="actions" copy-from="#code"></pf-clipboard>
  </pf-code-block>
{% endrenderOverview %}

{% band header="Usage" %}
### Basic

Place your code in a `script` tag with a [non-javascript mimetype][mime].
JavaScript snippets **must** use the `text/javascript-sample` script type. 
Script text content will be automatically dedented.

To add copy-to-clipboard functionality, be sure to import `@patternfly/pf-clipboard` and add the `pf-clipboard` to the `action` slot.

{% htmlexample %}
<pf-code-block id="basic">
  <script type="application/openshift">
    apiVersion: helm.openshift.io/v1beta1/
    kind: HelmChartRepository
    metadata:
    name: azure-sample-repo
    spec:
    connectionConfig:
    url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
  </script>
  <pf-clipboard slot="actions" copy-from="#basic"></pf-clipboard>
</pf-code-block>
{% endhtmlexample %}

### Expandable

If a block of code is long and you'd like to hide some of the code to take us less height on the page, place the code you'd like to hide in a `span` with `slot="expandable-code"`. 

It is important that you place the span right next to the `<script type="application/openshift">` because of how 
the whitespace will be handled. Failing to do this can result in unwanted line 
breaks. 

{% htmlexample %}
<pf-code-block id="expandable-code">
  <script type="application/openshift">
    apiVersion: helm.openshift.io/v1beta1/
    kind: HelmChartRepository
    metadata:
    name: azure-sample-repo</script><script type="application/openshift" data-expand>
    spec:
    connectionConfig:
    url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
  </script>
  <pf-clipboard slot="actions" copy-from="#expandable-code"></pf-clipboard>
</pf-code-block>
{% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

[mime]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#textjavascript
