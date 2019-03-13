
# PatternFly Content set Element

## Overview

`pfe-content-set` is a combo component, which brings together the utilities of the accordion and tabs components. Effectively both of these components do the same job, which is to encapsulate chunks of information under headings for easier browsing. Hiding some information and allowing the user to toggle through the headings to show other bits of information.

Since tabs can pose a layout issue on mobile because of the lack of horizontal space, this component will first assess the width of the parent container. If the width is less than 768px, the component will render the content within the `<pfe-accordion>` component. If it is larger than this value, the content will be rendered inside the `<pfe-tabs>` component.

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

## Variants

### Style

- default (no extra attributes)
    - Accordion: On the heading, there is a caret pointing to the right, on the left edge. When expanded, a border appears around the whole content set and the caret points downward.
    - Tabs: A border appears which includes the active tab and excludes the inactive tabs. There is a colored indicator on the active tab, and a monochromatic indicator on the inactive tabs.
- `pfe-variant="primary"`  
    - Accordion: A tint appears behind every other heading, to achieve a zebra striping pattern across the stack of headings. Carets and borders from the default style still apply.
    - Tabs: Borders are removed, only an indicator appears under the active heading.
- `pfe-variant="secondary"`
    - Accordion: Headings are on a dark background, text color is reversed.
    - Tabs: Headings are encased in a block. The active heading is solid, with a caret pointing downward towards the content. Other headings have a border with no fill.
- `vertical`
    - Accordion: No effect.
    - Tabs: Headings stack on the left, content pane is shown on the right.



## Styling

Since this is a combo, all variables and styles are coming from the pfe-accordion and pfe-tabs. Please check those components if CSS variable overrides are needed.

Note that headings and content are picked up and moved inside the shadow DOM, so they cannot receive styles from CSS applied to the page.

## Code style

Content set (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
