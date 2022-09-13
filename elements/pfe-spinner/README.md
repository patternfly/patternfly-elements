# PatternFly Elements Spinner
     
`pfe-spinner` is used to indicate to users that an action is in progress.

Read more about Spinner in the [PatternFly Elements Spinner documentation](https://patternflyelements.org/components/spinner)

##  Installation

Load `<pfe-spinner>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-spinner?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-spinner
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-spinner';
```

## Usage
```html
<pfe-spinner>My fallback loading message</pfe-spinner>
```

At the time of writing there is only one style variant, `indeterminate` that spins without informing the user of where they are in the waiting process, only that http activity has not been resolved. This may change in the future as more style variants become available.

