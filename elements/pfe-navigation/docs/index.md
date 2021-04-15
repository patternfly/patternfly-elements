---
layout: layout-basic.html
title: Navigation
description: Helps a user move seamlessly through a website
package: pfe-navigation
tags:
  - component
---
<script type="module" src="/elements/{{ package }}/dist/{{ package }}.min.js"></script>
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

::: section header
# {{ title }}
:::

::: section
## Overview

Navigation consists of a menu and utility section meant to help a user orient themselves and move through the website.

<img src="navigation.png" style="max-width: 100%" alt="">
<br>

<pfe-cta>
  <a href="demo">View the demo</a>
</pfe-cta>
:::

::: section
## Installation

```shell
npm install @patternfly/{{ package }}
```
:::

::: section
## Usage

```html
<pfe-navigation pfe-menu-label="Menu">
  <div slot="skip">
    <ul>
      <li><a href="#rh-main-content">Skip to content</a></li>
    </ul>
  </div>
  <a slot="logo" href="#">
    <img class="logo" src="https://via.placeholder.com/150x50.png" title="Company logo" />
  </a>
  <pfe-navigation-item slot="search" pfe-icon="web-search">
    <h2 slot="trigger"><a href="#url-to-search-page">Search</a></h2>
    <div slot="tray" hidden>
      <div class="pfe-navigation-item__tray--container">
        <form>
          <input type="text" name="search" value="" placeholder="Enter your search term"
            style="height: 30px; width: 60%; margin-right: 10px;">
          <pfe-cta priority="primary"><a href="#">Search</a></pfe-cta>
        </form>
      </div>
    </div>
  </pfe-navigation-item>
  <form slot="mobile-search" hidden>
    <input type="text" name="search" value="" placeholder="Enter your search term"
      style="height: 30px; width: 60%; margin-right: 10px;">
    <pfe-cta priority="primary"><a href="http://www.google.com">Search</a></pfe-cta>
  </form>
  <pfe-navigation-main role="navigation" aria-label="Main">
    <ul>
      <li>
        <pfe-navigation-item>
          <h3 slot="trigger">
            <a href="#">Menu item</a>
          </h3>
          <div slot="tray" hidden>
            <div class="pfe-navigation-item__tray--container">
              <div class="pfe-navigation-grid">
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">List header</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Item 1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 3</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 4</a></li>
                    </ul>
                  </div>
                </div>
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">List header 2</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Item 1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 3</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 4</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="pfe-navigation--footer">
                <div class="pfe-navigation--column">
                  <pfe-cta priority="primary"><a href="#">View all products</a></pfe-cta>
                </div>
                <div class="pfe-navigation--column">
                  <pfe-cta><a href="#">Explore our portfolio</a></pfe-cta>
                </div>
                <div class="pfe-navigation--column">
                  <pfe-cta><a href="#">Buy products online</a></pfe-cta>
                </div>
                <div class="pfe-navigation--column">
                  <pfe-cta><a href="#">Subscription model</a></pfe-cta>
                </div>
              </div>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item>
          <h3 slot="trigger">
            <a href="#">Menu item</a>
          </h3>
          <div slot="tray" hidden>
            <div class="pfe-navigation-item__tray--container">
              <div class="pfe-navigation-grid">
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">Another List header</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Item 1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 3</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 4</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
      <li>
        <pfe-navigation-item>
          <h3 slot="trigger">
            <a href="#">Menu item</a>
          </h3>
          <div slot="tray" hidden>
            <div class="pfe-navigation-item__tray--container">
              <div class="pfe-navigation-grid">
                <div class="pfe-navigation--column">
                  <div class="pfe-link-list">
                    <h4 class="pfe-link-list--header">Another List header</h4>
                    <ul class="pfe-link-list--group">
                      <li class="pfe-link-list--group-item"><a href="#">Item 1</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 2</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 3</a></li>
                      <li class="pfe-link-list--group-item"><a href="#">Item 4</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </pfe-navigation-item>
      </li>
    </ul>
  </pfe-navigation-main>
  <pfe-navigation-item slot="language" pfe-icon="web-globe">
    <h2 slot="trigger"><a href="http://www.foo.com">English</a></h2>
    <div slot="tray" hidden>
      <div class="pfe-navigation-item__tray--container">
        <p>Language switcher</p>
      </div>
    </div>
  </pfe-navigation-item>
  <a href="http://www.foo.com" slot="mobile-language" pfe-icon="web-globe">English</a>
  <pfe-navigation-item slot="login" pfe-icon="web-user">
    <h2 slot="trigger"><a href="http://www.bar.com">Log in</a></h2>
    <div slot="tray" hidden>
      <div class="pfe-navigation-item__tray--container">
        <p>Log in tray</p>
      </div>
    </div>
  </pfe-navigation-item>
  <a href="http://www.bar.com" slot="mobile-login" pfe-icon="web-user">Login/Register</a>
  <pfe-navigation-item slot="site-switcher" pfe-icon="web-grid-3x3">
    <h2 slot="trigger"><a href="http://www.bat.com">Websites</a></h2>
    <div slot="tray" hidden>
      <div class="pfe-navigation-item__tray--container">
        <h3>Site switcher tray</h3>
      </div>
    </div>
  </pfe-navigation-item>
</pfe-navigation>
```
:::

