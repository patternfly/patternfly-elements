# PFElements Tabs Element

## Usage

```html
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

Add the heading for your tab here.

### Default slot in pfe-tab-panel

Add the content for your tab panel here.

## Attributes
**`pfe-variant`** (observed)

Possible values are:
- `wind`: Borders are removed, only an accent colored indicator appears under the active heading.
- `earth`: Headings are encased in a block. The active heading has an accent colored border on one side.
* Note - when using earth with a white background you should set the padding-left, padding-right, and padding-bottom to 0, so it lines up with the wind variant.

```html
<pfe-tabs variant="wind">
  ...
</pfe-tabs>
```

**`vertical`** (observed)

Orients the tabs vertically on the left and pushes the content panes to the right.

```html
<pfe-tabs vertical>
  ...
</pfe-tabs>
```

**`selected-index`** (observed)

Sets and reflects the currently selected tab index.

```html
<pfe-tabs selected-index="2">
  ...
</pfe-tabs>
```

**`context`** (observed)

Changes the context of the call-to-action to one of 3 possible options:
- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--context` variable.

**`pfe-tab-history`** (observed)

Updates window.history and the URL to create sharable links. With the
`pfe-tab-history` attribute, the tabs and each tab *must* have an `id`.

The URL pattern will be `?{id-of-tabs}={id-of-selected-tab}`. In the example
below, selecting "Tab 2" will update the URL as follows: `?my-tabs=tab2`.

```html
<pfe-tabs pfe-tab-history id="my-tabs">
  <pfe-tab role="heading" slot="tab" id="tab1">Tab 1</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab" id="tab2">Tab 2</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

*Note:* This feature is not supported in IE11.

## Using the URL to open a specific tab

By default, `pfe-tabs` will read the URL and look for a query string parameter
that matches the id of a `pfe-tabs` component and a value of a specific
`pfe-tab`.

For example, `?my-tabs=tab2` would open the second tab in the code sample below.
"my-tabs" is equal to the id of the `pfe-tabs` component and "tab2" is equal to
the id of the second tab in the tab set.

```html
<pfe-tabs id="my-tabs">
  <pfe-tab role="heading" slot="tab" id="tab1">Tab 1</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab" id="tab2">Tab 2</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

In the event that a tab with the supplied id in the URL does not exist,
`pfe-tabs` will fall back to the `selected-index` attribute if one is supplied
in the markup, or the first tab if `selected-index` is not provided.

*Note:* This feature is not supported in IE11.

## Events

### pfe-tabs:shown-tab

Fires when a new tab is selected. The `event.detail.tab` will be the tab that has been selected.

### pfe-tabs:hidden-tab

Fires when a selected tab is no longer the selected tab. The `event.detail.tab` will be the tab that is no longer selected.

## Styling

| Theme hook | Description | Default |
| -------------- | ----------- | ------- |
| `--pfe-tabs--Display` |  | block |
| `--pfe-tabs--Padding` | Tab padding and panel padding | 0 |
| `--pfe-tabs__tabs--FlexDirection` |  | row |
| `--pfe-tabs__tabs--Width` |  | auto |
| `--pfe-tabs__tabs--Padding` |  | 0 |
| `--pfe-tabs__tabs--BorderTop` |  | 0 |
| `--pfe-tabs__tabs--BorderRight` |  | 0 |
| `--pfe-tabs__tabs--BorderLeft` |  | 0 |
| `--pfe-tabs__tabs--BorderColor` |  | var(--pfe-theme--color--surface--border, #d2d2d2) |
| `--pfe-tabs__tabs--BorderBottom` |  | var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-tabs__tabs--BorderColor, var(--pfe-theme--color--surface--border, #d2d2d2)) |
| `--pfe-tabs__panels--Width` |  | auto |
| `--pfe-tabs--BackgroundColor` |  | transparent |
| `--pfe-tabs--BackgroundColor--inactive` |  | var(--pfe-theme--color--surface--lighter, #f0f0f0) |
| `--pfe-tabs--Color` | Default tab text color | var(--pfe-theme--color--text--muted, #6a6e73) |
| `--pfe-tabs--BorderColor--hover` |  | #b8bbbe |
| `--pfe-tabs--BorderWidth` |  | var(--pfe-theme--ui--border-width--active, 3px) |
| `--pfe-tabs__tab--FontSize` |  | var(--pfe-theme--font-size, 1rem) |
| `--pfe-tabs__tab--Margin` |  | 0 0 calc( var(--pfe-theme--ui--border-width, 1px) * -1) |
| `--pfe-tabs__tab--PaddingTop` |  | var(--pfe-theme--container-padding, 1rem) |
| `--pfe-tabs__tab--PaddingBottom` |  | var(--pfe-theme--container-padding, 1rem) |
| `--pfe-tabs__tab--PaddingRight` |  | calc(var(--pfe-theme--container-padding, 1rem) * 2) |
| `--pfe-tabs__tab--PaddingLeft` |  | calc(var(--pfe-theme--container-padding, 1rem) * 2) |
| `--pfe-tabs__tab--TextTransform` |  | none |
| `--pfe-tabs--Color--focus` |  | var(--pfe-tabs--focus, var(--pfe-theme--color--text, #151515)) |
| `--pfe-tabs--highlight` | Border style for selected tab | var(--pfe-theme--color--ui-accent, #06c) |
| `--pfe-tabs--BorderColor` | Border style for selected tab | var(--pfe-tabs--highlight, var(--pfe-theme--color--ui-accent, #06c)) |
| `--pfe-tabs--focus` |  | var(--pfe-theme--color--link, #06c) |
| `--pfe-tabs__panel--BackgroundColor` |  | transparent |
| `--pfe-tabs__panel--Padding` |  | var(--pfe-theme--container-spacer, 1rem) |
| `--pfe-tabs__panel--BorderTop` |  | 0 |
| `--pfe-tabs__panel--BorderRight` |  | 0 |
| `--pfe-tabs__panel--BorderBottom` |  | 0 |
| `--pfe-tabs__panel--BorderLeft` |  | 0 |
 
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
