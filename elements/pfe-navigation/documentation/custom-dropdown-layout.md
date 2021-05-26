# Custom Dropdown Layout

To enable specific layouts inside of dropdowns we've added a grid system to the navigation component. The class names and setup is very similar to Bootstrap, but has some slight differences.

## Enabling custom layout

To use the 12 column layout add the `pfe-navigation__12-column-grid-wrapper` class to the dropdown div, e.g.:

```html
<div class="pfe-navigation__dropdown pfe-navigation__12-column-grid-wrapper">
```

Now every column will start by taking up 1 column (of 12), which is going to look squished. This is because we're using CSS Grid†, so every column will need a class to set a reasonable column span.

> † Older browsers and IE will use a flexbox implementation of the grid.

## Column Span Classes

These classes mimic Bootstrap very closely, they consist of:

```
col-<breakpoint-name>-<column-span>
```

The main breakpoint names are:


| Name | Min-Width |
|------|-----------|
| xs   |       0px |
| sm   |     576px |
| md   |     768px |
| lg   |     992px |
| xl   |    1200px |
| 2xl  |    1368px |

> See pfe-navigation's `src/sass-includes/_variables-mixin.scss`

By default the menu turns into a burger menu at `xl` breakpoint and the secondary-links collapse into the burger menu at `md`. This may happen at wider widths if the content doesn't fit, thanks to the JS breakpoints.

Some column class examples are:

* `col-xs-12` - Be full width by default
* `col-md-4` - Be 33% width at 768px and above
* `col-xl-3` - Be 25% width at 1200px and above

It's wise to start by putting `col-xs-12` on each column so they're full width at mobile sizes, then adding additional classes for larger breakpoints. It's common to have 2-4 of these column classes on an element when the markup looks and behaves as desired.

## Column Start & End Classes

CSS Grid start and end column can also be set. This can be useful if you want extra white space in the layout between columns, or want to make sure a column ends up in a certain part of the grid.

This is directly setting the `grid-column-start` and `grid-column-end` properties, [Grid by Example](https://gridbyexample.com/examples/), [CSS Grid Garden](https://cssgridgarden.com/), and [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) are good resources to help explain CSS grid and these properties if you're not familar.

The structure of these classes are:

```
col-[start|end]-[breakpoint]-[gridLine]
```

Some class name examples are:
* `col-start-lg-2` - At 992px and larger, this column should start at the second grid line
* `col-start-xl-3` - At 1200px and larger, this column should start at the third grid line
* `col-end-lg-13` - At 992px and larger, this column should end at the last grid line (there are 13 grid lines in a 12 column grid)
* `col-end-xl-10` - At 1200px and larger, this column wil end at the tenth grid line

> To support browsers that do not have CSS grid, a column-span class should be added, even if a column start and end class are provided (which would normally mean we don't need a column span set).

## CSS Column Classes

CSS Columns are great to create dyamic multi-column lists, especially if a menu section has 8+ links in it. The best place for this class will likely be the `<ul>` wrapper of the links.

These classes are also 'mobile first' and can respond to breakpoints, just like the other column classes.

The structure of these classes are:
```
css-cols-[breakpoint]-[number of columns]
```
