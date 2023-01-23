```shell
npm install @patternfly/elements
```

```html
<template>
  <pf-accordion>
    <template v-for="{ header, panel } in data">
      <pf-accordion-header>
        <h3>{{ header }}</h3>
      </pf-accordion-header>
      <pf-accordion-panel>
        <p>{{ panel }}</p>
      </pf-accordion-panel>
    </template>
  </pf-accordion>
</template>

<script>
import "@patternfly/elements/pf-accordion/pf-accordion.js";
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
