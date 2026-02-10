# Label Group
A label group is a collection of labels that can be grouped by category and used to represent one or more values assigned to a single attribute.  
When the number of labels exceeds `numLabels`, additional labels are hidden under an overflow label.

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

---

## Usage

```html
<pf-label-group num-labels="2">
  <span slot="category">Fruit Types</span>
  <pf-label>Apple</pf-label>
  <pf-label>Banana</pf-label>
  <pf-label>Orange</pf-label>
</pf-label-group>
```

Displays a group of labels, showing only the first two and an overflow label like “1 more” that expands on click.

## Adding Labels

`<pf-label-group>` supports adding new labels dynamically through the `addLabelMode` attribute:

- `none` (default): No label addition.
- `autoNoEdit`: Adds labels automatically without user editing.
- `fromList`: Allows adding labels from a predefined list.
- `customForm`: Lets users add custom labels via a form.

Example:

```html
<pf-label-group add-label-mode="fromList">
  <span slot="category">Filters</span>
  <pf-label removable>Security</pf-label>
  <pf-label removable>Performance</pf-label>
</pf-label-group>

Use this feature when you want users to dynamically add new tags or filters to the group.

---


