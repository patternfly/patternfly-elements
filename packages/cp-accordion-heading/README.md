# RHElements Accordion Heading Element

[![Build Status][travis-ci]

## Dependencies

Make sure you have the [Polymer CLI][polymer-cli] installed.

    npm install -g polymer-cli

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and the Polymer CLI will start a server and open your default browser to the demo page of the element.

## Properties
### expanded
Boolean value

## Events
### cp-accordion-change (fires)
This event is fired when the cp-accordion-heading element is clicked.
```
this.dispatchEvent(
  new CustomEvent('cp-accordion-change', {
    detail: { expanded: this.expanded },
    bubbles: true
  })
);
```

## Code style

Accordion (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polymer-cli]: https://github.com/Polymer/polymer-cli
[travis-ci]: https://travis-ci.org/RHElements/cp-accordion-heading.svg?branch=master)](https://travis-ci.org/RHElements/cp-accordion-heading
