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

@todo JS breakpoints

@todo Sass breakpoint & collapse mixins
