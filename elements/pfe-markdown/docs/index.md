{% renderOverview %}
<pfe-markdown>
  <div pfe-markdown-container># Heading Level 1
## Heading Level 2
This is a paragraph with [a link](https://patternflyelements.org).</div>
</pfe-markdown>

{% endrenderOverview %}

{% band header="Usage" %}
```html
<pfe-markdown>
  <div pfe-markdown-container># Heading Level 1
## Heading Level 2
This is a paragraph with [a link](https://patternflyelements.org).</div>
</pfe-markdown>
```

It is important that the div with the `pfe-markdown-container` attribute is present. Without it, the element won't work. This element does not actually use the shadow DOM to display it's contents.

At runtime, a child div with an attribute of `pfe-markdown-render` is appended to the light DOM and the `pfe-markdown-container` div is hidden with an inline style. The purpose behind this is so that all of the styles that are present in the light DOM are available to the converted markdown.

{% endband %}

{% renderSlots %}
  There is a default slot but it is just used to capture the light DOM and hide it.
{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
