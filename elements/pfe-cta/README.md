# PatternFly Elements CTA
     
`pfe-cta` is a call-to-action (CTA) element, that stands out from regular hypertext links, and is used for linking users to webpages.

Read more about CTA in the [PatternFly Elements CTA documentation](https://patternflyelements.org/components/cta)

_Note: `pfe-cta` is not necessarily a button, though it may look like one visually._

##  Installation

Load `<pfe-cta>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-cta?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-cta
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-cta';
```

## Usage

```html
<pfe-cta>
  <a href="https://github.com/">GitHub</a>
</pfe-cta>

<pfe-cta priority="primary">
  <a href="https://pfelements.github.io/">Learn more about PFElements</a>
</pfe-cta>

<pfe-cta priority="secondary">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>

<pfe-cta priority="secondary" variant="wind">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>

<pfe-cta priority="primary" color="lightest">
  <a href="https://pfelements.github.io/">Learn more about PFElements</a>
</pfe-cta>

<pfe-cta priority="secondary" color="complement">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>
```

