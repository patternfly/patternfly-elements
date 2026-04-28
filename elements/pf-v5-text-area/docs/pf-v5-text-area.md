{% renderOverview %}
  <pf-v5-text-area></pf-v5-text-area>
{% endrenderOverview %}

{% band header="Usage" %}
 ### Basic
 {% htmlexample %}
 <label for="text">Text Area : </label>
 <pf-v5-text-area id="text"></pf-v5-text-area>
 {% endhtmlexample %}

 ### With Placeholder 
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-v5-text-area id="text" placeholder="placeholder"></pf-v5-text-area>
  {% endhtmlexample %}

 ### Required 
  {% htmlexample %}
   <label for="text">Text Area : </label>
   <pf-v5-text-area id="text" placeholder="placeholder" required="true" ></pf-v5-text-area>
  {% endhtmlexample %}

 ### Disabled state
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-v5-text-area id="text" placeholder="placeholder" disabled="true" ></pf-v5-text-area>
  {% endhtmlexample %}

  ### Resize Vertical
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-v5-text-area id="text" placeholder="placeholder" resize='vertical'></pf-v5-text-area>
  {% endhtmlexample %}

  ### Resize Horizontal
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-v5-text-area id="text" placeholder="placeholder" resize='horizontal'></pf-v5-text-area>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
