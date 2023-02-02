# PatternFly Elements Tabs
     
Read more about Tabs in the [PatternFly Elements Tabs documentation](https://patternflyelements.org/components/tabs)

##  Installation

Load `<pf-tabs>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-tabs/pf-tabs.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-tabs/pf-tabs.js';
```

### Note
For `<pf-tabs>` to work in Safari, you'll need to load the [element-internals-polyfill](https://www.npmjs.com/package/element-internals-polyfill). Safari is in the process of [adding element internals to WebKit](https://bugs.webkit.org/show_bug.cgi?id=197960) so this polyfill should be temporary.

## Usage

```html
<pf-tabs>
  <pf-tab id="users" slot="tab">Users</pf-tab>
  <pf-tab-panel>Users</pf-tab-panel>
  <pf-tab slot="tab">Containers</pf-tab>
  <pf-tab-panel>Containers <a href="#">Focusable element</a></pf-tab-panel>
  <pf-tab slot="tab">Database</pf-tab>
  <pf-tab-panel>Database</pf-tab-panel>
</pf-tabs>
```

