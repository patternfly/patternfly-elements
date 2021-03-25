# PFE-Navigation Architecture

## Light DOM & Shadow DOM Relationship

This component is (mostly) using a 'light DOM as data' approach. Meaning there is a lot of content that is added in the `<pfe-navigation>` tag that is not slotted, so it doesn't directly show up in the shadow DOM.

We're doing this so we can tightly manage the CSS and behaviors of certain parts of the component.

Slotted content (e.g. the search form) we're reserving for parts of the navigation we expect the site owner to manage the markup, styles, and behavior.

The main navigation and the logo are all cloned into the shadow DOM when the component connects (in a function called `_processLightDom()`), and is updated if there are changes in the light DOM content that needs to be copied over.

We're cloning (not moving) the light DOM elements so the site owner can make dynamic updates to the navigation if needed, and a mutation observer can catch the changes so we can bring them in.

The downside of cloning the content is no javascript behavior added to the light DOM elements will follow it into the shadow DOM version.

Our goal is to handle all of the standard analytics events, and provide custom events for anything else that needs to be caught by the light DOM.

## Navigation State

Because there is a lot of classes, aria attributes, and state to manage in the menu we've made one function to rule all navigation state `_changeNavigationState()`.

It handles almost all† of the UI logic, ensuring things like:
* only one dropdown is open at a time
* allowing a user to close the currently open toggle but keeping a parent one open
* Adding/removing any aria attributes or classes that need to be updated after the state change
* Manages focus state (but only when needed for assistive tech)

> † The exception is toggle buttons that have 'children toggles' have a little logic in their click handler. For example, the `mobile__button`'s dropdown has the main menu dropdowns, and at some breakpoints the All Red Hat dropdown.

Any time a toggle needs to be opened or closed, it should go through `_changeNavigationState`.

There are two internal helper functions in `_changeNavigationState`:
* `_openDropdown`
* `_closeDropdown`

These were made internal because they don't have all of the logic neccesary to manage the navigation's state, but do have the self contained logic for opening/closing a single dropdown.

There are also three helper functions on `PfeNavigation` that manage the attributes related to dropdowns:
* `_removeDropdownAttributes`
* `_addOpenDropdownAttributes`
* `_addCloseDropdownAttributes`

