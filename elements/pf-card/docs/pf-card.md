{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}

  Cards are flexible surfaces used to group information in a small layout. They give small previews of information or provide secondary content in relation to the content it's near. Several cards can be used together to group related information.

  <pf-card>
    <h3 slot="header">Header</h3>
    <p>This is the default card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pf-card>
{% endrenderOverview %}

{% band header="Usage" %}

  ### Basic cards

  ### Modifiers
  {% htmlexample %}
  <pf-card size="compact">
    <h3 slot="header">Header</h3>
    <p>This is the compact card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pf-card>
  {% endhtmlexample %}

  ### Large card
  {% htmlexample %}
  <pf-card size="large">
    <h3 slot="header">Large card</h3>
    <p>This is the large card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pf-card>
  {% endhtmlexample %}

  ### Rounded card
  {% htmlexample %}
  <pf-card rounded>
    <h3 slot="header">Header</h3>
    <p>This is the rounded card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pf-card>
  {% endhtmlexample %}

  ### Full Height card
  {% htmlexample %}
  <pf-card fullHeight>
    <h3 slot="header">Header</h3>
    <p>This is the full height card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pf-card>
  {% endhtmlexample %}

  ### Plain card
  {% htmlexample %}
  <pf-card plain>
    <h3 slot="header">Header</h3>
    <p>This is the plain card</p>
    <a slot="footer" href="#">Link in the footer</a>
  </pf-card>
  {% endhtmlexample %}

  ### Header images and actions
  You can include header images and actions in the `header` slot, along with a
  title in the `title` slot. The following example includes an SVG image, and
  also includes a kebab dropdown.

  {% htmlexample %}
  <pf-card>
    <svg xmlns="http://www.w3.org/2000/svg"
         xml:space="preserve"
         slot="header"
         fill="#030303"
         width="300px"
         viewBox="0 0 706.3 132.5">
      <path d="M197.2 83.9V48.6h15.2c2.2 0 4.1.3 5.6 1s2.8 1.5 3.7 2.6c1 1.1 1.6 2.3 2.1 3.6.4 1.3.6 2.7.6 4 0 .9-.1 1.7-.3 2.6-.2.9-.5 1.7-.9 2.6-.4.8-.9 1.6-1.6 2.3-.6.7-1.4 1.4-2.3 1.9-.9.5-1.9 1-3.1 1.3a16 16 0 0 1-3.9.5H204v13h-6.8zm15.5-19.5c.9 0 1.6-.1 2.2-.4.6-.3 1.1-.6 1.4-1.1.4-.4.6-.9.8-1.5.2-.6.3-1.1.3-1.7 0-.5-.1-1-.2-1.6-.1-.5-.4-1-.7-1.5-.4-.5-.8-.8-1.4-1.1-.6-.3-1.4-.4-2.3-.4h-8.6v9.4h8.5zM271.6 83.9l-2.7-7.3h-13.6l-2.7 7.3h-7.3l13.5-35.4h6.7L279 83.9h-7.4zm-8.4-22.7c-.2-.4-.4-.9-.6-1.5-.2-.6-.4-1.1-.5-1.7-.1.5-.3 1.1-.5 1.7-.2.6-.4 1.1-.6 1.5l-3.5 9.2h9.2l-3.5-9.2zM317.3 55.2V84h-6.8V55.2h-10.1v-6.6h27v6.6h-10.1zM370.2 55.2V84h-6.8V55.2h-10.1v-6.6h27v6.6h-10.1zM408.5 83.9V48.6h24.1v6.5h-17.3v7.4h10.2V69h-10.2v8.5h18.4V84h-25.2zM462.4 83.9V48.6h16.4c2.2 0 4.1.3 5.6.9 1.5.6 2.7 1.4 3.6 2.5.9 1 1.6 2.2 2 3.5.4 1.3.6 2.7.6 4.2 0 1-.1 2-.4 3-.3 1-.7 2-1.3 2.9-.6.9-1.3 1.8-2.1 2.5-.9.7-1.8 1.3-3 1.7l6.9 14.1H483l-6.6-13.2h-7.1v13.2h-6.9zm16.5-19.6c.9 0 1.6-.1 2.2-.4.6-.3 1.1-.6 1.4-1 .4-.4.6-.9.8-1.5.2-.6.2-1.1.2-1.7 0-.6-.1-1.1-.2-1.7-.1-.6-.4-1-.7-1.5-.3-.4-.8-.8-1.4-1-.6-.3-1.4-.4-2.3-.4h-9.7v9.2h9.7zM541.9 83.9l-14-20.6c-.2-.3-.5-.8-.8-1.3-.3-.5-.5-1-.7-1.4.1.4.1.8.1 1.3V83.8h-6.8V48.6h6.4L539.8 69c.2.3.5.7.7 1.2.3.5.5 1 .7 1.4 0-.5-.1-1-.1-1.4V48.6h6.8V84h-6zM578.4 83.9V48.6h23.7v6.5h-16.9v7.4H596V69h-10.7v15h-6.9zM629.8 83.9V48.6h6.8v28.8h17.1V84h-23.9zM686.4 83.9V70.2l-13.1-21.6h7.7l8.7 14.5 8.7-14.5h7.7L693 70.2V84h-6.6z"/>
      <path d="m49 103-21.2 4.9L0 68.4 70 0l70 68.4-27.8 39.4L91 103l-21 29.5L49 103zm21 25.7 18.6-26.2-7.2-1.7-11 16.2-11.9-16.2-7.2 1.7L70 128.7zm.4-15.6 9.2-13.5L70 6.7l-9.5 92.9 9.9 13.5zm-41.6-7.7 18.8-4.3-13.8-19.4 4.1-9.3L25.2 55 58 14.9 2.9 68.7l25.9 36.7zm82.4 0 16.3-23.1 9.6-13.6L82 14.9 114.9 55l-12.8 17.4 4.1 9.3L92.4 101l18.8 4.4zm-21.1-4.9 13.6-19.1-3-6.9-18 24.3 7.4 1.7zm-40.1 0 7.3-1.7-17.9-24.3-3 6.9L50 100.5zm31.9-4.3 17.6-24.1-26.6-60.5 9 84.6zm-23.8 0 9-84.6-26.6 60.5 17.6 24.1zM39 70 66.1 8.5 28 55.1 39 70zm62.1 0 11-15L74 8.5 101.1 70z"/>
    </svg>
    <pf-dropdown slot="header">
      <pf-button slot="toggle" plain icon="ellipsis-v"></pf-button>
      <pf-dropdown-menu slot="menu">
        <pf-dropdown-item>Action</pf-dropdown-item>
        <pf-dropdown-item href="#">Link</pf-dropdown-item>
        <pf-dropdown-item disabled>Disabled Action</pf-dropdown-item>
        <pf-dropdown-item href="#" disabled>Disabled Link</pf-dropdown-item>
        <hr>
        <pf-dropdown-item>Separated Action</pf-dropdown-item>
        <pf-dropdown-item href="#">Separated Link</pf-dropdown-item>
      </pf-dropdown-menu>
    </pf-dropdown>
    <h2 slot="title">Title</h2>
    <span>Body</span>
    <span slot="footer">Footer</span>
  </pf-card>
  {% endhtmlexample %}

  ### Title inline with images and actions 
  Slotting the `<h2>` into the `header` slot, instead of the `title` slot will
  style it inline with any images or actions.

  {% htmlexample %}
  <pf-card>
    <h2 slot="header">This is a really really really really really really really really really really long header </h2>
    <pf-dropdown slot="header">
      <pf-button slot="toggle" plain icon="ellipsis-v"></pf-button>
      <pf-dropdown-menu slot="menu">
        <pf-dropdown-item>Action</pf-dropdown-item>
        <pf-dropdown-item href="#">Link</pf-dropdown-item>
        <pf-dropdown-item disabled>Disabled Action</pf-dropdown-item>
        <pf-dropdown-item href="#" disabled>Disabled Link</pf-dropdown-item>
        <hr>
        <pf-dropdown-item>Separated Action</pf-dropdown-item>
        <pf-dropdown-item href="#">Separated Link</pf-dropdown-item>
      </pf-dropdown-menu>
    </pf-dropdown>
    <span>Body</span>
    <span slot="footer">Footer</span>
  </pf-card>
  {% endhtmlexample %}

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

<script type="module">
  import '@patternfly/elements/pf-card/pf-card.js';
  import '@patternfly/elements/pf-dropdown/pf-dropdown.js';
</script>
