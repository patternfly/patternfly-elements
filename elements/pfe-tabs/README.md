# PFElements Tabs Element

## Usage

```
<pfe-tabs>
  <pfe-tab role="heading" slot="tab">Tab 1</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">Tab 2</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

For each `pfe-tab`, you are responsible for setting the `role="heading"`and
`slot="tab"`.

For each `pfe-tab-panel`, you are responsible for setting `role="region"` and
`slot="panel"`.

## Slots

### Default slot in pfe-tabs

Place the `pfe-tab` and `pfe-tab-panel` elements here.

### Default slot in pfe-tab

Add the text for your tab here.

### Default slot in pfe-tab-panel

Add the content for your tab panel here.

## Attributes

### vertical (observed)

Orients the tabs vertically on the left and pushes the content panes to the right.

```html
<pfe-tabs vertical>
  ...
</pfe-tabs>
```

### selected-index (observed)

Sets and reflects the currently selected tab index.

```html
<pfe-tabs selected-index="2">
  ...
</pfe-tabs>
```

## Events

### pfe-tabs:shown-tab

Fires when a new tab is selected. The `event.detail.tab` will be the tab that has been selected.

### pfe-tabs:hidden-tab

Fires when a selected tab is no longer the selected tab. The `event.detail.tab` will be the tab that is no longer selected.

## Styling

| Theme Var Hook | Description | Default |
| -------------- | ----------- | ------- |
| `--pfe-theme--container-padding` | Tab padding and panel padding | 16px |
| `--pfe-theme--color--surface--border` | Link color for default CTA | `$pfe-color--surface--border` |
| `--pfe-theme--ui--border-style` | Border style for selected tab | solid |
| `--pfe-theme--ui--border-width` | Border width for selected tab | 1px |
| `--pfe-theme--color--surface--lightest` | Selected tab background color | `$pfe-color--surface--lightest` |
| `--pfe-theme--color--surface--lightest--text` | Default tab text color | `$pfe-color--surface--lightest--text` |
| `--pfe-theme--color--surface--lightest--link` | Tab hover and selected indicator color | `$pfe-color--surface--lightest--link` |
| `--pfe-theme--color--surface--lightest--link--focus` | Focused tab outline color | `$pfe-color--surface--lightest--link--focus` |
| `--pfe-tabs__indicator--Display` | Tab indicator display | block |
| `--pfe-tabs__indicator--Height` | Tab indicator height | 4px |
| `--pfe-tabs__indicator--Width` | Tab indicator width | 22px |
| `--pfe-tabs__tab--TextTransform` | Tab text transform | none |

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Tabs (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[web-component-tester]: https://github.com/Polymer/web-component-tester
