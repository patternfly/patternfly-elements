{% renderOverview %}
  A button communicates and triggers user actions when clicked or selected.

  <pf-v6-button>Primary</pf-v6-button>
  <pf-v6-button variant="secondary">Secondary</pf-v6-button>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Variants
  {% htmlexample %}
  <pf-v6-button>Primary</pf-v6-button>
  <pf-v6-button variant="secondary">Secondary</pf-v6-button>
  <pf-v6-button variant="tertiary">Tertiary</pf-v6-button>
  <pf-v6-button variant="danger">Danger</pf-v6-button>
  <pf-v6-button variant="warning">Warning</pf-v6-button>
  <pf-v6-button variant="link">Link</pf-v6-button>
  {% endhtmlexample %}

  ### Disabled
  {% htmlexample %}
  <pf-v6-button disabled>Disabled</pf-v6-button>
  <pf-v6-button disabled-focusable>Disabled focusable</pf-v6-button>
  {% endhtmlexample %}

  ### Form submit
  {% htmlexample %}
  <form>
    <pf-v6-button type="submit">Save</pf-v6-button>
    <pf-v6-button type="reset" variant="secondary">Reset</pf-v6-button>
  </form>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
