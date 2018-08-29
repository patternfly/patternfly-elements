# RHElements Tabs Element

## Usage

```
<rh-tabs>
  <rh-tab role="heading" slot="tab">Tab 1</rh-tab>
  <rh-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </rh-tab-panel>
  <rh-tab role="heading" slot="tab">Tab 2</rh-tab>
  <rh-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </rh-tab-panel>
</rh-tabs>
```

For each `rh-tab`, you are responsible for setting the `role="heading"`and
`slot="tab"`.

For each `rh-tab-panel`, you are responsible for setting `role="region"` and
`slot="panel"`.

## Slots

### Default slot in rh-tabs

Place the `rh-tab` and `rh-tab-panel` elements here.

### Default slot in rh-tab

Add the text for your tab here.

### Default slot in rh-tab-panel

Add the content for your tab panel here.

## Attributes

### vertical (observed)

Orients the tabs vertically on the left and pushes the content panes to the right.

### selected-index (observed)

Sets and reflects the currently selected tab index .

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

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Tabs (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
