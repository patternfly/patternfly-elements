{%raw%}
```html
<pf-accordion>
  {#each data as item}
  <pf-accordion-header>
    <h3>{item.header}</h3>
  </pf-accordion-header>
  <pf-accordion-panel>
    <p>{item.panel}</p>
  </pf-accordion-panel>
  {/each}
</pf-accordion>

<script>
  import "@patternfly/elements/pf-accordion/pf-accordion.js";
	let data = [
    { header: 'Heading 1', panel: 'Here is some content' },
    { header: 'Heading 2', panel: 'Here is some more content' },
  ];
</script>
```
{%endraw%}
