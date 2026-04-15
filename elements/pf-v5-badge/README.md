# PatternFly Elements Badge
         
The `<pf-v5-badge>` component provides a way to have small numerical descriptors for 
for for for UI elements. To provide context to your badge, it is highly 
encouraged that you also include an `aria-label` attribute in your markup.

Read more about Badge in the [PatternFly Elements Badge documentation](https://patternflyelements.org/components/badge)

##  Installation

Load `<pf-v5-badge>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-badge/pf-v5-badge.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-badge/pf-v5-badge.js';
```

## Usage

```html
<section>
  <pf-v5-badge aria-label="2 unread messages" number="2" threshold="10">2</pf-v5-badge>
</section>
```

Please refer to the [specification](https://www.w3.org/TR/wai-aria/#aria-label) for additional details.

With the `threshold` attribute:

```html
<section>
  <pf-v5-badge number="1" threshold="10">1</pf-v5-badge>
  <pf-v5-badge number="17" threshold="20">17</pf-v5-badge>
  <pf-v5-badge number="900" threshold="100">900</pf-v5-badge>
</section>
```

With two state options for the `state` attribute:

```html
<section>
  <pf-v5-badge state="read" number="10">10</pf-v5-badge>
  <pf-v5-badge state="unread" number="20">20</pf-v5-badge>
</section>
```

