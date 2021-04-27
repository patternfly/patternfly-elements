---
layout: layout-basic.html
title: Tabs
description: Organizes content in a contained view on the same page
package: pfe-tabs
packages:
  - pfe-tabs
  - pfe-cta
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

Tabs are used to organize and navigate between sections of content. They feature a horizontal or a vertical list of section text labels with a content panel below or to the right of the component.

### Horizontal tabs
<pfe-tabs>
  <pfe-tab role="heading" slot="tab">
    <h2>Tab 1</h2>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h3>Tab 1 content</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima a, vero harum animi libero quos tenetur error quisquam unde ad quidem autem perspiciatis magni blanditiis vel velit nulla nisi sit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem quasi voluptas minima, reprehenderit in nam molestiae inventore doloremque repudiandae, nobis tempore. Suscipit dignissimos voluptatem explicabo soluta veritatis officiis dolor.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h2>Tab 2</h2>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h3>Tab 2 content</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto numquam iste quae expedita inventore animi quod veniam aut, fugiat eveniet, a maxime, ullam est veritatis vero esse illo suscipit.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h2>Tab 3</h2>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h3>Tab 3 content</h3>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, deserunt nostrum itaque magnam, incidunt ipsam enim magni expedita, quasi quos cum illum nisi vel obcaecati? Eaque temporibus aliquam dolorem facere.</p>
  </pfe-tab-panel>
</pfe-tabs>

### Vertical tabs
<pfe-tabs vertical>
  <pfe-tab role="heading" slot="tab">
    <h2>Tab 1</h2>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h3>Tab 1 content</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima a, vero harum animi libero quos tenetur error quisquam unde ad quidem autem perspiciatis magni blanditiis vel velit nulla nisi sit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatem quasi voluptas minima, reprehenderit in nam molestiae inventore doloremque repudiandae, nobis tempore. Suscipit dignissimos voluptatem explicabo soluta veritatis officiis dolor.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h2>Tab 2</h2>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h3>Tab 2 content</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto numquam iste quae expedita inventore animi quod veniam aut, fugiat eveniet, a maxime, ullam est veritatis vero esse illo suscipit.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h2>Tab 3</h2>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h3>Tab 3 content</h3>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, deserunt nostrum itaque magnam, incidunt ipsam enim magni expedita, quasi quos cum illum nisi vel obcaecati? Eaque temporibus aliquam dolorem facere.</p>
  </pfe-tab-panel>
</pfe-tabs>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

For each `pfe-tab`, you are responsible for setting the `role="heading"`and
`slot="tab"`.

For each `pfe-tab-panel`, you are responsible for setting `role="region"` and
`slot="panel"`.

### Horizontal
<pfe-tabs>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>

```html
<pfe-tabs>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

### Horizontal: centered
<pfe-tabs tab-align="center">
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>

```html
<pfe-tabs tab-align="center">
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

### Horizontal: earth variant
<pfe-tabs variant="earth">
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>

```html
<pfe-tabs variant="earth">
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

### Vertical
<pfe-tabs vertical>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>

```html
<pfe-tabs vertical>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```

### Vertical: earth variant
<pfe-tabs vertical variant="earth">
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>

```html
<pfe-tabs vertical variant="earth">
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 1</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 1</h2>
    <p>Tab 1 panel content.</p>
  </pfe-tab-panel>
  <pfe-tab role="heading" slot="tab">
    <h1>Tab 2</h1>
  </pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    <h2>Content 2</h2>
    <p>Tab 2 panel content.</p>
  </pfe-tab-panel>
</pfe-tabs>
```
:::

::: section
## Slots

### default: pfe-tabs

Place the `pfe-tab` and `pfe-tab-panel` elements here.

### default: pfe-tab

Add the heading for your tab here.

### default: pfe-tab-panel

Add the content for your tab panel here.
:::

::: section
## Attributes

### variant (observed)
Values
- `wind`: Borders are removed, only an accent colored indicator appears under the active heading.
- `earth`: Headings are encased in a block. The active heading has an accent colored border on one side.

```html
<pfe-tabs variant="wind">
  ...
</pfe-tabs>
```

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

### context (observed)

Changes the context of the call-to-action to one of 3 possible options:
- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--context` variable.

### tab-history (observed)

Updates window.history and the URL to create sharable links. With the
`tab-history` attribute, the tabs and each tab *must* have an `id`.

The URL pattern will be `?{id-of-tabs}={id-of-selected-tab}`. In the example
below, selecting "Tab 2" will update the URL as follows: `?my-tabs=tab2`.

```html
<pfe-tabs tab-history id="my-tabs">
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

<pfe-cta>
  <a href="demo">View the tab history demo</a>
</pfe-cta>

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
:::

::: section
## Methods
None
:::

::: section
## Events
### pfe-tabs:shown-tab

Fires when a new tab is selected. The `event.detail.tab` will be the tab that has been selected.

```javascript
{
  detail: pfe-tab (DOM element)
}
```

### pfe-tabs:hidden-tab

Fires when a selected tab is no longer the selected tab. The `event.detail.tab` will be the tab that is no longer selected.

```javascript
{
  detail: pfe-tab (DOM element)
}
```
:::

::: section
## Styling hooks

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

:::