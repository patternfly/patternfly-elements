const { shadowRoot } = document.querySelector('[data-demo="pfe-clipboard"]');

shadowRoot.getElementById('propertyCopy').contentToCopy =
  `    <h2>Clipboard: with custom text & copying text from element</h2>n    <pfe-clipboard role="button" tabindex="0" copy-from="#textToCopy">n      <span slot="text">This will copy the text in the text field below!</span>n      <span slot="text--success">Making some copies!</span>n    </pfe-clipboard>n    <input type="text" id="textToCopy" value="This text will be copied!!11"></input>`;
