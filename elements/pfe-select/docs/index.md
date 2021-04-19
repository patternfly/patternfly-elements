---
layout: layout-basic.html
title: Select
description: Provides a way to create a stylized list of options for a form
package: pfe-select
packages:
  - pfe-select
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Select provides a way to create a stylized list of options for a form.

<div class="pfe-l-grid pfe-m-gutters">
  <pfe-select class="pfe-l-grid__item pfe-m-3-col">
    <select>
      <option disabled>Please select an option</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </pfe-select>
</div>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

There are 3 ways of providing options to your component:

- Users can pass custom options as an array of objects to the `pfeOptions` setter function
- Users can append more options by using an `addOptions()` API

Note: pfe-select component can also be used in places where dropdowns are needed but its more suitable for forms.

### Using the `<select>` tag

<div class="pfe-l-grid pfe-m-gutters">
  <pfe-select class="pfe-l-grid__item pfe-m-3-col">
    <select>
      <option disabled>Please select an option</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </pfe-select>
</div>

```html
<pfe-select>
  <select>
    <option disabled>Please select an option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</pfe-select>
```

### By passing options


For custom options, use the `pfeOptions` setter function to set the options as shown in snippet below:

<div class="pfe-l-grid pfe-m-gutters">
  <pfe-select id="options-select" class="pfe-l-grid__item pfe-m-3-col"></pfe-select>
</div>

```html
<pfe-select></pfe-select>
```

```javascript
let pfeSelect = document.querySelector("pfe-select#options-select");
customElements.whenDefined("pfe-select").then(() => {
  pfeSelect.pfeOptions = [
    { text: "Please select an option", value: "", selected: true },
    { text: 'One', value: '1', selected: false },
    { text: 'Two', value: '2', selected: false },
    { text: 'Three', value: '3', selected: false}
  ];
});
```
:::

::: section
## Slots
### default slot

Place a `<select>` element with or without `<option>`s' here.
:::

::: section
## Attributes
### invalid
Changes the color and width of border-bottom of `<pfe-select>`

Values
- true: Sets the border-bottom-color to `feedback--critical` theme color and border-bottom-width to 2px
- false (default): Sets the border-bottom-color to `surface--darker` theme color and border-bottom-width to default 1px
:::

::: section
## Methods
None
:::

::: section
## Events
### pfe-select:change

Fires when an option is selected or deselected. The detail object contains the
following

```javascript
detail: {
  value: String
}
```
:::

::: section
## Styling hooks
| Theme Var Hook                                        | Description                                               | Default                                     |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------- |
| `--pfe-select--BackgroundColor`                       | Default `<pfe-select>` background color                   | $pfe-color--ui--lightest                  |
| `--pfe-select--BorderWidth`                           | Default `<pfe-select>` border width                       | $pfe-var--ui--border-width                |
| `--pfe-select--BorderBottomWidth`                     | Default `<pfe-select>` border bottom width                | $pfe-var--ui--border-width                |
| `--pfe-select--BorderColor`                           | Default `<pfe-select>` border color                       | $pfe-color--surface--lighter              |
| `--pfe-select--BorderBottomColor`                     | Default `<pfe-select>` border bottom color                | $pfe-color--surface--darker               |
| `--pfe-select--BorderBottomColor--hover`              | Border bottom color on `<pfe-select>` hover               | $pfe-color--surface--ui-link              |
| `--pfe-select--BorderBottomColor--error`              | Border bottom color on `<pfe-select>` error               | $pfe-color--feedback--critical            |
| `--pfe-select--BorderTop`                             | Default `<pfe-select>` border top                         | $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor                                                                                                                               |
| `--pfe-select--BorderLeft`                            | Default `<pfe-select>` border left                        | $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor                                                                                                                               |
| `--pfe-select--BorderRight`                           | Default `<pfe-select>` border right                       | $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor                                                                                                                               |
| `--pfe-select--BorderBottom`                          | Default `<pfe-select>` border bottom                      | $pfe-var--pfe-select--BorderBottomWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderBottomColor                                                                                              |
| `--pfe-select--BorderBottom--hover`                   | Border bottom on `<pfe-select>` hover                     | $pfe-var--pfe-select--BorderBottomWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderBottomColor--hover                                                                                       |
| `--pfe-select--BackgroundColor`                       | Default `<pfe-select>` background color                   | $pfe-color--ui--lightest                  |
| `--pfe-select--Color`                                 | Default `<pfe-select>` color                              | $pfe-color--text                          |
:::

<script>
let pfeSelect = document.querySelector("pfe-select#options-select");
customElements.whenDefined("pfe-select").then(() => {
  pfeSelect.pfeOptions = [
    { text: "Please select an option", value: "", selected: true },
    { text: 'One', value: '1', selected: false },
    { text: 'Two', value: '2', selected: false },
    { text: 'Three', value: '3', selected: false}
  ];
});
</script>