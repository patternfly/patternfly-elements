import '<%= packageName %>';

const root = document.querySelector('[data-demo="<%= tagName %>"]')?.shadowRoot ?? document;

root.querySelector('<%= tagName %>');
