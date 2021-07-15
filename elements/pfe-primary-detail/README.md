# PatternFly Element | Primary detail element

## Usage

A primary-detail layout is an interface that shows a list of items and the corresponding details of the selected item.

This component is an implementation of one of the "Primary detail simple list in card" from [Patternfly React](https://www.patternfly.org/v4/demos/primary-detail), more layouts may be implemented later.

```html
<pfe-primary-detail>
  <h2 slot="details-nav--header">
    <a href="#">Primary detail demo!</a>
  </h2>

  <h3 slot="details-nav">Section 1: Infrastructure and Management</h3>
  <div slot="details">
    <p>Content 1:</p>
    <ul>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Section 2: Cloud Computing</h3>
  <div slot="details">
    <ul>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
    </ul>
  </div>

  <h3 slot="details-nav">Storage</h3>
  <ul slot="details">
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    <li><a href="#">Pellentesque fermentum dolor</a></li>
  </ul>

  <h3 slot="details-nav">Runtimes</h3>
  <ul slot="details">
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <div slot="details-nav--footer" style="padding: 1em 0.75em 2em;">
    <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
  </div>
<pfe-primary-detail>
```

### Accessibility

The default markup should have semantic markup if the component can't load, once it loads the component the appropriate tab interactions and appropriate markup for assistive tech is handled for you.

Elements in the `details` slot should not have a role (before the component updates it) and should not be a `ul`, `ol`, `dl`, or other tags with specific semantic meaning. The slotted tag will get a `role`, which will interfere with any other responsibilities the element has for the accessibility tree/assistive tech.

#### Focus Indicator Styles
@todo this section is to be moved
The component requires visible focus indicator styles for focusable elements (ie.`links`, `buttons`, `[tabindex="0"]`) in order to meet [**WCAG 2.0/2.1 AA compliance**](https://www.w3.org/WAI/WCAG21/quickref/#focus-visible). Below is a good example of styles to use for the focus indicator, these styles match the focus indicator of `pfe-navigation`. The `padding` style is to increase the clickable area of links in order to help users have a better experience when trying to click the links, this also helps users with limited mobility.

```html
  pfe-primary-detail .is-focused:focus,
  pfe-primary-detail .is-focused:hover {
    outline: 1px dashed #000;
    outline-width: 2px;
  }

  pfe-primary-detail ul.is-focused:hover,
  pfe-primary-detail :not(pfe-cta).is-focused:hover {
      outline: 0;
  }

  pfe-primary-detail a.is-focused {
    padding: 8px;
  }
```

## Slots

For this component to work, there should be an equal number of `details-nav` and `details` slotted elements.

- `details-nav`: Should be added to each heading, it will build the nav that shows the related content.
- `details`: Should be added to the content, which should directly follow the heading it relates to.
- `details-nav--header`: In case content needs to be added at the top of the nav area. Will not be matched up with `details` content.
- `details-nav--footer`: In case contnet needs to be added at the bottom of the nav. Will not be matched up with `details` content.

## Attributes

### Author controlled attributes:
- `consistent-height`: Makes sure the primary details element doesn't change height when a different `details` item is shown.
- `breakpoint-width`: The min-width of the **component** (not window) before it gets a two column desktop layout.

### Component controlled attributes
- `active`: If a "details-nav" is selected so the "details" are visible, the "details-nav" id will show up as the value of the attributes. If nothing is open, the attribute will not exist.
- `breakpoint`: Indicates the layout state (which is managed by JS). Will be set to 'compact' or 'desktop'. JS will check the width of the component after resize to make sure it isn't smaller than the breakpoint-width.


## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-primary-details--Border` | `1px solid #d2d2d2` | N/A |
| `--pfe-primary-details--GridTemplateColumns` | `1fr 2fr` | N/A |
| `--pfe-primary-details__nav--Color` | `#151515!important` | nav |
| `--pfe-primary-details__nav--Color--active` | `#06c!important` | nav |
| `--pfe-primary-details__nav--Background--active` | `#f0f0f0!important` | nav |
| `--pfe-primary-details__details--Background` | `#fff` | details |


## Events

### pfe-primary-detail:shown-tab

Fires when a new tab is selected, will provide a reference to the tab and details that were opened.

```
detail: {
  tab: DOM Element,
  details: DOM Element
}
```

### pfe-primary-detail:hidden-tab

Fires when a selected tab is no longer the selected tab, will provide a reference to the tab and details that were closed.

```
detail: {
  tab: DOM Element,
  details: DOM Element
}
```


<!-- ## Dependencies
Describe any dependent elements or libraries here too. -->

## Dev

    `npm start`

## Test

Run tests from the project root with:
```
npm run test:watch --element=pfe-primary-detail
```

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Primary detail (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
