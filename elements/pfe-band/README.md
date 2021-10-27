# PatternFly Elements Band
         
`<pfe-band>` container element provides a set of slots in which to render banded content.

Read more about Band in the [PatternFly Elements Band documentation](https://patternflyelements.org/components/band)

##  Installation

Load `<pfe-band>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-band?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-band
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-band';
```

## Usage

```html
<pfe-band>
  <h2 slot="header">Lighter band; no footer</h2>

  <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata dolor sit amet.</p>

  <pfe-card slot="aside">
    <h3 slot="header">Aside: left body bottom</h3>
    <p>Ut wisi enim ad minim veniam.</p>
  </pfe-card>

  <pfe-cta slot="footer" priority="tertiary">
    <a href="#">Learn more</a>
  </pfe-cta>
</pfe-band>
```

