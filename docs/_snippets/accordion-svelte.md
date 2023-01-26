```shell
npm install @patternfly/elements
```
{%raw%}
```html
<pfe-accordion>
  {#each data as item}
  <pfe-accordion-header>
    <h3>{item.header}</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <p>{item.panel}</p>
  </pfe-accordion-panel>
  {/each}
</pfe-accordion>

<script>
  import "@patternfly/elements/pfe-accordion/pfe-accordion.js";
	let data = [
    { header: 'Heading 1', panel: 'Here is some content' },
    { header: 'Heading 2', panel: 'Here is some more content' },
  ];
</script>
```
{%endraw%}
