{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  A switch toggles the state of a setting (between on and off). Switches 
  provide a more explicit, visible representation on a setting.

  <pf-switch id="overview-switch" checked></pf-switch>
  <label for="overview-switch">
    <span data-state="on">Message when on</span>
    <span data-state="off" hidden>Message when off</span>
  </label>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Basic
  {% htmlexample %}
  <pf-switch id="color-scheme-toggle"></pf-switch>
  <label for="color-scheme-toggle">
    <span data-state="on">Message when on</span>
    <span data-state="off" hidden>Message when off</span>
  </label>  
  {% endhtmlexample %}

  ### Without label
  {% htmlexample %}
  <pf-switch></pf-switch>
  {% endhtmlexample %}

  ### Checked with label
  {% htmlexample %}
  <pf-switch id="checked" checked show-check-icon></pf-switch>
  <label for="checked">
    <span data-state="on">Message when on</span>
    <span data-state="off" hidden>Message when off</span>
  </label>    
  {% endhtmlexample %}

  ### Disabled
  {% htmlexample %}
  <form>
    <fieldset>
      <legend>Checked and Disabled</legend>
      <pf-switch id="checked-disabled" checked disabled></pf-switch>
      <label for="checked-disabled">
        <span data-state="on">Message when on</span>
        <span data-state="off" hidden>Message when off</span>
      </label>      
    </fieldset>
    <fieldset>
      <pf-switch id="default-disabled" disabled></pf-switch>
      <label for="default-disabled">
        <span data-state="on">Message when on</span>
        <span data-state="off" hidden>Message when off</span>
      </label>        
    </fieldset>
  </form>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
