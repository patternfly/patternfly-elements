---
layout: layout-component.html
title: Accordion
description: Toggle the visibility of sections of content
package: pfe-accordion
packages: 
  - pfe-accordion
  - pfe-cta
tags:
  - component
---

::: section
## Overview {.pfe-jump-links-panel__section .has-sub-section}
Accordions toggle the visibility of sections of content. They feature panels that consist of a section text label and a caret icon that collapses or expands to reveal more information.

<pfe-accordion>
  <pfe-accordion-header>
    <h3>Why do wizards need money if they could just create it?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
    <pfe-cta>
      <a href="#">Learn more about legislation in the wizarding world</a>
    </pfe-cta>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Why doesn't Harry have a portrait of his parents?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p><a href="#">The characters in the portraits</a> are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general <a href="#">representation of the individual</a> they depict. A portrait of his parents would not be of much help to Harry.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Why is Harry considered a half-blood if both of his parents could use magic?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Because Harry's grandparents were not able to do magic. This is generally frowned upon by those who consider themselves pure, such as the Malfoy's or other antagonists.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h3>Where do the main characters work as adults?</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>Harry and Hermione are at the Ministry: he ends up leading the Auror department. Ron helps George at the joke shop and does very well. Ginny becomes a professional Quidditch player and then sportswriter for the Daily Prophet.</p>
    <pfe-cta>
      <a href="https://www.pottermore.com/collection/characters" target="blank">Read more about the characters</a>
    </pfe-cta>
  </pfe-accordion-panel>
</pfe-accordion>

### Disclosure variation {.pfe-jump-links-panel__section .sub-section}
Accordions need to have at least two section panels. If only one panel is needed, a Disclosure is presented instead. Accordions are used to organize more important information whereas a disclosure is used to store supplementary content that might not be a crucial part of the user experience.

<pfe-accordion>
  <pfe-accordion-header>
    <h3>This is a disclosure</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>A Disclosure toggles the visibility of sections of content. It features one panel that consists of a caret icon and a section text label that collapses or expands to reveal more information.</p>
  </pfe-accordion-panel>
</pfe-accordion>
:::

::: section
## Installation {.pfe-jump-links-panel__section}

```shell
npm install @patternfly/pfe-accordion
```
:::

::: section
## Usage {.pfe-jump-links-panel__section}

```html
<pfe-accordion>
  <pfe-accordion-header>
    <h2>Why do wizards need money if they could just create it?</h2>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>There is legislation that decides what you can conjure and what you can not. Because things that you conjure out of thin air will not last, it is illegal in the wizarding world.</p>
  </pfe-accordion-panel>
  <pfe-accordion-header>
    <h2>Why doesn't Harry have a portrait of his parents?</h2>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>The characters in the portraits are not actually ghosts. They mainly are there just to repeat common phrases or serve as a general representation of the individual they depict. A portrait of his parents would not be of much help to Harry.</p>
  </pfe-accordion-panel>
</pfe-accordion>
```

<pfe-cta><a href="../../elements/{{ package }}/demo">Demo</a></pfe-cta>
:::

::: section
## Slots {.pfe-jump-links-panel__section .has-sub-section}

### Default slot in pfe-accordion {.pfe-jump-links-panel__section .sub-section}

Place the `pfe-accordion-header` and `pfe-accordion-panel` elements here.

### Default slot in pfe-accordion-header {.pfe-jump-links-panel__section .sub-section}

We expect the light DOM of the `pfe-accordion-header` to be a heading level tag
(h1, h2, h3, h4, h5, h6)

### Default slot in pfe-accordion-panel {.pfe-jump-links-panel__section .sub-section}

Add the content for your accordion panel here.
:::

::: section
## Attributes {.pfe-jump-links-panel__section .has-sub-section}

### color {.pfe-jump-links-panel__section .sub-section}
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

### disclosure {.pfe-jump-links-panel__section .sub-section}
If `pfe-accordion` has one `pfe-accordion-header`, it will get tagged with `disclosure="true"`. This applies a slightly different set of styles: chevron appears on the left side, the header has a single border on all four sides. Applying `disclosure="false"` to a `pfe-accordion` element containing only one header/panel pairing will set the element to display as a standard accordion.

### history {.pfe-jump-links-panel__section .sub-section}
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

### expanded-index {.pfe-jump-links-panel__section .sub-section}
Sets and reflects the currently expanded accordion indexes. Use commas to separate multiple indexes.  The index value for the expanded items starts at 1.

