# PatternFly Elements Progress Indicator
     
`pfe-progress-indicator` is a "loader" that indicates to the user that part of the web page is loading, or waiting on other http events to be ready to use.

Read more about Progress Indicator in the [PatternFly Elements Progress Indicator documentation](https://patternflyelements.org/components/progress-indicator)

##  Installation

Load `<pfe-progress-indicator>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-progress-indicator?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-progress-indicator
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-progress-indicator';
```

## Usage
```html
<pfe-progress-indicator indeterminate>My fallback loading message</pfe-progress-indicator>
```

At the time of writing there is only one style variant, `indeterminate` that spins without informing the user of where they are in the waiting process, only that http activity has not been resolved. This may change in the future as more style variants become available.

