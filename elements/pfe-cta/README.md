# PFElements Call-to-action Element

`pfe-cta` is a call-to-action (CTA) element, that stands out from regular hypertext links, and is used for linking users to webpages.

_Note: `pfe-cta` is not necessarily a button, though it may look like one visually._

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

<pfe-cta pfe-priority="secondary" pfe-variant="wind">
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

We expect an anchor tag, `<a>` with an `href`, to be the first child inside `pfe-cta` element. Less preferred but allowed for specific use-cases include: `<button>` (note however that the `button` tag is not supported for the default CTA styles).

## Styling approach

```
    // 1. set up local vars equal to theme vars & fallbacks
    :host {
      --pfe-cta--Color: var(--pfe-theme--link, #06c);
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
      --pfe-cta--Color: var(--pfe-broadcasted--link, var(--pfe-theme--link, #06c));
    }

    // 4. Override broadcasted last
    [color="accent"] {
      --pfe-cta--Color: var(--pfe-theme--ui-accent);
    }
```

## Attributes

**`pfe-theme`**
Changes the context of the call-to-action to one of 3 possible themes:

- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--theme` variable.

**`pfe-priority`**
Indicates the importance of this call-to-action in the context of the page. Will also influence how the call-to-action is styled.

#### Variants

**`pfe-variant`**
Note: `pfe-priority="secondary"` has a `wind` variant (`pfe-variant="wind"`) that can be applied to change the style of the secondary call-to-action.

```html
<pfe-cta pfe-priority="secondary" pfe-variant="wind">
  <a href="#">Wind variant</a>
</pfe-cta>
```

### Variable hooks

Available hooks for styling calls-to-action include:

| Variable name                          | Default value                                                                                          | Region        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| `--pfe-cta--Padding`                   | .6rem 0                                                                                                |
| `--pfe-cta--BorderRadius`              | 0                                                                                                      |
| `--pfe-cta--BackgroundColor`           | transparent                                                                                            |
| `--pfe-cta--BackgroundColor--hover`    | transparent                                                                                            |
| `--pfe-cta--BackgroundColor--focus`    | transparent                                                                                            |
| `--pfe-cta--BorderColor`               | transparent                                                                                            |
| `--pfe-cta--BorderColor--hover`        | transparent                                                                                            |
| `--pfe-cta--BorderColor--focus`        | transparent                                                                                            |
| `--pfe-cta--Color`                     | var(--pfe-theme--color--link, #06c)                                                                    |
| `--pfe-cta--Color--hover`              | var(--pfe-theme--color--link--hover, #003366)                                                          |
| `--pfe-cta--Color--focus`              | var(--pfe-theme--color--link--focus, #003366)                                                          |
| `--pfe-cta--TextDecoration`            | none                                                                                                   |
| `--pfe-cta--TextDecoration--hover`     | none                                                                                                   |
| `--pfe-cta--TextDecoration--focus`     | none                                                                                                   |
| `--pfe-cta--LineHeight`                | var(--pfe-theme--line-height, 1.5);                                                                    |
| `--pfe-cta--FontFamily`                | var(--pfe-theme--font-family--heading, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif); |
| `--pfe-cta--FontWeight`                | var(--pfe-theme--font-weight--bold, 700);                                                              |
| `--pfe-cta__inner--BorderColor`        | transparent                                                                                            | inner border  |
| `--pfe-cta__inner--BorderColor--focus` | transparent                                                                                            | inner border  |
| `--pfe-cta__arrow--Display`            | inline                                                                                                 | arrow element |
| `--pfe-cta__arrow--Padding`            | 0 .125rem 0 .375rem                                                                                    | arrow element |
| `--pfe-cta__arrow--MarginLeft`         | calc(var(--pfe-theme--content-spacer, 24px) \* 0.25)                                                   | arrow element |

If you'd like to checkout how theming is possible using our CSS Var hooks, try adding the following to the `<head>` of `./demo/index.html` before running `npm run test`. Feel free to customize the colors too!

```html
<style>
  :root {
    --pfe-theme--color--ui-accent: green;
    --pfe-theme--color--ui-accent--hover: darkgreen;
    --pfe-theme--color--ui-accent--text: white;
  }
</style>
```

## Events

### pfe-cta:select

This event is fired when a link is clicked and serves as a way to capture click events if necessary.

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
