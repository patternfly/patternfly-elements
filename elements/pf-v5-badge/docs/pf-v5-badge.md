{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  <pf-v5-badge state="read" number="17">17</pf-v5-badge>
  <pf-v5-badge number="900" threshold="100">900</pf-v5-badge>
  <pf-v5-badge state="unread" number="10">10</pf-v5-badge>
{% endrenderOverview %}

{% band header="Usage" %}
  To provide context to your badge, it is highly encouraged that you also include an `aria-label` attribute in your markup.

  ### Default
  {% htmlexample %}
  <pf-v5-badge aria-label="2 unread messages" number="2">2</pf-v5-badge>
  {% endhtmlexample %}

  ### With a threshold
  This adds a "+" next to the number once the threshold value has been passed.

  {% htmlexample %}
  <pf-v5-badge aria-label="2 unread messages" number="20" threshold="10">20</pf-v5-badge>
  {% endhtmlexample %}

  ### With a state
  This adds a background color to the badge based on the state.

  {% htmlexample %}
  <pf-v5-badge state="read" number="10">10</pf-v5-badge>
  <pf-v5-badge state="unread" number="20">20</pf-v5-badge>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
