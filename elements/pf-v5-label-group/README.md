# Label Group
A label group is a collection of labels that can be grouped by category and
used to represent one or more values assigned to a single attribute. When
the number of labels exceeds the configured limit, additional labels are
hidden under an overflow indicator.

Read more about Label Group in the [PatternFly Elements Label Group documentation](https://patternflyelements.org/components/label-group)

## Installation

Load `<pf-v5-label-group>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-label-group/pf-v5-label-group.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-label-group/pf-v5-label-group.js';
```

## Usage

```html
<pf-v5-label-group>
  <pf-v5-label color="blue">Security</pf-v5-label>
  <pf-v5-label color="green">Performance</pf-v5-label>
  <pf-v5-label color="red">Networking</pf-v5-label>
</pf-v5-label-group>
```

With a category:
```html
<pf-v5-label-group>
  <span slot="category">Filters</span>
  <pf-v5-label removable>Security</pf-v5-label>
  <pf-v5-label removable>Performance</pf-v5-label>
</pf-v5-label-group>
```
