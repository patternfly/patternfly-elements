{% renderOverview %}
<pf-progress-stepper>
  <pf-progress-step variant="success">Completed</pf-progress-step>
  <pf-progress-step variant="warning">Issue</pf-progress-step>
  <pf-progress-step variant="danger">Failure</pf-progress-step>
  <pf-progress-step current variant="info">Running</pf-progress-step>
  <pf-progress-step>Last</pf-progress-step>
</pf-progress-stepper>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pf-progress-stepper>
    <pf-progress-step variant="success">Completed</pf-progress-step>
    <pf-progress-step variant="warning">Issue</pf-progress-step>
    <pf-progress-step variant="danger">Failure</pf-progress-step>
    <pf-progress-step current variant="info">Running</pf-progress-step>
    <pf-progress-step>Last</pf-progress-step>
  </pf-progress-stepper>
  ```
{% endband %}


{% renderSlots %}{% endrenderSlots %}

{% renderSlots for='pf-progress-step', header='Slots on `pf-progress-step`' %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
