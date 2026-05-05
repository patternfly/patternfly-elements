# PatternFly Elements Tabs
     
Read more about Tabs in the [PatternFly Elements Tabs documentation](https://patternflyelements.org/components/tabs)

##  Installation

Load `<pf-v5-tabs>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-tabs/pf-v5-tabs.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-tabs/pf-v5-tabs.js';
```

## Usage

```html
<pf-v5-tabs>
  <pf-v5-tab id="users" slot="tab">Users</pf-v5-tab>
  <pf-v5-tab-panel>Users</pf-v5-tab-panel>
  <pf-v5-tab slot="tab">Containers</pf-v5-tab>
  <pf-v5-tab-panel>Containers <a href="#">Focusable element</a></pf-v5-tab-panel>
  <pf-v5-tab slot="tab">Database</pf-v5-tab>
  <pf-v5-tab-panel>Database</pf-v5-tab-panel>
</pf-v5-tabs>
```

