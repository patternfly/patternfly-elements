# PatternFly Element | Navigation element
Site navigation for Orange Joe's web sites

## Usage
See the [implementation documentation](documentation/implementation.md) for how to build the appropriate markup for your site.

> If this is an upgrade from the previous version of the nav, read the [upgrade documentation](documentation/upgrading-from-old-pfe-navigation.md).

If JS is working and enabled, the component will copy specific markup from inside the `<pfe-navigation>` tag to the Shadow DOM, this allows styles and behaviors to be encapsulated so we don't get any outside code messing with the appearance or behaviors of the navigation.

Once it's working it updates an attribute `pfe-navigation[pfe-navigation-open-toggle]` with the id of an expanded dropdown's button. If nothing is open the attribute will be empty.

### Features:
* Handles responsive styling and behaviors
* Built with accessibility & SEO best practices
* Dynamic breakpoints - JS will detect when there isn't enough room for the menu or secondary links and collapse them, so breakpoints don't have to be manually set. See `pfe-navigation[breakpoint]` attribute to see what breakpoint is currently active.
* Reports an open dropdown via the attribute `pfe-navigation[open-toggle]`.
* Enclosed styling and behaviors for the main menu to avoid styling bugs
* Has backwards compatibility with the previous version of the nav

The parent DOM can also call some methods like:
* `isOpen()` - With no params returns true if _anything_ is open, otherwise specific section names can be provided to see if a specific section is open.
* `isMobileMenuButtonVisible()` - Returns true if the menu hamburger is visible, this happens around a 'tablet size' viewport.
* `isSecondaryLinksSectionCollapsed()` - Returns true if search and other secondary links get moved to the mobile dropdown menu, which is the layout for the 'mobile phone sized' screens.
* `updateOpenDropdownHeight()` - On mobile/tablet update the height inline style for the currently open dropdown


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
          src="assets/orange-joe.svg"
          width="400" alt="Orange Joe Inc." />
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
              <a href="#">Stuff and Things</a>
            </h3>
            <ul>
              <li>
                <a href="#">Orange Joe's Enterprise</a>
              </li>
              <li>
                <a href="#">Orange Joe's Bending Unit</a>
              </li>
              <li>
                <a href="#">Orange Joe's Poppler Collector</a>
              </li>
              <li>
                <a href="#">Orange Joe's Ship Piloting</a>
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
          Delivery Service
        </a>
        <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
          <div>
            <h3>
              Group 1
            </h3>
            <ul>
              <li>
                <a href="#">Orange Joe's Enterprise</a>
              </li>
              <li>
                <a href="#">Orange Joe's Bending Unit</a>
              </li>
              <li>
                <a href="#">Orange Joe's Poppler Collector</a>
              </li>
              <li>
                <a href="#">Orange Joe's Ship Piloting</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>
              Group 2
            </h3>
            <ul>
              <li>
                <a href="#">Orange Joe's Enterprise</a>
              </li>
              <li>
                <a href="#">Orange Joe's Bending Unit</a>
              </li>
              <li>
                <a href="#">Orange Joe's Poppler Collector</a>
              </li>
              <li>
                <a href="#">Orange Joe's Ship Piloting</a>
              </li>
            </ul>
          </div>
        </div> <!-- end .pfe-navigation__dropdown -->
      </li>
      <li class="pfe-navigation__menu-item">
        <a href="#" class="pfe-navigation__menu-link">
          Training
        </a>
        <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
          <ul>
            <li>
              <a href="#">Orange Joe's Enterprise</a>
            </li>
            <li>
              <a href="#">Orange Joe's Bending Unit</a>
            </li>
            <li>
              <a href="#">Orange Joe's Poppler Collector</a>
            </li>
            <li class="pfe-navigation__sub-nav-link--separator">
              <a href="#">Orange Joe's Ship Piloting</a>
            </li>
            <li>
              <a href="#">Orange Joe's Ship Piloting Example</a>
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
          Orange Joe's Promise
        </a>
      </li>
    </ul>
  </nav>

  <!-- Example of a custom link in the secondary section -->
  <div slot="secondary-links" class="pfe-navigation__secondary-links" id="pfe-navigation__secondary-links">
    <a href="#" class="">
      <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
      Deliveries
    </a>
  </div>

  <!-- Example of a custom dropdown in the secondary section -->
  <div slot="secondary-links">
    <pfe-navigation-dropdown dropdown-width="full" icon="web-globe" name="English">
      <div class="language-picker">
        <h3>Select a language</h3>
        <ul>
          <li class="pfe-headline-5">
            <a href="#/zh" class="language-link" xml:lang="zh" hreflang="zh">
              简体中文
            </a>
          </li>
          <li class="pfe-headline-5">
            <a href="#/en" class="language-link active" xml:lang="en" hreflang="en" aria-current="page">
              English
            </a>
          </li>
          <li class="pfe-headline-5">
            <a href="#/fr" class="language-link" xml:lang="fr" hreflang="fr">
              Français
            </a>
          </li>
        </ul>
      </div>
    </pfe-navigation-dropdown>
  </div>

  <div slot="search" class="pfe-navigation__search">
    <form>
      <label for="pfe-navigation__search-label1">Search</label>
      <input id="pfe-navigation__search-label1" type="text" placeholder="Search" />
      <button>Search</button>
    </form>
  </div>

  <pfe-navigation-account slot="account" login-link="#log-in" logout-link="#log-out"></pfe-navigation-account>

