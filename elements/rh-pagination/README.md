# RHElements Pagination Element

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

Pagination (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester

-----

# UX Guidelines

## Variants

- `default` - the pagination component comes with previous and next functionality 
- `show-jump` - allows the user to know the total number of pages, and jump to the last page by clicking on the number. Also provides an input field for the user to jump to any page. 
- @TODO  `show-pages` - adds a series of numbers for the user to browse the first few pages. Also only appears when the element query state is larger than 768px.
- @TODO `stack-titles` - expects longer titles to be used instead of previous & next, so no max-width is applied, and left alignment is used on mobile. 


## Standard pagination

The best user experience for a long list of pages is the show-jump variant, which exposes the range. This is because the "next" button is the first item in the rh-pagination component for keyboard navigation, as well as screen-readers. Through the show-jump variant, users can both understand how many pages are in the series, and can also navigate to any page in the list.

We recommend not using the show-pages variant unless absolutely necessary. This variant adds complexity and visual clutter.


## Serial navigation

When it's unimportant for the user to know how many items are in the series, the standalone previous & next links can be used. The user can then simply navigate to the next item in the series. Information such as the title of the next item can be passed into the links, rather than "previous" and "next".









