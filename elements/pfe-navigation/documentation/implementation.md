# Implementation

> For any Red Hat implemenentation questions, comments, or issues; please contact the CPFED Group.

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
          class="pfe-navigation__logo-image pfe-navigation__logo-image--screen pfe-navigation__logo-image--print"
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

> Unfortunately we need to make sure all of the id's and classes are correct on this level for fall back styling & behaviors. Functionality may break if classes or id's are missing or incorrect.

> `role=banner` should be added if the navigation is not inside of a `header` element or an element with `role=banner`. It indicates that the `pfe-navigation` tag is the site's header tag.

### Logo variations

#### Print version of the logo

Since the nav has a dark background by default, we need to provide a logo that looks good on a white background for when a page is printed. If the navbar background is changed to a light color, or the logo works for both a light and dark background, no extra work or classes are needed.

If there is a need for a 'screen' and 'print' logo, add two logos inside of the 'logo wrapper', and add `pfe-navigation__logo-image--screen` to the logo for the screen, and `pfe-navigation__logo-image--print` for the print version (which should look good on a white background).

Here's an example of markup for having a print and screen version of the logo:

```html
<div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
  <a href="#" class="pfe-navigation__logo-link">
    <img
      class="
        pfe-navigation__logo-image
        pfe-navigation__logo-image--screen
        pfe-navigation__logo-image--small"
      src="/path/to/file/redhat--reverse.svg"
      width="400" alt="Red Hat" />
    <img
      class="
        pfe-navigation__logo-image
        pfe-navigation__logo-image--print"
        src="/path/to/file/redhat.svg"
        width="400" alt="Red Hat" />
  </a>
</div>
```

CSS provided by the component and `pfe-navigation--lightdom.css` stylesheet will handle showing the correct one for the circumstance.

#### Smaller logo
If the logo appears too large it can be made a little smaller by adding the class `pfe-navigation__logo-image--small` to the `img` tag.

For Red Hat brands, any logo with one line of text (e.g. Redhat corporate brand), should use the smaller logo.

### Adding dropdowns to the menu
To add a dropdown, add the following markup inside of an `<li class="pfe-navigation__menu-item">` in the main menu, after the `<a>`, like this:

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
</div>
```
> Wrapping div (or any element) will keep everythign in one column.

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

Each child of `div.pfe-navigation__dropdown` will be made into a column, e.g.:
```html
<li class="pfe-navigation__menu-item">
  <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
    Menu Link 1
  </a>

  <!-- Dropdown markup -->
  <div class="pfe-navigation__dropdown">
    <!-- Column 1 -->
    <ul>
      <li><a href="#LINK">Link text</a></li>
      <li><a href="#LINK">Link text</a></li>
    </ul>
    <!-- Column 2 -->
    <!-- This wrapper ensures the headline and list stay in the same column -->
    <div>
      <h2 id="UNIQUE-ID">Links title</h2>
      <ul aria-labelledby="UNIQUE-ID">
        <li><a href="#LINK">Link text</a></li>
        <li><a href="#LINK">Link text</a></li>
      </ul>
    </div>
    <!-- Column 3 -->
    <div>
      <ul>
        <li><a href="#LINK">Link text</a></li>
        <li><a href="#LINK">Link text</a></li>
      </ul>
    </div>
    <!-- Column 4 -->
    <div>
      <ul>
        <li><a href="#LINK">Link text</a></li>
        <li><a href="#LINK">Link text</a></li>
      </ul>
    </div>
  </div>
</li>
```

The default layout is made for 4 columns, even if less than 4 columns are provided. But a 3 column layout can be used if the class `pfe-navigation__dropdown--3-column` is added to the dropdown wrapper. e.g.

```html
<div class="pfe-navigation__dropdown pfe-navigation__dropdown--3-column">
```

##### Column Span

###### At desktop
Add a `desktop-col-span-X` class to the column, where X is the number of columns you'd like it to span (1-4).

###### At tablet
We're using CSS columns at tablet, which only accepts spanning all columns, or 1. Add the class `tablet-col-span-all` to make a column span the full width at tablet.


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
.margin-<top||bottom>-<size>
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

For example: `margin-top-lg`, `padding-bottom-sm`, `margin-bottom-0`, etc.

### Adding Search

To add search to your navigation add your search form markup with `slot="search"` attribute in the outermost wrapper, and as a direct descendant to the `pfe-navigation` tag:

```html
<pfe-navigation id="pfe-navigation" role="banner">
  <!-- Other markup -->
  <form slot="search" class="pfe-navigation__search">
      <label for="pfe-navigation__search-label">Search</label>
      <input id="pfe-navigation__search-label" type="text" placeholder="Search" />
      <button>Search</button>
  </form>
</pfe-navigation>
```

The link will function as a fallback, the search form will appear in the mobile menu, or in a dropdown depending on the breakpoint.

> Add `pfe-navigation__search--default-styles` to the `div` with the `slot` attribute to opt into default styles for the search. This code may not work for all search markup, mileage may vary.

### Adding fallback links
In case the end user has javascript disabled or the web component doesn't upgrade, these links will be in place of the secondary links that are on the right side of the navigation.

After the terminating `</nav>` tag, add the following markup:

```html
<pfe-navigation id="pfe-navigation" role="banner">
  <nav class="pfe-navigation" aria-label="Main Navigation">
    <!-- Nav markup -->
  </nav>

  <ul class="pfe-navigation__fallback-links">
    <li>
      <a href="/LINK/TO/SEARCH">Search</a>
    </li>
    <li>
      <a href="/LINK/TO/SITE/SPECIFIC/FEATURE">Link</a>
    </li>
  </ul>
