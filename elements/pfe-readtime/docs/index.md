---
layout: layout-basic.html
title: Readtime
description: Takes in the word count of a section and calculates the estimated read time based on language
package: pfe-readtime
packages:
  - pfe-readtime
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

This component takes in the word count of a given section and does a calculation on that number to return an estimated read time based on language.  The words-per-minute values were sourced from [this article](https://irisreading.com/average-reading-speed-in-various-languages) with the data originating from [this research](https://iovs.arvojournals.org/article.aspx?articleid=2166061).  For more information, see the [Readtime calculation information](#readtime-calculation-information) below.

<pfe-readtime for="#readtime1" hidden>%t-minute readtime</pfe-readtime>

<article id="readtime1" style="dislay: none">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</article>
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
```
:::

::: section
## Accessibility
This component functions purely as inline-content and does not require any focus state.  Should be read by screen-readers inline with it's contextual content.
:::

::: section
## Attributes

- `word-count`:  Is the data-attribute you will leverage for readtime. Example: word-count="2500" will let the component know that there is 2500 words in that section and it will do it's calculations based on that number. If you don't want to/have a data-attribute to leverage you can use id="readtime1" and it will get the word count for you.
-`wpm`: Is the attribute used to store the average words per minute readtime for each supported country. For more information on these you can read https://irisreading.com/average-reading-speed-in-various-languages and https://iovs.arvojournals.org/article.aspx?articleid=216606.
- `template`: Rather than use the light DOM region to provide the string template, you can also pass in the value via this attribute. Note that %t will be replaced with the computed readtime.
- `lang`: By default the component will look to the language specified on the html tag but it can also accept an override via this attribute on a component level.
- `for`: Specify the selector of the content you want to capture the word-count from.  Whatever you enter into this attribute will be found using `document.querySelector(<for attribute value>)`.
:::

::: section
## Readtime calculation

Average read time by country is determined using the following research: https://irisreading.com/average-reading-speed-in-various-languages

Korean read time research:
https://files.osf.io/v1/resources/xynwg/providers/osfstorage/5cb0b53ff2be3c0016ffe637?action=download&version=1&direct&format=pdf

TLDR:
For Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
:::

::: section
## Styling hooks
Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |

Coming soon.

:::