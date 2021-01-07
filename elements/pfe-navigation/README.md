# PatternFly Element | Navigation Element

## Navigation element

This element will give you a top-level navigation element (not for use as subnavigation).  It is comprised of 2 sub-components: `pfe-navigation-item` and `pfe-navigation-main`.

### Slots

All slots are optional and can be left off if not needed. Slots prefixed with `mobile-`, however, do require their counterparts in order to render.

- `skip`: This slot contains all the content for the skip navigation. Best practice is to use an unordered list with link tags that link to anchors on the page relevant to the users. These anchors can include things like: "main content", "registration form", "contact us", etc. Currently this is only available to screen-readers. Example:

    ```
    <div slot="skip">
       <a href="#rh-main-content">Skip to content</a>
    </div>
    ```

- `logo`: This slot should contain the site's main logo. Note that there is also a CSS variable for the width of the logo, `--pfe-navigation__logo--MinWidth`. Example:

    ```
    <a style="--pfe-navigation__logo--MinWidth: 160px" slot="logo" href="https://company.com"><img class="logo" src="https://via.placeholder.com/150x50.png" title="Company logo" /></a>
    ```
- `search`: This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders a dropdown in the navigation for the search functionality. Inside the tray for the slot, we recommend tagging the search form or search functionality that includes the input and submit button with the attribute `pfe-navigation--mobile-search`. The element inside the search slot that is tagged with this attribute will be copied into the mobile menu and appear above the accordion for the main navigation. Example:

    ```
    <pfe-navigation-item slot="search" pfe-icon="web-search">
      <h2 slot="trigger"><a href="#url-to-search-page">Search</a></h2>
    </pfe-navigation-item>
    ```
- `language`: This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders the dropdown for the user to select the site language. Example:

    ```
    <pfe-navigation-item slot="language" pfe-icon="web-globe" slot="trigger">
      <a href="http://www.foo.com">English</a>
    </pfe-navigation-item>
    ```
- `mobile-language`: A simple link to a landing page containing language switching information.  Set the hidden attribute on it so that it is not visible by default. Example:

    ```
    <a href="/url-to-language-page" slot="mobile-language" pfe-icon="web-globe" hidden>English</a>
    ```
- `login`: This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders the dropdown for the user to log into the site. Example:

    ```
    <pfe-navigation-item slot="login" pfe-icon="web-user">
      <h2 slot="trigger"><a href="http://www.bar.com">Log in</a></h2>
    </pfe-navigation-item>
    ```
- `mobile-login`: A simple link to a landing page containing a log in form.  Set the hidden attribute on it so that it is not visible by default. Example:
    ```
    <a href="/login" slot="mobile-login" pfe-icon="web-user" hidden>Login/Register</a>
    ```
- `site-switcher`: This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders the dropdown for the site switcher, allowing the user to navigate an ecosystem of websites. Example:

    ```
    <pfe-navigation-item slot="site-switcher" pfe-icon="web-grid-3x3">
      <h2 slot="trigger"><a href="http://www.bat.com">Websites</a></h2>
    </pfe-navigation-item>
    ```

### Attributes

- `pfe-sticky`: Allows the navigation to stick to the top of the page when the user scrolls down. Alternatively, you can opt out of having a sticky nav (the default) by adding the attribute `pfe-sticky="false"`.
- `pfe-close-on-click`: Currently only supports "external"; this means if a user clicks outside the component, the navigation items will close.
- `pfe-menu-label`: Translation for the Menu label on the main navigation dropdown.
- `pfe-full-width`: Allows the navigation to span the full width of the viewport.

### CSS Variables

 - `--pfe-navigation--Height--actual`: When `pfe-navigation` initializes, it will create a global (on `body`) CSS variable that contains the height of the `pfe-navigation` element. Possible uses include calculating the offset for anchor links or positioning a sticky sub-header below the `pfe-navigation`.  Note that multiple `pfe-navigation` elements will write the same variable.

---

## Navigation item

A navigation item is a single dropdown element; the navigation is composed of sets of navigation-items.

### Slots

- `trigger`: Accepts a link tag with a fallback URL (used if the JS doesn't upgrade). This slot should be applied to an h-level tag. Example: `<h3 slot="trigger"><a href="http://www.redhat.com">Home</a></h3>`.
- `tray`: Accepts any light DOM content to be rendered inside the tray. Example: `<div slot="tray" hidden></div>`.  We recommend using the `pfe-navigation-item__tray--container` class on the wrapper element inside the tray. This will give the tray a max-width that matches the navigation tray.  Be sure to include the hidden attribute in your light DOM for the tray element so that it is hidden by default on page load.

### Attributes

- `pfe-icon`: Currently available icons are "bento", "user", "globe", "search", and "menu".  Adding this attribute renders that icon above the trigger.

### Events

- `pfe-navigation-item:open`: On opening a navigation item, this event is fired.
- `pfe-navigation-item:close`: On closing a navigation item, this event is fired.

### Dependencies

- `<pfe-icon>`: By setting the `pfe-icon` attribute on your `pfe-navigation-item`, the template will pull in and render the icon using the `pfe-icon` component.

---

## Navigation main

A primary navigation wrapper that allows us to better style the main navigation elements.

### Slots

- `default`: Only the default slot is available to the `pfe-navigation-main` component.  This typically accepts a list object with the primary site navigation.

---

## General dependencies

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

    npm install -g polyserve web-component-tester

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and Polyserve will start a server and open your default browser to the demo page of the element.

## Code style

Navigation (and all PatternFly Elements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
