{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-dropdown/pf-dropdown.js';
</script>

{% renderOverview %}
  <pf-dropdown>
    <pf-dropdown-item>Action</pf-dropdown-item>
    <pf-dropdown-item href="#">Link</pf-dropdown-item>
    <pf-dropdown-item disabled>Disabled Action</pf-dropdown-item>
    <pf-dropdown-item disabled href="#">Link</pf-dropdown-item>
    <hr>
    <pf-dropdown-item>Separated Action</pf-dropdown-item>
    <hr>
    <pf-dropdown-item href="#">Separated Link</pf-dropdown-item>
  </pf-dropdown>
{% endrenderOverview %}

{% band header="Usage" %}

### Basic

The following example shows a few different states of dropdown items. As shown in this example, dropdown items may:

- Use the `disabled` property to disable an item.
- Use the `to` property to make the item a link.

This example also uses an `hr` to split the menu into 2 sections with a horizontal line.

{% htmlexample %}
  <pf-dropdown>
    <pf-dropdown-item>Action</pf-dropdown-item>
    <pf-dropdown-item href="#">Link</pf-dropdown-item>
    <pf-dropdown-item disabled>Disabled Action</pf-dropdown-item>
    <pf-dropdown-item disabled href="#">Link</pf-dropdown-item>
    <hr>
    <pf-dropdown-item>Separated Action</pf-dropdown-item>
    <pf-dropdown-item href="#">Separated Link</pf-dropdown-item>
  </pf-dropdown>
{% endhtmlexample %}

### Custom trigger

A custom trigger can be added using the `trigger` slot.

{% htmlexample %}
  <pf-dropdown>
    <pf-button slot="trigger" variant="control">
      My Custom Dropdown 
      <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true"  width="1em" height="1em"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
    </pf-button>
    <pf-dropdown-item>Action</pf-dropdown-item>
    <pf-dropdown-item href="#">Link</pf-dropdown-item>
    <pf-dropdown-item disabled>Disabled Action</pf-dropdown-item>
    <pf-dropdown-item disabled href="#">Link</pf-dropdown-item>
    <hr>
    <pf-dropdown-item>Separated Action</pf-dropdown-item>
    <pf-dropdown-item href="#">Separated Link</pf-dropdown-item>
  </pf-dropdown>
{% endhtmlexample %}

### With kebab toggle

When there isn't enough space for a labeled button, a slotted trigger button with a kebab icon (three dots) can be used to toggle the dropdown menu open or closed. Make sure to add an `aria-label` to the toggle so that assistive technology users know what the button is.

{% htmlexample %}
<pf-dropdown>
  <pf-button slot="trigger" aria-label="Toggle" plain>
    <svg viewBox="0 0 192 512" fill="currentColor" aria-hidden="true" role="img" width="1em" height="1em"><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>
  </pf-button>
  <pf-dropdown-item>Action</pf-dropdown-item>
  <pf-dropdown-item href="#">Link</pf-dropdown-item>
  <pf-dropdown-item disabled>Disabled Action</pf-dropdown-item>
  <pf-dropdown-item disabled href="#">Link</pf-dropdown-item>
  <hr>
  <pf-dropdown-item>Separated Action</pf-dropdown-item>
  <pf-dropdown-item href="#">Separated Link</pf-dropdown-item>
</pf-dropdown>
{% endhtmlexample %}

### With groups of items

To group sets of related dropdown items together, use a `pf-dropdown-group`. When more than 1 `pf-dropdown-group` is created in a menu, use the label and labelHeadingLevel properties to assign a name and heading level to each group.

{% htmlexample %}
<pf-dropdown>
  <pf-dropdown-group>
    <pf-dropdown-item>Action</pf-dropdown-item>
    <pf-dropdown-item href="#">Link</pf-dropdown-item>
  </pf-dropdown-group>
  <hr>
  <pf-dropdown-group label="Group 2">
    <pf-dropdown-item>Group 2 action</pf-dropdown-item>
    <pf-dropdown-item href="#">Group 2 link</pf-dropdown-item>
  </pf-dropdown-group>
  <hr>
  <pf-dropdown-group label="Group 3">
    <pf-dropdown-item>Group 3 action</pf-dropdown-item>
    <pf-dropdown-item href="#">Group 3 link</pf-dropdown-item>
  </pf-dropdown-group>
</pf-dropdown>
{% endhtmlexample %}

### With item descriptions

To provide users with more context about a `pf-dropdown-item`, pass a short message to `description` slot. As shown in the example below, an item's description will appear below its label.

{% htmlexample %}
<pf-dropdown>
  <pf-dropdown-item>
    Action
    <span slot="description">This is a description</span>
  </pf-dropdown-item>
  <pf-dropdown-item href="#">
    Link
    <span slot="description">This is a very long description that describes the menu item</span>
  </pf-dropdown-item>
  <pf-dropdown-item disabled>
    Disabled action
    <span slot="description">Disabled action description</span>
  </pf-dropdown-item>
  <pf-dropdown-item disabled href="#">
    Disabled link
    <span slot="description">Disabled link description</span>
  </pf-dropdown-item>
</pf-dropdown>
{% endhtmlexample %}

### Dropdown with icon

Use the `icon` slot to add an icon.

{% htmlexample %}
<pf-dropdown>
  <pf-dropdown-item>
    <pf-icon icon="user" aria-label="user" size="md" slot="icon"></pf-icon>
    User
  </pf-dropdown-item>
  <pf-dropdown-item>
    <pf-icon icon="lock" aria-label="user" size="md" slot="icon"></pf-icon>
    Lock
  </pf-dropdown-item>
</pf-dropdown>
{% endhtmlexample %}

### Disabled dropdown

Use the `disabled` attribute to disable an entire dropdown.

{% htmlexample %}
<pf-dropdown disabled>
  <pf-dropdown-item>Action</pf-dropdown-item>
  <pf-dropdown-item href="#">Link</pf-dropdown-item>
</pf-dropdown>
{% endhtmlexample %}

{% endband %}

{% band header="Accessibility" %}

The dropdown uses the [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) recommendations from the WAI ARIA [Authoring Best Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg).

{% renderFile "./docs/_snippets/wai-aria-disabled.md" %}

#### Menu button

When focus is on the menu button, the following keyboard interactions apply:

| Key                   | Function                                                                              |
| --------------------- | ------------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>      | Opens the menu.                                                                       |
| <kbd>Space</kbd>      | Opens the menu.                                                                       |
| <kbd>Down arrow</kbd> | Opens the menu and moves focus to the first menu item.                                |
| <kbd>Tab</kbd>        | Moves focus out of dropdown element onto the next focusable item and closes menu.     |
| <kbd>Shift+Tab</kbd>  | Moves focus out of dropdown element onto the previous focusable item and closes menu. |

#### Menu items

Menu items use the [APG's Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) recommendation. When focus is on the menu items, the following keyboard interactions apply:

| Key                    | Function                                                                          |
| ---------------------- | --------------------------------------------------------------------------------- |
| <kbd>Enter</kbd>       | Activates the item and closes the menu.                                           |
| <kbd>Space</kbd>       | Activates the item and closes the menu.                                           |
| <kbd>Tab</kbd>         | Moves focus out of dropdown element onto the next focusable item and closes menu. |
| <kbd>Shift+Tab</kbd>   | Moves focus to the menu button and closes menu.                                   |
| <kbd>Up Arrow</kbd>    | Moves focus to the previous item, optionally wrapping from the first to the last. |
| <kbd>Down Arrow</kbd>  | Moves focus to the next item, optionally wrapping from the last to the first.     |
| <kbd>Left Arrow</kbd>  | Moves focus to the previous item, optionally wrapping from the first to the last. |
| <kbd>Right Arrow</kbd> | Moves focus to the next item, optionally wrapping from the last to the first.     |
| <kbd>Home</kbd>        | Moves focus to the first item in the current menu.                                |
| <kbd>End</kbd>         | Moves focus to the last item in the current menu.                                 |
| <kbd>Escape</kbd>      | Close the menu that contains focus and return focus to the menu button.           |

{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pf-dropdown-item", level=3, header="Slots on `pf-dropdown-item`" %}{% endrenderSlots %}
{% renderSlots for="pf-dropdown-group", level=3, header="Slots on `pf-dropdown-group`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}
{% renderAttributes for="pf-dropdown-item", level=3, header="Slots on `pf-dropdown-item`" %}{% endrenderAttributes %}
{% renderAttributes for="pf-dropdown-group", level=3, header="Slots on `pf-dropdown-group`" %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}
{% renderMethods for="pf-dropdown-item", level=3, header="Slots on `pf-dropdown-item`" %}{% endrenderMethods %}
{% renderMethods for="pf-dropdown-group", level=3, header="Slots on `pf-dropdown-group`" %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}
{% renderEvents for="pf-dropdown-item", level=3, header="Slots on `pf-dropdown-item`" %}{% endrenderEvents %}
{% renderEvents for="pf-dropdown-group", level=3, header="Slots on `pf-dropdown-group`" %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-dropdown-item", level=3, header="CSS Properties on `pf-dropdown-item`" %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-dropdown-group", level=3, header="CSS Properties on `pf-dropdown-group`" %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
{% renderCssParts for="pf-dropdown-item", level=3, header="Parts on `pf-dropdown-item`" %}{% endrenderCssParts %}
{% renderCssParts for="pf-dropdown-group", level=3, header="Parts on `pf-dropdown-group`" %}{% endrenderCssParts %}
