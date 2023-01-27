{% renderOverview %}
  <pf-badge state="read" number="17">17</pf-badge>
  <pf-badge number="900" threshold="100">900</pf-badge>
  <pf-badge state="unread" number="10">10</pf-badge>
{% endrenderOverview %}

{% band header="Usage" %}
  To provide context to your badge, it is highly encouraged that you also include an `aria-label` attribute in your markup.

  ### Default
  <pf-badge aria-label="2 unread messages" number="2">2</pf-badge>
  ```html
  <pf-badge aria-label="2 unread messages" number="2">2</pf-badge>
  ```

  ### With a threshold
  This adds a "+" next to the number once the threshold value has been passed.

  <pf-badge aria-label="2 unread messages" number="20" threshold="10">20</pf-badge>

  ```html
  <pf-badge aria-label="2 unread messages" number="20" threshold="10">20</pf-badge>
  ```

  ### With a state
  This adds a background color to the badge based on the state.

  <pf-badge state="read" number="10">10</pf-badge>
  <pf-badge state="unread" number="20">20</pf-badge>

  ```html
  <pf-badge state="read" number="10">10</pf-badge>
  <pf-badge state="unread" number="20">20</pf-badge>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
