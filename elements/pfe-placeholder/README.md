# PatternFly Element | Placeholder element
Generate a placeholder for use in coding demos and mock-ups.

## Usage
The component will render a gray placeholder for an image.  It will by default show the width and height inside the box:

```html
<pfe-placeholder width="200" height="300"></pfe-placeholder>
```

<pfe-placeholder width="200" height="300"></pfe-placeholder>

Alternatively, you can pass in any text you would like:

```html
<pfe-placeholder width="200" height="300">placeholder</pfe-placeholder>
```

<pfe-placeholder width="200" height="300">placeholder</pfe-placeholder>


### Accessibility
// @TODO What aria labels are appropriate for SVGs

## Slots

- `default`: Use this when you want to render custom text inside the image.

## Attributes

- `width`: Set the width limitation of the placeholder.
- `height`: Set the height limitation of the placeholder.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-placeholder--BackgroundColor` | var(--pfe-theme--color--surface--lighter, #f0f0f0) | N/A |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.


## Dependencies
Describe any dependent elements or libraries here too.

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

Placeholder (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
