{%raw%}
```html
<template>
  <pf-v6-accordion>
    <template v-for="{ header, panel } in data">
      <pf-v6-accordion-header>
        <h3>{{ header }}</h3>
      </pf-v6-accordion-header>
      <pf-v6-accordion-panel>
        <p>{{ panel }}</p>
      </pf-v6-accordion-panel>
    </template>
  </pf-v6-accordion>
</template>
{%endraw%}

<script>
import "@patternfly/elements/pf-v6-accordion/pf-v6-accordion.js";
export default {
  name: 'App',
  data() {
    return {
      data: [
        { header: 'Heading 1', panel: 'Here is some content' },
        { header: 'Heading 2', panel: 'Here is some more content' },
      ],
    };
  },
};
</script>
```
