# RHElements Layouts

## Usage

RHElements Layouts, like Bootstrap, is based on a 12 column grid with similar breakpoints available. We've just made the usage simpler.

### Including rh-layouts

To get started, included a link to `rh-layouts.css`

```
<link rel="stylesheet" type="text/css" href="/path/to/rh-layouts.min.css">
```

### Grid

Since RHElements Layouts is not a Web Component, its classes can be applied to any element, giving you lots of control over where and how you utilize its layouts.

If you want a simple 3 column grid with gutters, use the following:

```html
<div class="rh-l-grid rh-m-gutters rh-m-all-4-col">
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
</div>
```

#### Grid Layout Classes &amp; Modifiers

**Parent Grid Element classes:**

| Class | Description |
| -------------- | ----------- |
| `rh-l-grid` | Base grid class *required* |
| `rh-m-gutters` | Adds gutters based on `--rh-theme--container-spacer` |
| `rh-m-all-*[1-12]*-col` | Sets width of children in grid to *[1-12]* columns |
| `rh-m-all-*[1-12]*-col-on-[xs-xl]` | Sets width of children to *[1-12]* columns on specified breakpoint *[xs-xl]* |

**Child Grid Element Classes:**

| Class | Description |
| -------------- | ----------- |
| `rh-l-grid__item` | Base grid item class *optional* |
| `rh-m-*[1-12]*-col` | Sets width of this child to *[1-12]* columns |
| `rh-m-*[1-12]*-col-on-[xs-xl]` | Sets width of this child to *[1-12]* columns on specified breakpoint *[xs-xl]* |
| `rh-m-startat-*[1-12]*-col` | Start/indent this child to column #*[1-12]* |
| `rh-m-startat-*[1-12]*-col-on-[xs-xl]` | Start/indent this child to column #*[1-12]* on specified breakpoint *[xs-xl]* |

Example:

```html
<div class="rh-l-grid rh-m-gutters rh-m-all-4-col">
  <div class="rh-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
  <div class="rh-m-startat-9-col">4 cols, indented</div>
  <div class="rh-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
</div>
```

#### Breakpoints

```css
// Small devices
@media (min-width: 576px) { ... }

// Medium devices
@media (min-width: 768px) { ... }

// Large devices
@media (min-width: 992px) { ... }

// Extra large devices
@media (min-width: 1200px) { ... }
```

### Bullseye

Use a bullseye layout when there is a single child element, and that child is centered both vertically and horizontally in the parent.

| Class | Description |
| -------------- | ----------- |
| `rh-l-bullseye` | Centers child element vertically &amp; horizontally |

Exampe:

```html
<div class="rh-l-bullseye">
  <div>Perfectly centered child</div>
</div>
```

### Text Alignment

Text alignment helper classes can also be applied to any block-level element.

| Class | Description |
| -------------- | ----------- |
| `rh-l--text-align--left` | Align text to left |
| `rh-l--text-align--center` | Align text to center |
| `rh-l--text-align--right` | Align text to right |


## Developers

### Test

    npm run test

### Build

    npm run build

### Demo

From the RHElements root directory, run:

    npm start

### Code style

Card (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
