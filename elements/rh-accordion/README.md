# WIP 🐣: RHElements Accordion Element

## Usage

```
<rh-accordion>
  <rh-accordion-header>
    <h2>Why do wizards need money if they could just create it?</h2>
  </rh-accordion-header>
  <rh-accordion-panel>
    <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
  </rh-accordion-panel>
  <rh-accordion-header>
    <h2>Why doesn't Harry have a portrait of his parents?</h2>
  </rh-accordion-header>
  <rh-accordion-panel>
    <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
  </rh-accordion-panel>
</rh-accordion>
```

## Slots

### Default slot in rh-accordion
Place the `rh-accordion-header` and `rh-accordion-panel` elements here.

### Default slot in rh-accordion-header
We expect the light DOM of the `rh-accordion-header` to be a heading level tag
(h1, h2, h3, h4, h5, h6)

### Default slot in rh-accordion-panel
Add the content for your accordion panel here.

## Attributes

**`color`**
Changes the color of `<rh-accordion-header>`

| Value | Description |
| ------| ----------- |
| `striped` | Alternates `light` and `lightest` theme colors on `<rh-accordion-header>` |
| `lightest` | `lightest` theme color |
| `light` (default) | `light` theme color |
| `base` | `base` theme color |
| `dark` | `dark` theme color |
| `darkest` | `darkest` theme color |
| `complement` | `complement `theme color |
| `accent` | `accent` theme color |

## Styling

| Theme Var Hook | Description | Default |
| -------------- | ----------- | ------- |
| `--rh-theme--color--surface--lighter` | Default `<rh-accordion-header>` color | $rh-color--surface--lighter |
| `--rh-theme--color--surface--lighter--text` | Default `<rh-accordion-header>` text color | $rh-color--surface--lighter--text |
| `--rh-theme--color--surface--lighter--link--focus` | Focus border color for default `<rh-accordion-header>` | $rh-color--surface--lighter--link--focus |
| `--rh-theme--color--surface--lightest` | Lightest `<rh-accordion-header>` color option | $rh-color--surface--lighter |
| `--rh-theme--color--surface--lightest--text` | Lightest `<rh-accordion-header>` text color option | $rh-color--surface--lightest--text |
| `--rh-theme--color--surface--lightest--link--focus` | Focus border color for lightest `<rh-accordion-header>` | $rh-color--surface--lightest--link--focus |
| `--rh-theme--color--surface--base` | Base `<rh-accordion-header>` color option | $rh-color--surface--base |
| `--rh-theme--color--surface--base--text` | Base `<rh-accordion-header>` text color option | $rh-color--surface--base--text |
| `--rh-theme--color--surface--base--link--focus` | Focus border color for base `<rh-accordion-header>` | $rh-color--surface--base--link--focus |
| `--rh-theme--color--surface--darker` | Dark `<rh-accordion-header>` color option | $rh-color--surface--darker |
| `--rh-theme--color--surface--darker--text` | Dark `<rh-accordion-header>` text color option | $rh-color--surface--darker--text |
| `--rh-theme--color--surface--darker--link--focus` | Focus border color for dark `<rh-accordion-header>` | $rh-color--surface--darker--link--focus |
| `--rh-theme--color--surface--darkest` | Darkest `<rh-accordion-header>` color option | $rh-color--surface--darkest |
| `--rh-theme--color--surface--darkest--text` | Darkest `<rh-accordion-header>` text color option | $rh-color--surface--darkest--text |
| `--rh-theme--color--surface--darkest--link--focus` | Focus border color for darkest `<rh-accordion-header>` | $rh-color--surface--darkest--link--focus |
| `--rh-theme--color--surface--complement` | Complement `<rh-accordion-header>` color option | $rh-color--surface--complement |
| `--rh-theme--color--surface--complement--text` | Complement `<rh-accordion-header>` text color option | $rh-color--surface--complement--text |
| `--rh-theme--color--surface--complement--link--focus` | Focus border color for complement `<rh-accordion-header>` | $rh-color--surface--complement--link--focus |
| `--rh-theme--color--surface--accent` | Accent `<rh-accordion-header>` color option | $rh-color--surface--accent |
| `--rh-theme--color--surface--accent--text` | Accent `<rh-accordion-header>` text color option | $rh-color--surface--accent--text |
| `--rh-theme--color--surface--accent--link--focus` | Focus border color for accent `<rh-accordion-header>` | $rh-color--surface--accent--link--focus |

## Events

### rh-accordion-change

Fires when an rh-accordion-header is activated. The detail object contains the
following

```
detail: {
  expanded: Boolean
}
```

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Accordion (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
