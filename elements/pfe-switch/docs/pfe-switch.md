{% renderOverview %}
A switch toggles the state of a setting (between on and off). Switches provide a more explicit, visible representation on a setting.

<pfe-switch label="Message when on" label-off="Message when off" checked>
  <input type="checkbox">
</pfe-switch>
{% endrenderOverview %}

{% band header="Usage" %}

### Basic
<pfe-switch id="color-scheme-toggle"></pfe-switch>
<label for="color-scheme-toggle" data-state="on">Dark Mode</label>
<label for="color-scheme-toggle" data-state="off" hidden>Light Mode</label>

```html
<pfe-switch id="color-scheme-toggle"></pfe-switch>
<label for="color-scheme-toggle" data-state="on">Dark Mode</label>
<label for="color-scheme-toggle" data-state="off" hidden>Light Mode</label>
```


### Without label
<pfe-switch checked></pfe-switch>

```html
<pfe-switch></pfe-switch>
```

### Checked with label
<pfe-switch id="checked" checked show-check-icon></pfe-switch>
<label for="checked" data-state="on">Message when on</label>
<label for="checked" data-state="off">Message when off</label>

```html
<pfe-switch id="checked" checked show-check-icon></pfe-switch>
<label for="checked" data-state="on">Message when on</label>
<label for="checked" data-state="off">Message when off</label>
```

### Disabled
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pfe-switch id="checked-disabled" checked disabled></pfe-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>
  <fieldset>
    <pfe-switch id="disabled" disabled></pfe-switch>
    <label for="disabled" data-state="on">Message when on</label>
    <label for="disabled" data-state="off">Message when off</label>
  </fieldset>
</form>

```html
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pfe-switch id="checked-disabled" checked disabled></pfe-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>

  <fieldset>
    <pfe-switch id="disabled" disabled></pfe-switch>
    <label for="disabled" data-state="on">Message when on</label>
    <label for="disabled" data-state="off">Message when off</label>
  </fieldset>
</form>
```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
