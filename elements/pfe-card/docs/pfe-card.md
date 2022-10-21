{% renderOverview %}

  Cards are flexible surfaces used to group information in a small layout. They give small previews of information or provide secondary content in relation to the content it's near. Several cards can be used together to group related information.

<!-- <div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md"> -->
  <pfe-card>
    <h3 slot="header">Default card</h3>
    <p>This is the default card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card size="compact">
    <h3 slot="header">Compact card</h3>
    <p>This is the compact card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card rounded>
    <h3 slot="header">Rounded card</h3>
    <p>This is the rounded card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card size="large">
    <h3 slot="header">Large card</h3>
    <p>This is the large card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card fullHeight>
    <h3 slot="header">Full Height card</h3>
    <p>This is the full height card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card plain>
    <h3 slot="header">Plain card</h3>
    <p>This is the plain card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>
<!-- </div> -->
{% endrenderOverview %}

{% band header="Usage" %}
  ```html
  <pfe-card>
    <h2 slot="header">Card header</h2>
    <p>This is the pfe-card body.</p>
    <p slot="footer">This is the footer</p>
  </pfe-card>
  ```
{% endband %}

{% renderSlots %}
  All slots are optional. If the slot is not defined, the content will be added to the `body` region of the card.
{% endrenderSlots %}

{% renderAttributes %}

  #### `overflow` (child element attribute)
  Optionally allows an image or element to overflow the padding on the container. This property should be added to the direct child of the slot such as on an image tag; should be added to the element that you want to overflow the container. Accepts: `top`, `right`, `bottom`, `left`.

{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
