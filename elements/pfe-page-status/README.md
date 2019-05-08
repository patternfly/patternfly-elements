# PatternFly Element | Page Status Element

PFE Page Status creates a flag/banner on the right side of the page denoting the status of the page or Doc the author is viewing.

## Usage

```html
<pfe-page-status pfe-status="critical">
  Previewing
</pfe-page-status>
```

```html
<pfe-page-status pfe-status="moderate">
  Unpublished
</pfe-page-status>
```

## Options

### Status

Use the attribute `pfe-status="{option}"`

**Options**
- default &mdash; uses `--pfe-theme--color--feedback--default`
- `moderate` &mdash; uses `--pfe-theme--color--feedback--moderate`
- `warning` &mdash; *Same as `moderate`*
- `important` &mdash; uses `--pfe-theme--color--feedback--important`
- `critical` &mdash; uses `--pfe-theme--color--feedback--critical`
- `success` &mdash; uses `--pfe-theme--color--feedback--success`
- `info` &mdash; uses `--pfe-theme--color--feedback--info`
- `normal` &mdash; uses `--pfe-theme--color--ui-base`
- `accent` &mdash; uses `--pfe-theme--color--ui-accent`
- `complement` &mdash;  uses `--pfe-theme--color--ui-complement`

## Dependencies

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

    npm install -g polyserve web-component-tester

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and Polyserve will start a server and open your default browser to the demo page of the element.

## Code style

Page Status (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
