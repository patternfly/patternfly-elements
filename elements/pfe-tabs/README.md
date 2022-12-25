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
  <pfe-tab id="users" slot="tab">Users</pfe-tab>
  <pfe-tab-panel>Users</pfe-tab-panel>
  <pfe-tab slot="tab">Containers</pfe-tab>
  <pfe-tab-panel>Containers <a href="#">Focusable element</a></pfe-tab-panel>
  <pfe-tab slot="tab">Database</pfe-tab>
  <pfe-tab-panel>Database</pfe-tab-panel>
</pfe-tabs>
```

