<script type="module">
import '@patternfly/elements/pf-icon/pf-icon.js';
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

### Chip variants

Chips can be removable or read-only. The Overflow chip is a special chip that is used to expand or collapse the content of a chip group.

#### Read-only

{% htmlexample %}
  <pf-chip readonly>Read-only chip</pf-chip>
{% endhtmlexample %}

#### Overflow chip

{% htmlexample %}
  <pf-chip overflow-chip>Overflow-chip</pf-chip>
{% endhtmlexample %}

#### Max-width

{% htmlexample %}
  <pf-tooltip id="max"
              position="top">
    <pf-chip onclick="this.parentElement.remove()"
             style="max-width:10em;display:inline-block;">Really long chip that goes on and on</pf-chip>
    <span slot="content">Really long chip that goes on and on</span>
  </pf-tooltip>
{% endhtmlexample %}

### Chip group

A **chip group** is a collection of chips that can be grouped by category and used to represent one or more values assigned to a single attribute. When the value of `numChips` is exceeded, additional chips will be hidden using an overflow chip.

Chip groups are typically used in filter and selection use cases to indicate to the user what selections they have made. They separate selections by attribute, for added clarity. An OR relationship is implied between values in the group. Chip groups also give users the ability to either delete an entire chip group at once using the group X, or delete individual chips at a time.

Chip groups are useful to express complex filters to a data set, for example.

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
