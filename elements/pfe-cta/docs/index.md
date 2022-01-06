<style>
  .cta-overview pfe-cta {
    margin-right: 16px;
    margin-bottom: 16px;
  }
</style>

{% renderOverview for=package, title=title %}
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

  <pfe-cta priority="primary" color="lightest">
    <a href="https://patternflyelements.org">Learn more about PatternFly Elements</a>
  </pfe-cta>

  <pfe-cta priority="secondary" color="complement">
    <a href="https://redhat.com/">Red Hat</a>
  </pfe-cta>
  ```
{% endband %}

{% renderSlots for=package %}{% endrenderSlots %}

{% renderAttributes for=package %}{% endrenderAttributes %}

{% renderProperties for=package %}{% endrenderProperties %}

{% renderMethods for=package %}{% endrenderMethods %}

{% renderEvents for=package %}{% endrenderEvents %}

{% renderCssCustomProperties for=package %}{% endrenderCssCustomProperties %}

{% renderCssParts for=package %}{% endrenderCssParts %}
