# PatternFly Element | Navigation element
Site navigation for Red Hat web sites

## Usage
Describe how best to use this web component along with best practices.

```html
    <pfe-navigation id="pfe-navigation">
      <nav class="pfe-navigation" aria-label="Main Navigation">
        <div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
          <a href="#" class="pfe-navigation__logo-link">
            <img class="pfe-navigation__logo-image pfe-navigation__logo-image--mobile" src="assets/redhat--reverse.svg" width="400" alt="Redhat" />
            <img class="pfe-navigation__logo-image pfe-navigation__logo-image" src="assets/redhat-customer-portal--reverse.svg" width="400" alt="Redhat Customer Portal" />
          </a>
        </div>
        <ul class="pfe-navigation__menu" id="pfe-navigation__menu">
          <li class="pfe-navigation__menu-item">
            <a href="#" class="pfe-navigation__menu-link" aria-haspopup="true" aria-expanded="false">
              Products
            </a>
              <div class="pfe-navigation__drawer">
                <section>
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
                </section>
                <section>
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
                </section>
                <section>
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
                </section>
                <section>
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
                </section>
                <section>
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
                </section>
                <section>
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
                </section>
              </div>
          </li>
          <li class="pfe-navigation__menu-item">
            <a href="#" class="pfe-navigation__menu-link">
              Solutions
            </a>
          </li>
          <li class="pfe-navigation__menu-item">
            <a href="#" class="pfe-navigation__menu-link">
              Learning & Support
            </a>
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
        </ul>
      </nav>

      <div slot="pfe-navigation--custom-links" class="pfe-navigation__custom-links" id="pfe-navigation__custom-links">
        <a href="#" class="">Custom Link</a>
      </div>

      <div slot="pfe-navigation--search" class="pfe-navigation__search">
        <form>
          <label>Search</label>
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </form>
      </div>

    </pfe-navigation>

```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `search`: For local site's search form
- `customlinks`: For local site's custom links that need to appear in the nav bar

## Attributes

- `pfe-navigation-state`: Is present if any section of the navigation is expanded and gives a name of the specific element that is open


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

## How it works
If JS is working and enabled, the component will copy specific markup from inside the `<pfe-navigation>` tag to the Shadow DOM, this allows styles and behaviors to be encapsulated so we don't get any outside code messing with the appearance or behaviors of the navigation.

Once it's working it updates an attribute `pfe-navigation[pfe-navigation-state]` to describe what is the currently open and active part of the menu. If nothing is open the attribute is removed.

The parent DOM can also call some methods like:

* `isOpen()` - With no params returns true if _anything_ is open, otherwise specific section names can be provided to see if a specific section is open.
* `isNavigationMobileStyle()` - Returns true if the menu hamburger is visible

## Code style

Navigation (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester



## Events
@todo


## Dependencies
@todo (hopefully none)