{% renderOverview %}
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pfe-progress-steps-item", level=3, header="Slots on `pfe-progress-steps-item`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}
{% renderAttributes for="pfe-progress-steps-item", level=3, header="Attributes on `pfe-progress-steps-item`" %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pfe-progress-steps-item", level=3, header="CSS Properties on `pfe-progress-steps-item`" %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
{% renderCssParts for="pfe-progress-steps-item", level=3, header="Parts on `pfe-progress-steps-item`" %}{% endrenderCssParts %}
