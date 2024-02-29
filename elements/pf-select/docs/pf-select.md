{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-select/pf-select.js';
</script>

{% renderOverview %}
  <pf-select placeholder="Select a value">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endrenderOverview %}

{% band header="Usage" %}

#### Single

Focus on options using arrow keys or
by typing the first character of an option.

{% htmlexample %}
  {% renderFile "./elements/pf-select/demo/pf-select.html" %}
{% endhtmlexample %}

#### Single with description
{% htmlexample %}
  {% renderFile "./elements/pf-select/demo/single-with-description.html" %}
{% endhtmlexample %}

#### Grouped single
{% htmlexample %}
  {% renderFile "./elements/pf-select/demo/grouped-single.html" %}
{% endhtmlexample %}

#### Checkbox input

Multiple options can be selected. Any arrow keys work.
<kbd>Shift</kbd> will toggling off multiple items.
<kbd>Ctrl+A</kbd> will toggle selection on all items.

{% htmlexample %}
  {% renderFile "./elements/pf-select/demo/checkbox-input.html" %}
{% endhtmlexample %}

{# save this for v5
### Option variations

Below are option variants:

{% htmlexample %}
  <pf-select>
    <pf-option value="Basic">Basic option</pf-option>
    <pf-option value="Description">
      <span>Option with description</span>
      <span slot="description">This is a description</span>
    </pf-option>
    <pf-option value="Icon">
      <pf-icon size="md" icon="paint-brush" set="fas" slot="icon"></pf-icon>
      Option with icon
    </pf-option>
    <pf-option value="aria-disabled" aria-disabled="true">Aria-disabled option</pf-option>
  </pf-select>
{% endhtmlexample %}
#}
When setting the `disabled` attribute on options, they are still focusable, but
they are not selectable. This is in  order that they remain accessible to screen
readers. This functions similarly to the `aria-disabled="true"` attribute.

{% renderFile "./docs/_snippets/wai-aria-disabled.md" %}

{# 
  ### Typeahead

  {% htmlexample %}
    {% renderFile "./elements/pf-select/demo/typeahead.html" %}
  {% endhtmlexample %}

  #### Multiple

  {% htmlexample %}
    {% renderFile "./elements/pf-select/demo/typeahead-multiple.html" %}
  {% endhtmlexample %}

  #### Custom filtering

  By default, filtering is **enabled** and **not** case sensitive.
  However, filtering can be customized with the `customFilter` option, 
  which is a predicate function that takes an option.

  {% htmlexample %}
    {% renderFile "./elements/pf-select/demo/typeahead-custom-filter.html" %}
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

{% renderSlots for="pf-select", header="Slots on `pf-select`" %}{% endrenderSlots %}
{% renderAttributes for="pf-select", header="Attributes on `pf-select`" %}{% endrenderAttributes %}
{% renderMethods for="pf-select", header="Methods on `pf-select`" %}{% endrenderMethods %}
{% renderEvents for="pf-select", header="Events on `pf-select`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-select", header="CSS Custom Properties on `pf-select`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-select", header="CSS Parts on `pf-select`" %}{% endrenderCssParts %}

{% renderSlots for="pf-option-group", header="Slots on `pf-option-group`" %}{% endrenderSlots %}
{% renderAttributes for="pf-option-group", header="Attributes on `pf-option-group`" %}{% endrenderAttributes %}
{% renderMethods for="pf-option-group", header="Methods on `pf-option-group`" %}{% endrenderMethods %}
{% renderEvents for="pf-option-group", header="Events on `pf-option-group`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-option-group", header="CSS Custom Properties on `pf-option-group`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-option-group", header="CSS Parts on `pf-option-group`" %}{% endrenderCssParts %}

{% renderSlots for="pf-option", header="Slots on `pf-option`" %}{% endrenderSlots %}
{% renderAttributes for="pf-option", header="Attributes on `pf-option`" %}{% endrenderAttributes %}
{% renderMethods for="pf-option", header="Methods on `pf-option`" %}{% endrenderMethods %}
{% renderEvents for="pf-option", header="Events on `pf-option`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-option", header="CSS Custom Properties on `pf-option`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-option", header="CSS Parts on `pf-option`" %}{% endrenderCssParts %}
