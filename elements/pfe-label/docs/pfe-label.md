{% renderOverview %}
  <pfe-label>Default</pfe-label>
{% endrenderOverview %}

{% band header="Usage" %}

  ### Default
  <pfe-label>Default</pfe-label>
  ```html
  <pfe-label>Default</pfe-label>
  ```

  ### With a color
  Available colors are: grey (default), red, blue, green, orange, purple, cyan 

  <pfe-label color="red">Red</pfe-label>

  ```html
  <pfe-label color="red">Red</pfe-label>
  ```

  > ### Conveying meaning to assistive technologies
  > Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that
  > information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text 
  > hidden with the a class.

  ```html
  <pfe-label color="red">Red <span class="visually-hidden-class">Warning</span></pfe-label>
  ```


  ### With an icon
  This adds a optional fixed size `pfe-icon` to the label as a prefix

  <pfe-label color="blue" icon="web-icon-globe">Globe</pfe-label>


  ```html
  <pfe-label color="blue" icon="web-icon-globe">Globe</pfe-label>
  ```

  Read more about Icon in the [PatternFly Elements Icon documentation](https://patternflyelements.org/components/icon)

  ### Outline variant
  Swaps the color style for a outline styled variant

  <pfe-label color="red" outline>Red</pfe-label>

  ```html
  <pfe-label color="red" outline>Red</pfe-label>
  ```

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
