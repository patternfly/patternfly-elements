{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}

<pf-v5-popover heading="Popover heading"
            body="Popovers are triggered by click rather than hover."
            footer="Popover footer">
  <pf-v5-button>Toggle popover</pf-v5-button>
</pf-v5-popover>

{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-v5-popover heading="Popover heading"
              body="Popovers are triggered by click rather than hover."
              footer="Popover footer">
    <pf-v5-button>Toggle popover</pf-v5-button>
  </pf-v5-popover>
  {% endhtmlexample %}

  **Note**: Unlike the [Patternfly React implementation][withfocustrap], this 
  component does not trap focus in the popover dialog. If you would like to trap 
  focus, consider using a modal dialog instead.

  ### Activating programmatically

  Use the `show()` method to activate the popover.

<pf-v5-tabs class="html-lit-react-snippets">
  <pf-v5-tab slot="tab">HTML</pf-v5-tab>
  <pf-v5-tab-panel>

```html
<script type="module">
  import '@patternfly/elements/pf-v5-button/pf-v5-button.js';
  import '@patternfly/elements/pf-v5-popover/pf-v5-popover.js';

  const button = document.querySelector('pf-v5-button');

  const popover = document.querySelector('pf-v5-popover');

  button.addEventListener('mouseover', function() {
    popover.show();
  });

  button.addEventListener('mouseout', function() {
    popover.hide();
  });
</script>

<pf-v5-button>Hover to cite</pf-v5-button>

<pf-v5-popover>
  <cite slot="body">Richard M. Stallman</cite>
  <q>Free software is a political movement; open source is a development model.</q>
</pf-v5-popover>
```

  </pf-v5-tab-panel>
  <pf-v5-tab slot="tab">Lit</pf-v5-tab>
  <pf-v5-tab-panel>

```js
import { LitElement, html } from 'lit';
import '@patternfly/elements/pf-v5-button/pf-v5-button.js';
import '@patternfly/elements/pf-v5-popover/pf-v5-popover.js';

class Citer extends LitElement {
  render() {
    return html`
      <pf-v5-button @mouseover="${this.#onMouseover}"
                 @mouseout="${this.#onMouseout}">Hover to Cite</pf-v5-button>

      <pf-v5-popover>
        <cite slot="body">Richard M. Stallman</cite>
        <q>Free software is a political movement; open source is a development model.</q>
      </pf-v5-popover>
    `;
  }

  get #popover() { return this.shadowRoot.querySelector('pf-v5-popover'); }

  #onMouseover() { this.#popover.show(); }

  #onMouseout() { this.#popover.hide(); }
}
```

  </pf-v5-tab-panel>
  <pf-v5-tab slot="tab">React</pf-v5-tab>
  <pf-v5-tab-panel>

```jsx
import { Button } from '@patternfly/elements/react/pf-v5-button/pf-v5-button.js';
import { Popover } from '@patternfly/elements/react/pf-v5-popover/pf-v5-popover.js';
import { useRef } from 'react';


export function Citer() {
  const popoverRef = useRef(null);

  const onMouseover = e => void popoverRef.current.show();

  const onMouseout = e => void popoverRef.current.hide();

  return (
    <>
      <Button onmouseover={onMouseover}
              onmouseout={onMouseout}>Hover to Cite</Button>
      <Popover ref={popoverRef}>
        <cite slot="body">Richard M. Stallman</cite>
        <q>Free software is a political movement; open source is a development model.</q>
      </Popover>
    </>
  );
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

{% renderCssParts %}{% endrenderCssParts %}

[withfocustrap]: https://www.patternfly.org/v4/components/popover#:~:textwithfocustrap
