# PFElements Progress Indicator Element

`pfe-progress-indicator` is a "loader" that indicates to the user that part of the web page is loading, or waiting on other http events to be ready to use.

## Usage
```html
<pfe-progress-indicator indeterminate>
  <h1>My fallback loading message</h1>
</pfe-progress-indicator>
```

At the time of writing there is only one style variant, `pfe-indeterminate` that spins without informing the user of where they are in the waiting process, only that http activity has not been resolved. This may change in the future as more style variants become available.

## Slots

Progress Indicator has one unnamed slot only.

### Default slot

We expect any html tag to be the first child inside `pfe-progress-indicator` element. The provided element should contain a fallback loading message if JavaScript should fail for any reason. When the element is connected, the loading message is visually hidden, and replaced by an animated "spinner".

E.g.

```html
// The web component that upgrades to a "loader"
<pfe-progress-indicator indeterminate>
  // your custom message for JS failure AND a11y technologies
  <h1>
    This text will be seen if JS fails, but will be hidden on upgrade.
    Screen readers will still see it as a part of the DOM.
  </h1>
</pfe-progress-indicator>
```

## Attributes

### indeterminate

Uses the spinner style display. Currently this is on the only supported display.

### size

Possible values: `sm`, `md`, `xl`

## Styling

As of writing, the progress indicator element has only one style, but in the future it could be expanded to include many different types of progress indicators.

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Progress Indicator (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
