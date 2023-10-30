<style>
  :not(.override) > .example-preview pf-back-to-top {
    position: sticky !important;
    left: 100%;
    bottom: 0;
  }

  :not(.override) > .example-preview pf-back-to-top::part(trigger) {
    display: inline-block !important;
  }

  .override > .example-preview :is(#scrollable-selector-example, #scroll-distance-example) {
    position: relative;
    height: 200px; 
    overflow-y: scroll;
  }

  .override > .example-preview :is(#scrollable-selector-example, #scroll-distance-example) pf-back-to-top {
    position: sticky !important;
    left: 100%;
    bottom: 0;
  }

  .overflow {
    height: 573px;
    position: relative;
  }

  .scroll-indicator {
    padding: var(--pf-global--spacer--md, 1rem);
    background-color: var(--pf-global--palette--cyan-50, #f2f9f9) !important;
  }

  #scrollable-selector-example .scroll-indicator {
    height: 400px;
  }

  #scroll-distance-example .scroll-indicator {
    height: 100px;
  }

</style>

{% renderOverview %}
  Back to top button is designed to only be used once per page. 
  <pf-back-to-top href="#main">Back to top</pf-back-to-top>
{% endrenderOverview %}

{% band header="Usage" %}

  ### Default
  {% htmlexample %}<pf-back-to-top href="#main">Back to top</pf-back-to-top>{% endhtmlexample %}

  ### Label attribute
  {% htmlexample %}<pf-back-to-top href="#main" label="Return to top"></pf-back-to-top>{% endhtmlexample %}

  ### No text or label attribute
  `[aria-label]` attribute defaults to text 'Back to top'
  {% htmlexample %}
 
  <pf-back-to-top href="#main"></pf-back-to-top>
  {% endhtmlexample %}

  <div class="override">

  ### Scrollable Selector
  {% htmlexample %}
    <div id="scrollable-selector-example">
      <div class="overflow" tabindex="0">
        <div class="scroll-indicator">
          <pf-icon icon="arrow-down"></pf-icon> Scroll down to end of cyan box, 400px (default).
        </div>
      </div>
      <pf-back-to-top href="#main" scrollable-selector="#scrollable-selector-example">Back to top</pf-back-to-top>
    </div>
  {% endhtmlexample %}

  ### Scroll Distance
  {% htmlexample %}
    <div id="scroll-distance-example">
      <div class="overflow" tabindex="0">
        <div class="scroll-indicator">
          <pf-icon icon="arrow-down"></pf-icon> Scroll down to end of cyan box, 100px.
        </div>
      </div>
      <pf-back-to-top href="#main" scroll-distance="100" scrollable-selector="#scroll-distance-example">Back to top</pf-back-to-top>
    </div>
  {% endhtmlexample %}

  </div>

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
