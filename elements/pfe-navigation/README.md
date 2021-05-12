# PatternFly Element | Navigation element
Site navigation for Red Hat web sites

## Usage
See the [implementation documentation](documentation/implementation.md) for how to build the appropriate markup for your site.

> If this is an upgrade from the previous version of the nav, read the [upgrade documentation](documentation/upgrading-from-old-pfe-navigation.md).

If JS is working and enabled, the component will copy specific markup from inside the `<pfe-navigation>` tag to the Shadow DOM, this allows styles and behaviors to be encapsulated so we don't get any outside code messing with the appearance or behaviors of the navigation.

Once it's working it updates an attribute `pfe-navigation[pfe-navigation-open-toggle]` with the id of an expanded dropdown's button. If nothing is open the attribute will be empty.

### Features:
* Handles responsive styling and behaviors
* Built with accessibility & SEO best practices
* Dynamic breakpoints - JS will detect when there isn't enough room for the menu or secondary links and collapse them, so breakpoints don't have to be manually set
* Reports it's state to the page via the attribute `pfe-navigation-open-toggle` on the `pfe-navigation` tag
* Enclosed styling and behaviors to avoid conflicts and bugs

The parent DOM can also call some methods like:
* `isOpen()` - With no params returns true if _anything_ is open, otherwise specific section names can be provided to see if a specific section is open.
* `isMobileMenuButtonVisible()` - Returns true if the menu hamburger is visible, this happens around a 'tablet size' viewport.
* `isSecondaryLinksSectionCollapsed()` - Returns true if search and other secondary links get moved to the mobile dropdown menu, which is the layout for the 'mobile phone sized' screens.


Example markup:

