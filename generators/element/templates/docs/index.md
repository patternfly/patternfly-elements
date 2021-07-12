---
layout: layout-basic.html
title: <%= readmeName %>
description: <%= description %>
package: <%= elementName %>
packages: 
  - <%= elementName %>
tags:
  - component
---

::: section header
# {{ title }}
:::

::: section
## Overview
<%= description %>

<<%= elementName %>>
    <!-- Default slot -->
    <h2>This is <%= elementName %></h2>
    <% if (slots.length > 0) { %><!-- Named slots --><% for(let i = 0; i < slots.length; i++) { %>
    <div slot="<%= slots[i] %>"><%= slots[i] %> slot</div><% } } %>
</<%= elementName %>>
:::

::: section
## Installation

```shell
npm install @patternfly/<%= elementName %>
```
:::

::: section
## Usage

```html
<<%= elementName %>>
    <!-- Default slot -->
    <h2>This is <%= elementName %></h2>
    <% if (slots.length > 0) { %><!-- Named slots --><% for(let i = 0; i < slots.length; i++) { %>
    <div slot="<%= slots[i] %>"><%= slots[i] %> slot</div><% } } %>
</<%= elementName %>>
```
:::

<%_ if (slots.length > 0) { _%>
::: section
## Slots

<%_ for(let i = 0; i < slots.length; i++) { _%>
- `<%= slots[i] %>`: Describe this slot and best practices around what markup it can contain.
<%_ } _%>
:::
<%_ } _%>

::: section
## Attributes
<%_ if (attributes.length > 0) { _%>
<%_ for(let i = 0; i < attributes.length; i++) { _%>
### `<%= attributes[i] %>`
Describe this attribute and what function is serves.
<%_ } _%>
<%_ } else { _%>
- `attr`: Describe each available attribute and what function is serves.
<%_ } _%>
:::

::: section
## Methods
Describe the important API hooks available on this component.
:::

::: section
## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

<%_ for(let i = 0; i < events.length; i++) { _%>
### <%= elementName %>:<%= events[i] %>
<%_ } _%>
:::

::: section
## Styling hooks
| Theme hook | Description | Default |
| --- | --- | --- |
| | | |
:::