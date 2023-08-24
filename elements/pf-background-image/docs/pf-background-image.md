{% renderOverview %}
  {% htmlexample class="pf-background-image" %}
  <pf-background-image filter
      src="/images/elements/pf-background-image/pfbg.jpg"
      src-2x="/images/elements/pf-background-image/pfbg_576.jpg"
      src-sm="/images/elements/pf-background-image/pfbg_768.jpg"
      src-sm-2x="/images/elements/pf-background-image/pfbg_768@2x.jpg"
      src-lg="/images/elements/pf-background-image/pfbg_1200.jpg"
  />
  {% endhtmlexample %} 
{% endrenderOverview %}

{% band header="Usage" %}
  ### Sibling content w/ no filter
  {% htmlexample class="pf-background-image" %}
  <pf-background-image 
    src="/images/elements/pf-background-image/pfbg.jpg"
    src-2x="/images/elements/pf-background-image/pfbg_576.jpg"
    src-sm="/images/elements/pf-background-image/pfbg_768.jpg"
    src-sm-2x="/images/elements/pf-background-image/pfbg_768@2x.jpg"
    src-lg="/images/elements/pf-background-image/pfbg_1200.jpg"
  ></pf-background-image>
  <p>Sibling Content</p>
  <pf-button>Button</pf-button>
  {% endhtmlexample %} 


  ### Override SVG Filter

  [MDN documentation for `<filter>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter)

  {% htmlexample class="pf-background-image" %}
  <pf-background-image filter
    src="/images/elements/pf-background-image/pfbg.jpg"
    src-2x="/images/elements/pf-background-image/pfbg_576.jpg"
    src-sm="/images/elements/pf-background-image/pfbg_768.jpg"
    src-sm-2x="/images/elements/pf-background-image/pfbg_768@2x.jpg"
    src-lg="/images/elements/pf-background-image/pfbg_1200.jpg"
  >
    <svg slot="filter" xmlns="http://www.w3.org/2000/svg">
      <filter id="filter">
        <feMorphology in="SourceGraphic" operator="dilate" radius="5"></feMorphology>
      </filter>
    </svg>
  </pf-background-image>
  {% endhtmlexample %} 

  To be used in a container, additional CSS is needed.  
  ```css
  /* Example CSS */
  .container {
    position: relative;
    z-index: 0;
  }

  .container pf-background-image {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .container pf-background-image::part(container) {
    position: relative;
  }

  .container pf-background-image,
  .container pf-background-image::part(container)  {
    height: 100%;
    width: 100%;
  }

  .container pf-background-image::part(container)::after {
    position: absolute;
    background-size: cover;
  }

  ```
 View the [demo](demo/) to see the full screen example not in a container.

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