```html
<!-- These links should be directly after <body> -->
<a href="#pfe-navigation" class="visually-hidden skip-link">Skip to navigation</a>
<!-- !! Update anchor link to main/content -->
<a href="#ADD-ID-TO-MAIN" class="visually-hidden skip-link">Skip to content</a>

<pfe-navigation id="pfe-navigation" role="banner">
  <nav class="pfe-navigation" aria-label="Main Navigation">
    <div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
      <a href="#" class="pfe-navigation__logo-link">
        <img
          class="
            pfe-navigation__logo-image
            pfe-navigation__logo-image--screen
            pfe-navigation__logo-image--small"
          src="assets/redhat--reverse.svg"
          width="400" alt="Redhat" />
        <img
          class="
            pfe-navigation__logo-image
            pfe-navigation__logo-image--print"
          src="assets/redhat.svg"
          width="400" alt="Redhat" />
      </a>
    </div>
    <ul class="pfe-navigation__menu" id="pfe-navigation__menu">
      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Products
        </a>

        <div class="pfe-navigation__dropdown">
          <div>
            <h3>
              <a href="#">Platforms</a>
            </h3>
            <ul>
              <li>
                <a href="#">Red Hat Enterprise Linux</a>
              </li>
              <li>
                <a href="#">Red Hat JBoss Enterprise Application Platform</a>
              </li>
              <li>
                <a href="#">Red Hat OpenStack Platform</a>
              </li>
              <li>
                <a href="#">Red Hat Virtualization</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <a href="#">Ladders</a>
            </h3>
            <ul>
              <li>
                <a href="#">Lorem ipsum</a>
              </li>
              <li>
                <a href="#">Dolor sit amet</a>
              </li>
              <li>
                <a href="#">Wakka Wakka</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <a href="#">Chutes</a>
            </h3>
            <ul>
              <li>
                <a href="#">Yakkita yakkita</a>
              </li>
              <li>
                <a href="#">Enterprise Yakkita yakkita</a>
              </li>
              <li>
                <a href="#">Upstream Yakkita</a>
              </li>
              <li>
                <a href="#">Yakkita ME</a>
              </li>
            </ul>
          </div>

          <div class="pfe-navigation__footer">
            <pfe-cta pfe-priority="primary">
              <a href="#">Learn more about PFElements</a>
            </pfe-cta>

            <pfe-cta>
              <a href="https://github.com/">GitHub</a>
            </pfe-cta>
          </div>
        </div>
      </li>

      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Solutions
        </a>
        <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
          <div>
            <h3>
              Group 1
            </h3>
            <ul>
              <li>
                <a href="#">Red Hat Enterprise Linux</a>
              </li>
              <li>
                <a href="#">Red Hat JBoss Enterprise Application Platform</a>
              </li>
              <li>
                <a href="#">Red Hat OpenStack Platform</a>
              </li>
              <li>
                <a href="#">Red Hat Virtualization</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>
              Group 2
            </h3>
            <ul>
              <li>
                <a href="#">Red Hat Enterprise Linux</a>
              </li>
              <li>
                <a href="#">Red Hat JBoss Enterprise Application Platform</a>
              </li>
              <li>
                <a href="#">Red Hat OpenStack Platform</a>
              </li>
              <li>
                <a href="#">Red Hat Virtualization</a>
              </li>
            </ul>
          </div>
        </div> <!-- end .pfe-navigation__dropdown -->
      </li>
      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Learning & Support
        </a>
        <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
          <ul>
            <li>
              <a href="#">Red Hat Enterprise Linux</a>
            </li>
            <li>
              <a href="#">Red Hat JBoss Enterprise Application Platform</a>
            </li>
            <li>
              <a href="#">Red Hat OpenStack Platform</a>
            </li>
            <li class="pfe-navigation__sub-nav-link--separator">
              <a href="#">Red Hat Virtualization</a>
            </li>
            <li>
              <a href="#">Red Hat Virtualization Example</a>
            </li>
          </ul>
        </div> <!-- end .pfe-navigation__dropdown -->
      </li>
      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Resources
        </a>
      </li>
      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Red Hat & Open Source
        </a>
      </li>
      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Really Long Menu Title
        </a>
      </li>
    </ul>
  </nav>

  <!-- Example of a custom link in the secondary section -->
  <div slot="pfe-navigation--custom-links" class="pfe-navigation__custom-links" id="pfe-navigation__custom-links">
    <a href="#" class="">
      <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
      Custom Link
    </a>
  </div>

  <!-- Example of a custom dropdown in the secondary section -->
  <div slot="pfe-navigation--custom-links">
    <pfe-navigation-dropdown pfe-width="full" pfe-icon="web-globe" pfe-name="Language">
      <div class="language-picker">
        <h3>Select a language</h3>
        <ul>
          <li class="pfe-headline-5">
            <a href="/zh" class="language-link" xml:lang="zh" hreflang="zh">
              简体中文
            </a>
          </li>
          <li class="pfe-headline-5">
            <a href="/en" class="language-link active" xml:lang="en" hreflang="en" aria-current="page">
              English
            </a>
          </li>
          <li class="pfe-headline-5">
            <a href="/fr" class="language-link" xml:lang="fr" hreflang="fr">
              Français
            </a>
          </li>
        </ul>
      </div>
    </pfe-navigation-dropdown>
  </div>

  <div slot="pfe-navigation--search" class="pfe-navigation__search">
    <form>
      <label for="pfe-navigation__search-label1">Search</label>
      <input id="pfe-navigation__search-label1" type="text" placeholder="Search" />
      <button>Search</button>
    </form>
  </div>

  <pfe-navigation-account slot="pfe-navigation--account" login-link="#log-in" logout-link="#log-out"></pfe-navigation-account>

</pfe-navigation>
```

## Slots

- `pfe-navigation--search`: For local site's search form
- `pfe-navigation--custom-links`: For local site's custom links that need to appear in the nav bar
- `pfe-navigation--account`: Slot for pfe-navigation-account, which powers the login experience and account dropdown.

## Attributes

- `pfe-navigation-open-toggle`: Is present if any section of the navigation is expanded and gives a name of the specific element that is open


## Getting Started

Build the web component
```shell
npm run build
```

Run small web server to serve built files
```shell
npm start
```

Run tests
```shell
npm run test
```

## Code style

Navigation (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester



## Events
@todo Document component events


## Dependencies
If a login experience/account dropdown is desired, pfe-navigation-account and @chapeaux/cpx-user are required.
