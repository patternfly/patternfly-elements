---
layout: layout-basic.html
title: Datetime
description: Display dates and times in a consistent format
package: pfe-datetime
packages:
  - pfe-datetime
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

Datetime enables developers to get a lot of the features from the [Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) just by using attributes to set the format of the date and time they'd like to display.

Current date: 
<strong>
  <pfe-datetime
    class="overview-datetime"
    type="local"
    day="numeric"
    month="long"
    year="numeric">
  </pfe-datetime>
</strong>
<br>
With a Spanish language code of es:
<strong>
  <pfe-datetime
    class="overview-datetime"
    type="local"
    day="numeric"
    month="long"
    year="numeric"
    locale="es">
  </pfe-datetime>
</strong>
<br>
Time adverbial:
<strong>
  <pfe-datetime
    id="minutesago"
    type="relative">
  </pfe-datetime>
</strong>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

### Just the date
<pfe-datetime
  datetime="Mon Jan 1 15:04:05 EST 2021"
  type="local"
  day="numeric"
  month="long"
  year="numeric">
  Mon Jan 1 15:04:05 EST 2021
</pfe-datetime>
```html
<pfe-datetime
  datetime="Mon Jan 1 15:04:05 EST 2021"
  type="local"
  day="numeric"
  month="long"
  year="numeric">
  Mon Jan 1 15:04:05 EST 2021
</pfe-datetime>
```

### With time
<pfe-datetime
  datetime="Mon Jan 1 15:04:05 EST 2021"
  type="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit">
  Mon Jan 1 15:04:05 EST 2021
</pfe-datetime>
```html
<pfe-datetime
  datetime="Mon Jan 1 15:04:05 EST 2021"
  type="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit">
  Mon Jan 1 15:04:05 EST 2021
</pfe-datetime>
```

### With an en-GB locale
<pfe-datetime
  datetime="Mon Jan 1 15:04:05 EST 2021"
  type="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit"
  locale="en-GB">
  Mon Jan 1 15:04:05 EST 2021
</pfe-datetime>

```html
<pfe-datetime
  datetime="Mon Jan 1 15:04:05 EST 2021"
  type="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit"
  locale="en-GB">
  Mon Jan 1 15:04:05 EST 2021
</pfe-datetime>
```

### Time adverbial
<pfe-datetime
  type="relative"
  datetime="Mon Jan 2 15:04:05 EST 2010">
  Mon Jan 2 15:04:05 EST 2010
</pfe-datetime>

```html
<pfe-datetime
  type="relative"
  datetime="Mon Jan 2 15:04:05 EST 2010">
  Mon Jan 2 15:04:05 EST 2010
</pfe-datetime>
```
:::

::: section
## Slots
None
:::

::: section
## Attributes
### datetime (observed)

The value of this should be the same timestamp that you add to the light DOM.

### timestamp (observed)

A unix timestamp that will be converted for use in displaying the appropriate date. You would not use both datetime and timestamp, and the last updated will take precedence.

### type (observed)

The options for type are:
- `local`: Shows a formatted time for the indicated locale if provided
- `relative`: Shows a relative time (1 hour ago, 2 hours until)

### weekday

Possible values: `narrow`, `short`, `long`

### month

Possible values: `numeric`, `2-digit`, `narrow`, `short`, `long`

### day

Possible values: `numeric`, `2-digit`

### year

Possible values: `numeric`, `2-digit`

### hour

Possible values: `numeric`, `2-digit`

### minute

Possible values: `numeric`, `2-digit`

### second

Possible values: `numeric`, `2-digit`
:::

::: section
## Methods
None
:::

::: section
## Events
None
:::

::: section
## Styling hooks
None
:::

<script>
  const datetimeComponents = [...document.querySelectorAll(".overview-datetime")];
  const minutesAgo = document.querySelector("#minutesago");
  const date = new Date();

  datetimeComponents.forEach(component => {
    component.setAttribute("datetime", date);
    component.textContent = date;
  });

  minutesAgo.setAttribute('datetime', new Date(Date.now() - 600000).toString());
</script>