{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-select/pf-select.js';
</script>

{% renderOverview %}
  <pf-select default-text="Select a value">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endrenderOverview %}

{% band header="Usage" %}

#### Single

<p>
  Focus on options using arrow keys or
  by typing the first character of an option.
</p>

{% htmlexample %}
  <pf-select default-text="Select a value">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

#### Disabled
{% htmlexample %}
  <pf-select disabled default-text="Select a color">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

### Option variations

Below are option variants:

{% htmlexample %}
  <pf-select always-expanded>
    <pf-select-option value="Basic">Basic option</pf-select-option>
    <pf-select-option value="Description">
      <span>Option with description</span>
      <span slot="description">This is a description</span>
    </pf-select-option>
    <pf-select-option value="Icon">
      <pf-icon size="md" icon="paint-brush" set="fas" slot="icon"></pf-icon>
      Option with icon
    </pf-select-option>
    <pf-select-option value="aria-disabled" aria-disabled="true">Aria-disabled option</pf-select-option>
  </pf-select>
{% endhtmlexample %}

**Note:** [WAI-ARIA recommends](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols) elements of a larger composite widget remain focusable.  Because options are part of the larger `pf-select` element, use `aria-disabled="true"` instead of `disabled` so that screenreader users know the option exists and is disabled.

### Grouped Options

{% htmlexample %}
  <pf-select default-text="Select item from our menu">
    <pf-select-group>
      <span slot="label">Breakfast</span>
      <pf-select-option value="Eggs">Eggs</pf-select-option>
      <pf-select-option value="Toast">Toast</pf-select-option>
      <pf-select-option value="Waffles">Waffles</pf-select-option>
    </pf-select-group>
    <pf-select-group>
      <span slot="label">Lunch</span>
      <pf-select-option value="Salad">Salad</pf-select-option>
      <pf-select-option value="Sandwich">Sandwich</pf-select-option>
      <pf-select-option value="Soup">Soup</pf-select-option>
    </pf-select-group>
  </pf-select>
{% endhtmlexample %}

### Multi-selectable

<p>
  Multiple options can be selected. Any arrow keys work.
  <kbd>Shift</kbd> will toggling off multiple items.
  <kbd>Ctrl+A</kbd> will toggle selection on all items.
</p>

{% htmlexample %}
  <pf-select multi>
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

#### Checkbox

<p>
  Multiple options, displayed as checkboxes, can be selected.
  <kbd>Shift</kbd> will toggling off multiple items.
  <kbd>Ctrl+A</kbd> will toggle selection on all items.
</p>

{% htmlexample %}
  <pf-select checkboxes>
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

#### Checkbox, with badge

{% htmlexample %}
  <pf-select checkboxes selected-items-display="badge">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

### Typeahead

{% htmlexample %}
  <label>
    Pick a color:
    <pf-select typeahead>
      <pf-select-option value="Blue">Blue</pf-select-option>
      <pf-select-option value="Green">Green</pf-select-option>
      <pf-select-option value="Magenta">Magenta</pf-select-option>
      <pf-select-option value="Orange">Orange</pf-select-option>
      <pf-select-option value="Purple">Purple</pf-select-option>
      <pf-select-option value="Pink">Pink</pf-select-option>
      <pf-select-option value="Red">Red</pf-select-option>
      <pf-select-option value="Yellow">Yellow</pf-select-option>
    </pf-select>
  </label>
{% endhtmlexample %}

#### Typeahead with create option

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead create-option-text="Create option">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
</label>
{% endhtmlexample %}

#### Typeahead, multi with chips

{% htmlexample %}
<label>
  Pick a color:
  <pf-select typeahead multi selected-items-display="chips">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
</label>
{% endhtmlexample %}

#### Typeahead, multi with create option

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead multi create-option-text="Create option">
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
</label>
{% endhtmlexample %}

#### Typeahead, with checkboxes

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead checkboxes>
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
</label>
{% endhtmlexample %}

### Filtering

By default, filtering is __**enabled**__ and __**not**__ case sensitive. However, filtering can be set to case sensitive or disabled altogether.

#### Case-sensitive filtering

{% htmlexample %}
  <pf-select case-sensitive typeahead>
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

#### Match anywhere

Filter options that match input text anywhere 
rather than just options that start with the input text.

{% htmlexample %}
  <pf-select match-anywhere typeahead>
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}

#### Disable filtering

{% htmlexample %}
  <pf-select disable-filter typeahead>
    <pf-select-option value="Blue">Blue</pf-select-option>
    <pf-select-option value="Green">Green</pf-select-option>
    <pf-select-option value="Magenta">Magenta</pf-select-option>
    <pf-select-option value="Orange">Orange</pf-select-option>
    <pf-select-option value="Purple">Purple</pf-select-option>
    <pf-select-option value="Pink">Pink</pf-select-option>
    <pf-select-option value="Red">Red</pf-select-option>
    <pf-select-option value="Yellow">Yellow</pf-select-option>
  </pf-select>
{% endhtmlexample %}
{% endband %}

{% band header="Accessibility" %}

The select uses the [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) recommendations from the WAI AIRA [Authoring Best Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg).

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

{% renderSlots for="pf-select-group", header="Slots on `pf-select-group`" %}{% endrenderSlots %}
{% renderAttributes for="pf-select-group", header="Attributes on `pf-select-group`" %}{% endrenderAttributes %}
{% renderMethods for="pf-select-group", header="Methods on `pf-select-group`" %}{% endrenderMethods %}
{% renderEvents for="pf-select-group", header="Events on `pf-select-group`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-select-group", header="CSS Custom Properties on `pf-select-group`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-select-group", header="CSS Parts on `pf-select-group`" %}{% endrenderCssParts %}

{% renderSlots for="pf-select-option", header="Slots on `pf-select-option`" %}{% endrenderSlots %}
{% renderAttributes for="pf-select-option", header="Attributes on `pf-select-option`" %}{% endrenderAttributes %}
{% renderMethods for="pf-select-option", header="Methods on `pf-select-option`" %}{% endrenderMethods %}
{% renderEvents for="pf-select-option", header="Events on `pf-select-option`" %}{% endrenderEvents %}
{% renderCssCustomProperties for="pf-select-option", header="CSS Custom Properties on `pf-select-option`" %}{% endrenderCssCustomProperties %}
{% renderCssParts for="pf-select-option", header="CSS Parts on `pf-select-option`" %}{% endrenderCssParts %}
