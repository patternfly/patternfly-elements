# PatternFly Elements Jump Links
         
This component watches the content inside a panel and updates the connected `<pfe-jump-links-nav>` to indicate the section of the document currently being viewed. As a developer, you have the choice of whether you bring your own markup to the navigation or have it build for you (see `autobuild` attribute below). Please note the shape of the markup that is required. In order to support sub-section highlighting, jump links must be somewhat opinionated about the DOM tree.

Inside the panel, every section must have at least an `id` present. If using autobuild, the `id` needs to be present on the tag containing the label text or make use of the `nav-label` attribute to manually define the label. The `nav-label` attribute will always take precedence over the text content. For faster processing, include the class `.pfe-jump-links-panel__section` to any elements you want the navigation to watch. Each item meeting these requirements inside a panel are called sections.

When each section crosses the scroll threshold, the navigation will highlight to show it is active. If it has sub-sections, the nested children will become visible.

Read more about Jump Links in the [PatternFly Elements Jump Links documentation](https://patternflyelements.org/components/jump-links)

##  Installation

Load `<pfe-jump-links>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-jump-links?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-jump-links
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-jump-links';
```

## Usage

If you are manually building the navigation, ensure that every section's id is reflected in the href attribute of the corresponding `<a>` tag (see below).

## Wiring up jump links

There are a few approaches to connecting a navigation element to a panel.

Panels can be:

1. `pfe-jump-links-panel` elements with a `scrolltarget` attribute equal to the `id` 
2. Any element with a `scrolltarget` attribute equal to the `id` of the `pfe-jump-links-nav`.
3. Defined using the panel setter

For routes 1 and 2 above:

The panel and navigation are connected via a scrolltarget and id. On the panel, add an attribute `scrolltarget="foo"`. This will correspond to the `pfe-jump-links-nav` on the page with `id="foo"`. If you are manually constructing the navigation, the last step is to match the `<a>` tags' href attribute to specific sections (just like you would with anchor links). See below for an example:

```html
<pfe-jump-links-nav id="jumplinks1">
    <h4 slot="heading">Jump to section</h4>
    <ul>
        <li>
            <a href="#section1">Section 1</a>
        </li>
        <li>
            <a href="#section2">Section 2</a>
            <ul>
                <li>
                    <a href="#section2.1">Section 2.1</a>
                </li>
                <li>
                <a href="#section2.2">Section 2.2</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#section3">Section 3</a>
        </li>
    </ul>
</pfe-jump-links-nav>

<!-- For approach #2 above, pfe-jump-links-panel could be substituted for a `div` -->
<pfe-jump-links-panel scrolltarget="jumplinks1">
    <h2 class="pfe-jump-links-panel__section" id="section1">Section 1</h2>
    <p>Some content...</p>
    <h2 class="pfe-jump-links-panel__section" id="section2">Section 2</h2>
    <p>Some content...</p>
    <h2 class="pfe-jump-links-panel__section" id="section2">Section 2.1</h2>
    <p>Some content...</p>
    <h2 class="pfe-jump-links-panel__section" id="section2">Section 2.2</h2>
    <p>Some content...</p>
    <h2 class="pfe-jump-links-panel__section" id="section3">Section 3</h2>
    <p>Some content...</p>
</pfe-jump-links-panel>
```

Using the panel setter requires capturing the `pfe-jump-links-nav` element from the document and setting it's `panel` property equal to the NodeItem you want to use.

```html
<pfe-jump-links-nav id="jumplinks2" autobuild></pfe-jump-links-nav>
<div id="jumplinks-panel">...</div>
```

After ensuring the `pfe-jump-links-nav` element is defined, set the panel to point to the appropriate Node in your document.

```js
const nav = document.getElementById("jumplinks2");
const panel = document.getElementById("jumplinks-panel");
if (nav && panel) {
    nav.panel = panel;
}
```

Alternatively, you can manually define your sections (rather than their containing panel) by passing a NodeList to the sections setter.  If you define the sections manually, you do _not_ need to define their panel.

```js
const nav = document.getElementById("jumplinks2");
const sections = document.querySelectorAll(".custom-section-identifier");
if (nav && sections && sections.length > 0) {
    nav.sections = sections;
}
```

### Accessibility

The template inside the component are roughly as follows:

```html
<nav>
  <h4>Slotted heading (describes function)</h4>
  <ul>
    <li><a>Regular list item</a></li>
    <li><a>List item with sub sections</a></li>
    <li>
        <ul>
            <li><a>Nested sub section</a></li>
        </ul>
    </li>
  </ul>
</nav>
```

