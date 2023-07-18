{% renderInstallation %} {% endrenderInstallation %}

<style>
  .overflow-tab-wrapper {
    width: 94vw;
  }
  @media screen and (min-width: 568px) {
    .overflow-tab-wrapper {
      width: auto;
    }
  }
</style>

{% renderOverview %}
  ### Default
  <div class="overflow-tab-wrapper">
    <pf-tabs>
      <pf-tab id="users" slot="tab">Users</pf-tab>
      <pf-tab-panel>Users</pf-tab-panel>
      <pf-tab slot="tab">Containers</pf-tab>
      <pf-tab-panel>Containers <a href="#">Focusable element</a></pf-tab-panel>
      <pf-tab slot="tab">Database</pf-tab>
      <pf-tab-panel>Database</pf-tab-panel>
      <pf-tab slot="tab" disabled>Disabled</pf-tab>
      <pf-tab-panel>Disabled</pf-tab-panel>
      <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
      <pf-tab-panel>Aria Disabled</pf-tab-panel>
    </pf-tabs>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  Each tab/panel pair consists of a `pf-tab` element, which must have the `slot="tab"` attribute, and a `pf-tab-panel` element, which should be a direct sibling of it's associated tab.

  {% htmlexample %}
  <pf-tabs>
    <pf-tab slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}
{% endband %}

{% band header="Variants" %}
  ### Box Light
  {% htmlexample class="overflow-tab-wrapper" %}
  <pf-tabs box="light">
    <pf-tab slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
    <pf-tab slot="tab" disabled>Disabled</pf-tab>
    <pf-tab-panel>Disabled</pf-tab-panel>
    <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
    <pf-tab-panel>Aria Disabled</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}

  ### Box Dark
  {% htmlexample class="overflow-tab-wrapper" %}
  <pf-tabs box="dark">
    <pf-tab slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
    <pf-tab slot="tab" disabled>Disabled</pf-tab>
    <pf-tab-panel>Disabled</pf-tab-panel>
    <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
    <pf-tab-panel>Aria Disabled</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}

  ### Vertical
  {% htmlexample %}
  <pf-tabs vertical>
    <pf-tab slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
    <pf-tab slot="tab" disabled>Disabled</pf-tab>
    <pf-tab-panel>Disabled</pf-tab-panel>
    <pf-tab slot="tab" aria-disabled="true">Aria Disabled</pf-tab>
    <pf-tab-panel>Aria Disabled</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}

  ### Inset
  Inset is implemented using CSS part `::part(tab-container)`

  ```html
  <pf-tabs vertical class="inset-sm">
    <pf-tab slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
  </pf-tabs>
  ```
  ```css
  .inset-sm::part(tabs-container) {
    --pf-c-tabs--inset: var(--pf-global--spacer--sm, 0.5rem);
    --pf-c-tabs--m-vertical--inset: var(--pf-global--spacer--sm, 0.5rem);
    --pf-c-tabs--m-vertical--m-box--inset: var(--pf-global--spacer--sm, 0.5rem);
  }
  ```

  ### Filled

  Filled variant, each tab stretches to fill the available space for the tab
  set.

  **NOTE:**  Filled variant does **not** overflow.

  {% htmlexample class="overflow-tab-wrapper" %}
  <pf-tabs fill>
    <pf-tab slot="tab">Users</pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">Containers</pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">Database</pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}

  ### Icons and text
  `pf-tab` accepts a `svg` or `pf-icon` in the icon slot

  ```html
  <pf-tabs>
    <pf-tab slot="tab">
      <svg slot="icon" slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 640 512" aria-hidden="true" role="img"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
      <!-- or -->
      <pf-icon slot="icon" set="fas" icon="users" size="sm" loading="idle"></pf-icon>
      Users
    </pf-tab>
    ...
  </pf-tabs>
  ```

  {% htmlexample class="overflow-tab-wrapper" %}
  <pf-tabs>
    <pf-tab slot="tab">
      <pf-icon slot="icon" set="fas" icon="users" size="md" loading="idle"></pf-icon>
      Users
    </pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"></path></svg>
      Containers
    </pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img"><path d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"></path></svg>
      Database
    </pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"></path></svg>
      Server
    </pf-tab>
    <pf-tab-panel>Server</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 640 512" aria-hidden="true" role="img"><path d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z"></path></svg>
      System
    </pf-tab>
    <pf-tab-panel>System</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 640 512" aria-hidden="true" role="img"><path d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"></path></svg>
      Network
    </pf-tab>
    <pf-tab-panel>Network</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}

  ### Filled with Icons
  {% htmlexample class="overflow-tab-wrapper" %}
  <pf-tabs fill>
    <pf-tab slot="tab">
      <svg slot="icon" slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 640 512" aria-hidden="true" role="img"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
      Users
    </pf-tab>
    <pf-tab-panel>Users</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"></path></svg>
      Containers
    </pf-tab>
    <pf-tab-panel>Containers</pf-tab-panel>
    <pf-tab slot="tab">
      <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img"><path d="M448 73.143v45.714C448 159.143 347.667 192 224 192S0 159.143 0 118.857V73.143C0 32.857 100.333 0 224 0s224 32.857 224 73.143zM448 176v102.857C448 319.143 347.667 352 224 352S0 319.143 0 278.857V176c48.125 33.143 136.208 48.572 224 48.572S399.874 209.143 448 176zm0 160v102.857C448 479.143 347.667 512 224 512S0 479.143 0 438.857V336c48.125 33.143 136.208 48.572 224 48.572S399.874 369.143 448 336z"></path></svg>
      Database
    </pf-tab>
    <pf-tab-panel>Database</pf-tab-panel>
  </pf-tabs>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pf-tab", level=3, header="Slots on `pf-tab`" %}{% endrenderSlots %}
{% renderSlots for="pf-tab-panel", level=3, header="Slots on `pf-tab-panel`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderEvents for="pf-tab", level=2, header="Events" %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-tab", level=3, header="CSS Properties on `pf-tab`" %}{% endrenderCssCustomProperties %}
{% renderCssCustomProperties for="pf-tab-panel", level=3, header="CSS Properties on `pf-tab-panel`" %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
{% renderCssParts for="pf-tab", level=3, header="Parts on `pf-tab`" %}{% endrenderCssParts %}
{% renderCssParts for="pf-tab-panel", level=3, header="Parts on `pf-tab-panel`" %}{% endrenderCssParts %}
