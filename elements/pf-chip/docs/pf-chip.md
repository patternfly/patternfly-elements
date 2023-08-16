<script type="module">
import '@patternfly/elements/pf-icon/pf-chip.js';
import '@patternfly/elements/pf-badge/pf-badge.js';
import '@patternfly/elements/pf-tooltip/pf-tooltip.js';
</script>

{% renderOverview %}
  <pf-chip>Chip 1</pf-chip>
{% endrenderOverview %}

{% band header="Usage" %}

### Default

{% htmlexample %}
  <pf-chip>Chip 1</pf-chip>
  <pf-chip>Chip <pf-badge number="7">7</pf-badge></pf-chip>
{% endhtmlexample %}

### Read-only

{% htmlexample %}
  <pf-chip read-only>Read-only chip</pf-chip>
{% endhtmlexample %}

### Max-width

{% htmlexample %}
  <pf-tooltip position="top">
    <pf-chip>Really long chip that goes on and on</pf-chip>
    <span slot="content">Really long chip that goes on and on</span>
  </pf-tooltip>
  <style>
    pf-chip::part(text) {
      max-width: 10em;
      overflow-x: hidden;
      overflow-y: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      text-wrap: nowrap;
    }
  </style>
{% endhtmlexample %}

### Chip group

A **chip group** is a collection of chips that can be grouped by category and used to represent one or more values assigned to a single attribute. When the value of numChips is exceeded, additional chips will be hidden using an overflow chip.

{% htmlexample %}
  <pf-chip-group>
    <pf-chip>Chip 1</pf-chip>
    <pf-chip>Chip 2</pf-chip>
    <pf-chip>Chip 3</pf-chip>
    <pf-chip>Chip 4</pf-chip>
  </pf-chip-group>
{% endhtmlexample %}

#### Chip group with categories

{% htmlexample %}
  <pf-chip-group>
    <span slot="category-name">Category one</span>
    <pf-chip>Chip 1</pf-chip>
    <pf-chip>Chip 2</pf-chip>
    <pf-chip>Chip 3</pf-chip>
    <pf-chip>Chip 4</pf-chip>
  </pf-chip-group>
  <br><br>
  <pf-chip-group>
    <span slot="category-name">Category two</span>
    <pf-chip>Chip 5</pf-chip>
    <pf-chip>Chip 6</pf-chip>
    <pf-chip>Chip 7</pf-chip>
    <pf-chip>Chip 8</pf-chip>
  </pf-chip-group>
{% endhtmlexample %}

#### Chip group with removable categories

{% htmlexample %}
  <pf-chip-group closeable>
    <span slot="category-name">Category three</span>
    <pf-chip>Chip 1</pf-chip>
    <pf-chip>Chip 2</pf-chip>
    <pf-chip>Chip 3</pf-chip>
    <pf-chip>Chip 4</pf-chip>
  </pf-chip-group>
{% endhtmlexample %}

{% endband %}

{% renderSlots for="pf-chip", header="Slots on `pf-chip`" %}{% endrenderSlots %}
{% renderAttributes for="pf-chip", header="Attributes on `pf-chip`" %}{% endrenderAttributes %}
{% renderMethods for="pf-chip", header="Methods on `pf-chip`" %}{% endrenderMethods %}
{% renderEvents for="pf-chip", header="Events on `pf-chip`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-chip", header="CSS Custom Properties on `pf-chip`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-chip", header="CSS Parts on `pf-chip`" %}{% endrenderCssParts %}

{% renderSlots for="pf-chip-group", header="Slots on `pf-chip-group`" %}{% endrenderSlots %}
{% renderAttributes for="pf-chip-group", header="Attributes on `pf-chip-group`" %}{% endrenderAttributes %}
{% renderMethods for="pf-chip-group", header="Methods on `pf-chip-group`" %}{% endrenderMethods %}
{% renderEvents for="pf-chi-group", header="Events on `pf-chip-group`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-chip-group", header="CSS Custom Properties on `pf-chip`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-chip-group", header="CSS Parts on `pf-chip-group`" %}{% endrenderCssParts %}