These only manage the attributes, and should only be used inside of `_changeNavigationState`, or in the case of interactions that change the properties of a dropdown, but not the navigation state (e.g. resizing the window to a point where an element isn't a dropdown).

## Javascript breakpoints

### Figuring out what breakpoint you're in
Since the breakpoints are somewhat dynamic, there is a managed attribute on the component called `breakpoint`. It is managed by `_calculateBreakpointAttribute()`, which has the logic needed to know which breakpoint the nav is currently in.

* `mobile` is when the main menu and the secondary links are collapsed into a menu burger.
* `tablet` is when only the main menu is collapsed into a burger.
* `desktop` is when there is no menu burger visible, and the main menu and secondary links are visibile in the black bar.

#### Utility functions used to calculate breakpoint
Since the 'current breakpoint' can be effected by the CSS and the JS the best way to figure out the current state is to 'calculate' certain element's styles. Calculated styles can be bad for performance, so we keep the last result and don't recalculate until  the browser's width changes.

The utility functions for calculating styles that tell us what breakpoint we're on are:
* `isMobileMenuButtonVisible()`
* `isSecondaryLinksSectionCollapsed()`

If `isMobileMenuButtonVisible()` is `false`, that means you're definitely on desktop.

If `isSecondaryLinksSectionCollapsed()` is `true` that means you're on mobile.

If `isMobileMenuButtonVisible()` is `true` and `isSecondaryLinksSectionCollapsed()` is `false`, you're on tablet.

### JS Collapsing menu parts when there's no room for them

The goal of Javascript breakpoints is to prevent the top menu bar contents from being squished or running off of the page. To do this we add CSS classes at window sizes that are dynamically calculated after render based on the content.

The 'breakpoints' JS calculate are when:
* there isn't enough room to show the main menu; so it will collapse the main menu (`.pfe-navigation__menu-wrapper`) into a burger, but the search, secondary links, and login will still show
* there isn't enough room for the menu burger, search button, and secondary links; so it the mobile menu dropdown container changes from the main menu wrapper (`.pfe-navigation__menu-wrapper`), to the wrapper for the main menu and secondary links (`.pfe-navigation__outer-menu-wrapper`).

JS breakpoints measure the room needed before elements start going off the page, and adds a `window.matchMedia` query at those points. See `_calculateMenuBreakpoints()` for more.

The functions that manage the classes that collapses parts of the nav are:
* `_collapseSecondaryLinks()`
* `_collapseMainMenu()`

### CSS for respecting JS Breakpoints

To make those collapse points work we're (unfortuately) having to duplicate layout code that relates to the menus responsiveness. The final CSS for elements with styles related to responsiveness looks something like this:

```css
.navigation-element {
  /* Mobile layout styles */
}

@media (min-width: /* When menu is _allowed to_ expand to tablet */) {
  .navigation-element {
    /* Tablet layout styles */
  }
}

@media (min-width: /* When menu is _allowed to_ expand to desktop */) {
  .navigation-element {
    /* Desktop layout styles */
  }
}

.pfe-navigation--collapse-main-menu .navigation-element {
  /* Tablet layout styles */
  /* So if JS added the collapse class, all relevant desktop styles will be overridden */
}

.pfe-navigation--collapse-secondary-links .navigation-element {
  /* Mobile layout styles */
  /* So if JS added the collapse class, all relevant tablet & desktop styles will be overridden */
}
```

To make this a little easier (hopefully), our current solution is to use the `breakpoint` and `collapse` Sass mixins. To avoid duplication of _source code_, we're using mixins to collect the layout styles for each breakpoint and print them out where needed.

For example, the previous CSS would look like this is in our SCSS:

```scss
@mixin navigation-element--mobile {
  /* Mobile layout styles */
}

@mixin navigation-element--tablet {
  /* Tablet layout styles */
}

@mixin navigation-element--desktop {
  /* Desktop layout styles */
}

.navigation-element {
  @include navigation-element--mobile;

  @include breakpoint('secondary-links') {
    // secondary-links breakpoint is when those can expand
    @include navigation-element--tablet;
  }

  @include breakpoint('main-menu') {
    // main-menu breakpoint is when the main menu (everything else) can expand
    @include navigation-element--desktop;
  }

  @include collapse('main-menu') {
    // When JS collapses the main-menu
    @include navigation-element--tablet;
  }

  @include collapse('secondary-links') {
    // When JS collapses the main-menu
    @include navigation-element--mobile;
  }
}
```

## Resize handlers
Because some of our elements (e.g. the overlay) are added/toggled/controlled by JS depending on the window size we've added a few resize handlers. Since none of these involve animation they've been debounced for performance, instead of using `requestAnimationFrame`, or something that might be run more often.

### `_preResizeAdjustments`
This is a small function that gets run as resizing is started, it simply adds `.pfe-navigation--is-resizing` to the component, which CSS uses to hide certain parts of the nav that can look quite funky mid-resize.

### `_postResizeAdjustments()`
This function does quite a bit of checking, but only gets run once after the user has stopped resizing the browser for a certain amount of time (150ms at time of writing, check to see when `_debouncedPostResizeAdjustments is set).

There are a few big changes that happen between breakpoints that JS manages or helps with:
1. What element is considered the mobile dropdown is different between each breakpoint (so we don't have to have duplicates of markup, or rearrange a bunch of elements). See `_setCurrentMobileDropdown()`
2. We move the `slot` for the search form to one place at mobile, and to another at tablet/desktop. This is to maintain a logical tab order for accessibility (see `_moveSearchSlot()`).
3. At mobile, the mobile dropdown is the full window height, at tablet it is not
4. At mobile, expandable items are animated open and closed using an inline height style that JS manages.
