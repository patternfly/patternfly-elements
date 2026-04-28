<script type="module">
import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';
import '@patternfly/elements/pf-v5-badge/pf-v5-badge.js';
import '@patternfly/elements/pf-v5-tooltip/pf-v5-tooltip.js';
</script>

{% renderOverview %}
  <pf-v5-chip>Chip 1</pf-v5-chip>
{% endrenderOverview %}

{% band header="Usage" %}

### Default

{% htmlexample %}
  <pf-v5-chip>Chip 1</pf-v5-chip>
  <pf-v5-chip>Chip <pf-v5-badge number="7">7</pf-v5-badge></pf-v5-chip>
{% endhtmlexample %}

### Chip variants

Chips can be removable or read-only. The Overflow chip is a special chip that is used to expand or collapse the content of a chip group.

#### Read-only

{% htmlexample %}
  <pf-v5-chip readonly>Read-only chip</pf-v5-chip>
{% endhtmlexample %}

#### Overflow chip

{% htmlexample %}
  <pf-v5-chip overflow-chip>Overflow-chip</pf-v5-chip>
{% endhtmlexample %}

#### Max-width

{% htmlexample %}
  <pf-v5-tooltip id="max"
              position="top">
    <pf-v5-chip onclick="this.parentElement.remove()"
             style="max-width:10em;">Really long chip that goes on and on</pf-v5-chip>
    <span slot="content">Really long chip that goes on and on</span>
  </pf-v5-tooltip>
{% endhtmlexample %}

### Chip group

A **chip group** is a collection of chips that can be grouped by category and used to represent one or more values assigned to a single attribute. When the value of `numChips` is exceeded, additional chips will be hidden using an overflow chip.

Chip groups are typically used in filter and selection use cases to indicate to the user what selections they have made. They separate selections by attribute, for added clarity. An OR relationship is implied between values in the group. Chip groups also give users the ability to either delete an entire chip group at once using the group X, or delete individual chips at a time.

Chip groups are useful to express complex filters to a data set, for example.

{% htmlexample %}
  <pf-v5-chip-group>
    <pf-v5-chip>Chip 1</pf-v5-chip>
    <pf-v5-chip>Chip 2</pf-v5-chip>
    <pf-v5-chip>Chip 3</pf-v5-chip>
    <pf-v5-chip>Chip 4</pf-v5-chip>
  </pf-v5-chip-group>
{% endhtmlexample %}

#### Chip group with categories

{% htmlexample %}
  <pf-v5-chip-group>
    <span slot="category-name">Category one</span>
    <pf-v5-chip>Chip 1</pf-v5-chip>
    <pf-v5-chip>Chip 2</pf-v5-chip>
    <pf-v5-chip>Chip 3</pf-v5-chip>
    <pf-v5-chip>Chip 4</pf-v5-chip>
  </pf-v5-chip-group>
  <br><br>
  <pf-v5-chip-group>
    <span slot="category-name">Category two</span>
    <pf-v5-chip>Chip 5</pf-v5-chip>
    <pf-v5-chip>Chip 6</pf-v5-chip>
    <pf-v5-chip>Chip 7</pf-v5-chip>
    <pf-v5-chip>Chip 8</pf-v5-chip>
  </pf-v5-chip-group>
{% endhtmlexample %}

#### Chip group with removable categories

{% htmlexample %}
  <pf-v5-chip-group closeable>
    <span slot="category-name">Category three</span>
    <pf-v5-chip>Chip 1</pf-v5-chip>
    <pf-v5-chip>Chip 2</pf-v5-chip>
    <pf-v5-chip>Chip 3</pf-v5-chip>
    <pf-v5-chip>Chip 4</pf-v5-chip>
  </pf-v5-chip-group>
{% endhtmlexample %}

{% endband %}

{% band header="Accessibility" %}

The select uses the [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) recommendations from the WAI ARIA [Authoring Best Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg).

#### Chips

When focus is on an individual chip that is not `readonly`, the following keyboard interactions apply:

| Key                    | Function                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>       | On an overflow chip, shows/hides additional chips. Otherwise removes a chip.        |
| <kbd>Space</kbd>       | On an overflow chip, shows/hides additional chips. Otherwise removes a chip.        |

#### Chip groups

Chip groups use the [APG's Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) recommendation. When focus in a chip group, the following keyboard interactions apply:

| Key                    | Function                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>       | When focus is on a group's remove botton, removes the group.                        |
| <kbd>Space</kbd>       | When focus is on a group's remove botton, removes the group.                        |
| <kbd>Up Arrow</kbd>    | Moves focus to the previous item, optionally wrapping from the first to the last.   |
| <kbd>Down Arrow</kbd>  | Moves focus to the next item, optionally wrapping from the last to the first.       |
| <kbd>Left Arrow</kbd>  | Moves focus to the previous item, optionally wrapping from the first to the last.   |
| <kbd>Right Arrow</kbd> | Moves focus to the next item, optionally wrapping from the last to the first.       |
| <kbd>Home</kbd>        | Moves focus to the first item in the current group.                                 |

{% endband %}

{% renderSlots for="pf-v5-chip", header="Slots on `pf-v5-chip`" %}{% endrenderSlots %}
{% renderAttributes for="pf-v5-chip", header="Attributes on `pf-v5-chip`" %}{% endrenderAttributes %}
{% renderMethods for="pf-v5-chip", header="Methods on `pf-v5-chip`" %}{% endrenderMethods %}
{% renderEvents for="pf-v5-chip", header="Events on `pf-v5-chip`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-v5-chip", header="CSS Custom Properties on `pf-v5-chip`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-v5-chip", header="CSS Parts on `pf-v5-chip`" %}{% endrenderCssParts %}

{% renderSlots for="pf-v5-chip-group", header="Slots on `pf-v5-chip-group`" %}{% endrenderSlots %}
{% renderAttributes for="pf-v5-chip-group", header="Attributes on `pf-v5-chip-group`" %}{% endrenderAttributes %}
{% renderMethods for="pf-v5-chip-group", header="Methods on `pf-v5-chip-group`" %}{% endrenderMethods %}
{% renderEvents for="pf-v5-chi-group", header="Events on `pf-v5-chip-group`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-v5-chip-group", header="CSS Custom Properties on `pf-v5-chip`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-v5-chip-group", header="CSS Parts on `pf-v5-chip-group`" %}{% endrenderCssParts %}
