{% renderOverview %}

<pf-popover heading="Popover heading" body="Popovers are triggered by click rather than hover." footer="Popover footer">
  <pf-button>Toggle popover</pf-button>
</pf-popover>

{% endrenderOverview %}

<p>Unlike the Patternfly React implementation, this component does not trap focus in the popover dialog. If you woud like to trap focus, consider using a modal dialog instead.</p>

{% band header="Usage" %}

  ```html
  <pf-popover heading="Popover heading" body="Popovers are triggered by click rather than hover." footer="Popover footer">
    <button>Toggle popover</button>
  </pf-popover>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
