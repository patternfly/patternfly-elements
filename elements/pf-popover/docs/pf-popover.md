{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}

<pf-popover heading="Popover heading"
            body="Popovers are triggered by click rather than hover."
            footer="Popover footer">
  <pf-button>Toggle popover</pf-button>
</pf-popover>

{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-popover heading="Popover heading"
              body="Popovers are triggered by click rather than hover."
              footer="Popover footer">
    <button>Toggle popover</button>
  </pf-popover>
  {% endhtmlexample %}

  **Note**: Unlike the [Patternfly React implementation][withfocustrap], this 
  component does not trap focus in the popover dialog. If you would like to trap 
  focus, consider using a modal dialog instead.
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

[withfocustrap]: https://www.patternfly.org/v4/components/popover#:~:textwithfocustrap
