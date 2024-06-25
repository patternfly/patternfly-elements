{% renderOverview %}
  <pf-text-area></pf-text-area>
{% endrenderOverview %}

{% band header="Usage" %}
 ### Basic
 {% htmlexample %}
 <label for="text">Text Area : </label>
 <pf-text-area id="text"></pf-text-area>
 {% endhtmlexample %}

 ### With Placeholder 
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-text-area id="text" placeholder="placeholder"></pf-text-area>
  {% endhtmlexample %}

 ### Required 
  {% htmlexample %}
   <label for="text">Text Area : </label>
   <pf-text-area id="text" placeholder="placeholder" required="true" ></pf-text-area>
  {% endhtmlexample %}

 ### Disabled state
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-text-area id="text" placeholder="placeholder" disabled="true" ></pf-text-area>
  {% endhtmlexample %}

  ### Resize Vertical
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-text-area id="text" placeholder="placeholder" resize='vertical'></pf-text-area>
  {% endhtmlexample %}

  ### Resize Horizontal
  {% htmlexample %}
  <label for="text">Text Area : </label>
  <pf-text-area id="text" placeholder="placeholder" resize='horizontal'></pf-text-area>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
