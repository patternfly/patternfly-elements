# PatternFly Elements Tabs
     
Read more about Tabs in the [PatternFly Elements Tabs documentation](https://patternflyelements.org/components/tabs)

##  Installation

Load `<pfe-tabs>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-tabs?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-tabs
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-tabs';
```

## Usage

```html
<pfe-tabs>
  <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">Tab 2</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

