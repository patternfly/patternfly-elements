# Upgrading from the old PFE Navigation

Before changing any markup, see if dropping in the new JS & CSS with the current markup works as expected. Usually there is no strong need to update most of the markup. This version of the navigation copies and transforms the markup, and should be able to use the old pfe-navigation markup without any significant impact.

## Notes and Considerations using old Pfe Navigation Markup

### Please Move Skip links

Skip links should be as close to the opening body tag as possible, and should not have any focusable elements before them in the tab order (e.g. `a`, `button`, `input`, etc). Recommend moving them out of the navigation and giving them the classes: `visually-hidden skip-link` like the code [example in the implementation documentation](implementation.md).

### Logo

The logo can be left alone or it's markup can be updated to follow the [new nav's implementation](implementation.md).

### Main Menu Items

While the main menu elements have `slot` attributes in the old markup, and those shouldn't be removed, that content will not be "slotted". The main menu will be slightly transformed and copied into the shadow DOM of the navigation so it's behavior and styles will be completely managed by the component.

Any styles or javascript that worked in the old nav will not work in the new nav without some extra work.

### 'Secondary links' (aka 'utility links')
The content in the `pane` slot from `pfe-navigation-item` elements will remain slotted, the `trigger` is used for data but won't be directly copied.

When transformed the `pfe-navigation-item` elements will be wrapped with a `pfe-navigation-dropdown`. This shouldn't cause a problem unless there's a direct descendant selector in JS or CSS.

### Move Search

It's recommended to move the search `form` the it's `pfe-navigation-item` tag. The search form (e.g. the element that has `slot='pane'` from `pfe-navigation-item[slot="search"]`) should be a direct child of `pfe-navigation` and have `slot="search"` instead of `pane`.

e.g.

**Before:**
```html
<pfe-navigation>
  <!-- Other code -->
  <pfe-navigation-item slot="search" pfe-icon="web-search">
    <div slot="trigger">
      <a href="/en/search">Search</a>
    </div>
    <div slot="tray" hidden>
      <div class="pfe-navigation-item__tray--container">
        <form class="search-form">
          <!-- Other code -->
        </form>
      </div>
    </div>
  </pfe-navigation-item>
  <!-- Other code -->
</pfe-navigation>
```

**After:**
```html
<pfe-navigation>
  <!-- Other code -->
  <form class="search-form" slot="search">
    <!-- Other code -->
  </form>
  <!-- Other code -->
</pfe-navigation>
```

The form tag doesn't need to be the slotted element, wrappers could be added for styling if needed.

At mobile the nav will move the search to the top of the mobile dropdown, at desktop it will have it's own dropdown in the 'secondary links' area.

### Language

This no longer has a special slot, by default the new nav will treat it as a "secondary link" and it will show up in the DOM order it is in compared to other elements that go in that slot.

### Log In

Log in has special consideration in the new navigation, it's intended to work with an account dropdown component, pfe-navigation-account specifically.

If there isn't an appropriate account dropdown component, a simple link with pfe-icon and text inside should work well if that's all that's needed.

The `account` slot is treated specially as well, it will always display in the black bar no matter what breakpoint (unlike the rest of the 'secondary links').

## Adding/Updating nav markup

If new code is added to:

* **Top level main menu items** it'd be best to stay consistent in approach. Either all in the old markup, or recreate the nav markup to follow the new markup recommendation. Having a mix of approaches could cause bugs.
* **Main menu dropdown** that takes advantage of CSS from the old component, or the utility classes of the new component, it should work well.
* **Secondary links** can either be coded in the old convention or the new convention, and are processed separately, so some can be in the old style and some in the new style.
