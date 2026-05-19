{% renderOverview %}
  A badge is used to annotate other information like a label or an object name.

  <pf-v6-badge state="unread" number="7">7</pf-v6-badge>
  <pf-v6-badge state="read" number="24">24</pf-v6-badge>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Read and unread
  {% htmlexample %}
  <pf-v6-badge state="unread" number="7">7</pf-v6-badge>
  <pf-v6-badge state="read" number="24">24</pf-v6-badge>
  {% endhtmlexample %}

  ### With threshold
  Use the `threshold` attribute to cap the displayed value with a `+` suffix.

  {% htmlexample %}
  <pf-v6-badge state="unread" number="900" threshold="100">900</pf-v6-badge>
  <pf-v6-badge state="read" number="50" threshold="100">50</pf-v6-badge>
  {% endhtmlexample %}

  ### Disabled
  {% htmlexample %}
  <pf-v6-badge state="read" disabled number="10">10</pf-v6-badge>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
