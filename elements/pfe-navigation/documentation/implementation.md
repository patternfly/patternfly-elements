# Implementation

## Adding scripts and styles
Follow the [instructions from Patternfly Elements to get the javascript added to the page](https://patternfly.github.io/patternfly-elements/getting-started/).

Add the fallback stylesheet, which covers non-JS users and initial page load nicities:
@todo Light DOM stylesheet
```html
<link rel="stylesheet" href="FILE/TBD.css" type="text/css">
```

## Adding HTML

The bare minimum skeleton HTML is:

```html
<!-- These links should be directly after <body> -->
<a href="#pfe-navigation" class="visually-hidden">Skip to navigation</a>
<a href="#ADD-ID-TO-MAIN" class="visually-hidden">Skip to content</a>

<pfe-navigation id="pfe-navigation">
  <nav class="pfe-navigation" aria-label="Main Navigation">
    <div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
      <a href="/" class="pfe-navigation__logo-link">
        <!-- Update logo src -->
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
@todo Add extra dropdown wrapper in component

To add a dropdown, add the following markup inside of an `<li class="pfe-navigation__menu-item">`, but after the `<a>`, like this:

```html
      <li class="pfe-navigation__menu-item">
        <a href="#LINK-TO-CONTENT" class="pfe-navigation__menu-link">
          Menu Link 1
        </a>

        <!-- Dropdown markup -->
        <div class="pfe-navigation__dropdown-wrapper">
          <div class="pfe-navigation__dropdown">

          </div>
        </div>
      </li>
```

#### Making a multi-column dropdown
Inside of dropdown div sections of links can be added. By default they will be made into columns that fit the size of the page, but they can also be made into custom layouts, see @todo section about dropdown styles.

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

@todo test this markup

```html
<ul>
  <li><a href="#LINK">Link text</a></li>
  <li><a href="#LINK">Link text</a></li>
  <li><a href="#LINK">Link text</a></li>
  <li><a href="#LINK">Link text</a></li>
</ul>
```
##### Adding a dropdown footer
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


#### Making a single column dropdown
By default, dropdowns take up the full width of the screen and accomodate multiple columns. To make a dropdown single column, add the class `pfe-navigation__dropdown--single-column` to the wrapper, like this:

```html
        <div class="pfe-navigation__dropdown-wrapper pfe-navigation__dropdown-wrapper--single-column">
          <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
```


### Adding Search
@todo Implement light DOM styling for search link fallback
@todo Implement logic for when search/search slot isn't available

To add search to your navigation add the following markup before the terminating `</pfe-navigation>` tag:

```html
  <a href="/URL-TO-SEARCH">Search</a>
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

@todo Guidance on what markup to use for the form to maintain styling?

### Adding Custom Links
@todo Document when we have something working for this
