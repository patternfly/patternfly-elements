---
layout: layout-basic.html
title: Dropdown
description: Provides a dropdown menu of links and/or actions
package: pfe-dropdown
packages:
  - pfe-dropdown
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview

Dropdown provides a dropdown menu of links and/or actions.

<pfe-dropdown label="Dropdown">
  <pfe-dropdown-item item-type="link">
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="link">
     <a href="https://patternfly.org">PatternFly</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="link" is_disabled>
     <a href="https://redhat.com">Disabled link</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
  <pfe-dropdown-item item-type="action">
     <button>Action 1</button>
  </pfe-dropdown-item>
</pfe-dropdown>
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
<pfe-dropdown label="Dropdown">
  <pfe-dropdown-item item-type="link">
    <a href="https://patternflyelements.org">PatternFly Elements</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="link">
     <a href="https://patternfly.org">PatternFly</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="link" is_disabled>
     <a href="https://redhat.com">Disabled link</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
  <pfe-dropdown-item item-type="action">
     <button>Action 1</button>
  </pfe-dropdown-item>
</pfe-dropdown>
```

### Provide dropdown items dynamically

```javascript
let dropdown = document.querySelector("pfe-dropdown");
```

When `pfe-dropdown` is defined, via the `whenDefined` method. Pass an array of `pfe-dropdown-item` objects to `pfeDropdownOptions`. 

```javascript
customElements.whenDefined("pfe-dropdown").then(function() {
  dropdown.pfeDropdownOptions = [
    {
      href: "https://patternflyelements.org",
      text: "Link 1",
      type: "link",
      is_disabled: false
    },
    {
      href: "https://patternflyelements.org",
      text: "Link 2",
      type: "link",
      is_disabled: false
    },
    {
      href: "https://patternflyelements.org",
      text: "Link 3",
      type: "link",
      is_disabled: true
    },
    {
      type: "separator"
    },
    {
      text: "Action 1",
      type: "action",
      is_disabled: false
    },
    {
      text: "Action 2",
      type: "action",
      is_disabled: true
    }
  ];
});
```
### Add dropdown items dynamically

Add individual dropdown items with the `addDropdownOptions` method. Pass an array of `pfe-dropdown-item` objects to `addDropdownOptions`. 

``` js
customElements.whenDefined("pfe-dropdown").then(function() {
  dropdown.addDropdownOptions(
    [
      {
        href: "https://patternflyelements.org",
        text: "Link 4",
        type: "link",
        is_disabled: false
      }
    ]
  );
});
```
:::

::: section
## Slots
### Default slot
The default slot should contain at least one link or action `pfe-dropdown-item` .
:::

::: section
## Attributes
### pfe-dropdown

* `label` : This is an optional attribute string that you can provide to describe your dropdown, which appears in the dropdown toggle.
* `is_disabled` : This is an optional attribute that you can provide to disable your dropdown. Visually the dropdown will look disabled and mouse or keyboard events will have no impact on it. 

### pfe-dropdown-item

* `item-type` : This is an optional attribute string that you should provide to indicate the type of dropdown item. This drives the appropriate assignment of accessibility attributes for each type of item.

 - `link` : an HTML link
 - `action` : a button that triggers some sort of action
 - `separator` : a visual separator for items in the list
:::

::: section
## Methods
### open
Manually opens the dropdown menu.
```javascript
document.querySelector("pfe-dropdown").open();
``` 

### close

Manually closes the dropdown menu.
```javascript
document.querySelector("pfe-dropdown").close();
```
:::

::: section
## Events
### pfe-dropdown:change
When an item is selected, this event is fired. It includes the inner text of the item that was selected. 
:::

::: section
## Styling hooks
None
:::