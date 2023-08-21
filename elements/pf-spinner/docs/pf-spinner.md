{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  A spinner is used to indicate to users that an action is in progress.

  <pf-spinner>Loading...</pf-spinner>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  {% htmlexample %}
  <pf-spinner>Loading...</pf-spinner>
  {% endhtmlexample %}
  ### Size variations
  {% htmlexample %}
  <pf-spinner size="sm">Loading...</pf-spinner>
  <pf-spinner size="md">Loading...</pf-spinner>
  <pf-spinner size="lg">Loading...</pf-spinner>
  <pf-spinner size="xl">Loading...</pf-spinner>
  {% endhtmlexample %}

  ### Custom size
  {% htmlexample %}
  <pf-spinner diameter="80px">Loading...</pf-spinner>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
