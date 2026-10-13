---
"@patternfly/elements": major
---

`<pf-v6-icon>`: replaces `<pf-v5-icon>` with PatternFly v6 design specs.

```html
<pf-v6-icon icon="check-circle" size="xl" status="success"></pf-v6-icon>
```

**Breaking Changes from v5**

- Renamed tag from `<pf-v5-icon>` to `<pf-v6-icon>`
- CSS custom properties renamed from `--pf-v5-icon--size` to `--pf-v6-c-icon--*`,
  matching the React component's custom properties. To size the icon, set
  `size` or `--pf-v6-c-icon__content--FontSize`; to color it, set `status`,
  `--pf-v6-c-icon__content--Color`, or set that property to `initial` and use
  the CSS `color` property
- The default size changed: v5 added `size="sm"` (10px) to every instance;
  v6 sizes to the body-default text size (0.875rem) with no attribute. Add
  `size="sm"` to keep the v5 size

**New features**

- v6 sizes: `2xl`, `3xl`, body sizes (`body-sm`, `body-default`, `body-lg`), and
  heading sizes (`heading-sm` through `heading-3xl`)
- `icon-size` attribute to size the icon independently of its container
- `status` attribute for `danger`, `warning`, `success`, `info`, and `custom`
  status colors
- `inline` attribute to inherit the surrounding text's size and color
- `in-progress` attribute and `progress` slot, which swaps the icon for a
  spinner (or a slotted element) without shifting surrounding content
- `mirror-rtl` attribute to mirror the icon in right-to-left languages
- `accessible-label` attribute, which exposes the icon as a labelled image;
  without it the icon is decorative and hidden from screen readers

**Note**

`<pf-v5-icon>` remains available while the remaining v5 elements port to v6.
