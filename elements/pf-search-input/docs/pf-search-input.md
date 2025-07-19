{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-search-input/pf-search-input.js';
</script>

{% renderOverview %}
  <pf-search-input>
    <pf-option>Blue</pf-option>
    <pf-option>Black</pf-option>
    <pf-option>Brown</pf-option>
    <pf-option>Bronze</pf-option>
    <pf-option>Green</pf-option>
    <pf-option>Magenta</pf-option>
    <pf-option>Orange</pf-option>
    <pf-option>Purple</pf-option>
    <pf-option>Periwinkle</pf-option>
    <pf-option>Pink</pf-option>
    <pf-option>Red</pf-option>
    <pf-option>Yellow</pf-option>
  </pf-search-input>
{% endrenderOverview %}

{% band header="Usage" %}

#### Search Input

{% htmlexample %}
  {% renderFile "./elements/pf-search-input/demo/pf-search-input.html" %}
{% endhtmlexample %}

#### Search Input Form
{% htmlexample %}
  {% renderFile "./elements/pf-search-input/demo/pf-search-input-with-submit.html" %}
{% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
