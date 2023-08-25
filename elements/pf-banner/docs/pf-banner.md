{% renderOverview %}
  <pf-banner>Default</pf-banner>
{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-banner>Default</pf-banner>
  {% endhtmlexample %}


  ### With a variant
  Available variants are: default, info, danger, success, warning

  {% htmlexample %}
  <pf-banner variant="default">Default</pf-banner>
  <pf-banner variant="info">Info</pf-banner>
  <pf-banner variant="danger">Danger</pf-banner>
  <pf-banner variant="success">Success</pf-banner>
  <pf-banner variant="warning">Warning</pf-banner>
  {% endhtmlexample %}


  ### Sticky
  Banners can be set to stick to the top of their container by adding the `sticky` attribute.

  {% htmlexample %}
  <pf-banner sticky>Sticky</pf-banner>
  {% endhtmlexample %}


  ### With an icon
  You can add a icon by using the shorthand icon attribute

  {% htmlexample %} 
    <pf-banner icon="info">Info</pf-banner>
  {% endhtmlexample %}

  Or you can use the icon slot and slot in a `svg` or `pf-icon` element

  {% htmlexample %} 
<pf-banner>
  <pf-icon slot="icon" icon="info-circle"></pf-icon>
  Info
</pf-banner>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
