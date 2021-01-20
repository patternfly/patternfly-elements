# PatternFly Elements Styles

## Usage

PatternFly Elements Styles is available to provide helper styles that can be directly included on your page.  This current includes css for layouts, context, and our flavor of "normalize".

PatternFly Elements Layouts, like Bootstrap, is based on a 12 column grid with similar breakpoints available. We've just made the usage simpler.

### Including pfe-styles

To get started, include a link to the css file of your choice: `pfe-base.css`, `pfe-context.css`, or `pfe-layouts.css`.

```
<link rel="stylesheet" type="text/css" href="/path/to/pfe-layouts.min.css">
```

Since PatternFly Elements Styles are not web components, their classes can be applied to any element, giving you lots of control over where and how you utilize them.

### Base

This is the PatternFly Elements flavor of normalize and provides styles that will cancel out a lot of the more meddlesome browser defaults.

### Context

This set is available to help in updating the broadcast variables for pages where your might be setting the background color yourself with custom styles.  If you manually set a background color to #000, you can add the `.on-dark` class to your element and it will load the broadcast variables for a dark context to make your life a little easier.

```css
.dark-background {
  background-color: #000;
}
```

```html
<div class="dark-background on-dark">...</div>
```

### Layouts

#### Grid

The numbers refer to the width of the children, and the unit is *how many columns* that item occupies. For example, if you are looking for a simple layout where each child is 50% wide, and they each sit side by side, you should use `.pfe-m-all-6-col-on-xl` which tells each child to occupy 6 (out of 12) columns on an xl screen.

Use this equation to determine the number you need, per breakpoint:



| 12 | (divided by) 3 | = 4 |
|---|---|---|
| How many columns total in the grid |  How many children are there? |   Number to use in the class, on the parent `.pfe-m-all-4-col-on-xl` | 



```html
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
  <div>4 cols wide</div>
</div>
```

##### Grid Layout Classes &amp; Modifiers

**Parent Grid Element classes:**

| Class | Description |
| -------------- | ----------- |
| `pfe-l-grid` | Base grid class *required* |
| `pfe-l-grid-fill-height` | Allows children elements to fill their container's height completely; equivalent of flex-grow |
| `pfe-m-gutters` | Adds gutters based on `--pfe-theme--container-spacer` |
| `pfe-m-all-*[1-12]*-col` | Sets width of children in grid to *[1-12]* columns |
| `pfe-m-all-*[1-12]*-col-on-[xs-xl]` | Sets width of children to *[1-12]* columns on specified breakpoint *[xs-xl]* |

**Child Grid Element Classes:**

| Class | Description |
| -------------- | ----------- |
| `pfe-l-grid__item` | Base grid item class *optional* |
| `pfe-m-*[1-12]*-col` | Sets width of this child to *[1-12]* columns |
| `pfe-m-*[1-12]*-col-on-[xs-xl]` | Sets width of this child to *[1-12]* columns on specified breakpoint *[xs-xl]* |
| `pfe-m-startat-*[1-12]*-col` | Start/indent this child to column #*[1-12]* |
| `pfe-m-startat-*[1-12]*-col-on-[xs-xl]` | Start/indent this child to column #*[1-12]* on specified breakpoint *[xs-xl]* |

Example:

```html
<div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
  <div class="pfe-m-startat-9-col">4 cols, indented</div>
  <div class="pfe-m-8-col">8 cols wide</div>
  <div>4 cols wide</div>
</div>
```

##### Breakpoints

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

#### Bullseye

Use a bullseye layout when there is a single child element, and that child is centered both vertically and horizontally in the parent.

| Class | Description |
| -------------- | ----------- |
| `pfe-l-bullseye` | Centers child element vertically &amp; horizontally |

Exampe:

```html
<div class="pfe-l-bullseye">
  <div>Perfectly centered child</div>
</div>
```

#### Text Alignment

Text alignment helper classes can also be applied to any block-level element.

| Class | Description |
| -------------- | ----------- |
| `pfe-l--text-align--left` | Align text to left |
| `pfe-l--text-align--center` | Align text to center |
| `pfe-l--text-align--right` | Align text to right |

## Typography

### Usage

- `pfe-base.css` This stylesheet provides normalize styles, and styles for standard typographical HTML tags such as `<ul>`, `<h2>`, etc. However they are opt-in, in that you must use the wrapper class of `.pfe-c-content` around them. We recommend loading this as a standard stylesheet in your project
- `pfe-typography-classes.css` is optional, but it includes modifier clases you may use with any markup to invoke those particular heading styles. Please see https://ux.redhat.com/foundations/typography/ for details on styles.
- `pfe-vars-as-px.css` is a demo file to show how you may reset the core t-shirt sizing variables using pixels, if you are unable to use REM units in your project.  
- Please see the [mobile typography demo page](http://patternflyelements.com/elements/pfe-styles/demo/typography-mobile.html) for an example of how to scale type for smaller devices.
### Notes
 - The styles relating to typography lean on core PatternFly variables, so the prefix is `--pf` instead of `--pfe` by design, so that 1 set of common variables can influence both PatternFly and PatternFly Elements components. The classes, however, continue to use the `.pfe` prefix to keep them distinctive from PF core to avoid conflicts.
- New font-size variables use t-shirt sizing as a naming convention. Greek named variables have been deprecated. Please see the typography chart to understand the new names & sizes as compared with the old names. 
-  There are sass variables storing pixel values in PFE because we want the fallbacks to either be in REM, but we want to be able to read & understand it in pixels. We are not using PF core vars because they do the conversion within the variable itself. By splitting it out, we can print the pfe-vars-as-px.css file for folks who can't use REMs.


## Developers

### Test

    npm run test

### Build

    npm run build

### Demo

From the PatternFly Elements root directory, run:

    npm start

### Code style

Card (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
