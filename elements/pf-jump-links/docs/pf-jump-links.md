{% renderInstallation %} {% endrenderInstallation %}

{% renderOverview %}
<section>
  <h2>Basic</h2>
  <pf-jump-links>
    <pf-jump-links-item href="#heading-1">Inactive section</pf-jump-links-item>
    <pf-jump-links-item href="#heading-2" active>Active section</pf-jump-links-item>
    <pf-jump-links-item href="#heading-3">Inactive section</pf-jump-links-item>
  </pf-jump-links>
</section>
{% endrenderOverview %}

{% band header="Usage" %}
  <section>
    <h2>With centered list</h2>
    {% htmlexample %}
    <pf-jump-links centered>
      <pf-jump-links-item href="#heading-1">Inactive section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-2" active>Active section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-3">Inactive section</pf-jump-links-item>
    </pf-jump-links>
    {% endhtmlexample %}
  </section>

  <section>
    <h2>With label</h2>
    {% htmlexample %}
    <pf-jump-links label="Jump to section">
      <pf-jump-links-item href="#heading-1">Inactive section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-2" active>Active section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-3">Inactive section</pf-jump-links-item>
    </pf-jump-links>
    {% endhtmlexample %}
  </section>

  <section>
    <h2>Vertical</h2>
    {% htmlexample %}
    <pf-jump-links vertical>
      <pf-jump-links-item href="#heading-1">Inactive section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-2" active>Active section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-3">Inactive section</pf-jump-links-item>
    </pf-jump-links>
    {% endhtmlexample %}
  </section>

  <section>
    <h2>Expandable vertical with subsection</h2>
    {% htmlexample %}
    <pf-jump-links vertical expandable label="Jump to section">
      <pf-jump-links-item href="#heading-1">Inactive section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-2">
        Section with active subsection
        <pf-jump-links-list slot="subsection">
          <pf-jump-links-item href="#heading-2-1" active>Active subsection</pf-jump-links-item>
          <pf-jump-links-item href="#heading-2-2">Inactive subsection</pf-jump-links-item>
          <pf-jump-links-item href="#heading-2-3">Inactive subsection</pf-jump-links-item>
        </pf-jump-links-list>
      </pf-jump-links-item>
      <pf-jump-links-item href="#heading-3">Inactive section</pf-jump-links-item>
      <pf-jump-links-item href="#heading-4">Inactive section</pf-jump-links-item>
    </pf-jump-links>
    {% endhtmlexample %}
  </section>

  <section>
    <h2>Expandable vertical with Scrollspy</h2>
    {% htmlexample %}
    <pf-jump-links vertical
                    expandable
                    expanded
                    label="Jump to section"
                    scrollable-element="scrollable-element">
      <pf-jump-links-item id="1" href="#heading-1">Heading 1</pf-jump-links-item>
      <pf-jump-links-item id="2" href="#heading-2">Heading 2</pf-jump-links-item>
      <pf-jump-links-item id="3" href="#heading-3">Heading 3</pf-jump-links-item>
      <pf-jump-links-item id="4" href="#heading-4">Heading 4</pf-jump-links-item>
      <pf-jump-links-item id="5" href="#heading-5">Heading 5</pf-jump-links-item>
    </pf-jump-links>
    {% endhtmlexample %}
  </section>
{%endband %}

{% renderSlots %}{% endrenderSlots %}
{% renderSlots for="pf-jump-links-list", level=3, header="Slots on `pf-jump-links-list`" %}{% endrenderSlots %}
{% renderSlots for="pf-jump-links-item", level=3, header="Slots on `pf-jump-links-item`" %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
