{% renderOverview %}
  A text input gathers free-form text from a user.

  <label for="overview-input">Name</label>
  <pf-v6-text-input id="overview-input"></pf-v6-text-input>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  {% htmlexample %}
  <label for="basic-input">Name</label>
  <pf-v6-text-input id="basic-input"></pf-v6-text-input>
  {% endhtmlexample %}

  ### Disabled
  {% htmlexample %}
  <pf-v6-text-input disabled accessible-label="disabled" value="disabled text input"></pf-v6-text-input>
  {% endhtmlexample %}

  ### Read only
  {% htmlexample %}
  <pf-v6-text-input readonly accessible-label="readonly" value="read only text"></pf-v6-text-input>
  {% endhtmlexample %}

  ### Plain read only
  {% htmlexample %}
  <pf-v6-text-input readonly plain accessible-label="plain readonly" value="plain read only text"></pf-v6-text-input>
  {% endhtmlexample %}

  ### Validation states
  {% htmlexample %}
  <pf-v6-text-input validated="success" accessible-label="success" value="valid input"></pf-v6-text-input>
  <pf-v6-text-input validated="warning" accessible-label="warning" value="warning input"></pf-v6-text-input>
  <pf-v6-text-input validated="error" accessible-label="error" value="invalid input"></pf-v6-text-input>
  {% endhtmlexample %}

  ### With custom icon
  {% htmlexample %}
  <pf-v6-text-input accessible-label="search">
    <svg slot="icon" role="presentation" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
  </pf-v6-text-input>
  {% endhtmlexample %}

  ### Truncated at start
  {% htmlexample %}
  <pf-v6-text-input truncated="start" accessible-label="truncated" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit"></pf-v6-text-input>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
