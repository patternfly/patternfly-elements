# PatternFly Element | Jump links element


## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-jump-links>
    <!-- Default slot -->
    <h2>This is pfe-jump-links</h2>
    
</pfe-jump-links>
```

### Accessibility
The template and DOM structure of this component are as follows:
```
<nav>
  <h2 hidden>Page navigation</h2> // this is visually hidden
  <h4>Slotted content</h4>
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

No extra roles or aria labels are required because we're using standard html tags in their prescribed uses.

## Slots

- `namedSlot`: The only slot this component has is the heading. The rest of the component works by creating a mirror shadowRoot based on the Light DOM markup.

## Attributes

- `attr`: autobuild Flips the switch on the component to create its own markup for the navigation. If you use this attribute, then no experience is given for non-JS runtimes and the component will crawl the associated panel to come up with its own list of links.

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
