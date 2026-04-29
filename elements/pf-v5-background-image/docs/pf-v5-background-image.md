{% renderOverview %}
  {% htmlexample class="pf-v5-background-image" %}
  <pf-v5-background-image filter
      src="/components/background-image/demo/pfbg.jpg"
      src-2x="/components/background-image/demo/pfbg_576.jpg"
      src-sm="/components/background-image/demo/pfbg_768.jpg"
      src-sm-2x="/components/background-image/demo/pfbg_768@2x.jpg"
      src-lg="/components/background-image/demo/pfbg_1200.jpg"
  ></pf-v5-background-image>
  {% endhtmlexample %}

  View the [full screen demo](/components/background-image/demo/).

{% endrenderOverview %}

{% band header="Usage" %}
  ### Sibling content w/ no filter
  {% htmlexample class="pf-v5-background-image" %}
  <pf-v5-background-image 
      src="/components/background-image/demo/pfbg.jpg"
      src-2x="/components/background-image/demo/pfbg_576.jpg"
      src-sm="/components/background-image/demo/pfbg_768.jpg"
      src-sm-2x="/components/background-image/demo/pfbg_768@2x.jpg"
      src-lg="/components/background-image/demo/pfbg_1200.jpg"
  ></pf-v5-background-image>
  <p>Sibling Content</p>
  <pf-v5-button>Button</pf-v5-button>
  {% endhtmlexample %}

  View the [full screen demo](/components/background-image/demo/sibling-content/). 

  ### Override SVG Filter

  [MDN documentation for `<filter>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter)

  {% htmlexample class="pf-v5-background-image" %}
  <pf-v5-background-image filter
      src="/components/background-image/demo/pfbg.jpg"
      src-2x="/components/background-image/demo/pfbg_576.jpg"
      src-sm="/components/background-image/demo/pfbg_768.jpg"
      src-sm-2x="/components/background-image/demo/pfbg_768@2x.jpg"
      src-lg="/components/background-image/demo/pfbg_1200.jpg" >
    <svg slot="filter" xmlns="http://www.w3.org/2000/svg">
      <filter id="image_overlay">
        <feMorphology in="SourceGraphic" operator="dilate" radius="5"></feMorphology>
      </filter>
    </svg>
  </pf-v5-background-image>
  {% endhtmlexample %} 

  View the [full screen demo](/components/background-image/demo/filter-override/).

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
