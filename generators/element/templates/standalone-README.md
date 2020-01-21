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

- `namedSlot`: Describe each available slot and best practices around what markup it can contain.

## Attributes

- `attr`: Describe each available attribute and what function is serves.

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

## Dependencies
Describe any dependent elements or libraries here too.

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

    npm install -g polyserve web-component-tester

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm run demo
