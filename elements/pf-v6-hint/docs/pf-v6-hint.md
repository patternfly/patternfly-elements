{% renderOverview %}
  A hint is an in-app message that shares a reminder, explanation, or call to action.

  <pf-v6-hint>
    Welcome to the new documentation experience.
    <a href="#">Learn more about the improved features</a>.
  </pf-v6-hint>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic

  {% htmlexample %}
  <pf-v6-hint>
    Welcome to the new documentation experience.
  </pf-v6-hint>
  {% endhtmlexample %}

  ### Title

  Put the title in the `title` slot. The global `title` attribute is the
  browser tooltip, so it is not the hint title.

  {% htmlexample %}
  <pf-v6-hint>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  </pf-v6-hint>
  {% endhtmlexample %}

  ### Footer

  {% htmlexample %}
  <pf-v6-hint>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
    <pf-v6-button slot="footer" variant="link" inline>Try it for 90 days</pf-v6-button>
  </pf-v6-hint>
  {% endhtmlexample %}

  ### Actions

  Plain actions are pulled up to align with the title. Set `no-actions-offset`
  when the action is a button or the title is taller than one line.

  {% htmlexample %}
  <pf-v6-hint no-actions-offset>
    <pf-v6-button slot="actions" variant="primary">Action</pf-v6-button>
    <span slot="title">Do more with Find it Fix it capabilities</span>
    Upgrade to Red Hat Smart Management to remediate all your systems across regions and geographies.
  </pf-v6-hint>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
