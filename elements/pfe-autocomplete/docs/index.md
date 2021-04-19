---
layout: layout-basic.html
title: Autocomplete
description: Provides options in a dropdown list as user types in an input box
package: pfe-autocomplete
packages:
  - pfe-autocomplete
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
Autocomplete provides options in a dropdown list as user types in an input box by showing result from an API call or a static list.

<div class="pfe-l-grid pfe-m-gutters">
  <div class="pfe-l-grid__item pfe-m-6-col">
    <pfe-autocomplete id="static" debounce="300">
      <input placeholder="Enter your search term"/>
    </pfe-autocomplete>
  </div>
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

```html
<pfe-autocomplete>
  <input placeholder="Enter your search term" />
</pfe-autocomplete>
```
:::

::: section
## Setup

### autocompleteRequest
`autocompleteRequest` is a property that is assigned a function. When user types, component calls this function.

It is called inside component but we define it outside component. First param is the typed phrase by user and second param is a callback function to send api response back to the component.

In the function, we add loading attribute then send api call.  When result is ready, we remove loading attribute and  pass the result to web component by calling callback function. Here is an example:

```javascript
// autocomplete call
searchAutocomplete.autocompleteRequest = function(params, callback) {
  var xhr = new XMLHttpRequest();

  searchAutocomplete.setAttribute('loading', '');
  xhr.onload = function() {
    searchAutocomplete.removeAttribute('loading');

    if(xhr.status === 404) {
      callback([]);
    } else {
      const response = JSON.parse(xhr.responseText);
      const regx = new RegExp("\^" + params.query, "i");

      var responseReady = response.reduce(function(acc, item) {
        if (regx.test(item.name)) acc.push(item.name);
        return acc;
      }, []);
      callback(responseReady);
    }
  };

  const url = 'https://restcountries.eu/rest/v2/name/' + params.query;

  xhr.open('GET', url, true);
  xhr.send();
};
```
:::

::: section
## Slots
None
:::

::: section
## Attributes

### debounce
This attribute is optional. By default, It has been set tp 300ms. User may type very fast. We allow to input box value changes trigger autocomplete api call each 300ms.

### loading
loading is a boolean attribute. If you add this attribute on element a loading icon is added in input box. Add this attribute before autocomplete api call and remove this attribute form element when api call response is ready.

### init-value
Set this attribute when you want to set a value in input box when web component is added to page.

### is-disabled
is-disabled is a boolean attribute. Add this attribute to element when you want to make the element disabled. By adding this attribute input box and buttons become disabled.

### aria-announce-template
aria-announce-template is an optional attribute string you provide so you can provide a translated string for the aria live region that will politely announce that the number of options the user can select from as the autocomplete displays options. This string defaults to "There are ${numOptions} suggestions. Use the up and down arrows to browse." ${numOptions} will be dynamically replaced with the number of options that are shown.

### aria-label
This is an optional attribute string that you can provide on the input tag in the light DOM of pfe-autocomplete. The aria-label attribute will default to "Search".

```html
<pfe-autocomplete>
  <input placeholder="Search" aria-label="Buscar" />
</pfe-autocomplete>
```

### selected-value
By observing `selected-value` attribute you can detect autocomplete selected value.
:::

::: section
## Methods
None
:::

::: section
## Events
### pfe-autocomplete:search-event
Fires when a user performs search. By listening to this event you can get selected phrase by getting `e.detail.searchValue`.

```javascript
detail: {
  searchValue: String
}
```

### pfe-autocomplete:option-selected
Fires when a user selects an option from the dropdown list.

```javascript
detail: {
  optionValue: String
}
```
:::

::: section
## Styling hooks
None
:::

<script>
  const staticAutocomplete = document.querySelector("#static");
  const items = [
    "Item 1",
    "Item 2",
    "United States",
    "Chicago Cubs",
    "Red Hat",
    "Purple",
    "Curious George",
    "United Kingdom",
    "Elephant",
    "Baseball",
    "Bingo",
    "Book",
    "Android",
    "iOS",
    "Linux",
    "Red Hat Enterprise Linux"
  ];

  staticAutocomplete.autocompleteRequest = function(params, callback) {
    const regx = new RegExp("\^" + params.query, "i");
    callback(items.filter(function (item) {
      return regx.test(item);
    }));
  };
</script>