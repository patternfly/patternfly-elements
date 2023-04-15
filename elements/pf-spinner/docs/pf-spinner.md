{% renderOverview %}
  A spinner is used to indicate to users that an action is in progress.
  
  <pf-spinner>Loading...</pf-spinner>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  <div class="example-preview">
  <pf-spinner>Loading...</pf-spinner>
  </div>

  ```html
  <pf-spinner>Loading...</pf-spinner>
  ```

  ### Size variations
  <div class="example-preview">
  <pf-spinner size="sm">Loading...</pf-spinner>
  <pf-spinner size="md">Loading...</pf-spinner>
  <pf-spinner size="lg">Loading...</pf-spinner>
  <pf-spinner size="xl">Loading...</pf-spinner>
  </div>

  ```html
<pf-spinner size="sm">Loading...</pf-spinner>
<pf-spinner size="md">Loading...</pf-spinner>
<pf-spinner size="lg">Loading...</pf-spinner>
<pf-spinner size="xl">Loading...</pf-spinner>
  ```

  ### Custom size
  <div class="example-preview">
  <pf-spinner diameter="80px">Loading...</pf-spinner>
  </div>

  ```html
<pf-spinner diameter="80px">Loading...</pf-spinner>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
