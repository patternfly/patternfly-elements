# Implementation

> If there are any questions, issues, feel there's something missing, please contact the CPFED Group.

## Adding scripts and styles
Follow the [instructions from Patternfly Elements to get the javascript added to the page](https://patternfly.github.io/patternfly-elements/getting-started/).

Add the fallback stylesheet, which covers non-JS users and initial page load nicities:
```html
<link rel="stylesheet" href="PATH/TO/pfe-navigation--lightdom.css" type="text/css">
```

## Adding HTML

The bare minimum skeleton HTML is:

```html
<!-- These links should be directly after <body> -->
<a href="#pfe-navigation" class="visually-hidden skip-link">Skip to navigation</a>
<!-- !! Update anchor link to main/content -->
<a href="#ADD-ID-TO-MAIN" class="visually-hidden skip-link">Skip to content</a>

<pfe-navigation id="pfe-navigation" role="banner">
  <nav class="pfe-navigation" aria-label="Main Navigation">
    <div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
      <a href="/" class="pfe-navigation__logo-link">
        <!-- !! Update logo src -->
        <img
          class="pfe-navigation__logo-image"
          src="assets/redhat--reverse.svg" width="400" alt="Redhat"
        />
      </a>
    </div>
    <ul class="pfe-navigation__menu" id="pfe-navigation__menu">
      <li class="pfe-navigation__menu-item">
        <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
          Menu Link 1
        </a>
      </li>

      <li class="pfe-navigation__menu-item">
        <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
          Menu Link 2
        </a>
      </li>

      <li class="pfe-navigation__menu-item">
        <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
          Menu Link 3
        </a>
      </li>

      <li class="pfe-navigation__menu-item">
        <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
          Menu Link 4
        </a>
      </li>
    </ul>

  </nav>
</pfe-navigation>
```

> Unfortunately we need to make sure all of the id's and classes are correct on this level for fall back styling, functionality may break if classes or id's are missing or incorrect.

> `role=banner` should be added if the navigation is not inside of a `header` element or an element with `role=banner`. It indicates that the `pfe-navigation` tag is the site's header tag.

### Logo variations

If the logo appears too large it can be made a little smaller by adding the class `pfe-navigation__logo-image--small` to the `img` tag.

### Adding dropdowns to the menu
To add a dropdown, add the following markup inside of an `<li class="pfe-navigation__menu-item">`, but after the `<a>`, like this:

```html
<li class="pfe-navigation__menu-item">
  <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
    Menu Link 1
  </a>

  <!-- Dropdown markup -->
  <div class="pfe-navigation__dropdown">
  </div>
</li>
```

#### Adding menu links to a dropdown

If a group of links has a title, it's HTML should be as follows:

```html
<div>
  <h2 id="UNIQUE-ID">Links title</h2>
  <ul aria-labelledby="UNIQUE-ID">
    <li><a href="#LINK">Link text</a></li>
    <li><a href="#LINK">Link text</a></li>
    <li><a href="#LINK">Link text</a></li>
    <li><a href="#LINK">Link text</a></li>
  </ul>
/div>
```

Unique ID's we've used are `nav__parent-menu-name__heading-name`.

> If headings aren't preferred in your nav markup, use `role=heading aria-level="2"` on the heading text wrapper. Level does not have to be 2, choose appropriate heading level for the site.

If a group of links **does not** have a title, it's markup should be as follows:

```html
<ul>
  <li><a href="#LINK">Link text</a></li>
  <li><a href="#LINK">Link text</a></li>
  <li><a href="#LINK">Link text</a></li>
  <li><a href="#LINK">Link text</a></li>
</ul>
```

#### Making multi-column dropdown
Dropdowns are full width and multi-column by default. Styling is handled by the web component, but there are layout classes that can be added to control the layout of the dropdown.

The default layout is made for 4 columns, if the class `pfe-navigation__dropdown--3-column` is added to the dropdown wrapper it will be 3 columns.
```html
<div class="pfe-navigation__dropdown pfe-navigation__dropdown--3-column">
```

To create a custom column layout in a dropdown, see [Custom Dropdown Layout Documentation](custom-dropdown-layout.md).

##### Adding a footer to the multi-column dropdown
To add a full width footer, add the following markup right before the dropdown's closing tag:
```html
<div class="pfe-navigation__footer">
</div>
```

`<pfe-cta>` is available, which will provide red hat theming and behavior, so a footer's markup could be something like the following:
```html
<div class="pfe-navigation__footer">
  <pfe-cta pfe-priority="primary">
    <a href="#">Learn more about PFElements</a>
  </pfe-cta>

  <pfe-cta>
    <a href="https://github.com/">GitHub</a>
  </pfe-cta>
/div>
```
> Footers should only be added to multi-column dropdowns


#### Making a single column dropdown

To make a dropdown single column, add the class `pfe-navigation__dropdown--single-column` to the wrapper, like this:

```html
<div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
```

##### Delineating groups in a single column dropdown

If there are multiple groups of links in a single column dropdown it's probably best that each group has it's own `<ul>`, this will create a small visual separator between the groups in the dropdown.

e.g.

```html
<div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
  <ul>
    <li><a href="#LINK">About Us</a></li>
    <li><a href="#LINK">Mission & Values</a></li>
    <li><a href="#LINK">Our leadership</a></li>
  </ul>
  <ul>
    <li><a href="#LINK">Contact Us</a></li>
    <li><a href="#LINK">Job Openings</a></li>
  </ul>
</div>
```

Alternatively, if you feel it's better HTMl that the links are in one `<ul>` add the class `pfe-navigation__sub-nav-link--separator` to the link that should begin the new group; it will have the same visual effect as the above.

e.g.

```html
<div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
  <ul>
    <li><a href="#LINK">About Us</a></li>
    <li><a href="#LINK">Mission & Values</a></li>
    <li><a href="#LINK">Our leadership</a></li>

    <li class="pfe-navigation__sub-nav-link--separator"><a href="#LINK">Contact Us</a></li>
    <li><a href="#LINK">Job Openings</a></li>
  </ul>
</div>
```

#### Custom spacing classes

It may be necessary to modify the default vertical spacing of elements to match a design. We've added utilty classes based on [Patternfly 4's spacing](https://www.patternfly.org/v4/guidelines/spacers/) for margin/padding top or bottom.

The naming convention is:
```
.margin-<top || bottom>-<size>
```

The sizes are:
| Name  | Length |
|-------|--------|
| `0`   |   0px  |
| `xs`  |   4px  |
| `sm`  |   8px  |
| `md`  |  16px  |
| `lg`  |  24px  |
| `xl`  |  32px  |
| `2xl` |  48px  |
| `3xl` |  64px  |

Class name examples are `margin-top-lg`, `padding-bottom-sm`, `margin-bottom-0`, etc.

### Adding Search

To add search to your navigation add the following markup before the terminating `</pfe-navigation>` tag:

```html
  <div slot="pfe-navigation--search" class="pfe-navigation__search">

    <!-- Replace with markup for your search form -->
    <form>
      <label for="pfe-navigation__search-label">Search</label>
      <input id="pfe-navigation__search-label" type="text" placeholder="Search" />
      <button>Search</button>
    </form>

  </div>
```

The link will function as a fallback, the search form will appear in the mobile menu, or in a dropdown depending on the breakpoint.

> Add `pfe-navigation__search--default-styles` to opt into default styles for the search.

### Adding fallback links
In case the end user has javascript disabled or the web component doesn't upgrade, these links will be in place of the secondary links that are on the right side of the navigation.

After the terminating `</nav>` tag, add the following markup:

@todo Guidance on log in link?

```html
<ul class="pfe-navigation__fallback-links">
  <li>
    <a href="/LINK/TO/SEARCH">Search</a>
  </li>
  <li>
    <a href="/LINK/TO/SITE/SPECIFIC/FEATURE">Custom Link</a>
  </li>
  <li>
    <a href="/LOG/IN/LINK">Log in</a>
  </li>
</ul>
```

### Adding Custom Links

Custom links are the links between Search/All Red Hat and the Log In link. In the future they will be able to be dropdowns, but for now we've implemented the ability to add links with icons.

To add a custom link that is just a link, add the following markup inside of the component tag:

```html
<li slot="pfe-navigation--custom-links">
  <a href="/VALID/URL">
    <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
    Custom Link
  </a>
</li>
```

If there is JS behavior on the page for the 'custom-link' and it _does not_ go to a new page, it's better to make this a button tag, e.g.:
```html
<li slot="pfe-navigation--custom-links">
  <button>
    <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
    Custom Link
  </button>
</li>
```

> There is no `<ul>` element, this is intentional. This markup will be valid in the component, and is never shown if the component doesn't work.

Then update:
* `href` (if there's a link)
* `pfe-icon`'s `icon` attribute, [see available icons](https://patternflyelements.com/elements/pfe-icon/demo/)
* Text inside the button

Optionally additional attributes can be added to any of the HTML.

To add more custom links add more of the same markup, the order they are in will be reflected in the component.

#### Adding custom dropdowns to secondary links

To add a dropdown in the secondary links area (e.g. for a language picker, notifications, etc.), add the following markup:

```html
<li slot="pfe-navigation--custom-links">
  <pfe-navigation-dropdown pfe-width="single" pfe-icon="web-cart" pfe-name="Cart">
    <h2>ADD CUSTOM DROPDOWN CONTENT HERE</h2>
    <pfe-cta pfe-priority="primary">
      <a href="#">HERE'S A CALL TO ACTION</a>
    </pfe-cta>
  </pfe-navigation-dropdown>
</li>
```

`pfe-navigation-dropdown` requires the following attributes:

* `pfe-width`: Should be set to `single` of `full`, changes the dropdown to single column or full width.
* `pfe-icon`: The icon name for the dropdown toggle button, [see documentation for `pfe-icon` for options](https://patternflyelements.com/elements/pfe-icon/demo/)
* `pfe-name`: The text for the dropdown toggle button

Optionally there is:
* `pfe-alerts`: Adds a red notification bubble with the value of this attribute, should be a number.

Styling inside of the dropdown is completely dependent on parent site, and management of the `pfe-alerts` is also up to the site.
