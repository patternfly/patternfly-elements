{% renderInstallation %} {% endrenderInstallation %}

<script type="module">
import '@patternfly/elements/pf-icon/pf-select.js';
</script>

{% renderOverview %}
  <pf-select>
    <pf-select-option disabled selected="true">Select a color</pf-select-option>
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
  Any arrow keys work.
  Only one option can be selected.
  Filter by typing any letter. Type <code>*</code>
  to remove filtering altogether.
</p>

{% htmlexample %}
  <pf-select>
    <pf-select-option disabled selected="true">Select a color</pf-select-option>
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
  <pf-select disabled>
    <pf-select-option disabled selected="true">Select a color</pf-select-option>
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
  <pf-select always-open>
    <pf-select-option value="Basic">Basic option</pf-select-option>
    <pf-select-option value="Description">
      <span>Option with description</span>
      <span slot="description">This is a description</span>
    </pf-select-option>
    <pf-select-option value="Icon">
      <pf-icon size="md" icon="paint-brush" set="fas" slot="icon"></pf-icon>
      Option with icon
    </pf-select-option>
    <pf-select-option value="Disabled" disabled>Disabled option</pf-select-option>
  </pf-select>
{% endhtmlexample %}

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

#### Checkbox

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

#### Multi-selectable with checkboxes

<p>
  Multiple options, displayed as checkboxes, can be selected.
  Any arrow keys work. <kbd>Shift</kbd> will toggling off multiple items.
  <kbd>Ctrl+A</kbd> will toggle selection on all items.
  Filter by typing a letter.
</p>

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

#### Typeahead, multi-selectable with chips

{% htmlexample %}
<label>
  Pick a color:
  <pf-select typeahead multi-selectable>
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

#### Typeahead, multi-selectable with create option

{% htmlexample %}
<label>
  Pick a color:
  <pf-select id="pfselect" typeahead multi-selectable create-option-text="Create option">
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
  <pf-select id="pfselect" typeahead has-checkboxes>
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

#### Disable filtering

Any arrow keys work. Only one option can be selected. Filter is disabled.

{% htmlexample %}
  <pf-select disable-filter>
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
