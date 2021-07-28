---
layout: layout-basic.html
title: Accordion
description: Toggle the visibility of sections of content
package: pfe-accordion
packages: 
  - pfe-accordion
  - pfe-cta
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Accordions toggle the visibility of sections of content. They feature panels that consist of a section text label and a caret icon that collapses or expands to reveal more information.

<pfe-accordion>
  <pfe-accordion-header>
    <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
    <pfe-cta>
      <a href="#">Call to action</a>
    </pfe-cta>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Nostrud ad sit commodo nostrud?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Reprehenderit cupidatat labore?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
    <pfe-cta>
      <a href="#">Call to action</a>
    </pfe-cta>
  </pfe-accordion-panel>
</pfe-accordion>

### Disclosure variation
Accordions need to have at least two section panels. If only one panel is needed, a Disclosure is presented instead. Accordions are used to organize more important information whereas a disclosure is used to store supplementary content that might not be a crucial part of the user experience.

<pfe-accordion>
  <pfe-accordion-header>
    <h3>This is a disclosure</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <h3>Headline, sm</h3>
    <p>A Disclosure toggles the visibility of sections of content. It features one panel that consists of a caret icon and a section text label that collapses or expands to reveal more information.</p>
    <pfe-cta><a href="#">Call-to-action</a></pfe-cta>
  </pfe-accordion-panel>
</pfe-accordion>
:::

::: section
## Installation

```shell
npm install @patternfly/pfe-accordion
```
:::

::: section
## Usage

```html
<pfe-accordion>
  <pfe-accordion-header>
    <h3>Laboris sunt qui dolor consectetur excepteur in aliqua ipsum?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Culpa adipisicing sunt dolor ullamco dolor duis in ad commodo.</p>
    <pfe-cta>
      <a href="#">Call to action</a>
    </pfe-cta>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Anim est tempor fugiat pariatur laborum deserunt ex mollit aliquip?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p><a href="#">Ullamco ullamco sint</a> ex id magna elit deserunt dolore nostrud eu et dolore est Lorem. Esse laborum do ut consectetur occaecat proident et nostrud ut nostrud veniam officia Lorem.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Nostrud ad sit commodo nostrud?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Nisi veniam tempor reprehenderit laboris amet laborum et do ut. Veniam eiusmod aliquip ullamco quis esse laborum Lorem exercitation consequat.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Reprehenderit cupidatat labore?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Magna incididunt aliquip consectetur dolor adipisicing amet cillum officia nostrud. Elit exercitation voluptate aute nostrud.</p>
    <pfe-cta>
      <a href="#">Call to action</a>
    </pfe-cta>
  </pfe-accordion-panel>
</pfe-accordion>
```
:::

::: section
## Slots

### Default slot in pfe-accordion

Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.

### Default slot in pfe-accordion-header

We expect the light DOM of the `pfe-accordion-header` to be a heading level tag
(h1, h2, h3, h4, h5, h6)

### Default slot in pfe-accordion-panel

Add the content for your accordion panel here.
:::

::: section
## Attributes

**`color`**
Changes the color of `<pfe-accordion-header>`

| Value | Description |
| --- | --- |
| `striped` | Alternates `light` and `lightest` theme colors on `<pfe-accordion-header>` |
| `lightest` | `lightest` theme color |
| `light` (default) | `light` theme color |
| `base` | `base` theme color |
| `dark` | `dark` theme color |
| `darkest` | `darkest` theme color |
| `complement` | `complement`theme color |
| `accent` | `accent` theme color |

**`disclosure`**
If `pfe-accordion` has one `pfe-accordion-header`, it will get tagged with `disclosure="true"`. This applies a slightly different set of styles: chevron appears on the left side, the header has a single border on all four sides. Applying `disclosure="false"` to a `pfe-accordion` element containing only one header/panel pairing will set the element to display as a standard accordion.

**`history`**
Updates window.history and the URL to create sharable links. With the `history` attribute, the accordion *must* have an `id`.

The URL pattern will be `?{id-of-tabs}={index-of-expanded-items}`. In the example
below, selecting "Accordion 2" will update the URL as follows: `?lorem-ipsum=2`. The index value for the expanded items starts at 1.

```html
<pfe-accordion history id="lorem-ipsum">
  <pfe-accordion-header>
    <h3>Accordion 1</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Accordion 1 panel content.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Accordion 2</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Accordion 2 panel content.</p>
  </pfe-accordion-panel>
</pfe-accordion>
```

To expand multiple sets, you can dash separate indexes: `?lorem-ipsum=1-2`.

*Note:* This feature is not supported in IE11.

**`expanded-index`**
Sets and reflects the currently expanded accordion indexes. Use commas to separate multiple indexes.  The index value for the expanded items starts at 1.

```html
<pfe-accordion expanded-index="2,3">
  ...
</pfe-accordion>
```

**`context`**
Changes the context of the accordion to one of 3 possible themes:
- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--theme` variable.
:::

::: section
## Methods

### toggle(index)

Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.

### expand(index)

Accepts a 0-based index value (integer) for the set of accordion items to expand.

### expandAll()

Expands all accordion items.

### collapse(index)

Accepts a 0-based index value (integer) for the set of accordion items to collapse.

### collapseAll()

Collapse all accordion items.
:::

::: section
## Events
### pfe-accordion:change

Fires when an pfe-accordion-header is activated. The detail object contains the
following

```javascript
detail: {
  expanded: Boolean
}
```
:::

::: section
## Styling hooks
| Theme hook | Description | Default |
| --- | --- | --- |
| `--pfe-accordion--Padding` | | var(--pfe-theme--container-padding, 1rem) calc(var(--pfe-theme--container-padding, 1rem) * 1.5) |
| `--pfe-accordion--BorderColor--accent` | | transparent |
| `--pfe-accordion--BorderColor` | | var(--pfe-theme--color--surface--border, #d2d2d2) |
| `--pfe-accordion--BorderWidth` | | var(--pfe-theme--surface--border-width, 1px) |
| `--pfe-accordion--accent--width` | | var(--pfe-theme--surface--border-width--active, 3px) |
| `--pfe-accordion--Width` | | 100% |
| `--pfe-accordion--MaxWidth--content` | | 80ch |
| `--pfe-accordion--BoxShadow` | | 0 5px 4px transparent |
| `--pfe-accordion--ZIndex` | | 3 |
| `--pfe-accordion--FontSize--header` | | var(--pf-global--FontSize--xl, 1.25rem) |
| `--pfe-accordion--FontWeight--header` | | var(--pfe-theme--font-weight--normal, 400) |
| `--pfe-accordion--TextAlign` | | left |
| `--pfe-accordion--BackgroundColor` | | transparent |
| `--pfe-accordion--Color` | | var(--pfe-broadcasted--text, #3c3f42) |
| `--pfe-accordion--accent` | | transparent |
| `--pfe-accordion--BackgroundColor--active` | | var(--pfe-theme--color--surface--lighter, #f0f0f0) |
| `--pfe-accordion--Color--active` | | var(--pfe-broadcasted--text, #3c3f42) |
| `--pfe-accordion--accent--active` | | var(--pfe-theme--color--ui-accent, #06c) |
| `--pfe-accordion--BackgroundColor--expanded` | | var(--pfe-theme--color--surface--lightest, #fff) |
| `--pfe-accordion--Color--expanded` | | var(--pfe-broadcasted--text, #3c3f42) |
| `--pfe-accordion--accent--expanded` | | var(--pfe-theme--color--ui-accent, #06c) |
| `--pfe-accordion--BoxShadow--expanded` | | 0 5px 4px rgba(140, 140, 140, 0.35) |
:::