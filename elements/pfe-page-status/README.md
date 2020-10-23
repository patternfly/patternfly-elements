# PatternFly Element | Page Status Element

The Page Status element creates a flag/banner on the right side of the page denoting the status of the page or Doc the author is viewing.

## Usage

```html
<pfe-page-status status="critical">
  Previewing
</pfe-page-status>
```

```html
<pfe-page-status status="moderate">
  Unpublished
</pfe-page-status>
```

## Options & Styling

### Statuses

Use the attribute `status="{option}"`

| Option | Theme Color Variable |
| ------ | -------------------- |
| default | `--pfe-theme--color--feedback--default` |
| `moderate` | `--pfe-theme--color--feedback--moderate` |
| `warning` | *Same as `moderate`* |
| `important` | `--pfe-theme--color--feedback--important` |
| `critical` | `--pfe-theme--color--feedback--critical` |
| `success` | `--pfe-theme--color--feedback--success` |
| `info` | `--pfe-theme--color--feedback--info` |
| `normal` | `--pfe-theme--color--ui-accent` |
| `accent` | `--pfe-theme--color--ui-accent` |
| `complement` | `--pfe-theme--color--ui-base` |

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Page Status (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
