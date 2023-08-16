<script type="module">
import '@patternfly/elements/pf-icon/pf-chip.js';
import '@patternfly/elements/pf-icon/pf-badge.js';
</script>

{% renderOverview %}
  <pf-chip>Chip 1</pf-chip>
{% endrenderOverview %}

{% band header="Usage" %}

### Default

{% htmlexample %}
  <pf-chip>Chip 1</pf-chip>
  <pf-chip>Really long chip that goes on and on</pf-chip>
  <pf-chip>Chip <pf-badge number="7" slot="badge">7</pf-badge></pf-chip>
  <style>
    pf-chip::part(text) {
      max-width: 10em;
    }
  </style>
{% endhtmlexample %}

### Read-only

{% htmlexample %}
  <pf-chip read-only>Read-only chip</pf-chip>
{% endhtmlexample %}

### Chip group

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

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
