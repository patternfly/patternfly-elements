# <%= readmeName %> Element
A brief description of the web component, it's purpose and goals.

## Usage
Describe how best to use this web component along with best practices.

```html
<<%= elementName %>>
    <h2>This is <%= elementName %></h2>
    <!-- Slots --><% for(let i = 0; i < slots.length; i++) { %>
    <div slot="<%= slots[i] %>"><%= slots[i] %> slot</div><% } %>
</<%= elementName %>>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

<%_ if (slots.length > 0) { _%>
<%_ for(let i = 0; i < slots.length; i++) { _%>
- `<%= slots[i] %>`: Describe this slot and best practices around what markup it can contain.
<%_ } _%>
<%_ } else { _%>
- `namedSlot`: Describe each available slot and best practices around what markup it can contain.
<%_ } _%>

## Attributes

<%_ if (attributes.length > 0) { _%>
<%_ for(let i = 0; i < attributes.length; i++) { _%>
- `<% if (isPfelement) { %>pfe-<% } %><%= attributes[i] %>`: Describe this attribute and what function is serves.
<%_ } _%>
<%_ } else { _%>
- `attr`: Describe each available attribute and what function is serves.
<%_ } _%>

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

<%_ for(let i = 0; i < events.length; i++) { _%>
### <%= elementName %>:<%= events[i] %>

<%_ } _%>

## Dependencies
Describe any dependent elements or libraries here too.

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

`npm install -g polyserve web-component-tester`

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the root directory, run:

    `npm run live-demo`
