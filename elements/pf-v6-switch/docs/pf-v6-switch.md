{% renderOverview %}
  <pf-v6-switch checked>Togglable option</pf-v6-switch>
{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-v6-switch checked>Togglable option</pf-v6-switch>
  {% endhtmlexample %}


  ### Reversed layout
  Use the `reversed` attribute to place the label before the toggle.

  {% htmlexample %}
  <pf-v6-switch reversed checked>Togglable option</pf-v6-switch>
  {% endhtmlexample %}


  ### Without label
  A switch without a visible label must have an `accessible-label` attribute
  to remain accessible.

  {% htmlexample %}
  <pf-v6-switch accessible-label="Togglable option" show-check-icon checked></pf-v6-switch>
  {% endhtmlexample %}


  ### Disabled

  {% htmlexample %}
  <pf-v6-switch disabled checked>Togglable option</pf-v6-switch>
  <pf-v6-switch disabled>Togglable option</pf-v6-switch>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
