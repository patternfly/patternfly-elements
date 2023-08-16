{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-icon/pf-select.js';
</script>

{% renderOverview %}
  <pf-select>
    <pf-select-option>Select a value</pf-select-option>
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

#### Default

<p>
  Any arrow keys work.
  Only one option can be selected.
  Filter by typing any letter. Type <code>*</code>
  to remove filtering altogether.
</p>

{% htmlexample %}
  <pf-select>
    <pf-select-option>Select a value</pf-select-option>
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

<p>
  Any arrow keys work.
  Only one option can be selected.
  Listbox wont appear until input has text.
  Type <code>*</code> to show all options.
</p>

{% htmlexample %}
  <label id="combo">
    Pick a color:
    <pf-select id="listbox" typeahead>
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

### Multi-selectable

<p>
  Multiple options can be selected. Any arrow keys work.
  <kbd>Shift</kbd> will toggling off multiple items.
  <kbd>Ctrl+A</kbd> will toggle selection on all items.
  Filter by typing a letter.
</p>

{% htmlexample %}
  <pf-select multi-selectable>
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

#### Multi-selectable with checkboxes

<p>Multiple options, displayed as checkboxes, can be selected. Any arrow keys work. <kbd>Shift</kbd> will toggling off multiple items. <kbd>Ctrl+A</kbd> will toggle selection on all items.
Filter by typing a letter.</p>

{% htmlexample %}
  <pf-select has-checkboxes>
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

### Grouped Options

Any arrow keys work. Only one option can be selected. Filter by typing a letter. Headings are not selectable.

{% htmlexample %}
  <pf-select default-text="Select an item">
    <pf-select-group>
      <span slot="group-heading">Breakfast</span>
      <pf-select-option value="Eggs">Eggs</pf-select-option>
      <pf-select-option value="Toast">Toast</pf-select-option>
      <pf-select-option value="Waffles">Waffles</pf-select-option>
    </pf-select-group>
    <pf-select-group>
      <span slot="group-heading">Lunch</span>
      <pf-select-option value="Salad">Salad</pf-select-option>
      <pf-select-option value="Sandwich">Sandwich</pf-select-option>
      <pf-select-option value="Soup">Soup</pf-select-option>
    </pf-select-group>
  </pf-select>
{% endhtmlexample %}

### Case-sensitive filtering

Any arrow keys work. Only one option can be selected. Filter is case sensisitve.

{% htmlexample %}
  <pf-select case-sensitive>
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

### Disable filtering

Any arrow keys work. Only one option can be selected. Filter is disabled.

{% htmlexample %}
  <p></p>
  <pf-select filter-mode="disabled">
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

### Require filtering to show options

<p>Any arrow keys work. Only one option can be selected. Listbox wont appear until input has text. Type <code>*</code> to show all options.</p>

{% htmlexample %}
<label id="combo">
  Pick a color:
  <pf-select id="listbox" filter-mode="required" typeahead>
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
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
