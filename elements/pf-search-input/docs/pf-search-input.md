{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-search-input/pf-search-input.js';
</script>

{% renderOverview %}
  <pf-search-input>
    <pf-option>Blue</pf-option>
    <pf-option>Black</pf-option>
    <pf-option>Brown</pf-option>
    <pf-option>Bronze</pf-option>
    <pf-option>Green</pf-option>
    <pf-option>Magenta</pf-option>
    <pf-option>Orange</pf-option>
    <pf-option>Purple</pf-option>
    <pf-option>Periwinkle</pf-option>
    <pf-option>Pink</pf-option>
    <pf-option>Red</pf-option>
    <pf-option>Yellow</pf-option>
  </pf-search-input>
{% endrenderOverview %}

{% band header="Usage" %}

#### Search Input

{% htmlexample %}
  {% renderFile "./elements/pf-search-input/demo/pf-search-input.html" %}
{% endhtmlexample %}

#### Search Input Form
{% htmlexample %}
  {% renderFile "./elements/pf-search-input/demo/pf-search-input-with-submit.html" %}
{% endhtmlexample %}

#### Disabled
{% htmlexample %}
  {% renderFile "./elements/pf-search-input/demo/disabled.html" %}
{% endhtmlexample %}

{% endband %}

{% band header="Accessibility" %}

The search input uses the [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) recommendations from the WAI ARIA [Authoring Best Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg).

When the dropdown is disabled it follows [WAI ARIA focusability recommendations](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols) for composite widget elements, where dropdown items are still focusable even when the dropdown is disabled.

#### Toggle and typeahead input

When focus is on the toggle, the following keyboard interactions apply:

| Key                    | Function                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------- |
| <kbd>Down Arrow</kbd>  | Opens the listbox and moves focus to the first listbox item.                           |
| <kbd>Tab</kbd>         | Moves focus to the close button if visible; otherwise, moves to the next focusable element, then closes the listbox.|
| <kbd>Shift + Tab</kbd> | Moves focus out of element onto the previous focusable item and closes listbox.        |

#### Listbox options

Listbox options use the [APG's Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) recommendation. When focus is on the listbox, the following keyboard interactions apply:

| Key                    | Function                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>       | Selects the options and closes the listbox.                                           |
| <kbd>Space</kbd>       | Selects the options and closes the listbox.                                           |
| <kbd>Tab</kbd>         | Moves focus out of element onto the next focusable options and closes listbox.        |
| <kbd>Shift + Tab</kbd> | Moves focus to the toggle button and closes listbox.                                  |
| <kbd>Up Arrow</kbd>    | Moves focus to the previous option, optionally wrapping from the first to the last.   |
| <kbd>Down Arrow</kbd>  | Moves focus to the next option, optionally wrapping from the last to the first.       |
| <kbd>Left Arrow</kbd>  | Returns focus to the combobox without closing the popup and moves the input cursor one character to the left. If the input cursor is on the left-most character, the cursor does not move.   |
| <kbd>Right Arrow</kbd> | Returns focus to the combobox without closing the popup and moves the input cursor one character to the right. If the input cursor is on the right-most character, the cursor does not move.       |
| <kbd>Escape</kbd>      | Close the listbox that contains focus and return focus to the input.          |
| <kbd>Any letter</kbd>  | Navigates to the next option that starts with the letter.                             |

{% endband %}

{% renderSlots for="pf-search-input", header="Slots on `pf-search-input`" %}{% endrenderSlots %}
{% renderAttributes for="pf-search-input", header="Attributes on `pf-search-input`" %}{% endrenderAttributes %}
{% renderMethods for="pf-search-input", header="Methods on `pf-search-input`" %}{% endrenderMethods %}
{% renderEvents for="pf-search-input", header="Events on `pf-search-input`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-search-input", header="CSS Custom Properties on `pf-search-input`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-search-input", header="CSS Parts on `pf-search-input`" %}{% endrenderCssParts %}

{% renderSlots for="pf-option", header="Slots on `pf-option`" %}{% endrenderSlots %}
{% renderAttributes for="pf-option", header="Attributes on `pf-option`" %}{% endrenderAttributes %}
{% renderMethods for="pf-option", header="Methods on `pf-option`" %}{% endrenderMethods %}
{% renderEvents for="pf-option", header="Events on `pf-option`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-option", header="CSS Custom Properties on `pf-option`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-option", header="CSS Parts on `pf-option`" %}{% endrenderCssParts %}