```html
<pfe-accordion expanded-index="2,3">
  ...
</pfe-accordion>
```

### context {.pfe-jump-links-panel__section .sub-section}
Changes the context of the accordion to one of 3 possible themes:
- `light` (default)
- `dark`
- `saturated`

This will override any context being passed from a parent component and will add a style attribute setting the `--theme` variable.
:::

::: section
## Methods {.pfe-jump-links-panel__section .has-sub-section}

### toggle(index) {.pfe-jump-links-panel__section .sub-section}

Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.

### expand(index) {.pfe-jump-links-panel__section .sub-section}

Accepts a 0-based index value (integer) for the set of accordion items to expand.

### expandAll() {.pfe-jump-links-panel__section .sub-section}

Expands all accordion items.

### collapse(index) {.pfe-jump-links-panel__section .sub-section}

Accepts a 0-based index value (integer) for the set of accordion items to collapse.

### collapseAll() {.pfe-jump-links-panel__section .sub-section}

Collapse all accordion items.
:::

::: section
## Events {.pfe-jump-links-panel__section .has-sub-section}
### pfe-accordion:change {.pfe-jump-links-panel__section .sub-section}

Fires when an pfe-accordion-header is activated. The detail object contains the
following

```javascript
detail: {
  expanded: Boolean
}
```
:::

::: section
## Styling hooks {.pfe-jump-links-panel__section}
| Theme hook | Description | Default |
| --- | --- | --- |
| `--pfe-theme--color--surface--lighter` | Default `<pfe-accordion-header>` color | $pfe-color--surface--lighter |
| `--pfe-theme--color--surface--lighter--text` | Default `<pfe-accordion-header>` text color | $pfe-color--surface--lighter--text |
| `--pfe-theme--color--surface--lighter--link--focus` | Focus border color for default `<pfe-accordion-header>` | $pfe-color--surface--lighter--link--focus    |
| `--pfe-theme--color--surface--lightest` | Lightest `<pfe-accordion-header>` color option | $pfe-color--surface--lighter |
| `--pfe-theme--color--surface--lightest--text` | Lightest `<pfe-accordion-header>` text color option | $pfe-color--surface--lightest--text |
| `--pfe-theme--color--surface--lightest--link--focus` | Focus border color for lightest `<pfe-accordion-header>` | $pfe-color--surface--lightest--link--focus   |
| `--pfe-theme--color--surface--base` | Base `<pfe-accordion-header>` color option | $pfe-color--surface--base |
| `--pfe-theme--color--surface--base--text` | Base `<pfe-accordion-header>` text color option | $pfe-color--surface--base--text |
| `--pfe-theme--color--surface--base--link--focus` | Focus border color for base `<pfe-accordion-header>` | $pfe-color--surface--base--link--focus |
| `--pfe-theme--color--surface--darker` | Dark `<pfe-accordion-header>` color option | $pfe-color--surface--darker |
| `--pfe-theme--color--surface--darker--text` | Dark `<pfe-accordion-header>` text color option | $pfe-color--surface--darker--text |
| `--pfe-theme--color--surface--darker--link--focus` | Focus border color for dark `<pfe-accordion-header>` | $pfe-color--surface--darker--link--focus |
| `--pfe-theme--color--surface--darkest` | Darkest `<pfe-accordion-header>` color option | $pfe-color--surface--darkest |
| `--pfe-theme--color--text--on-dark` | Darkest `<pfe-accordion-header>` text color option | $pfe-color--text--on-dark |
| `--pfe-theme--color--surface--darkest--link--focus` | Focus border color for darkest `<pfe-accordion-header>` | $pfe-color--surface--darkest--link--focus |
| `--pfe-theme--color--surface--complement` | Complement `<pfe-accordion-header>` color option | $pfe-color--surface--complement |
| `--pfe-theme--color--surface--complement--text` | Complement `<pfe-accordion-header>` text color option | $pfe-color--surface--complement--text |
| `--pfe-theme--color--surface--complement--link--focus` | Focus border color for complement `<pfe-accordion-header>` | $pfe-color--surface--complement--link--focus |
| `--pfe-theme--color--surface--accent` | Accent `<pfe-accordion-header>` color option | $pfe-color--surface--accent |
| `--pfe-theme--color--surface--accent--text` | Accent `<pfe-accordion-header>` text color option | $pfe-color--surface--accent--text |
| `--pfe-theme--color--surface--accent--link--focus` | Focus border color for accent `<pfe-accordion-header>` | $pfe-color--surface--accent--link--focus |
:::
