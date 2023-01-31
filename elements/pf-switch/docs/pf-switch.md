{% renderOverview %}
A switch toggles the state of a setting (between on and off). Switches provide a more explicit, visible representation on a setting.

<pf-switch id="overview-switch" checked></pf-switch>
<label for="overview-switch" data-state="on">Message when on</label>
<label for="overview-switch" data-state="off" hidden>Message when off</label>
{% endrenderOverview %}

{% band header="Usage" %}

### Basic
<pf-switch id="color-scheme-toggle" checked></pf-switch>
<label for="color-scheme-toggle" data-state="on">Message when on</label>
<label for="color-scheme-toggle" data-state="off" hidden>Message when off</label>

```html
<pf-switch id="color-scheme-toggle"></pf-switch>
<label for="color-scheme-toggle" data-state="on">Message when on</label>
<label for="color-scheme-toggle" data-state="off" hidden>Message when off</label>
```


### Without label
<pf-switch checked></pf-switch>

```html
<pf-switch></pf-switch>
```

### Checked with label
<pf-switch id="checked" checked show-check-icon></pf-switch>
<label for="checked" data-state="on">Message when on</label>
<label for="checked" data-state="off">Message when off</label>

```html
<pf-switch id="checked" checked show-check-icon></pf-switch>
<label for="checked" data-state="on">Message when on</label>
<label for="checked" data-state="off">Message when off</label>
```

### Disabled
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pf-switch id="checked-disabled" checked disabled></pf-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>
  <fieldset>
    <pf-switch id="default-disabled" disabled></pf-switch>
    <label for="default-disabled" data-state="on">Message when on</label>
    <label for="default-disabled" data-state="off">Message when off</label>
  </fieldset>
</form>

```html
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pf-switch id="checked-disabled" checked disabled></pf-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>

  <fieldset>
    <pf-switch id="default-disabled" disabled></pf-switch>
    <label for="default-disabled" data-state="on">Message when on</label>
    <label for="default-disabled" data-state="off">Message when off</label>
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
