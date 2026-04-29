{%raw%}
```html
<template>
  <pf-v5-accordion>
    <template v-for="{ header, panel } in data">
      <pf-v5-accordion-header>
        <h3>{{ header }}</h3>
      </pf-v5-accordion-header>
      <pf-v5-accordion-panel>
        <p>{{ panel }}</p>
      </pf-v5-accordion-panel>
    </template>
  </pf-v5-accordion>
</template>
{%endraw%}

<script>
import "@patternfly/elements/pf-v5-accordion/pf-v5-accordion.js";
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
