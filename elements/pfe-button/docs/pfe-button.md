<style>
.overview-buttons pfe-button {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>

<script type="module">
import '@patternfly/pfe-icon';
</script>

{% renderOverview %}

<div class="overview-buttons">

#### Default - Medium size

<pfe-button>Primary</pfe-button>
<pfe-button variant="secondary">Secondary</pfe-button>
<pfe-button variant="secondary" danger>Danger Secondary</pfe-button>
<pfe-button variant="tertiary">Tertiary</pfe-button>
<pfe-button danger>Danger</pfe-button>
<pfe-button warning>Warning</pfe-button>

#### Link variant

<pfe-button variant="link" id="test">
  <svg slot="icon" fill="currentColor" style="vertical-align:-0.125em" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true">
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
  </svg>
  Link
</pfe-button>
<pfe-button variant="link" icon="fa-external-link-square" icon-position="right">Link</pfe-button>
<pfe-button variant="link" inline>Inline Link</pfe-button>
<pfe-button variant="link" danger>Danger Link</pfe-button>

#### Plain button

<pfe-button plain>
  <svg aria-label="Action" fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
  </svg>
</pfe-button>

#### Control variant

<pfe-button variant="control">Control</pfe-button>
<pfe-button variant="control">
  <svg aria-label="Copy" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512">
    <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
  </svg>
</pfe-button>

</div>

{% endrenderOverview %}

{% band header="Usage" %}
  When using this component, you must provide a standard HTML Button Element as the only light DOM child of `pfe-button`.

  <pfe-button>My Button</pfe-button>

  ```html
  <pfe-button>My Button</pfe-button>
  ```
{% endband %}

{% band header="Size", level=3 %}
  <pfe-button size="large"> Large Button </pfe-button>
  <pfe-button size="medium"> Medium Button </pfe-button>

  ```html
  <pfe-button size="large"> Large Button </pfe-button>
  <pfe-button size="medium"> Medium Button </pfe-button>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
