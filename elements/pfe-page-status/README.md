# PatternFly Elements Page Status
     
The Page Status element creates a flag/banner on the right side of the page denoting the status of the page or Doc the author is viewing.

Read more about Page Status in the [PatternFly Elements Page Status documentation](https://patternflyelements.org/components/page-status)

##  Installation

Load `<pfe-page-status>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-page-status?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-page-status
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-page-status';
```

## Usage

```html
<pfe-page-status status="critical">
  Previewing
</pfe-page-status>
```

```html
<pfe-page-status status="moderate">
  Unpublished
</pfe-page-status>
```

