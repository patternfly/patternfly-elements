<style>
.overview-demo pfe-spinner {
  margin-right: 8px;
}
</style>

{% renderOverview %}
  <div class="overview-demo">
    <pfe-spinner indeterminate size="sm">
      <h3>My fallback loading message</h3>
    </pfe-spinner>
    <pfe-spinner indeterminate size="md">
      <h3>My fallback loading message</h3>
    </pfe-spinner>
    <pfe-spinner indeterminate size="xl">
      <h3>My fallback loading message</h3>
    </pfe-spinner>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-spinner indeterminate>
    <h1>My fallback loading message</h1>
  </pfe-spinner>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
