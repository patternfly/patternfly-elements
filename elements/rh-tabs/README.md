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

```html
<rh-tabs vertical>
  ...
</rh-tabs>
```

### selected-index (observed)

Sets and reflects the currently selected tab index.

```html
<rh-tabs selected-index="2">
  ...
</rh-tabs>
```

## Events

### rh-tabs:shown-tab

Fires when a new tab is selected. The `event.detail.tab` will be the tab that has been selected.

### rh-tabs:hidden-tab

Fires when a selected tab is no longer the selected tab. The `event.detail.tab` will be the tab that is no longer selected.

## Styling

| Theme Var Hook | Description | Default |
| -------------- | ----------- | ------- |
| `--rh-theme--container-padding` | Tab padding and panel padding | 16px |
| `--rh-theme--color--surface--border` | Link color for default CTA | `$rh-color--surface--border` |
| `--rh-theme--ui--border-style` | Border style for selected tab | solid |
| `--rh-theme--ui--border-width` | Border width for selected tab | 1px |
| `--rh-theme--color--surface--lightest` | Selected tab background color | `$rh-color--surface--lightest` |
| `--rh-theme--color--surface--lightest--text` | Default tab text color | `$rh-color--surface--lightest--text` |
| `--rh-theme--color--surface--lightest--link` | Tab hover and selected indicator color | `$rh-color--surface--lightest--link` |
| `--rh-theme--color--surface--lightest--link--focus` | Focused tab outline color | `$rh-color--surface--lightest--link--focus` |
| `--rh-tabs__indicator--Display` | Tab indicator display | block |
| `--rh-tabs__indicator--Height` | Tab indicator height | 4px |
| `--rh-tabs__indicator--Width` | Tab indicator width | 22px |
| `--rh-tabs__tab--TextTransform` | Tab text transform | none |

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
