<style>
.overview-demo pfe-progress-indicator {
  margin-right: 8px;
}
</style>

{% renderOverview %}
  <div class="overview-demo">
    <pfe-progress-indicator indeterminate size="sm">
      <h3>My fallback loading message</h3>
    </pfe-progress-indicator>
    <pfe-progress-indicator indeterminate size="md">
      <h3>My fallback loading message</h3>
    </pfe-progress-indicator>
    <pfe-progress-indicator indeterminate size="xl">
      <h3>My fallback loading message</h3>
    </pfe-progress-indicator>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-progress-indicator indeterminate>
    <h1>My fallback loading message</h1>
  </pfe-progress-indicator>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
