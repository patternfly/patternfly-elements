---
layout: layout-basic.html
title: Readtime
description: Takes in the word count of a section and calculates the estimated read time based on language
package: pfe-readtime
packages:
  - pfe-readtime
  - pfe-card
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

This component takes in the word count of a given section and does a calculation on that number to return an estimated read time based on language. The words-per-minute values were sourced from [this article](https://irisreading.com/average-reading-speed-in-various-languages) with the data originating from [this research](https://iovs.arvojournals.org/article.aspx?articleid=2166061). For more information, see the [Readtime calculation information](#readtime-calculation).

<pfe-card border><pfe-readtime word-count="500" hidden>%t-minute readtime</pfe-readtime></pfe-card>
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
    <pfe-readtime for="#readtime1" hidden>%t-minute readtime</pfe-readtime>
    <pfe-readtime word-count="1200" hidden>%t-minute readtime</pfe-readtime>
```
:::

::: section
## Accessibility
This component functions purely as inline-content and does not require any focus state.  Should be read by screen-readers inline with it's contextual content.
:::

::: section
## Attributes

- `word-count`: allows you to manually set the number of words to use in the readtime calculations. Example: `word-count="2500"` will set the component to use 2500 words in it's calculations.
- `wpm`: Is the attribute used to store the average words per minute readtime for each supported country. For more information on these you can read [https://irisreading.com/average-reading-speed-in-various-languages](https://irisreading.com/average-reading-speed-in-various-languages) and [https://iovs.arvojournals.org/article.aspx?articleid=216606](https://iovs.arvojournals.org/article.aspx?articleid=216606).
- `template`: Rather than use the light DOM region to provide the string template, you can also pass in the value via this attribute. Note that %t will be replaced with the computed readtime.
- `lang`: By default the component will look to the language specified on the html tag but it can also accept an override via this attribute on a component level.
- `for`: Specify the selector of the content you want to capture the word-count from.  Whatever you enter into this attribute will be found using `document.querySelector(<for attribute value>)`.
:::

::: section
## Readtime calculation

Average read time by country is determined using [this research](https://irisreading.com/average-reading-speed-in-various-languages). Korean read time research [can be found here](https://files.osf.io/v1/resources/xynwg/providers/osfstorage/5cb0b53ff2be3c0016ffe637?action=download&version=1&direct&format=pdf).

### TLDR
For Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
:::

::: section
## Styling hooks
Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |

Coming soon.

:::
