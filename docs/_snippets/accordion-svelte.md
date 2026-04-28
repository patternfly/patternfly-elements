{%raw%}
```html
<pf-v5-accordion>
  {#each data as item}
  <pf-v5-accordion-header>
    <h3>{item.header}</h3>
  </pf-v5-accordion-header>
  <pf-v5-accordion-panel>
    <p>{item.panel}</p>
  </pf-v5-accordion-panel>
  {/each}
</pf-v5-accordion>

<script>
  import "@patternfly/elements/pf-v5-accordion/pf-v5-accordion.js";
	let data = [
    { header: 'Heading 1', panel: 'Here is some content' },
    { header: 'Heading 2', panel: 'Here is some more content' },
  ];
</script>
```
{%endraw%}
