{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  A spinner is used to indicate to users that an action is in progress.

  <pf-v5-spinner>Loading...</pf-v5-spinner>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  {% htmlexample %}
  <pf-v5-spinner>Loading...</pf-v5-spinner>
  {% endhtmlexample %}
  ### Size variations
  {% htmlexample %}
  <pf-v5-spinner size="sm">Loading...</pf-v5-spinner>
  <pf-v5-spinner size="md">Loading...</pf-v5-spinner>
  <pf-v5-spinner size="lg">Loading...</pf-v5-spinner>
  <pf-v5-spinner size="xl">Loading...</pf-v5-spinner>
  {% endhtmlexample %}

  ### Custom size
  {% htmlexample %}
  <pf-v5-spinner diameter="80px">Loading...</pf-v5-spinner>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
