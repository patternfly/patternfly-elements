# WIP 🐣: RHElements CTA Element

`rh-cta` is a call-to-action (CTA) element, that stands out from regular hypertext links, and is used for linking users to webpages.

_Note: `rh-cta` is not a button, though it may look like one visually._

## Usage
```html
<rh-cta>
  <a href="https://github.com/">GitHub</a>
</rh-cta>

<rh-cta priority="primary">
  <a href="https://rhelements.github.io/">Learn more about RHElements</a>
</rh-cta>

<rh-cta priority="secondary">
  <a href="https://redhat.com/">Red Hat</a>
</rh-cta>
```

## Slots

### Default slot

We expect an anchor tag, `<a>` with an `href`, to be the first child inside `rh-cta` element.

## Styling

| Theme Var Hook | Description | Default |
| -------------- | ----------- | ------- |
| --rh-theme--color--ui-link | Link color for default CTA | $rh-color--ui-link |
| --rh-theme--color--ui-link--hover | Hover color for default CTA | $rh-color--ui-link--hover |
| --rh-theme--color--ui-link--focus | Focus color for default CTA | $rh-color--ui-link--focus |
| --rh-theme--color--ui-accent | Color for Primary CTA | $rh-color--ui-accent |
| --rh-theme--color--ui-accent--hover | Hover color for Primary CTA | $rh-color--ui-accent--hover |
| --rh-theme--color--ui-accent--text | Text color for Primary CTA | $rh-color--ui-accent--text |
| --rh-theme--color--ui-accent--text--hover | Hover text color for Primary CTA | $rh-color--ui-accent--text--hover |
| --rh-theme--color--ui-base | Border & text color for Secondary CTA | $rh-color--ui-base |
| --rh-theme--color--ui-base--hover | Hover color for Secondary CTA | $rh-color--ui-base--hover |
| --rh-theme--color--ui-base--text | Background color for Secondary CTA | $rh-color--ui-base--text |
| --rh-theme--color--ui-base--text--hover | Hover text color for Secondary CTA | $rh-color--ui-base--text--hover |
| --rh-theme--color--text--on-dark | Link color for default CTA with `on="dark"` | $rh-color--text--on-dark |
| --rh-theme--color--ui-link--on-dark--hover | Hover color for default CTA with `on="dark"` | $rh-color--ui-link--on-dark--hover |

### Testing Theme Var Hooks

If you'd like to checkout how theming is possible using our CSS Var hooks, try adding the following to the `<head>` of `./demo/index.html` before running `npm run test`. Feel free to customize the colors too!

```html
<style>
:root {
  --rh-theme--color--ui-accent:               green;
  --rh-theme--color--ui-accent--hover:        darkgreen;
  --rh-theme--color--ui-accent--text:         white;
  --rh-theme--color--ui-accent--text--hover:  white;
}
</style>
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Cta (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
