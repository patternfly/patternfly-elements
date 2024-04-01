---
layout: layout-blog.njk
title: PatternFly Elements 3.0
tagline: Newer, Better, More Accessible
description: Announcing the next major release of PatternFly Elements with more components and better accessibility.
tags:
  - blog
---

This week we are pleased to announce the availability of PatternFly Elements 3.0. This includes the release of our three main packages

- [`@patternfly/elements@3.0.0`][pfe3], our web component library implementing PatternFly design
- [`@patternfly/pfe-core@3.0.0`][core3], utilities for web component authors,
    used in <abbr title="PatternFly Elements">PFE</abbr> and [<abbr title="Red Hat Design System">RHDS</abbr>][rhds]
- [`@patternfly/pfe-tools@2.0.0`][tools2], utilities for web component library maintainers,
    e.g. dev server configuration, unit test helpers, etc.

These releases include commits from Anuj Singla, Benny Powers, Brian Ferry, Gautam Krishna, Guy Bedford, Ivana Rodriguez, Luke Dary, Mark Caron, Michael Potter, Nikki Massaro Kauffman, and Steven Spriggs. Thank you for your contributions!

## Accessibility

A lot of deep thought, careful testing, and hard work went into accessibility in this release. In particular, the leadership of our Principal Engineer for Accessibility Nikki Massaro and our Producer for Accessibility Greg Gibson were critical to designing elements which serve all of our customers.

### Roving Tabindex

One of the key insights in this release cycle was that when it comes to creating accessible controls, there is often more than one way to achieve sufficient results. We relied heavily on Nikki Massaro's `RovingTabindexController` (<abbr>RTIC</abbr>) when developing new elements like `<pf-select>` as well as when updating existing elements like `<pf-tabs>`. We ship controllers like RTIC in our pfe-core package. Controllers are bits of shared functionality which can plug in to any element and provide features like accessibility patterns or positioning floating elements.

This release revises <abbr>RTIC</abbr>'s developer ergonomics, making it useful even in framework components like React, not just in web components. The roving tabindex pattern allows end users to skip over complex controls like listboxes or tab groups when navigating a page by keyboard. The user only has to "tab into" the complex control once, and they can "tab out" immediately if they wish to continue down the page. If they want to navigate within the complex control, they can do so using the arrow keys.

### Cross-root <abbr title="Accessible Rich Internet Applications">ARIA</abbr>

One of the major challenges faced during this release cycle was in adapting complex components and design patterns to the use of Shadow DOM and Form-Associated Custom Elements. As of this writing, there is yet no comprehensive cross-browser method for associating an element in one root (i.e. the main document) with an element in another root (i.e. a shadow root). An example of where this matters is in the case of dropdowns. In order to assistive technology to correctly announce the type, state, and availability of dropdown controls, the browser's internal accessibility tree must associate the button which toggles the dropdown menu open and closed with the listbox element that contains the dropdown actions.

In the case of dropdown, we wanted to offer our users the ability to slot in a custom toggle element to the dropdown control, but if we did so, then the menu (normally located within the shadow root of the dropdown) could not effectively be associated with the toggle. Our solution in that case was to require users who customize the toggle to also slot in a menu element, so that they both live in the same root.

We eagerly await the specification and implementation of cross-root <abbr title="Accessible Rich Internet Applications">ARIA</abbr> in web browsers, and our engineers continue to participate in the specification efforts at the Web Compoonents Community Group.

### The importance of manual testing

In a perfect world, browser vendors would implement accessibility specs immediately, completely, and uniformly; and assistive technology vendors would implement direct translations of the browser's internal accessibility tree to the end user. Of course, we don't live in such a world. During the development process, we rely on the browser's accessibility developer tools to understand how our complex controls appear to <abbr>AT</abbr>, and we write the majority of our unit tests as assertions against that tree ("When I click the toggle, expect the listbox to appear next to it in the tree").

We've seen again and again that just because something looks good to the developer when they inspect the AX tree, doesn't mean that all users will be able to use it. We were fortunate to have the time, care, and expert testing skills of our Accessibility Producer Greg Gibson during this development cycle. Developers often ask us how to automate accessibility testing. Our answer is always that automation can only get you so far. Cross-browser, cross-platform, manual testing is essential to ensure the widest reach for your products.

## New Elements

PatternFly Elements 3.0 continues the work started in 2.0 to bring the design and user experience into line with the PatternFly React v4 library. Behind the scenes we also expended quite a lot of effort to align our Elements internal implementations and external apis more closely with the pattern fly react library. We are looking forward to continuing this work towards pattern fly for both in terms of implementing components that we don't have yet as well as closing the future parity gaps and ensuring greater compatibility with the existing pattern fly library.

We've added several elements to our collection in this release:

- `<pf-back-to-top>` - A shortcut that allows users to quickly navigate to the top of a lengthy content page.
- `<pf-background-image>` - Allows users to place an image in the background of your page or area of a page.
- `<pf-chip>` and `<pf-chip-group>` - Used to communicate a value or a set of attribute-value pairs within workflows that involve filtering a set of objects.
- `<pf-dropdown>` - Presents a menu of actions or links in a constrained space that will trigger a process or navigate to a new location.
- `<pf-select>` - Enables users to select one or more items from a list.
- `<pf-text-area>` - Used for entering a paragraph of text that is longer than one line.

Select and dropdown in particular, because of their accessibility requirements, were a major effort this release.

### New Features

We also added features and made changes to elements released in previous versions:
- `<pf-text-input>` gets `helper-text`, `error-text`, and `validate-on` attributes, and now supports the native `pattern` and `placeholder` attributes.
- `<pf-button>` now acts itself as a button, and doesn't contain a `<button>` element in it's shadow root.
- `<pf-modal>` no longer has a `width` attribute, so use the `variant` attribute instead.
- `<pf-switch>` uses a slightly different markup for it's labels, improving accessibility.

### Tools and Utilities
The Core and Tools packages received major changes as well. Core no longer recommends the `@cascades` decorator, which was used to set a given attribute on a set of known, named child elements. Instead, we provide some helpers for using the Context Protocol via Lit's `@provide` and `@consume` decorators. We made the constructors for `InternalsController` private, in order to prevent situations in which the user tries to create more than one `ElementInternals` object for a given element (which the browser will not allow).

Steven Spriggs worked on the new `TabsAriaController`, which simplifies the process of writings tab group components. Brian Ferry added an `isEmpty` method to `SlotController`, which developers can use e.g. to hide part of an element when it has no slotted content.

We hope you emjoy using Patternfly elements in your projects, and that it helps you deliver apps and pages faster to more users.

View the full release notes here:
 - [`@patternfly/elements` 3.0][pfe-release]
 - [`@patternfly/pfe-core` 3.0][core-release]
 - [`@patternfly/pfe-tools` 2.0][tools-release]

[pfe3]: https://www.npmjs.com/package/@patternfly/elements/v/3.0.0
[core3]: https://www.npmjs.com/package/@patternfly/pfe-core/v/3.0.0
[tools2]: https://www.npmjs.com/package/@patternfly/pfe-tools/v/2.0.0
[rhds]: https://ux.redhat.com
[pfe-release]: https://github.com/patternfly/patternfly-elements/releases/tag/%40patternfly%2Felements%403.0.0
[core-release]: https://github.com/patternfly/patternfly-elements/releases/tag/%40patternfly%2Fpfe-core%403.0.0
[tools-release]: https://github.com/patternfly/patternfly-elements/releases/tag/%40patternfly%2Fpfe-tools%402.0.0
