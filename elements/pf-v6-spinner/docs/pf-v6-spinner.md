{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  A spinner is an animated visual that indicates when a quick action is in progress.

  <pf-v6-spinner accessible-label="Loading contents">Loading...</pf-v6-spinner>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  {% htmlexample %}
  <pf-v6-spinner accessible-label="Loading contents">Loading...</pf-v6-spinner>
  {% endhtmlexample %}

  ### Size variations
  Use the `size` attribute to set the spinner size to `xs`, `sm`, `md`, `lg`, or `xl`.

  {% htmlexample %}
  <pf-v6-spinner size="xs" accessible-label="Extra small spinner"></pf-v6-spinner>
  <pf-v6-spinner size="sm" accessible-label="Small spinner"></pf-v6-spinner>
  <pf-v6-spinner size="md" accessible-label="Medium spinner"></pf-v6-spinner>
  <pf-v6-spinner size="lg" accessible-label="Large spinner"></pf-v6-spinner>
  <pf-v6-spinner size="xl" accessible-label="Extra large spinner"></pf-v6-spinner>
  {% endhtmlexample %}

  ### Custom size
  Use the `--pf-v6-c-spinner--diameter` CSS custom property to set a custom size.

  {% htmlexample %}
  <pf-v6-spinner style="--pf-v6-c-spinner--diameter: 80px;" accessible-label="Custom size spinner"></pf-v6-spinner>
  {% endhtmlexample %}

  ### Inline
  Set the `inline` attribute to inherit the font size from surrounding text.

  {% htmlexample %}
  <p>Content is loading <pf-v6-spinner inline accessible-label="Loading"></pf-v6-spinner></p>
  {% endhtmlexample %}
  
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
