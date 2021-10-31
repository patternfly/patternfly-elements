# PatternFly Elements Select
     
The select component provides a way to create list of options in a form.

Read more about Select in the [PatternFly Elements Select documentation](https://patternflyelements.org/components/select)

##  Installation

Load `<pfe-select>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-select?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-select
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-select';
```

## Usage

There are 3 ways of providing options to your component:

- Users can provide options using `<select>` element inside `<pfe-select>`
- Users can set custom options as an array of objects on the element's `options` property
- Users can append more options by using the element's `addOptions()` method

*Note*: `<pfe-select>` component can also be used in places where dropdowns are needed but its more suitable for forms. For dropdowns, [`<pfe-dropdown>`](https://patternflyelements.org/components/dropdown) is preferred.

With `<select>` element:

```html
<pfe-select>
  <select>
    <option disabled>Please select an option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</pfe-select>
```
Without `<select>` element:

```html
<pfe-select></pfe-select>
```

For custom options, use the `options` setter to set the options as shown in snippet below:

```js
const select = document.querySelector("pfe-select");
select.options = [
  { text: "Please select an option", value: "", selected: true },
  { text: 'One', value: '1', selected: false },
  { text: 'Two', value: '2', selected: false },
  { text: 'Three', value: '3', selected: false}
];
```

