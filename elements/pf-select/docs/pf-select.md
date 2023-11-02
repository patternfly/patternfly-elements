{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-select/pf-select.js';
</script>

{% renderOverview %}
  <pf-select default-text="Select a value">
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
  <pf-select default-text="Select a value">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

#### Disabled
{% htmlexample %}
  <pf-select disabled default-text="Select a color">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

### Option variations

Below are option variants:

{% htmlexample %}
  <pf-select always-expanded>
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


{% renderFile "./docs/_snippets/wai-aria-disabled.md" %}  Because options are part of the larger `pf-select` element, use `aria-disabled="true"` instead of `disabled` so that screenreader users know the option exists and is disabled.

### Grouped Options

{% htmlexample %}
  <pf-select default-text="Select item from our menu">
    <pf-option-group>
      <span slot="label">Breakfast</span>
      <pf-option value="Eggs">Eggs</pf-option>
      <pf-option value="Toast">Toast</pf-option>
      <pf-option value="Waffles">Waffles</pf-option>
    </pf-option-group>
    <pf-option-group>
      <span slot="label">Lunch</span>
      <pf-option value="Salad">Salad</pf-option>
      <pf-option value="Sandwich">Sandwich</pf-option>
      <pf-option value="Soup">Soup</pf-option>
    </pf-option-group>
  </pf-select>
{% endhtmlexample %}

### Multi-selectable

Multiple options can be selected. Any arrow keys work.
<kbd>Shift</kbd> will toggling off multiple items.
<kbd>Ctrl+A</kbd> will toggle selection on all items.

{% htmlexample %}
  <pf-select multi>
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

#### Checkbox

Multiple options, displayed as checkboxes, can be selected.
<kbd>Shift</kbd> will toggling off multiple items.
<kbd>Ctrl+A</kbd> will toggle selection on all items.

{% htmlexample %}
  <pf-select checkboxes>
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

#### Checkbox, with badge

{% htmlexample %}
  <pf-select checkboxes selected-items-display="badge">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

### Typeahead

{% htmlexample %}
  <label>
    Pick a color:
    <pf-select typeahead>
      <pf-option value="Blue">Blue</pf-option>
      <pf-option value="Green">Green</pf-option>
      <pf-option value="Magenta">Magenta</pf-option>
      <pf-option value="Orange">Orange</pf-option>
      <pf-option value="Purple">Purple</pf-option>
      <pf-option value="Pink">Pink</pf-option>
      <pf-option value="Red">Red</pf-option>
      <pf-option value="Yellow">Yellow</pf-option>
    </pf-select>
  </label>
{% endhtmlexample %}

#### Typeahead with create option

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead create-option-text="Create option">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
</label>
{% endhtmlexample %}

#### Typeahead, multi with chips

{% htmlexample %}
<label>
  Pick a color:
  <pf-select typeahead multi selected-items-display="chips">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
</label>
{% endhtmlexample %}

#### Typeahead, multi with create option

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead multi create-option-text="Create option">
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
</label>
{% endhtmlexample %}

#### Typeahead, with checkboxes

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead checkboxes>
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
</label>
{% endhtmlexample %}

### Filtering

By default, filtering is **enabled** and **not** case sensitive. However, filtering can be set to case sensitive or disabled altogether.

#### Case-sensitive filtering

{% htmlexample %}
  <pf-select case-sensitive typeahead>
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

#### Match anywhere

Filter options that match input text anywhere 
rather than just options that start with the input text.

{% htmlexample %}
  <pf-select match-anywhere typeahead>
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}

#### Disable filtering

{% htmlexample %}
  <pf-select disable-filter typeahead>
    <pf-option value="Blue">Blue</pf-option>
    <pf-option value="Green">Green</pf-option>
    <pf-option value="Magenta">Magenta</pf-option>
    <pf-option value="Orange">Orange</pf-option>
    <pf-option value="Purple">Purple</pf-option>
    <pf-option value="Pink">Pink</pf-option>
    <pf-option value="Red">Red</pf-option>
    <pf-option value="Yellow">Yellow</pf-option>
  </pf-select>
{% endhtmlexample %}
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
