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
  <pf-back-to-top>Back to Top</pf-back-to-top>
{% endrenderOverview %}

{% band header="Usage" %}

  ### Default
  {% htmlexample %}<pf-back-to-top>Back to Top</pf-back-to-top>{% endhtmlexample %}

  ### Title attribute
  {% htmlexample %}<pf-back-to-top title="Back to Top"></pf-back-to-top>{% endhtmlexample %}


  ### No text 
  {% htmlexample %}<pf-back-to-top></pf-back-to-top>{% endhtmlexample %}

  <div class="override">

  ### Scrollable Selector
  {% htmlexample %}
    <div id="scrollable-selector-example">
      <div class="overflow" tabindex="0">
        <div class="scroll-indicator">
          <pf-icon icon="arrow-down"></pf-icon> Scroll down to end of cyan box, 400px (default).
        </div>
      </div>
      <pf-back-to-top scrollable-selector="#scrollable-selector-example">Back to Top</pf-back-to-top>
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
      <pf-back-to-top scroll-distance="100" scrollable-selector="#scroll-distance-example">Back to Top</pf-back-to-top>
    </div>
  {% endhtmlexample %}

  </div>

  ### Content guidelines
  - The button should consistently be placed on the lower right side of the page.
  - Only use 1 back to top component per page, avoid using multiple buttons in different sections.
  - Keep the button stationary. Once the button reveals itself, it should not move on the page.
  - Include proper spacing around the button, see CSS variables under React and HTML tabs.

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
