# PFElements Accordion Element

## Usage

```
<pfe-accordion>
  <pfe-accordion-header>
    <h2>Why do wizards need money if they could just create it?</h2>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h2>Why doesn't Harry have a portrait of his parents?</h2>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
  </pfe-accordion-panel>
</pfe-accordion>
```

## Slots

### Default slot in pfe-accordion

Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.

### Default slot in pfe-accordion-header

We expect the light DOM of the `pfe-accordion-header` to be a heading level tag
(h1, h2, h3, h4, h5, h6)

### Default slot in pfe-accordion-panel

Add the content for your accordion panel here.

## Attributes

**`color`**
Changes the color of `<pfe-accordion-header>`

| Value             | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `striped`         | Alternates `light` and `lightest` theme colors on `<pfe-accordion-header>` |
| `lightest`        | `lightest` theme color                                                    |
| `light` (default) | `light` theme color                                                       |
| `base`            | `base` theme color                                                        |
| `dark`            | `dark` theme color                                                        |
| `darkest`         | `darkest` theme color                                                     |
| `complement`      | `complement`theme color                                                   |
| `accent`          | `accent` theme color                                                      |

## Styling

| Theme Var Hook                                        | Description                                               | Default                                     |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| `--pfe-theme--color--surface--lighter`                 | Default `<pfe-accordion-header>` color                     | $pfe-color--surface--lighter                 |
| `--pfe-theme--color--surface--lighter--text`           | Default `<pfe-accordion-header>` text color                | $pfe-color--surface--lighter--text           |
| `--pfe-theme--color--surface--lighter--link--focus`    | Focus border color for default `<pfe-accordion-header>`    | $pfe-color--surface--lighter--link--focus    |
| `--pfe-theme--color--surface--lightest`                | Lightest `<pfe-accordion-header>` color option             | $pfe-color--surface--lighter                 |
| `--pfe-theme--color--surface--lightest--text`          | Lightest `<pfe-accordion-header>` text color option        | $pfe-color--surface--lightest--text          |
| `--pfe-theme--color--surface--lightest--link--focus`   | Focus border color for lightest `<pfe-accordion-header>`   | $pfe-color--surface--lightest--link--focus   |
| `--pfe-theme--color--surface--base`                    | Base `<pfe-accordion-header>` color option                 | $pfe-color--surface--base                    |
| `--pfe-theme--color--surface--base--text`              | Base `<pfe-accordion-header>` text color option            | $pfe-color--surface--base--text              |
| `--pfe-theme--color--surface--base--link--focus`       | Focus border color for base `<pfe-accordion-header>`       | $pfe-color--surface--base--link--focus       |
| `--pfe-theme--color--surface--darker`                  | Dark `<pfe-accordion-header>` color option                 | $pfe-color--surface--darker                  |
| `--pfe-theme--color--surface--darker--text`            | Dark `<pfe-accordion-header>` text color option            | $pfe-color--surface--darker--text            |
| `--pfe-theme--color--surface--darker--link--focus`     | Focus border color for dark `<pfe-accordion-header>`       | $pfe-color--surface--darker--link--focus     |
| `--pfe-theme--color--surface--darkest`                 | Darkest `<pfe-accordion-header>` color option              | $pfe-color--surface--darkest                 |
| `--pfe-theme--color--surface--darkest--text`           | Darkest `<pfe-accordion-header>` text color option         | $pfe-color--surface--darkest--text           |
| `--pfe-theme--color--surface--darkest--link--focus`    | Focus border color for darkest `<pfe-accordion-header>`    | $pfe-color--surface--darkest--link--focus    |
| `--pfe-theme--color--surface--complement`              | Complement `<pfe-accordion-header>` color option           | $pfe-color--surface--complement              |
| `--pfe-theme--color--surface--complement--text`        | Complement `<pfe-accordion-header>` text color option      | $pfe-color--surface--complement--text        |
| `--pfe-theme--color--surface--complement--link--focus` | Focus border color for complement `<pfe-accordion-header>` | $pfe-color--surface--complement--link--focus |
| `--pfe-theme--color--surface--accent`                  | Accent `<pfe-accordion-header>` color option               | $pfe-color--surface--accent                  |
| `--pfe-theme--color--surface--accent--text`            | Accent `<pfe-accordion-header>` text color option          | $pfe-color--surface--accent--text            |
| `--pfe-theme--color--surface--accent--link--focus`     | Focus border color for accent `<pfe-accordion-header>`     | $pfe-color--surface--accent--link--focus     |

## Events

### pfe-accordion:change

Fires when an pfe-accordion-header is activated. The detail object contains the
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

From the PFElements root directory, run:

    npm start

## Code style

Accordion (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
