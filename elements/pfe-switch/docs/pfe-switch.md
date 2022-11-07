{% renderOverview %}
A switch toggles the state of a setting (between on and off). Switches provide a more explicit, visible representation on a setting.


{% endrenderOverview %}

{% band header="Usage" %}

### Basic

### Disabled
<form>
  <fieldset>
    <legend>Checked and Disabled</legend>
    <pfe-switch id="checked-disabled" checked disabled></pfe-switch>
    <label for="checked-disabled" data-state="on">Message when on</label>
    <label for="checked-disabled" data-state="off">Message when off</label>
  </fieldset>
  <fieldset>
    <pfe-switch id="default-disabled" disabled></pfe-switch>
    <label for="default-disabled" data-state="on">Message when on</label>
    <label for="default-disabled" data-state="off">Message when off</label>
  </fieldset>
</form>


{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