</pfe-navigation>
```

## Slots

- `search`: For site's search form
- `secondary-links`: For site's custom links/dropdowns that appear in the top right at desktop
- `account`: For rh-account-dropdown component or custom auth content

## Attributes

### Author controlled attributes:
- `sticky`: Add this attribute to the nav to make it stick to the top of the page.
- `debug`: Add to enable detailed event logging (will enable logging for all PFE components)
- `lang`: Detected language code.

### Component controlled attributes
- `open-toggle`: Present when a dropdown is open, the value of this is the ID of the dropdown toggle.
- `breakpoint`: Because JS detects when the nav doesn't fit, this will show the current breakpoint being used.
- `mobile-slide`: Indicates that the currently open nav item has slid the menu over, this only happens at the mobile breakpoint.


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
- `pfe-navigation:expanded-item`: Fires when any dropdown is opened, in `event.detail` it will have a reference to:
  - `toggle` element, the button that opens the dropdown
  - `pane` the dropdown element
  - `parent` the `pfe-navigation` element
- `pfe-navigation:collapsed-item`: Fires when any dropdown is closed which may be because another one was open. It will have the same references as `pfe-navigation:expanded-item`.
- `pfe-shadow-dom-event`: Fires when an element is clicked inside of a dropdown in the shadow root. This is for analytics to properly categorize and report the event. `event.detail` has:
  - `target` Element clicked
  - `parent` the `pfe-navigation` element

## CSS Variables

> The defaults are correct at time of writing, check final CSS in case any get updated without updates to README.

### General Variables
| CSS Property Name | Default | Description |
| ----------------- | ------- | ----------- |
|`--pfe-navigation--gutter` | 32px | Spacing between columns |
|`--pfe-navigation--accordion-transition` | height 0.25s ease-in-out | |
|`--pfe-navigation--content-max-width` | 1136px | How wide dropdown content can get |
|`--pfe-navigation--FontFamily` | "Red Hat Text", "RedHatText", Arial, Helvetica, sans-serif |  |
|`--pfe-navigation--ZIndex` | pfe-zindex(navigation) | Default is 98 |
|`--pfe-navigation--overlay--Background` | rgba(21, 21, 21, 0.5) |  |
|`--pfe-navigation--fade-transition-delay` | 1s | How long the navigational elements remain hidden before fading in |

### Nav Bar Variables
| CSS Property Name | Default | Description |
| ----------------- | ------- | ----------- |
|`--pfe-navigation--nav-bar--Height` | 72px | |
|`--pfe-navigation--nav-bar--Background` | #151515 | |
|`--pfe-navigation--nav-bar--Color--default` | pfe-var(ui-base--text) | Default is very dark gray |
|`--pfe-navigation--nav-bar--Color--active` | pfe-var(text) | |
|`--pfe-navigation--nav-bar--toggle--BackgroundColor--active` | pfe-var(surface--lightest) | Default is white |
|`--pfe-navigation--nav-bar--highlight-color` | pfe-var(ui-accent) | Default is blue |
|`--pfe-navigation--nav-bar--Color--on-highlight` | pfe-var(text--on-saturated) | Default is white |
|`--pfe-navigation--nav-bar--alert-color` | pfe-var(link) | Default is blue |

### Dropdown Variables
| CSS Property Name | Default | Description |
| ----------------- | ------- | ----------- |
|`--pfe-navigation--dropdown--Color` | #151515 | |
|`--pfe-navigation--dropdown--Color--on-highlight` | pfe-var(text--on-dark) | Default is white |
|`--pfe-navigation--dropdown--Color--secondary` |pfe-var(text--muted) | Default is gray |
|`--pfe-navigation--dropdown--Background` | pfe-var(surface--lightest) | Default is white |
|`--pfe-navigation--dropdown--link--Color` | pfe-var(link) | Default is blue |
|`--pfe-navigation--dropdown--link--Color--hover` | #036 |  |
|`--pfe-navigation--dropdown--headings--Color` | #464646 | |
|`--pfe-navigation--dropdown--headings--single-column--Color` | #6A6E73 | |
|`--pfe-navigation--dropdown--separator--Border` | 1px solid pfe-var(ui--border--lighter) | Default border color is light gray |
|`--pfe-navigation--dropdown--BoxShadow` | 0 1px 2px rgba(0, 0, 0, 0.12) | |
|`--pfe-navigation--dropdown--arrow--color` | #B8BBBE | |
|`--pfe-navigation--dropdown--arrow--color--active` | #6A6E73 | |
|`--pfe-navigation--dropdown--highlight-color` | pfe-var(ui-accent) | Default is blue |
|`--pfe-navigation--dropdown--single-column--spacing` | 16px |  |
|`--pfe-navigation--dropdown--full-width--spacing--mobile` | 24px | |
|`--pfe-navigation--dropdown--full-width--spacing--desktop` | 64px | |

### Mobile Dropdown Variables
| CSS Property Name | Default |
| ----------------- | ------- |
|`--pfe-navigation--mobile-dropdown--PaddingVertical` | 16px |
|`--pfe-navigation--mobile-dropdown--PaddingHorizontal` | 32px |

### Skip Links Variables
| CSS Property Name | Default |
| ----------------- | ------- |
|`--pfe-navigation--skip-link--Color` | pfe-var(link) |
|`--pfe-navigation--skip-link--BackgroundColor` | pfe-var(surface--lightest) |


## Dependencies
- `pfe-icon`
- `pfe-cta`
- `pfe-avatar`

If a login experience/account dropdown is desired, `pfe-navigation-account`.
