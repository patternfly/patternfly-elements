{% renderOverview %}

  Cards are flexible surfaces used to group information in a small layout. They give small previews of information or provide secondary content in relation to the content it's near. Several cards can be used together to group related information.

<div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md">
  <pfe-card>
    <h3 slot="header">Default card</h3>
    <p>This is the default card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card color-palette="lightest" border>
    <h3 slot="header">Lightest card</h3>
    <p>This is the lightest card with a border</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card color-palette="darker">
    <h3 slot="header">Darker card</h3>
    <p>This is the darker card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card color-palette="darkest">
    <h3 slot="header">Darkest card</h3>
    <p>This is the darkest card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card color-palette="complement">
    <h3 slot="header">Complement card</h3>
    <p>This is the complement card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>

  <pfe-card color-palette="accent">
    <h3 slot="header">Accent card</h3>
    <p>This is the accent card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pfe-card>
</div>
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
