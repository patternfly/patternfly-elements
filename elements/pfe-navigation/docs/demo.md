---
layout: layout-demo.html
title: Navigation demo
package: pfe-navigation
---
<link rel="stylesheet" href="/elements/{{ package }}/dist/{{ package }}--lightdom.css">
<script type="module" src="/elements/{{ package }}/dist/{{ package }}.min.js"></script>
<script type="module" src="/elements/pfe-cta/dist/pfe-cta.min.js"></script>

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

<main>

::: section header
# {{ title }}
:::

::: section
The markup below is the same markup that was used to generate the navigation at the top this page.

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
                  <pfe-cta pfe-priority="primary"><a href="#">View all products</a></pfe-cta>
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

</main>