::: section
## Slots
All slots are optional and can be left off if not needed. Slots prefixed with `mobile-`, however, do require their counterparts in order to render.

### skip
This slot contains all the content for the skip navigation. Best practice is to use an unordered list with link tags that link to anchors on the page relevant to the users. These anchors can include things like: "main content", "registration form", "contact us", etc. Currently this is only available to screen-readers. Example:

```html
<div slot="skip">
    <a href="#rh-main-content">Skip to content</a>
</div>
```

### logo
This slot should contain the site's main logo. Note that there is also a CSS variable for the width of the logo, `--pfe-navigation__logo--MinWidth`. Example:

```html
<a style="--pfe-navigation__logo--MinWidth: 160px" slot="logo" href="https://company.com"><img class="logo" src="https://via.placeholder.com/150x50.png" title="Company logo" /></a>
```
### search
This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders a dropdown in the navigation for the search functionality. Inside the tray for the slot, we recommend tagging the search form or search functionality that includes the input and submit button with the attribute `pfe-navigation--mobile-search`. The element inside the search slot that is tagged with this attribute will be copied into the mobile menu and appear above the accordion for the main navigation. Example:

```html
<pfe-navigation-item slot="search" pfe-icon="web-search">
  <h2 slot="trigger"><a href="#url-to-search-page">Search</a></h2>
</pfe-navigation-item>
```

### language
This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders the dropdown for the user to select the site language. Example:

```html
<pfe-navigation-item slot="language" pfe-icon="web-globe" slot="trigger">
  <a href="http://www.foo.com">English</a>
</pfe-navigation-item>
```

### mobile-language
A simple link to a landing page containing language switching information.  Set the hidden attribute on it so that it is not visible by default. Example:

```html
<a href="/url-to-language-page" slot="mobile-language" pfe-icon="web-globe" hidden>English</a>
```
### login
This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders the dropdown for the user to log into the site. Example:

```html
<pfe-navigation-item slot="login" pfe-icon="web-user">
  <h2 slot="trigger"><a href="http://www.bar.com">Log in</a></h2>
</pfe-navigation-item>
```

### mobile-login
A simple link to a landing page containing a log in form.  Set the hidden attribute on it so that it is not visible by default. Example:

```html
<a href="/login" slot="mobile-login" pfe-icon="web-user" hidden>Login/Register</a>
```

### site-switcher
This slot can accept any html mark-up, however the `pfe-navigation-item` is recommended. When assigned to a navigation-item component, this slot renders the dropdown for the site switcher, allowing the user to navigate an ecosystem of websites. Example:

```html
<pfe-navigation-item slot="site-switcher" pfe-icon="web-grid-3x3">
  <h2 slot="trigger"><a href="http://www.bat.com">Websites</a></h2>
</pfe-navigation-item>
```
:::

::: section
## Attributes
### pfe-sticky
Allows the navigation to stick to the top of the page when the user scrolls down. Alternatively, you can opt out of having a sticky nav (the default) by adding the attribute `pfe-sticky="false"`.

### pfe-close-on-click
Currently only supports "external"; this means if a user clicks outside the component, the navigation items will close.

### pfe-menu-label
Translation for the Menu label on the main navigation dropdown.

### full-width
Allows the navigation to span the full width of the viewport.
:::

::: section
## Methods
None
:::

::: section
## Events
:::

::: section
## Styling hooks
- `--pfe-navigation--Height--actual`: When `pfe-navigation` initializes, it will create a global (on `body`) CSS variable that contains the height of the `pfe-navigation` element. Possible uses include calculating the offset for anchor links or positioning a sticky sub-header below the `pfe-navigation`.  Note that multiple `pfe-navigation` elements will write the same variable.
:::
------
::: section
## Navigation item
A navigation item is a single dropdown element; the navigation is composed of sets of navigation-items.
:::

::: section
## Slots
### trigger
Accepts a link tag with a fallback URL (used if the JS doesn't upgrade). This slot should be applied to an h-level tag. Example: `<h3 slot="trigger"><a href="http://www.redhat.com">Home</a></h3>`.
### tray
Accepts any light DOM content to be rendered inside the tray. Example: `<div slot="tray" hidden></div>`.  We recommend using the `pfe-navigation-item__tray--container` class on the wrapper element inside the tray. This will give the tray a max-width that matches the navigation tray.  Be sure to include the hidden attribute in your light DOM for the tray element so that it is hidden by default on page load.
::: 

::: section
## Attributes
### pfe-icon
Currently available icons are "bento", "user", "globe", "search", and "menu".  Adding this attribute renders that icon above the trigger.
:::

::: section
## Events
### pfe-navigation-item:open
On opening a navigation item, this event is fired.

### pfe-navigation-item:close
On closing a navigation item, this event is fired.
:::

::: section
## Dependencies

### pfe-icon
By setting the `pfe-icon` attribute on your `pfe-navigation-item`, the template will pull in and render the icon using the `pfe-icon` component.
:::
-------
::: section
## Navigation main
A primary navigation wrapper that allows us to better style the main navigation elements.
:::

::: section
## Slots
### default
Only the default slot is available to the `pfe-navigation-main` component.  This typically accepts a list object with the primary site navigation.
:::