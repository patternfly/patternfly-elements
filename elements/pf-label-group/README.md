# Label Group
# <pf-label-group>

A **label group** is a collection of labels that can be grouped by category and used to represent one or more values assigned to a single attribute.  
When the number of labels exceeds `numLabels`, additional labels are hidden under an overflow label.

---
##  Usage

```html
<pf-label-group num-labels="2">
  <span slot="category">Fruit Types</span>
  <pf-label>Apple</pf-label>
  <pf-label>Banana</pf-label>
  <pf-label>Orange</pf-label>
</pf-label-group>
```

Displays a group of labels, showing only the first two and an overflow label like “1 more” that expands on click.

---


