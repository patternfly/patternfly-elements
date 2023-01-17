{% renderOverview %}
<pfe-progress-stepper>
  <pfe-progress-step variant="success">Completed</pfe-progress-step>
  <pfe-progress-step variant="warning">Issue</pfe-progress-step>
  <pfe-progress-step variant="danger">Failure</pfe-progress-step>
  <pfe-progress-step current variant="info">Running</pfe-progress-step>
  <pfe-progress-step>Last</pfe-progress-step>
</pfe-progress-stepper>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-progress-stepper>
    <pfe-progress-step variant="success">Completed</pfe-progress-step>
    <pfe-progress-step variant="warning">Issue</pfe-progress-step>
    <pfe-progress-step variant="danger">Failure</pfe-progress-step>
    <pfe-progress-step current variant="info">Running</pfe-progress-step>
    <pfe-progress-step>Last</pfe-progress-step>
  </pfe-progress-stepper>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pfe-progress-step", level=3, header="Slots on `pfe-progress-step`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}
{% renderAttributes for="pfe-progress-step", level=3, header="Attributes on `pfe-progress-step`" %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pfe-progress-step", level=3, header="CSS Properties on `pfe-progress-step`" %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
{% renderCssParts for="pfe-progress-step", level=3, header="Parts on `pfe-progress-step`" %}{% endrenderCssParts %}
