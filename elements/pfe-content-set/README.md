
# PatternFly Content set

## Overview

`pfe-content-set` is a combo component, which brings together the utilities of the accordion and tabs components. Effectively both of these components do the same job, which is to encapsulate chunks of information under headings for easier browsing. Hiding some information and allowing the user to toggle through the headings to show other bits of information.

Since tabs can pose a layout issue on mobile because of the lack of horizontal space, this component will first assess the width of the parent container. If the width of pfe-content-set is less than or equal to 700px, the component will render the content within the `<pfe-accordion>` component. If it is larger than this value, the content will be rendered within the `<pfe-tabs>` component.

_Note:_ In IE11, the component will only render as accordions and never as tabs.

## Dependencies

Requires both the `pfe-accordion` and `pfe-tabs` components, as well as the base `pfelement`.

## Usage

Each header must have an attribute of `pfe-content-set--header` and each panel must have an attribute of `pfe-content-set--panel`. Each header must be immediately followed by a panel.

```html
<pfe-content-set>
  <h2 pfe-content-set--header>Heading 1</h2>
  <p pfe-content-set--panel>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
  <h2 pfe-content-set--header>Heading 2</h2>
  <p pfe-content-set--panel>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam volu et jen, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  <h2 pfe-content-set--header>Heading 3</h2>
  <p pfe-content-set--panel>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
</pfe-content-set>

```

## Attributes

**`pfe-tab-history`** (observed)

If `pfe-content-set` renders as `pfe-tabs`, the `pfe-tab-history` attribute
enables the component to update window.history and the URL to create sharable
links.

With the `pfe-tab-history` attribute, `pfe-content-set` and elements with the
`pfe-content-set--header` attribute *must* have an `id` attribute set for this
to work.

##### Example Markup
```html
<pfe-content-set id="my-content-set" pfe-tab-history>
  <h2 pfe-content-set--header id="heading1">Heading 1</h2>
  <p pfe-content-set--panel id="panel1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
  <h2 pfe-content-set--header id="heading2">Heading 2</h2>
  <p pfe-content-set--panel id="panel2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
</pfe-content-set>
```

becomes

```html
<pfe-content-set id="my-content-set" pfe-tab-history>
  <pfe-tabs id="my-content-set">
    <pfe-tab id="heading1">
      <h2 pfe-content-set--header id="heading1">Heading 1</h2>
    </pfe-tab>
    <pfe-tab-panel id="panel1">
      <p pfe-content-set--panel id="panel1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
    </pfe-tab-panel>
    <pfe-tab id="heading2">
      <h2 pfe-content-set--header id="heading2">Heading 1</h2>
    </pfe-tab>
    <pfe-tab-panel id="panel2">
      <p pfe-content-set--panel id="panel2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
    </pfe-tab-panel>
  </pfe-tabs>
</pfe-content-set>
```

Note how the `id` attributes from `pfe-content-set` and elements with the
`pfe-content-set--header` attribute pass the value of the `id` attribute to
its corresponding tab element and sets the `pfe-id` attribute.

#### How to use a URL pattern to open a specific tab

The URL pattern will be `?{id-of-tabs}={id-of-selected-tab}`. In the example
above, selecting "Heading 2" will update the URL as follows:
`?my-content-set=heading2`.


If `pfe-content-set` renders as `pfe-tabs`, by default, `pfe-tabs` will read
the URL and look for a query string parameter that matches the `pfe-id` of a
`pfe-tabs` component and a value of a specific `pfe-tab`.

`pfe-content-set` and elements with the `pfe-content-set--header` attribute
*must* have an `id` attribute set for this to work.

##### Example Markup
```html
<pfe-content-set id="my-content-set">
  <h2 pfe-content-set--header id="heading1">Heading 1</h2>
  <p pfe-content-set--panel id="panel1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
  <h2 pfe-content-set--header id="heading2">Heading 2</h2>
  <p pfe-content-set--panel id="panel2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
</pfe-content-set>
```

becomes

```html
<pfe-content-set id="my-content-set">
  <pfe-tabs id="my-content-set">
    <pfe-tab id="heading1">
      <h2 pfe-content-set--header id="heading1">Heading 1</h2>
    </pfe-tab>
    <pfe-tab-panel id="panel1">
      <p pfe-content-set--panel id="panel1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
    </pfe-tab-panel>
    <pfe-tab id="heading2">
      <h2 pfe-content-set--header id="heading2">Heading 1</h2>
    </pfe-tab>
    <pfe-tab-panel id="panel2">
      <p pfe-content-set--panel id="panel2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore </p>
    </pfe-tab-panel>
  </pfe-tabs>
</pfe-content-set>
```

For example, `?my-content-set=heading2` would open the second tab in the
code sample above. "my-content-set" is equal to the `pfe-id` of the `pfe-tabs`
component and "heading2" is equal to the `pfe-id` of the second tab in the tab
set.

In the event that a tab with the supplied id in the URL does not exist,
`pfe-tabs` will fall back to the `selected-index` attribute if one is supplied
in the markup, or the first tab if `selected-index` is not provided.

*Note:* This feature is not supported in IE11.

## Variants

### Style

- default (no extra attributes)
    - Accordion: On the heading, there is a caret pointing to the right, on the left edge. When expanded, a border appears around the whole content set and the caret points downward.
    - Tabs: A border appears which includes the active tab and excludes the inactive tabs. There is a colored indicator on the active tab, and a monochromatic indicator on the inactive tabs.
- `variant="wind"`  
    - Accordion: No effect.
    - Tabs: Borders are removed, only an accent colored indicator appears under the active heading.
- `variant="earth"`
    - Accordion: No effect.
    - Tabs: Headings are encased in a block. The active heading has an accent colored border on one side.
- `vertical`
    - Accordion: No effect.
    - Tabs: Headings stack on the left, content pane is shown on the right.
- `align="center"`
    - Accordion: No effect.
    - Tabs: Tabs are centered.
- `breakpoint="500px`
    - You may set a custom breakpoint at which the content set upgrade to tabs above that number and accordions below.
    - The value can contain the `px` suffix or not


## Styling

Since this is a combo, all variables and styles are coming from the pfe-accordion and pfe-tabs. Please check those components if CSS variable overrides are needed.

Note that headings and content are picked up and moved inside the shadow DOM, so they cannot receive styles from CSS applied to the page.

## Code style

Content set (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
