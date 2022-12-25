{% renderOverview %}
  <pfe-badge state="read" number="17">17</pfe-badge>
  <pfe-badge number="900" threshold="100">900</pfe-badge>
  <pfe-badge state="unread" number="10">10</pfe-badge>
{% endrenderOverview %}

{% band header="Usage" %}
  To provide context to your badge, it is highly encouraged that you also include an `aria-label` attribute in your markup.

  ### Default
  <pfe-badge aria-label="2 unread messages" number="2">2</pfe-badge>
  ```html
  <pfe-badge aria-label="2 unread messages" number="2">2</pfe-badge>
  ```

  ### With a threshold
  This adds a "+" next to the number once the threshold value has been passed.

  <pfe-badge aria-label="2 unread messages" number="20" threshold="10">20</pfe-badge>

  ```html
  <pfe-badge aria-label="2 unread messages" number="20" threshold="10">20</pfe-badge>
  ```

  ### With a state
  This adds a background color to the badge based on the state.

  <pfe-badge state="read" number="10">10</pfe-badge>
  <pfe-badge state="unread" number="20">20</pfe-badge>

  ```html
  <pfe-badge state="read" number="10">10</pfe-badge>
  <pfe-badge state="unread" number="20">20</pfe-badge>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
