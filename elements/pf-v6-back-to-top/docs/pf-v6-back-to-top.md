{% renderOverview %}
  A back-to-top shortcut navigates to the top of a lengthy content page.

  <pf-v6-back-to-top always-visible>Back to top</pf-v6-back-to-top>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  The component appears automatically when the user scrolls down.

  {% htmlexample %}
  <pf-v6-back-to-top>Back to top</pf-v6-back-to-top>
  {% endhtmlexample %}

  ### Always visible
  Use `always-visible` to display the button regardless of scroll position.

  {% htmlexample %}
  <pf-v6-back-to-top always-visible>Back to top</pf-v6-back-to-top>
  {% endhtmlexample %}

  ### Link mode
  Use `href` to render the component as a link instead of a button.

  {% htmlexample %}
  <pf-v6-back-to-top always-visible href="#top">Back to top</pf-v6-back-to-top>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
