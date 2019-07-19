# PFElements Call-to-action Element

`pfe-cta` is a call-to-action (CTA) element, that stands out from regular hypertext links, and is used for linking users to webpages.

_Note: `pfe-cta` is not a button, though it may look like one visually._

## Usage
```html
<pfe-cta>
  <a href="https://github.com/">GitHub</a>
</pfe-cta>

<pfe-cta pfe-priority="primary">
  <a href="https://pfelements.github.io/">Learn more about PFElements</a>
</pfe-cta>

<pfe-cta pfe-priority="secondary">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>

<pfe-cta pfe-priority="primary" pfe-color="lightest">
  <a href="https://pfelements.github.io/">Learn more about PFElements</a>
</pfe-cta>

<pfe-cta pfe-priority="secondary" pfe-color="complement">
  <a href="https://redhat.com/">Red Hat</a>
</pfe-cta>
```

## Slots

### Default slot

We expect an anchor tag, `<a>` with an `href`, to be the first child inside `pfe-cta` element.

## Styling approach

```
    // 1. set up local vars equal to theme vars & fallbacks
    :host {
      --pfe-cta--Color: var(--pfe-theme--ui-link, #06c);
    }

    // 2. Use color property once, map to local var value
    :host(:not([priority]) {
      ::slotted(a) {
         //color: blue; CSS compiler will print this for IE11
         color: var(--pfe-cta--Color, blue) !important;
      }
    }

    // 3. Use broadcasted variables as needed, with theme fallback after other declarations
    :host {
      --pfe-cta--Color: var(--pfe-broadcasted--ui-link, var(--pfe-theme--ui-link, #06c));
    }

    // 4. Override broadcasted last
    [color="accent"] {
      --pfe-cta--Color: var(--pfe-theme--ui-accent);
    }
```


### Testing Theme Var Hooks

If you'd like to checkout how theming is possible using our CSS Var hooks, try adding the following to the `<head>` of `./demo/index.html` before running `npm run test`. Feel free to customize the colors too!

```html
<style>
:root {
  --pfe-theme--color--ui-accent:         green;
  --pfe-theme--color--ui-accent--hover:  darkgreen;
  --pfe-theme--color--ui-accent--text:   white;
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
