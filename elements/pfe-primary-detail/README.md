# PatternFly Elements Primary Detail
     
A primary-detail layout is an interface that shows a list of items and the corresponding details of the selected item.

This component is an implementation of one of the "Primary detail simple list in card" from [Patternfly React](https://www.patternfly.org/v4/demos/primary-detail), more layouts may be implemented later.

Read more about Primary Detail in the [PatternFly Elements Primary Detail documentation](https://patternflyelements.org/components/primary-detail)

##  Installation

Load `<pfe-primary-detail>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-primary-detail?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-primary-detail
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-primary-detail';
```

## Usage

```html
<pfe-primary-detail>
  <h2 slot="header">
    <a href="#">Primary detail demo!</a>
  </h2>

  <h3 slot="nav">Section 1: Infrastructure and Management</h3>
  <div slot="details">
    <p>Content 1:</p>
    <ul>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
      <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
    </ul>
  </div>

  <h3 slot="nav">Section 2: Cloud Computing</h3>
  <div slot="details">
    <ul>
      <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
      <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
      <li><a href="#">Pellentesque fermentum dolor</a></li>
      <li><a href="#">Lorum ipsum dolor sit amet</a></li>
    </ul>
  </div>

  <h3 slot="nav">Storage</h3>
  <ul slot="details">
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
    <li><a href="#">Pellentesque fermentum dolor</a></li>
  </ul>

  <h3 slot="nav">Runtimes</h3>
  <ul slot="details">
    <li><a href="#">Pellentesque fermentum dolor</a></li>
    <li><a href="#">Morbi in sem quis dui placerat ornare</a></li>
    <li><a href="#">Aliquam tincidunt mauris eu risus</a></li>
    <li><a href="#">Praesent dapibus, neque id cursus faucibus</a></li>
  </ul>

  <pfe-cta priority="primary"><a href="#">All Products</a></pfe-cta>
<pfe-primary-detail>
```
```css
pfe-primary-detail::part(footer) {
  padding: 1em 0.75em 2em;
}
```

### Accessibility

The default markup should have semantic markup if the component can't load, once it loads the component the appropriate tab interactions and appropriate markup for assistive tech is handled for you.

Elements in the `details` slot should not have a role (before the component updates it) and should not be a `ul`, `ol`, `dl`, or other tags with specific semantic meaning. The slotted tag will get a `role`, which will interfere with any other responsibilities the element has for the accessibility tree/assistive tech.

#### Focus Indicator Styles
@todo this section is to be moved
The component requires visible focus indicator styles for focusable elements (ie.`links`, `buttons`, `[tabindex="0"]`) in order to meet [**WCAG 2.0/2.1 AA compliance**](https://www.w3.org/WAI/WCAG21/quickref/#focus-visible). Below is a good example of styles to use for the focus indicator, these styles match the focus indicator of `pfe-navigation`. The `padding` style is to increase the clickable area of links in order to help users have a better experience when trying to click the links, this also helps users with limited mobility.

```html
  pfe-primary-detail .is-focused:focus,
  pfe-primary-detail .is-focused:hover {
    outline: 1px dashed #000;
    outline-width: 2px;
  }

  pfe-primary-detail ul.is-focused:hover,
  pfe-primary-detail :not(pfe-cta).is-focused:hover {
      outline: 0;
  }

  pfe-primary-detail a.is-focused {
    padding: 8px;
  }
```

