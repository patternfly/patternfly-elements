# PatternFly Element | Jump links element

## Usage
This component watches the content inside a panel and updates the connected `<pfe-jump-links-nav>` to indicate the section of the document currently being viewed. As a developer, you have the choice of whether you bring your own markup to the navigation or have it build for you (see `autobuild` attribute below). Please note the shape of the markup that is required. In order to support sub-section highlighting, jump links must be somewhat opinionated about the DOM tree.

Inside the panel, every section must have at least an `id` present. If using autobuild, the `id` needs to be present on the tag containing the label text or make use of the `nav-label` attribute to manually define the label. The `nav-label` attribute will always take precedence over the text content. For faster processing, include the class `.pfe-jump-links-panel__section` to any elements you want the navigation to watch. Each item meeting these requirements inside a panel are called sections.

When each section crosses the scroll threshold, the navigation will highlight to show it is active. If it has sub-sections, the nested children will become visible.

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
Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
    const nav = document.getElementById("jumplinks2");
    const panel = document.getElementById("jumplinks-panel");
    if (nav && panel) nav.panel = panel;
});
```

Alternatively, you can manually define your sections (rather than their containing panel) by passing a NodeList to the sections setter.  If you define the sections manually, you do _not_ need to define their panel.

```js
Promise.all([customElements.whenDefined("pfe-jump-links-nav")]).then(() => {
    const nav = document.getElementById("jumplinks2");
    const sections = document.querySelectorAll(".custom-section-identifier");
    if (nav && sections && sections.length > 0) nav.sections = sections;
});
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

## Slots

- `heading`: This slot is for the navigation element, `pfe-jump-links-nav` to identify the markup for the list's heading.

### Available slots but not currently rendered
<!-- @TODO We need designs for what to do with the information in these slots -->
- `cta`: This slot is for the call-to-action for `pfe-jump-links-nav` to identify the markup for the call-to-action element.
- `logo`: This slot is for the navigation element, `pfe-jump-links-nav` to identify the markup for the navigation logo.

The rest of the component works by creating a mirror shadowRoot based on the provided light DOM markup or, if using autobuild, it generates the mark-up based on the identified sections.


## Attributes

### `pfe-jump-links-nav`

- `autobuild`: Creates its own markup for the navigation based on the defined sections.

- `horizontal`: Switches rendering of the jump links from vertical to a horizontal, secondary navigation style.

- `sr-text`: This attribute is read when the component upgrades to provide the innerText of the heading. If there is no `sr-text` attribute then the component defaults to "Jump to section". This attribute is to enable translations.

- `color`: Currently there are 2 options for the background color of the component; lightest or darkest.

- `offset`: This attribute determines the distance from the top of the browser window where the `pfe-jump-links-nav` should be attached. For instance `offset="600"` would mean that the component attaches at 600px from the top of the viewport. If this variable has not been set, it calculates the height of the pfe-navigation plus any sticky horizontal navigation 

### `pfe-jump-links-panel`

- `offset`: This attribute determines the distance from the top of the browser window to trigger a switch from one link being active to the next. For instance `offset="600"` would mean that threshold flips at 600px from the top. The default is set at 200, and if you desire 200px then you can leave this attribute off. The `offset` attribute should be placed on `pfe-jump-links-panel`. There is a css solution to control the offset, however the attribute value takes precedence over css. To read more about a css solution see below.

- `scrolltarget`: This attribute connects a `pfe-jump-links-panel` to a specific `pfe-jump-links-nav` using the ID of the navigation element.  If the nav and panel are the only ones on the page, this is not necessary.  If more than one of each component exists, this attribute is required.

## Deprecated alias attributes

- `pfe-c-autobuild`: Alias for autobuild.
- `pfe-c-offset`: Alias for offset.
- `pfe-c-scrolltarget`: Alias for scrolltarget.

## Custom properties

- `--pfe-jump-links-panel--offset: {integer}`: You can control offset in your styling layer as well. This value can be set directly on the component inside a style attribute, e.g. `style="--pfe-jump-links-panel--offset: 100;"` or using the appropriate selector in another file. Please note that adding an attribute will take precedence over a css value. At the moment only integer values passed to this key are valid. No other values are supported. This means that passing "300px", "2rem","calc(100% - 12px)" will all result in JavaScript errors. You should pass a number that correlates to pixels. To read about the `offset` attribute, see above.

- `--pfe-jump-links-panel__section--spacer: {integer}{unit}`: pfe-jump-links are built with native behavior in terms of anchor links and scroll. That means that clicking a nav link will adjust the viewport to show the top of that section aligned with the top of the browser. This native browser is undesirable in certain cases such as working with a "sticky" navigation bar or other elements placed outside of the normal document flow. The panel components inserts a "spacer" just before each section that can be manipulated with this custom property. Specify a unit along with an integer like so: `--pfe-jump-links-panel__section--spacer: 100px;`.

## Events
This component fires an event when a link is made active.


## Dependencies
Describe any dependent elements or libraries here too.

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Jump links (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
