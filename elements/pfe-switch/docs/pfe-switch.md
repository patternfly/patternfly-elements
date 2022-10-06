{% renderOverview %}
A switch toggles the state of a setting (between on and off). Switches provide a more explicit, visible representation on a setting.

<pfe-switch label="Message when on" label-off="Message when off" checked>
  <input type="checkbox">
</pfe-switch>
{% endrenderOverview %}

{% band header="Usage" %}
### Basic 
<pfe-switch label="Message when on" label-off="Message when off" checked>
  <input type="checkbox">
</pfe-switch>

```html
<pfe-switch label="Message when on" label-off="Message when off">
  <input type="checkbox">
</pfe-switch>
```

### Reversed layout
<pfe-switch label="Message when on" label-off="Message when off" reversed checked>
  <input type="checkbox">
</pfe-switch>

```html
<pfe-switch label="Message when on" label-off="Message when off" reversed>
  <input type="checkbox">
</pfe-switch>
```

### Without label
<pfe-switch checked>
  <input type="checkbox">
</pfe-switch>

```html
<pfe-switch>
  <input type="checkbox">
</pfe-switch>
```

### Checked with label
<pfe-switch label="Message when on" label-off="Message when off" has-check-icon checked>
  <input type="checkbox">
</pfe-switch>

```html
<pfe-switch label="Message when on" label-off="Message when off" has-check-icon>
  <input type="checkbox">
</pfe-switch>
```

### Disabled
<pfe-switch label="Message when on" label-off="Message when off" checked disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch label="Message when on" label-off="Message when off" disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch checked disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch disabled>
  <input type="checkbox">
</pfe-switch>

```html
<pfe-switch label="Message when on" label-off="Message when off" checked disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch label="Message when on" label-off="Message when off" disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch checked disabled>
  <input type="checkbox">
</pfe-switch>
<pfe-switch disabled>
  <input type="checkbox">
</pfe-switch>
```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}