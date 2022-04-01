<style>
  .cta-overview pfe-cta {
    margin-right: 16px;
    margin-bottom: 16px;
  }
</style>

{% renderOverview %}
  <div class="cta-overview">
    <pfe-cta>
      <a href="#">Default</a>
    </pfe-cta>
    <pfe-cta priority="primary">
      <a href="#">Primary</a>
    </pfe-cta>
    <pfe-cta priority="secondary">
      <a href="#">Secondary</a>
    </pfe-cta>
    <pfe-cta priority="secondary" variant="wind">
      <a href="#">Secondary with wind variant</a>
    </pfe-cta>
    <pfe-cta aria-disabled="true">
      <a href="#">Disabled</a>
    </pfe-cta>
  </div>

  Note: `pfe-cta` is not necessarily a button, though it may look like one visually.
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-cta>
    <a href="https://github.com/">GitHub</a>
  </pfe-cta>

  <pfe-cta priority="primary">
    <a href="https://patternflyelements.org">Learn more about PatternFly Elements</a>
  </pfe-cta>

  <pfe-cta priority="secondary">
    <a href="https://redhat.com/">Red Hat</a>
  </pfe-cta>

  <pfe-cta priority="secondary" variant="wind">
    <a href="https://redhat.com/">Red Hat</a>
  </pfe-cta>

  <pfe-cta priority="primary" color-palette="lightest">
    <a href="https://patternflyelements.org">Learn more about PatternFly Elements</a>
  </pfe-cta>

  <pfe-cta priority="secondary" color-palette="complement">
    <a href="https://redhat.com/">Red Hat</a>
  </pfe-cta>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
