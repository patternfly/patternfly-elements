{% renderOverview %}
  {% htmlexample %}
    <pf-background-image filter
      src="/images/elements/pf-background-image/pfbg.jpg"
      src-2x="/images/elements/pf-background-image/pfbg_576.jpg"
      src-sm="/images/elements/pf-background-image/pfbg_768.jpg"
      src-sm-2x="/images/elements/pf-background-image/pfbg_768@2x.jpg"
      src-lg="/images/elements/pf-background-image/pfbg_1200.jpg"
    ></pf-background-image>
  {% endhtmlexample %} 
{% endrenderOverview %}

{% band header="Usage" %}
  ### Slotted content
  {% htmlexample %}<pf-background-image 
      src="/images/elements/pf-background-image/pfbg.jpg"
      src-2x="/images/elements/pf-background-image/pfbg_576.jpg"
      src-sm="/images/elements/pf-background-image/pfbg_768.jpg"
      src-sm-2x="/images/elements/pf-background-image/pfbg_768@2x.jpg"
      src-lg="/images/elements/pf-background-image/pfbg_1200.jpg"
    >
      <p>Slotted Content</p>
      <pf-button>Button</pf-button>
    </pf-background-image>
  {% endhtmlexample %} 


  ### Override SVG Filter
  {% htmlexample %}<pf-background-image  filter
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

  Examples above require additional CSS to be shown in a container.  View the [demo](demo/) to see default example.
  ```css
  pf-background-image {
    height: 350px;
  }

  pf-background-image::part(container) {
    height: 100%;
    width: 100%;
    position: relative;
  }

  pf-background-image::part(container)::after {
    position: absolute;
    background-size: cover;
    z-index: 0;
  }
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
