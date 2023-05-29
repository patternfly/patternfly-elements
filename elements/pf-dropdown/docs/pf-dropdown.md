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
  ### Dropdown with custom trigger element
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

  ### Dropdown with default trigger element
  {% htmlexample %}
  <pf-dropdown>
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

  ### Dropdown with icon
  {% htmlexample %}
  <pf-dropdown id="iconClickTrigger">
      <pf-button size="md" variant="control" slot="trigger" icon="user"></pf-button>
      <pf-dropdown-item value="value1">item1</pf-dropdown-item>
      <pf-dropdown-item value="value2">item2</pf-dropdown-item>
  </pf-dropdown>
  {% endhtmlexample %}

  ### Disabled Dropdown
  {% htmlexample %}
  <pf-dropdown disabled>
      <pf-button slot="trigger">Toggle popover</pf-button>
      <pf-dropdown-item value="value1">item1</pf-dropdown-item>
      <pf-dropdown-item value="value2">item2</pf-dropdown-item>
  </pf-dropdown>
  {% endhtmlexample %}

{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pf-dropdown-item", level=3, header="Slots on `pf-dropdown-item`" %}{% endrenderSlots %}
{% renderSlots for="pf-dropdown-items-group", level=3, header="Slots on `pf-dropdown-items-group`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-dropdown-item", level=3, header="CSS Properties on `pf-dropdown-item`" %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-dropdown-items-group", level=3, header="CSS Properties on `pf-dropdown-items-group`" %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
{% renderCssParts for="pf-dropdown-item", level=3, header="Parts on `pf-dropdown-item`" %}{% endrenderCssParts %}
