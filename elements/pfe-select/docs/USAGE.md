```html
With <select> element
<pfe-select>
  <select>
    <option disabled>Please select an option</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</pfe-select>
```

```html
Without <select> element
<pfe-select id="pfe-select">
</pfe-select>
For custom options, use pfeOptions setter function to set the options as shown in snippet below
```

```js
 let selectWithJSOptionsOnly = document.querySelector("#pfe-select");
  customElements.whenDefined("pfe-select").then(() => {
    selectWithJSOptionsOnly.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];
  });
```