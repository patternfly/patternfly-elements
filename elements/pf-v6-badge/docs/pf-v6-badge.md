{% renderOverview %}
  A badge is used to annotate other information like a label or an object name.

  <pf-v6-badge state="unread">7</pf-v6-badge>
  <pf-v6-badge state="read">24</pf-v6-badge>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Read and unread
  {% htmlexample %}
  <pf-v6-badge state="unread">7</pf-v6-badge>
  <pf-v6-badge state="read">24</pf-v6-badge>
  {% endhtmlexample %}

  ### Disabled
  {% htmlexample %}
  <pf-v6-badge state="read" disabled>10</pf-v6-badge>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
