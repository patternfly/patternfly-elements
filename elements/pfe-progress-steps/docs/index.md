---
layout: layout-basic.html
title: Progress steps
description: Guides a user through a task with multiple sequential steps
package: pfe-progress-steps
packages:
  - pfe-progress-steps
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form).

<pfe-progress-steps>
  <pfe-progress-steps-item state="active" current>
    <div slot="title">Current</div>
    <a slot="link" href="#">View current step</a>
  </pfe-progress-steps-item>
  <pfe-progress-steps-item>
    <div slot="title">Next</div>
    <a slot="link" href="#">View next step</a>
  </pfe-progress-steps-item>
  <pfe-progress-steps-item>
    <div slot="title">Last</div>
    <a slot="link" href="#">View last step</a>
  </pfe-progress-steps-item>
</pfe-progress-steps>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

```html
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
```


<pfe-cta><a href="../../elements/{{ package }}/demo">Demo</a></pfe-cta>
:::

::: section
## Attributes

### pfe-progress-steps

- `vertical`: Describe each available attribute and what function is serves.
### pfe-progress-steps-item

- `current`: Indicates if this item is the current active item.
- `state`: Describes the state of the current item; allows "inactive", "done", or "error".
:::

::: section
## Styling hooks
Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-progress-steps__item--Width` | var(--pfe-theme--ui--element--size--lg, 75px) | item |
| `--pfe-progress-steps__circle--Size` | var(--pfe-theme--ui--element--size--md, 32px) | circle |
| `--pfe-progress-steps__progress-bar--Color` | var(--pfe-theme--color--ui--border--lighter, #d2d2d2) | progress |
| `--pfe-progress-steps__progress-bar--Fill` | var(--pfe-theme--color--ui-accent, #06c) | progress |
| `--pfe-progress-steps__progress-bar--Width` | var(--pfe-theme--ui--border-width--md, 2px) | progress |
| --- | --- | --- |
| `--pfe-progress-steps-item--Width` | auto |  |
| `--pfe-progress-steps-item--MinHeight--vertical` | var(--pfe-progress-steps__item--Width, var(--pfe-theme--ui--element--size--lg, 75px)) |  |
| `--pfe-progress-steps-item__circle--Size` | var(--pfe-theme--ui--element--size--md, 32px) | circle |
| `--pfe-progress-steps-item__circle--Color` | var(--pfe-theme--color--feedback--info, #06c) | circle |
| `--pfe-progress-steps-item__circle--Color--hover` | var(--pfe-theme--color--feedback--info, #06c) | circle |
| `--pfe-progress-steps-item__circle--Color--focus` | var(--pfe-theme--color--feedback--info, #06c) | circle |
| `--pfe-progress-steps-item__circle--Background` | radial-gradient(circle, white 60%, rgba(255, 255, 255, 0) 61%) | circle |
| `--pfe-progress-steps-item__circle--Width` | var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) | circle |
| `--pfe-progress-steps-item__circle--Height` | var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) | circle |
| `--pfe-progress-steps-item__circle-wrapper--Width` | var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |
| `--pfe-progress-steps-item__circle-wrapper--Height` | var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |
| `--pfe-progress-steps-item__title--Color` | var(--pfe-theme--color--text, #151515) | title |
| `--pfe-progress-steps-item__title--Color--active` | var(--pfe-theme--color--feedback--info, #06c) | title |
| `--pfe-progress-steps-item__title--Color--error` | var(--pfe-theme--color--feedback--critical--lighter, #c9190b) | title |
| `--pfe-progress-steps-item__title--MarginTop--vertical` | calc( var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) / 6) | title |
| `--pfe-progress-steps-item__description--Color` | var(--pfe-theme--color--text--muted, #6a6e73) | description |
| `--pfe-progress-steps-item__description--Color--error` | var(--pfe-theme--color--feedback--critical--lighter, #c9190b) | description |
| `--pfe-progress-steps-item--spacer` | var(--pfe-theme--content-spacer--body--sm, 0.5rem) |  |
| `--pfe-progress-steps-item__circle-inner--Width` | calc( var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) / 2.2) | circle |
| `--pfe-progress-steps-item__circle-inner--Height` | calc( var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) / 2.2) | circle |
| `--pfe-progress-steps-item__circle-outer--Width` | var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |
| `--pfe-progress-steps-item__circle-outer--Height` | var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |

:::