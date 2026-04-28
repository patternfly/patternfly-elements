{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
<pf-v5-progress-stepper>
  <pf-v5-progress-step variant="success">Completed</pf-v5-progress-step>
  <pf-v5-progress-step variant="warning">Issue</pf-v5-progress-step>
  <pf-v5-progress-step variant="danger">Failure</pf-v5-progress-step>
  <pf-v5-progress-step current variant="info">Running</pf-v5-progress-step>
  <pf-v5-progress-step>Last</pf-v5-progress-step>
</pf-v5-progress-stepper>
{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-v5-progress-stepper>
    <pf-v5-progress-step variant="success">Completed</pf-v5-progress-step>
    <pf-v5-progress-step current variant="warning">Issue</pf-v5-progress-step>
    <pf-v5-progress-step variant="danger">Failure</pf-v5-progress-step>
    <pf-v5-progress-step variant="info">Running</pf-v5-progress-step>
    <pf-v5-progress-step>Last</pf-v5-progress-step>
  </pf-v5-progress-stepper>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderSlots for='pf-v5-progress-step', header='Slots on `pf-v5-progress-step`' %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
