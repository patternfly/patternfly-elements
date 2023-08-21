{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
  <pf-label>Default</pf-label>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Default
  {% htmlexample %}
  <pf-label>Default</pf-label>
  {% endhtmlexample %}

  ### With a color
  Available colors are: grey (default), blue, green, orange, red, purple, cyan, gold

  {% htmlexample %}
  <pf-label color="blue">Blue</pf-label>
  <pf-label color="green">Green</pf-label>
  <pf-label color="orange">Orange</pf-label>
  <pf-label color="red">Red</pf-label>
  <pf-label color="purple">Purple</pf-label>
  <pf-label color="cyan">Cyan</pf-label>
  <pf-label color="gold">Gold</pf-label>
  {% endhtmlexample %}

  <div class="callout">

  ### Conveying meaning to assistive technologies
  Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with a class. 

  </div>

  {% htmlexample %}
  <pf-label color="red">
    Red <span class="visually-hidden-class">Warning</span>
  </pf-label>
  {% endhtmlexample %}

  ### Outline variant
  Swaps the color style for a outline styled variant

  {% htmlexample %}
  <pf-label variant="outline" color="blue">Blue</pf-label>
  <pf-label variant="outline" color="green">Green</pf-label>
  <pf-label variant="outline" color="orange">Orange</pf-label>
  <pf-label variant="outline" color="red">Red</pf-label>
  <pf-label variant="outline" color="purple">Purple</pf-label>
  <pf-label variant="outline" color="cyan">Cyan</pf-label>
  <pf-label variant="outline" color="gold">Gold</pf-label>
  <pf-label variant="outline">Default</pf-label>
  {% endhtmlexample %}

  ### With icon as an attribute
  Adds a optional fixed size `pf-icon` to the label as a prefix

  {% htmlexample %}
  <pf-label color="blue" icon="globe">Globe</pf-label>
  {% endhtmlexample %}

  Read more about Icon in the [PatternFly Elements Icon documentation](https://patternflyelements.org/components/icon)

  ### With user defined image using `slot="icon"`
  Adds user defined SVG or `pf-icon` to the label.

  {% htmlexample %}
  <pf-label color="blue">Globe
    <svg slot="icon"
         viewBox="0 0 17 17"
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         aria-hidden="true"
         role="img">
      <path d="M8.5,1A7.5,7.5,0,1,0,16,8.5,7.508,7.508,0,0,0,8.5,1Zm0,13.731a9.636,9.636,0,0,1-1.941-3.724H10.44A9.647,9.647,0,0,1,8.5,14.731ZM6.352,10.007A9.688,9.688,0,0,1,6.351,7h4.3a9.75,9.75,0,0,1,0,3.007ZM2,8.5A6.45,6.45,0,0,1,2.182,7H5.335a10.741,10.741,0,0,0,0,3.007H2.182A6.515,6.515,0,0,1,2,8.5ZM10.442,6H6.557A9.636,9.636,0,0,1,8.5,2.268,9.625,9.625,0,0,1,10.442,6Zm1.222,1h3.154a6.268,6.268,0,0,1,0,3.007H11.663A10.779,10.779,0,0,0,11.664,7ZM14.5,6H11.474A10.619,10.619,0,0,0,9.653,2.109,6.513,6.513,0,0,1,14.5,6ZM7.341,2.109A10.61,10.61,0,0,0,5.524,6H2.5A6.521,6.521,0,0,1,7.341,2.109ZM2.5,11.007H5.528a10.6,10.6,0,0,0,1.821,3.887A6.5,6.5,0,0,1,2.5,11.007Zm7.153,3.884a10.6,10.6,0,0,0,1.819-3.884H14.5A6.518,6.518,0,0,1,9.653,14.891Z"/>
    </svg>
  </pf-label>
  {% endhtmlexample %}

  {% htmlexample %}
  <pf-label color="blue">Globe
    <pf-icon slot="icon" icon="globe" size="sm"></pf-icon>
  </pf-label>
  {% endhtmlexample %}

  ### Compact style
  Creates a compact style label which can be combined with color, variant and icon

  {% htmlexample %}
  <pf-label compact color="blue">Globe
    <svg slot="icon"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 17 17"
         fill="currentColor"
         aria-hidden="true"
         role="img">
       <path d="M8.5,1A7.5,7.5,0,1,0,16,8.5,7.508,7.508,0,0,0,8.5,1Zm0,13.731a9.636,9.636,0,0,1-1.941-3.724H10.44A9.647,9.647,0,0,1,8.5,14.731ZM6.352,10.007A9.688,9.688,0,0,1,6.351,7h4.3a9.75,9.75,0,0,1,0,3.007ZM2,8.5A6.45,6.45,0,0,1,2.182,7H5.335a10.741,10.741,0,0,0,0,3.007H2.182A6.515,6.515,0,0,1,2,8.5ZM10.442,6H6.557A9.636,9.636,0,0,1,8.5,2.268,9.625,9.625,0,0,1,10.442,6Zm1.222,1h3.154a6.268,6.268,0,0,1,0,3.007H11.663A10.779,10.779,0,0,0,11.664,7ZM14.5,6H11.474A10.619,10.619,0,0,0,9.653,2.109,6.513,6.513,0,0,1,14.5,6ZM7.341,2.109A10.61,10.61,0,0,0,5.524,6H2.5A6.521,6.521,0,0,1,7.341,2.109ZM2.5,11.007H5.528a10.6,10.6,0,0,0,1.821,3.887A6.5,6.5,0,0,1,2.5,11.007Zm7.153,3.884a10.6,10.6,0,0,0,1.819-3.884H14.5A6.518,6.518,0,0,1,9.653,14.891Z"/>
   </svg>
  </pf-label>
  <pf-label compact color="green">Green</pf-label>
  <pf-label compact variant="outline" color="orange">Orange</pf-label>
  <pf-label compact color="red" icon="globe">Red</pf-label>
  <pf-label compact variant="outline" color="purple">Purple</pf-label>
  <pf-label compact color="cyan">Cyan</pf-label>
  <pf-label compact variant="outline" color="gold">Gold <pf-icon slot="icon" icon="globe" size="sm"></pf-icon></pf-label>
  <pf-label compact>Default</pf-label>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
