{% renderOverview %}
  An avatar is a visual used to represent a user. It may contain an image
  or a placeholder graphic.

  <pf-v6-avatar></pf-v6-avatar>
  <pf-v6-avatar src="https://www.gravatar.com/avatar/?d=mp&f=y" alt="User avatar"></pf-v6-avatar>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default (placeholder)
  {% htmlexample %}
  <pf-v6-avatar></pf-v6-avatar>
  {% endhtmlexample %}

  ### With image
  {% htmlexample %}
  <pf-v6-avatar src="https://www.gravatar.com/avatar/?d=mp&f=y" alt="User avatar"></pf-v6-avatar>
  {% endhtmlexample %}

  ### Bordered
  {% htmlexample %}
  <pf-v6-avatar bordered></pf-v6-avatar>
  <pf-v6-avatar bordered src="https://www.gravatar.com/avatar/?d=mp&f=y" alt="User avatar"></pf-v6-avatar>
  {% endhtmlexample %}

  ### Sizes
  {% htmlexample %}
  <pf-v6-avatar size="sm"></pf-v6-avatar>
  <pf-v6-avatar size="md"></pf-v6-avatar>
  <pf-v6-avatar size="lg"></pf-v6-avatar>
  <pf-v6-avatar size="xl"></pf-v6-avatar>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
