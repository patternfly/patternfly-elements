# PatternFly Elements Spinner

`<pf-v6-spinner>` is used to indicate to users that an action is in progress.

Read more about Spinner in the [PatternFly Elements Spinner documentation](https://patternflyelements.org/components/spinner)

## Installation

Load `<pf-v6-spinner>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v6-spinner/pf-v6-spinner.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v6-spinner/pf-v6-spinner.js';
```

## Usage
```html
<pf-v6-spinner>Loading...</pf-v6-spinner>
```

### Size variations

```html
<pf-v6-spinner size="sm">Loading...</pf-v6-spinner>
<pf-v6-spinner size="md">Loading...</pf-v6-spinner>
<pf-v6-spinner size="lg">Loading...</pf-v6-spinner>
<pf-v6-spinner size="xl">Loading...</pf-v6-spinner>
```

### Custom size

```html
<pf-v6-spinner style="--pf-v6-c-spinner--diameter: 80px">Loading...</pf-v6-spinner>
```

## Discrepancies from React

| React Prop | Web Component | Rationale |
|------------|---------------|-----------|
| `diameter` | `--pf-v6-c-spinner--diameter` CSS custom property | React's `diameter` prop abstracts setting this CSS custom property. In HTML, authors can set the custom property directly via `style`, so a dedicated attribute is not needed. |
