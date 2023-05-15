{% renderOverview %}

<pf-dropdown>
  <pf-button slot="trigger">Toggle popover</pf-button>
  <pf-dropdown-item value="value4">item4</pf-dropdown-item>
  <pf-dropdown-item value="value3">item3</pf-dropdown-item>
  <pf-dropdown-items-group label="Group 1">
    <pf-dropdown-item value="value1">item1</pf-dropdown-item>
    <pf-dropdown-item value="value2">item2</pf-dropdown-item>
    <pf-dropdown-item divider></pf-dropdown-item>
    <pf-dropdown-item value="value3">item3</pf-dropdown-item>
  </pf-dropdown-items-group>
  <pf-dropdown-items-group label="Group 2">
    <pf-dropdown-item value="value1">item1</pf-dropdown-item>
    <pf-dropdown-item  value="value2">item2</pf-dropdown-item>
    <pf-dropdown-item disabled value="disabled">disabled</pf-dropdown-item>
    <pf-dropdown-item  value="value3">item3</pf-dropdown-item>
  </pf-dropdown-items-group>
</pf-dropdown>

{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-dropdown>
    <pf-button slot="trigger">Toggle popover</pf-button>
    <pf-dropdown-item value="value4">item4</pf-dropdown-item>
    <pf-dropdown-item value="value3">item3</pf-dropdown-item>
    <pf-dropdown-items-group label="Group 1">
      <pf-dropdown-item value="value1">item1</pf-dropdown-item>
      <pf-dropdown-item value="value2">item2</pf-dropdown-item>
      <pf-dropdown-item divider></pf-dropdown-item>
      <pf-dropdown-item value="value3">item3</pf-dropdown-item>
    </pf-dropdown-items-group>
    <pf-dropdown-items-group label="Group 2">
      <pf-dropdown-item value="value1">item1</pf-dropdown-item>
      <pf-dropdown-item  value="value2">item2</pf-dropdown-item>
      <pf-dropdown-item disabled value="disabled">disabled</pf-dropdown-item>
      <pf-dropdown-item  value="value3">item3</pf-dropdown-item>
    </pf-dropdown-items-group>
  </pf-dropdown>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
