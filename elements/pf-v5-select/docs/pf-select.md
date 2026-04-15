{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-v5-select/pf-v5-select.js';
</script>

{% renderOverview %}
  <pf-v5-select accessible-label="Color"
             placeholder="Select a value">
    <pf-v5-option value="Blue">Blue</pf-v5-option>
    <pf-v5-option value="Green">Green</pf-v5-option>
    <pf-v5-option value="Magenta">Magenta</pf-v5-option>
    <pf-v5-option value="Orange">Orange</pf-v5-option>
    <pf-v5-option value="Purple">Purple</pf-v5-option>
    <pf-v5-option value="Pink">Pink</pf-v5-option>
    <pf-v5-option value="Red">Red</pf-v5-option>
    <pf-v5-option value="Yellow">Yellow</pf-v5-option>
  </pf-v5-select>
{% endrenderOverview %}

{% band header="Usage" %}

#### Single

Focus on options using arrow keys or
by typing the first character of an option.

{% htmlexample %}
  {% renderFile "./elements/pf-v5-select/demo/index.html" %}
{% endhtmlexample %}

#### Single with description
{% htmlexample %}
  {% renderFile "./elements/pf-v5-select/demo/single-with-description.html" %}
{% endhtmlexample %}

#### Grouped single
{% htmlexample %}
  {% renderFile "./elements/pf-v5-select/demo/grouped-single.html" %}
{% endhtmlexample %}

#### Checkbox input

Multiple options can be selected. Any arrow keys work.
<kbd>Shift</kbd> will toggling off multiple items.
<kbd>Ctrl+A</kbd> will toggle selection on all items.

{% htmlexample %}
  {% renderFile "./elements/pf-v5-select/demo/checkbox-input.html" %}
{% endhtmlexample %}

{# save this for v5
### Option variations

Below are option variants:

{% htmlexample %}
  <pf-v5-select accessible-label="options">
    <pf-v5-option value="Basic">Basic option</pf-v5-option>
    <pf-v5-option value="Description">
      <span>Option with description</span>
      <span slot="description">This is a description</span>
    </pf-v5-option>
    <pf-v5-option value="Icon">
      <pf-v5-icon size="md" icon="paint-brush" set="fas" slot="icon"></pf-v5-icon>
      Option with icon
    </pf-v5-option>
    <pf-v5-option value="aria-disabled" aria-disabled="true">Aria-disabled option</pf-v5-option>
  </pf-v5-select>
{% endhtmlexample %}
#}
When setting the `disabled` attribute on options, they are still focusable, but
they are not selectable. This is in  order that they remain accessible to screen
readers. This functions similarly to the `aria-disabled="true"` attribute.

{% renderFile "./docs/_snippets/wai-aria-disabled.md" %}

  ### Typeahead
  {% htmlexample %}
    {% renderFile "./elements/pf-v5-select/demo/typeahead.html" %}
  {% endhtmlexample %}

{# 

  #### Multiple

  {% htmlexample %}
    {% renderFile "./elements/pf-v5-select/demo/typeahead-multiple.html" %}
  {% endhtmlexample %}

  #### Custom filtering

  By default, filtering is **enabled** and **not** case sensitive.
  However, filtering can be customized with the `customFilter` option, 
  which is a predicate function that takes an option.

  {% htmlexample %}
    {% renderFile "./elements/pf-v5-select/demo/typeahead-custom-filter.html" %}
  {% endhtmlexample %}
#}

{% endband %}

{% band header="Accessibility" %}

The select uses the [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) recommendations from the WAI ARIA [Authoring Best Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg).

When the dropdown is disabled it follows [WAI ARIA focusability recommendations](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols) for composite widget elements, where dropdown items are still focusable even when the dropdown is disabled.

#### Toggle button and typeahead input

When focus is on the toggle button, the following keyboard interactions apply:

| Key                    | Function                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>       | Opens the listbox.                                                                     |
| <kbd>Space</kbd>       | Opens the listbox.                                                                     |
| <kbd>Down Arrow</kbd>  | Opens the listbox and moves focus to the first listbox item.                           |
| <kbd>Tab</kbd>         | Moves focus out of select element onto the next focusable item and closes listbox.     |
| <kbd>Shift + Tab</kbd> | Moves focus out of select element onto the previous focusable item and closes listbox. |

#### Listbox options

Listbox options use the [APG's Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) recommendation. When focus is on the listbox, the following keyboard interactions apply:

| Key                    | Function                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>       | Selects the options and closes the listbox.                                           |
| <kbd>Space</kbd>       | Selects the options and closes the listbox.                                           |
| <kbd>Shift</kbd>       | Enables multiselect.                                                                  |
| <kbd>Control + A</kbd> | Selects all options.                                                                  |
| <kbd>Tab</kbd>         | Moves focus out of select element onto the next focusable options and closes listbox. |
| <kbd>Shift + Tab</kbd> | Moves focus to the toggle button and closes listbox.                                  |
| <kbd>Up Arrow</kbd>    | Moves focus to the previous option, optionally wrapping from the first to the last.   |
| <kbd>Down Arrow</kbd>  | Moves focus to the next option, optionally wrapping from the last to the first.       |
| <kbd>Left Arrow</kbd>  | Moves focus to the previous option, optionally wrapping from the first to the last.   |
| <kbd>Right Arrow</kbd> | Moves focus to the next option, optionally wrapping from the last to the first.       |
| <kbd>Home</kbd>        | Moves focus to the first option in the current listbox.                               |
| <kbd>End</kbd>         | Moves focus to the last option in the current listbox.                                |
| <kbd>Escape</kbd>      | Close the listbox that contains focus and return focus to the toggle button.          |
| <kbd>Any letter</kbd>  | Navigates to the next option that starts with the letter.                             |

{% endband %}

{% renderSlots for="pf-v5-select", header="Slots on `pf-v5-select`" %}{% endrenderSlots %}
{% renderAttributes for="pf-v5-select", header="Attributes on `pf-v5-select`" %}{% endrenderAttributes %}
{% renderMethods for="pf-v5-select", header="Methods on `pf-v5-select`" %}{% endrenderMethods %}
{% renderEvents for="pf-v5-select", header="Events on `pf-v5-select`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-v5-select", header="CSS Custom Properties on `pf-v5-select`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-v5-select", header="CSS Parts on `pf-v5-select`" %}{% endrenderCssParts %}

{% renderSlots for="pf-v5-option-group", header="Slots on `pf-v5-option-group`" %}{% endrenderSlots %}
{% renderAttributes for="pf-v5-option-group", header="Attributes on `pf-v5-option-group`" %}{% endrenderAttributes %}
{% renderMethods for="pf-v5-option-group", header="Methods on `pf-v5-option-group`" %}{% endrenderMethods %}
{% renderEvents for="pf-v5-option-group", header="Events on `pf-v5-option-group`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-v5-option-group", header="CSS Custom Properties on `pf-v5-option-group`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-v5-option-group", header="CSS Parts on `pf-v5-option-group`" %}{% endrenderCssParts %}

{% renderSlots for="pf-v5-option", header="Slots on `pf-v5-option`" %}{% endrenderSlots %}
{% renderAttributes for="pf-v5-option", header="Attributes on `pf-v5-option`" %}{% endrenderAttributes %}
{% renderMethods for="pf-v5-option", header="Methods on `pf-v5-option`" %}{% endrenderMethods %}
{% renderEvents for="pf-v5-option", header="Events on `pf-v5-option`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-v5-option", header="CSS Custom Properties on `pf-v5-option`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-v5-option", header="CSS Parts on `pf-v5-option`" %}{% endrenderCssParts %}
