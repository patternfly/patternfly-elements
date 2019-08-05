# PFElements Progress Indicator Element

`pfe-progress-indicator` is a call-to-action (CTA) element, that stands out from regular hypertext links, and is used for linking users to webpages.

## Usage
```html
<pfe-progress-indicator pfe-indeterminate>
    <h1>My fallback loading message</h1>
</pfe-progress-indicator>
```

## Slots

Progress Indicator has one slot only. It is named `progress-message`.

### Default slot

We expect any html tag to be the first child inside `pfe-progress-indicator` element. The provided element should contain a fallback loading message if JavaScript should fail for any reason. When the element is connected, the loading message is visually hidden, and replaced by an animated "spinner".

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
