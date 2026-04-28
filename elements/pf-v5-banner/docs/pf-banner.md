{% renderOverview %}
  <pf-v5-banner>Default</pf-v5-banner>
{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-v5-banner>Default</pf-v5-banner>
  {% endhtmlexample %}


  ### With a variant
  Available variants are: default, info, danger, success, warning

  {% htmlexample %}
  <pf-v5-banner variant="default">Default</pf-v5-banner>
  <pf-v5-banner variant="info">Info</pf-v5-banner>
  <pf-v5-banner variant="danger">Danger</pf-v5-banner>
  <pf-v5-banner variant="success">Success</pf-v5-banner>
  <pf-v5-banner variant="warning">Warning</pf-v5-banner>
  {% endhtmlexample %}


  ### Sticky
  Banners can be set to stick to the top of their container by adding the `sticky` attribute.

  {% htmlexample %}
  <pf-v5-banner sticky>Sticky</pf-v5-banner>
  {% endhtmlexample %}


  ### With an icon
  You can add a icon by using the shorthand icon attribute

  {% htmlexample %} 
    <pf-v5-banner icon="info">Info</pf-v5-banner>
  {% endhtmlexample %}

  Or you can use the icon slot and slot in a `svg` or `pf-v5-icon` element

  {% htmlexample %} 
<pf-v5-banner>
  <pf-v5-icon slot="icon" icon="info-circle"></pf-v5-icon>
  Info
</pf-v5-banner>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