</pfe-navigation>
```

### Adding Secondary Links

Secondary links are the links between Search/All Red Hat and the Log In link. In the future they will be able to be dropdowns, but for now we've implemented the ability to add links with icons.

To add a secondary link that is just a link, add the following markup inside of the component tag:

```html
<li slot="secondary-links">
  <a href="/VALID/URL">
    <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
    Link Text
  </a>
</li>
```

If there is JS behavior on the page for the 'secondary-link' and it _does not_ go to a new page, it's better to make this a button tag, e.g.:
```html
<div slot="secondary-links">
  <button>
    <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
    Button Text
  </button>
</div>
```

Then update:
* `href` (if there's a link)
* `pfe-icon`'s `icon` attribute, [see available icons](https://patternflyelements.com/elements/pfe-icon/demo/)
* Text inside the button

Optionally additional attributes can be added to any of the HTML.

To add more custom links add more of the same markup, the order they are in will be reflected in the component.

#### Adding custom dropdowns to secondary links

To add a dropdown in the secondary links area (e.g. for a language picker, notifications, etc.), add the following markup:

```html
<div slot="secondary-links">
  <pfe-navigation-dropdown dropdown-width="single" icon="web-globe" name="BUTTON TEXT">
    <h2>ADD CUSTOM DROPDOWN CONTENT HERE</h2>
    <p>More Text</p>
    <pfe-cta pfe-priority="primary">
      <a href="#">HERE'S A CALL TO ACTION</a>
    </pfe-cta>
  </pfe-navigation-dropdown>
</div>
```

`pfe-navigation-dropdown` attributes:

* `dropdown-width`: Should be set to `single` of `full`, changes the dropdown to single column or full width, defaults to full.

* `alerts`: Adds a notification bubble with the value of this attribute, should be a number.

If a toggle button isn't provided (see next section), these attributes are required:
* `icon`: The icon name for the dropdown toggle button, [see documentation for `pfe-icon` for options](https://patternflyelements.com/elements/pfe-icon/demo/)
* `name`: The text for the dropdown toggle button

`pfe-navigation-dropdown` uses a `slot` for the dropdown content, which means the site/app is responsible for all styles and behaviors _inside_ the dropdown; but the `pfe-navigation` component will handle opening and closing the dropdown.

To get a leg up on styling add the class `pfe-navigation__dropdown--default-styles` to `<pfe-navigation-dropdown>`. This will add the default styling of the main menu dropdowns.

##### Customizing toggle button markup

By default the button that toggles the dropdown is generated by JS, with the help of a few attributes on the `pfe-navigation-dropdown` tag. If there is additional attributes or HTML desired on that button, a button can be provided in the markup.

If a button is provided in the markup already, `pfe-name` and `pfe-icon` are ignored.

Here is the minimum markup required for a provided button:

```html
<div slot="secondary-links">
  <button class="pfe-navigation__secondary-link">
    <pfe-icon icon="web-globe" size="sm" aria-hidden="true"></pfe-icon>
    Button Text
  </button>
  <pfe-navigation-dropdown dropdown-width="single">
    <h2>ADD CUSTOM DROPDOWN CONTENT HERE</h2>
    <pfe-cta pfe-priority="primary">
      <a href="#">HERE'S A CALL TO ACTION</a>
    </pfe-cta>
  </pfe-navigation-dropdown>
</div>
```

The button's ID is controlled by the `pfe-navigation`, if one is added it will be overridden; however an ID suffix can be provided with the attribute `data-id-suffix`:

So this:
```html
<button data-id-suffix="MySuffix" class="pfe-navigation__secondary-link">
```

Will become:
```html
<button id="pfe-navigation__secondary-link--MySuffix" data-id-suffix="MySuffix" class="pfe-navigation__secondary-link">
```

##### Making a "secondary link dropdown" into a "mobile slider"

If a dropdown in the secondary link area has a lot of content it can be made into a "mobile slider", this means when it's opened at mobile sizes it will slide the menu off to the left of the screen, while it's contents slide in from the right.

To make a dropdown use this behavior, add the `mobile-slider` attribute to the tag with `[slot="secondary-links"]`.

## Extra resources

### Exra Utility Classes

#### Breakpoint visibility
If an element should only be visible at certain breakpoints there is a set of classes to hide elements at certain breakpoints. The breakpoints are decided by the JS and appear on `pfe-navigation` as an attribute `breakpoint`.

Breakpoint sizes may change depending on content in the nav, JS will go to a lower breakpoint if content doesn't fit.

`.hidden-at-mobile`

When the main menu is collapsed (there's a burger icon) & site-search and secondary links are in the also in the dropdown.

`.hidden-at-tablet`

When the secondary links are visible in the black bar and the main menu collapsed.

`.hidden-at-desktop`

When the main menu is visible in the black bar
