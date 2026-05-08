{%raw%}
```html
<pf-v6-accordion>
  {#each data as item}
  <pf-v6-accordion-header>
    <h3>{item.header}</h3>
  </pf-v6-accordion-header>
  <pf-v6-accordion-panel>
    <p>{item.panel}</p>
  </pf-v6-accordion-panel>
  {/each}
</pf-v6-accordion>

<script>
  import "@patternfly/elements/pf-v6-accordion/pf-v6-accordion.js";
	let data = [
    { header: 'Heading 1', panel: 'Here is some content' },
    { header: 'Heading 2', panel: 'Here is some more content' },
  ];
</script>
```
{%endraw%}
