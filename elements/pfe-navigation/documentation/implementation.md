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
<a href="#pfe-navigation" class="visually-hidden">Skip to navigation</a>
<!-- !! Update anchor link to main/content -->
<a href="#ADD-ID-TO-MAIN" class="visually-hidden">Skip to content</a>

<pfe-navigation id="pfe-navigation">
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
<section>
  <!-- Must be a heading tag, but can be any heading level that is appropriate for the page -->
  <h2>Links title</h2>
  <ul>
    <li><a href="#LINK">Link text</a></li>
    <li><a href="#LINK">Link text</a></li>
    <li><a href="#LINK">Link text</a></li>
    <li><a href="#LINK">Link text</a></li>
  </ul>
</section>
```

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

The default layout of multi-column dropdowns is not intended to be used much, it's the default because it is a 'safe' default that won't result issues.

To create a custom column layout in a dropdown, see [Custom Dropdown Layout Documentation](custom-dropdown-layout.md).

##### Adding a footer to the multi-column dropdown
To add a full width footer, add the following markup right before the dropdown's closing tag:
```html
<div class="pfe-navigation__footer">
</div>
```

`<pfe-cta>` is available, which will provide red hat theming and behavior, so a footer's markup could be something like the following:
```html
<section class="pfe-navigation__footer">
  <pfe-cta pfe-priority="primary">
    <a href="#">Learn more about PFElements</a>
  </pfe-cta>

  <pfe-cta>
    <a href="https://github.com/">GitHub</a>
  </pfe-cta>
</section>
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

@todo Guidance on what markup to use for the search form to maintain styling?

### Adding Custom Links

@todo Document when we have Custom Link functionality
