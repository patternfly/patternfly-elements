# PatternFly Element | Docs Status Element

PFE Docs Status creates a flag/banner on the right side of the page denoting the status of the page or Doc the author is viewing.

## Usage

```html
<pfe-docs-status pfe-status="critical">
  Previewing
</pfe-docs-status>
```

```html
<pfe-docs-status pfe-status="moderate">
  Unpublished
</pfe-docs-status>
```

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

Docs Status (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
