# WIP 🐣: PFElements CTA Element

`pfe-cta` is a call-to-action (CTA) element, that stands out from regular hypertext links, and is used for linking users to webpages.

_Note: `pfe-cta` is not a button, though it may look like one visually._

## Usage
```html
<pfe-cta>
  <a href="https://github.com/">GitHub</a>
</pfe-cta>

<pfe-cta priority="primary">
  <a href="https://pfelements.github.io/">Learn more about PFElements</a>
</pfe-cta>

<pfe-cta priority="secondary">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>
```

## Slots

### Default slot

We expect an anchor tag, `<a>` with an `href`, to be the first child inside `pfe-cta` element.

## Styling

| Theme Var Hook | Description | Default |
| -------------- | ----------- | ------- |
| `--pfe-theme--color--ui-link` | Link color for default CTA | $pfe-color--ui-link |
| `--pfe-theme--color--ui-link--hover` | Hover color for default CTA | $pfe-color--ui-link--hover |
| `--pfe-theme--color--ui-link--focus` | Focus color for default CTA | $pfe-color--ui-link--focus |
| `--pfe-theme--color--ui-accent` | Color for Primary CTA | $pfe-color--ui-accent |
| `--pfe-theme--color--ui-accent--hover` | Hover color for Primary CTA | $pfe-color--ui-accent--hover |
| `--pfe-theme--color--ui-accent--text` | Text color for Primary CTA | $pfe-color--ui-accent--text |
| `--pfe-theme--color--ui-accent--text--hover` | Hover text color for Primary CTA | $pfe-color--ui-accent--text--hover |
| `--pfe-theme--color--ui-base` | Border & text color for Secondary CTA | $pfe-color--ui-base |
| `--pfe-theme--color--ui-base--hover` | Hover color for Secondary CTA | $pfe-color--ui-base--hover |
| `--pfe-theme--color--ui-base--text` | Background color for Secondary CTA | $pfe-color--ui-base--text |
| `--pfe-theme--color--ui-base--text--hover` | Hover text color for Secondary CTA | $pfe-color--ui-base--text--hover |
| `--pfe-theme--color--text--on-dark` | Link color for default CTA with `on="dark"` | $pfe-color--text--on-dark |
| `--pfe-theme--color--ui-link--on-dark--hover` | Hover color for default CTA with `on="dark"` | $pfe-color--ui-link--on-dark--hover |

### Testing Theme Var Hooks

If you'd like to checkout how theming is possible using our CSS Var hooks, try adding the following to the `<head>` of `./demo/index.html` before running `npm run test`. Feel free to customize the colors too!

```html
<style>
:root {
  --pfe-theme--color--ui-accent:               green;
  --pfe-theme--color--ui-accent--hover:        darkgreen;
  --pfe-theme--color--ui-accent--text:         white;
  --pfe-theme--color--ui-accent--text--hover:  white;
}
</style>
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Cta (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
