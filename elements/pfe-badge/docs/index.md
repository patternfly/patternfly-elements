{% renderOverview for=package, title=title %}
  <pfe-badge number="17">17</pfe-badge>
  <pfe-badge number="900" threshold="100">900</pfe-badge>
  <pfe-badge state="info" number="10">10</pfe-badge>
  <pfe-badge state="success" number="20">20</pfe-badge>
  <pfe-badge state="moderate" number="30">30</pfe-badge>
  <pfe-badge state="important" number="40">40</pfe-badge>
  <pfe-badge state="critical" number="50">50</pfe-badge>
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

  <pfe-badge state="info" number="10">10</pfe-badge>
  <pfe-badge state="success" number="20">20</pfe-badge>
  <pfe-badge state="moderate" number="30">30</pfe-badge>
  <pfe-badge state="important" number="40">40</pfe-badge>
  <pfe-badge state="critical" number="50">50</pfe-badge>

  ```html
  <pfe-badge state="info" number="10">10</pfe-badge>
  <pfe-badge state="success" number="20">20</pfe-badge>
  <pfe-badge state="moderate" number="30">30</pfe-badge>
  <pfe-badge state="important" number="40">40</pfe-badge>
  <pfe-badge state="critical" number="50">50</pfe-badge>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
