{% renderOverview %}
  A banner provides a full-width container for communicating short,
  non-dismissible messages.

  <pf-v6-banner>Default banner</pf-v6-banner>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  {% htmlexample %}
  <pf-v6-banner>Default banner</pf-v6-banner>
  {% endhtmlexample %}

  ### Status
  When a banner conveys status, use the `status` attribute. Include an icon
  and visually-hidden text for screen reader context.

  {% htmlexample %}
  <pf-v6-banner status="danger">
    <span class="pf-v6-screen-reader">Danger alert:</span>
    Danger banner
  </pf-v6-banner>
  {% endhtmlexample %}

  ### Sticky
  Use the `sticky` attribute to keep the banner visible at the top of a
  scrolling container.

  {% htmlexample %}
  <pf-v6-banner sticky>Sticky banner</pf-v6-banner>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
