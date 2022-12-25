# PatternFly Elements Badge
         
The `<pfe-badge>` component provides a way to have small numerical descriptors for UI elements. To provide context to your badge, it is highly encouraged that you also include an `aria-label` attribute in your markup.

Read more about Badge in the [PatternFly Elements Badge documentation](https://patternflyelements.org/components/badge)

##  Installation

Load `<pfe-badge>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-badge?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-badge
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-badge';
```

## Usage

```html
<section>
  <pfe-badge aria-label="2 unread messages" number="2" threshold="10">2</pfe-badge>
</section>
```

Please refer to the [specification](https://www.w3.org/TR/wai-aria/#aria-label) for additional details.

With the `threshold` attribute:

```html
<section>
  <pfe-badge number="1" threshold="10">1</pfe-badge>
  <pfe-badge number="17" threshold="20">17</pfe-badge>
  <pfe-badge number="900" threshold="100">900</pfe-badge>
</section>
```

With two state options for the `state` attribute:

```html
<section>
  <pfe-badge state="read" number="10">10</pfe-badge>
  <pfe-badge state="unread" number="20">20</pfe-badge>
</section>
```

