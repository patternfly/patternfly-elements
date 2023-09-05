<style>
  :not(.override) > .example-preview pf-back-to-top {
    position: static !important;
  }

  :not(.override) > .example-preview pf-back-to-top::part(button) {
    position: static !important;
    left: unset;
    top: unset;
    width: unset;
    height: unset;
    overflow: unset;
  }

  .override > .example-preview :is(#scrollable-selector-example, #scroll-distance-example) {
    position: relative;
    height: 200px; 
    overflow-y: scroll;
  }

  .override > .example-preview :is(#scrollable-selector-example, #scroll-distance-example) pf-back-to-top {
    position: sticky !important;
  }

  .overfill {
    height: 800px;
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
  <pf-back-to-top>Back to Top</pf-back-to-top>
{% endrenderOverview %}

{% band header="Usage" %}

  ### Default
  {% htmlexample %}<pf-back-to-top href="#main">Back to Top</pf-back-to-top>{% endhtmlexample %}

  ### Title attribute
  {% htmlexample %}<pf-back-to-top title="Back to Top" href="#main"></pf-back-to-top>{% endhtmlexample %}

  <div class="override">

  ### Scrollable Selector
  {% htmlexample %}
    <div id="scrollable-selector-example">
      <div class="overfill">
        <div class="scroll-indicator">
          <pf-icon icon="arrow-down"></pf-icon> Scroll down to end of cyan box, 400px (default).
        </div>
      </div>
      <pf-back-to-top scrollable-selector="#scrollable-selector-example" href="#scrollable-selector-example">Back to Top</pf-back-to-top>
    </div>
  {% endhtmlexample %}

  ### Scroll Distance
  {% htmlexample %}
    <div id="scroll-distance-example">
      <div class="overfill">
        <div class="scroll-indicator">
          <pf-icon icon="arrow-down"></pf-icon> Scroll down to end of cyan box, 100px.
        </div>
      </div>
      <pf-back-to-top scroll-distance="100" scrollable-selector="#scroll-distance-example" href="#scroll-distance-example">Back to Top</pf-back-to-top>
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
