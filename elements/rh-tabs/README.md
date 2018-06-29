# RHElements Tabs Element

## Attributes

### vertical

Orients the tabs vertically on the left and pushes the content panes to the right.

## Events

### rh-tabs:shown-tab

Fires when a new tab is selected. The `event.detail.tab` will be the tab that has been selected.

### rh-tabs:hidden-tab

Fires when a selected tab is no longer the selected tab. The `event.detail.tab` will be the tab that is no longer selected.

## Styling

| Custom Property                                     | Description                                         | Default                                 |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------- |
| --rhe-c-tab-BackgroundColor                         | Background color of the tabs                        | $rh-global--color--black                |
| --rhe-c-tab-selected-BackgroundColor                | Background color of the selected tab                | $rh-global--color--white                |
| --rhe-c-tab-selected-Color                          | Font color of the selected tab                      | $rh-global--color--black-soft           |
| --rhe-c-tab\_\_indicator--hover--BackgroundColor    | Background color of the indicator                   | $rh-global--link-color--inverted--hover |
| --rhe-c-tab\_\_indicator--selected--BackgroundColor | Background color of the indicator of a selected tab | $rh-global--link-color                  |

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

Tabs (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
