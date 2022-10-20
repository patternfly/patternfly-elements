{% renderOverview %}
<div>
  <pfe-tile>
    Default
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
  <pfe-tile selected>
    Selected
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
  <pfe-tile disabled>
    Disabled
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
</div>
{% endrenderOverview %}

{% band header="Usage" %}
```html
  <pfe-tile>
    <pfe-icon slot="icon" set="fas" icon="plus" size="md" loading="eager"></pfe-icon>
    Default
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
```
{% endband %}

{% band header="Variants" %}
### Selected
<div>
  <pfe-tile selected>
    <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
    Default
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
</div>

```html
<pfe-tile selected>
  <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
  Default
  <div slot="body">Subtext goes here</div>
</pfe-tile>
```

### Stacked
<div>
  <pfe-tile stacked>
    <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
    Default
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
</div>

```html
<pfe-tile stacked>
  <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
  Default
  <div slot="body">Subtext goes here</div>
</pfe-tile>
```

### Stacked Large
<div>
  <pfe-tile stacked="lg">
    <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
    Default
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
</div>

```html
<pfe-tile stacked="lg">
  <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
  Default
  <div slot="body">Subtext goes here</div>
</pfe-tile>
```

### Disabled
<div>
  <pfe-tile disabled>
    <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
    Default
    <div slot="body">Subtext goes here</div>
  </pfe-tile>
</div>

```html
<pfe-tile disabled>
  <pfe-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pfe-icon>
  Default
  <div slot="body">Subtext goes here</div>
</pfe-tile>
```

{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}