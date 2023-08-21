{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}

<pf-popover heading="Popover heading"
            body="Popovers are triggered by click rather than hover."
            footer="Popover footer">
  <pf-button>Toggle popover</pf-button>
</pf-popover>

{% endrenderOverview %}

{% band header="Usage" %}
  {% htmlexample %}
  <pf-popover heading="Popover heading"
              body="Popovers are triggered by click rather than hover."
              footer="Popover footer">
    <pf-button>Toggle popover</pf-button>
  </pf-popover>
  {% endhtmlexample %}

  **Note**: Unlike the [Patternfly React implementation][withfocustrap], this 
  component does not trap focus in the popover dialog. If you would like to trap 
  focus, consider using a modal dialog instead.

  ### Activating programmatically

  Use the `show()` method to activate the popover.

<pf-tabs class="html-lit-react-snippets">
  <pf-tab slot="tab">HTML</pf-tab>
  <pf-tab-panel>

```html
<script type="module">
  import '@patternfly/elements/pf-button/pf-button.js';
  import '@patternfly/elements/pf-popover/pf-popover.js';

  const button = document.querySelector('pf-button');

  const popover = document.querySelector('pf-popover');

  button.addEventListener('mouseover', function() {
    popover.show();
  });

  button.addEventListener('mouseout', function() {
    popover.hide();
  });
</script>

<pf-button>Hover to cite</pf-button>

<pf-popover>
  <cite slot="body">Richard M. Stallman</cite>
  <q>Free software is a political movement; open source is a development model.</q>
</pf-popover>
```

  </pf-tab-panel>
  <pf-tab slot="tab">Lit</pf-tab>
  <pf-tab-panel>

```js
import { LitElement, html } from 'lit';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-popover/pf-popover.js';

class Citer extends LitElement {
  render() {
    return html`
      <pf-button @mouseover="${this.#onMouseover}"
                 @mouseout="${this.#onMouseout}">Hover to Cite</pf-button>

      <pf-popover>
        <cite slot="body">Richard M. Stallman</cite>
        <q>Free software is a political movement; open source is a development model.</q>
      </pf-popover>
    `;
  }

  get #popover() { return this.shadowRoot.querySelector('pf-popover'); }

  #onMouseover() { this.#popover.show(); }

  #onMouseout() { this.#popover.hide(); }
}
```

  </pf-tab-panel>
  <pf-tab slot="tab">React</pf-tab>
  <pf-tab-panel>

```jsx
import { Button } from '@patternfly/elements/react/pf-button/pf-button.js';
import { Popover } from '@patternfly/elements/react/pf-popover/pf-popover.js';
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

  </pf-tab-panel>
</pf-tabs>
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}

[withfocustrap]: https://www.patternfly.org/v4/components/popover#:~:textwithfocustrap
