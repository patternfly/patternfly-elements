<style>
pf-button + pf-button {
  margin-inline-start: 4px;
  margin-block-end: 4px;
}
</style>

<script type="module">
import '@patternfly/elements/pf-icon/pf-icon.js';
</script>

{% renderOverview %}

<div class="overview-buttons">

#### Default - Medium size

<pf-button>Primary</pf-button>
<pf-button variant="secondary">Secondary</pf-button>
<pf-button variant="secondary" danger>Danger Secondary</pf-button>
<pf-button variant="tertiary">Tertiary</pf-button>
<pf-button danger>Danger</pf-button>
<pf-button warning>Warning</pf-button>
</div>

{% endrenderOverview %}

{% band header="Usage" %}
#### Link variant
<pf-button variant="link" id="test">
  <svg fill="currentColor" style="vertical-align:-0.125em" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true">
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
  </svg>
  Link
</pf-button>
<pf-button variant="link" icon-set="patternfly" icon="arrow" icon-position="right">Link</pf-button>
<pf-button variant="link" inline>Inline Link</pf-button>
<pf-button variant="link" danger>Danger Link</pf-button>

```html
<pf-button variant="link" id="test">
  <svg fill="currentColor" style="vertical-align:-0.125em" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true">
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
  </svg>
  Link
</pf-button>
<pf-button variant="link" icon-set="patternfly" icon="arrow" icon-position="right">Link</pf-button>
<pf-button variant="link" inline>Inline Link</pf-button>
<pf-button variant="link" danger>Danger Link</pf-button>
```

#### Plain button

<pf-button plain>
  <svg aria-label="Action" fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
  </svg>
</pf-button>

```html
<pf-button plain>
  <svg aria-label="Action" fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
  </svg>
</pf-button>
```

#### Control variant

<pf-button variant="control">Control</pf-button>
<pf-button variant="control">
  <svg aria-label="Copy" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512">
    <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
  </svg>
</pf-button>

```html
<pf-button variant="control">Control</pf-button>
<pf-button variant="control">
  <svg aria-label="Copy" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512">
    <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
  </svg>
</pf-button>
```

<h3>Size</h3>
<pf-button>Medium Button</pf-button>
<pf-button size="large">Large Button</pf-button>


```html
<pf-button>Medium Button</pf-button>
<pf-button size="large">Large Button</pf-button>
```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
