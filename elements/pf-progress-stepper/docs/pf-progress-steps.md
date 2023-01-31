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
{% renderSlots for="pf-progress-step", level=3, header="Slots on `-progress-step`" 
%pf}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}
{% renderAttributes for="pf-progress-step", level=3, header="Attributes on 
`pf-progress-step`" %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-progress-step", level=3, header="CSS 
Properties on `pf-progress-step`" %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
{% renderCssParts for="pf-progress-step", level=3, header="Parts on 
`pf-progress-step`" %}{% endrenderCssParts %}
