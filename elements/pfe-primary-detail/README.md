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

## Slots

For this component to work, there should be an equal number of `details-nav` and `details` slotted elements.

- `details-nav`: Should be added to each heading, it will build the nav that shows the related content.
- `details`: Should be added to the content, which should directly follow the heading it relates to.
- `details-nav--header`: In case content needs to be added at the top of the nav area. Will not be matched up with `details` content.
- `details-nav--footer`: In case contnet needs to be added at the bottom of the nav. Will not be matched up with `details` content.

## Attributes

- `consistent-height`: Makes sure the primary details element doesn't change height when a different `details` item is shown.

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

Fires when a new tab is selected.

```
detail: {
  tab: DOM Element,
  details: DOM Element
}
```

### pfe-primary-detail:hidden-tab

Fires when a selected tab is no longer the selected tab.

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

    `npm run test`

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
