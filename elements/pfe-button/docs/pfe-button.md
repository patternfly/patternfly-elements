<style>
.overview-buttons pfe-button {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>

{% renderOverview %}
  <div class="overview-buttons">
    <pfe-button>
      <button>Primary</button>
    </pfe-button>
    <pfe-button variant="secondary">
      <button>Secondary</button>
    </pfe-button>
    <pfe-button variant="tertiary">
      <button>Tertiary</button>
    </pfe-button>
    <pfe-button variant="danger">
      <button>Danger</button>
    </pfe-button>
    <pfe-button variant="control">
      <button>Control</button>
    </pfe-button>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  When using this component, you must provide a standard HTML Button Element as the only light DOM child of `pfe-button`.

  <pfe-button>
    <button>My Button</button>
  </pfe-button>

  ```html
  <pfe-button>
    <button>My Button</button>
  </pfe-button>
  ```
{% endband %}

{% band header="Size", level=3 %}
  <pfe-button size="large">
    <button>Large Button</button>
  </pfe-button>
  <pfe-button size="medium">
    <button>Medium Button</button>
  </pfe-button>

  ```html
  <pfe-button size="large">
    <button>Large Button</button>
  </pfe-button>
  <pfe-button size="medium">
    <button>Medium Button</button>
  </pfe-button>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
