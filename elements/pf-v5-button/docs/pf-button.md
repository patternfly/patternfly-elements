<style>
pf-v5-button + pf-v5-button {
  margin-inline-start: 4px;
  margin-block-end: 4px;
}
</style>

<script type="module">
  import '@patternfly/elements/pf-v5-icon/pf-v5-icon.js';
  import '@patternfly/elements/pf-v5-tabs/pf-v5-tabs.js';
</script>

{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}

<div class="overview-buttons">

#### Default - Medium size

<pf-v5-button>Primary</pf-v5-button>
<pf-v5-button variant="secondary">Secondary</pf-v5-button>
<pf-v5-button variant="secondary" danger>Danger Secondary</pf-v5-button>
<pf-v5-button variant="tertiary">Tertiary</pf-v5-button>
<pf-v5-button danger>Danger</pf-v5-button>
<pf-v5-button warning>Warning</pf-v5-button>
</div>

{% endrenderOverview %}

{% band header="Usage" %}
  ### Link variant
  {% htmlexample %}
  <pf-v5-button variant="link" id="test">
    <svg fill="currentColor"
         style="vertical-align:-0.125em"
         height="1em"
         width="1em"
         viewBox="0 0 512 512"
         aria-hidden="true">
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"/>
    </svg>
    Link
  </pf-v5-button>
  <pf-v5-button variant="link" icon-set="patternfly" icon="arrow" icon-position="right">Link</pf-v5-button>
  <pf-v5-button variant="link" inline>Inline Link</pf-v5-button>
  <pf-v5-button variant="link" danger>Danger Link</pf-v5-button>
  <pf-v5-button variant="link" href="#link">Link</pf-v5-button>
  <pf-v5-button variant="link" href="https://patternflyelements.org/" target="_blank" icon="location-arrow">Go to PatternFly</pf-v5-button>
  {% endhtmlexample %}

  ### Plain button
  {% htmlexample %}
  <pf-v5-button plain>
    <svg aria-label="Action" fill="currentColor" height="1em" width="1em" viewBox="0 0 352 512">
      <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
    </svg>
  </pf-v5-button>
  {% endhtmlexample %}

  ### Control variant
  {% htmlexample %}
  <pf-v5-button variant="control">Control</pf-v5-button>
  <pf-v5-button variant="control">
    <svg aria-label="Copy" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512">
      <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
    </svg>
  </pf-v5-button>
  {% endhtmlexample %}

  ### Size
  {% htmlexample %}
  <pf-v5-button>Medium Button</pf-v5-button>
  <pf-v5-button size="large">Large Button</pf-v5-button>
  {% endhtmlexample %}

  ### Click listeners

<pf-v5-tabs class="html-lit-react-snippets">
  <pf-v5-tab slot="tab">HTML</pf-v5-tab>
  <pf-v5-tab-panel>

```html
<script type="module">
  import '@patternfly/elements/pf-v5-button/pf-v5-button.js';
  document.querySelector('pf-v5-button')
    .addEventListener('click', function() {
      console.log('clicked!');
    });
</script>
<pf-v5-button>Click me!</pf-v5-button>
```

  </pf-v5-tab-panel>
  <pf-v5-tab slot="tab">Lit</pf-v5-tab>
  <pf-v5-tab-panel>

```js
import { html, render } from 'lit';
import '@patternfly/elements/pf-v5-button/pf-v5-button.js';

render(html`
  <pf-v5-button @click="${() => console.log('clicked!');}">
    Click me!
  </pf-v5-button>
`, document.getElementById('container'));
```

  </pf-v5-tab-panel>
  <pf-v5-tab slot="tab">React</pf-v5-tab>
  <pf-v5-tab-panel>

```jsx
import { Button } from '@patternfly/elements/react/pf-v5-button/pf-v5-button.js';
export function Clicker() {
  return (
    <Button onClick={() => console.log('clicked!');}>
      Click me!
    </Button>
  )
}
```

  </pf-v5-tab-panel>
</pf-v5-tabs>

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
