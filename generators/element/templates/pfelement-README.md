# PatternFly Element | <%= readmeName %> element
<%= description %>

## Usage
Describe how best to use this web component along with best practices.

```html
<<%= elementName %>>
    <!-- Default slot -->
    <h2>This is <%= elementName %></h2>
    <% if (slots.length > 0) { %><!-- Named slots --><% for(let i = 0; i < slots.length; i++) { %>
    <div slot="<%= slots[i] %>"><%= slots[i] %> slot</div><% } } %>
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

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-<%= elementName %>--Color` | `#252527` | N/A |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.

<%_ for(let i = 0; i < events.length; i++) { _%>
### <%= elementName %>:<%= events[i] %>

<%_ } _%>

## Dependencies
Describe any dependent elements or libraries here too.

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

<%= readmeName %> (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
