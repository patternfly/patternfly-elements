# Label Group
A label group is a collection of labels that can be grouped by category and
used to represent one or more values assigned to a single attribute. When
the number of labels exceeds the configured limit, additional labels are
hidden under an overflow indicator.

Read more about Label Group in the [PatternFly Elements Label Group documentation](https://patternflyelements.org/components/label-group)

## Installation

Load `<pf-label-group>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-label-group/pf-label-group.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-label-group/pf-label-group.js';
```

## Usage

```html
<pf-label-group>
  <pf-label color="blue">Security</pf-label>
  <pf-label color="green">Performance</pf-label>
  <pf-label color="red">Networking</pf-label>
</pf-label-group>
```

With a category:
```html
<pf-label-group>
  <span slot="category">Filters</span>
  <pf-label removable>Security</pf-label>
  <pf-label removable>Performance</pf-label>
</pf-label-group>
```
