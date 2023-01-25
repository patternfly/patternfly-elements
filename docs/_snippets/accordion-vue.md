```shell
npm install @patternfly/elements
```

```html
<template>
  <pfe-accordion>
    <template v-for="{ header, panel } in data">
      <pfe-accordion-header>
        <h3>{{ header }}</h3>
      </pfe-accordion-header>
      <pfe-accordion-panel>
        <p>{{ panel }}</p>
      </pfe-accordion-panel>
    </template>
  </pfe-accordion>
</template>

<script>
import "@patternfly/elements/pfe-accordion/pfe-accordion.js";
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
