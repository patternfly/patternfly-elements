{% renderOverview %}
  <pf-tile>
    <h3 slot="title">Default</h3>
  </pf-tile>
  <pf-tile selected>
    <h3 slot="title">Selected</h3>
  </pf-tile>
  <pf-tile disabled>
    <h3 slot="title">Disabled</h3>
  </pf-tile>
{% endrenderOverview %}

{% band header="Usage" %}
  ### With subtext
  {% htmlexample %}
  <pf-tile>
    <pf-icon slot="icon" set="fas" icon="plus" size="md" loading="eager"></pf-icon>
    <h3 slot="title">Default</h3>
    <p>Subtext goes here</p>
  </pf-tile>
  {% endhtmlexample %}

  ### Selected
  {% htmlexample %}
  <pf-tile selected>
    <svg slot="icon" fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
    <h3 slot="title">Selected</h3>
    <p>Subtext goes here</p>
  </pf-tile>
  {% endhtmlexample %}

  ### Stacked
  {% htmlexample %}
  <pf-tile stacked>
    <pf-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pf-icon>
    <h3 slot="title">Default</h3>
    <p>Subtext goes here</p>
  </pf-tile>
  {% endhtmlexample %}

  ### Stacked Large
  {% htmlexample %}
  <pf-tile stacked="lg">
    <pf-icon slot="icon" set="fas" icon="bell" size="md" loading="idle"></pf-icon>
    <h3 slot="title">Default</h3>
    <p>Subtext goes here</p>
  </pf-tile>
  {% endhtmlexample %}

  ### Disabled
  {% htmlexample %}
  <pf-tile stacked disabled>
    <svg slot="icon" style="vertical-align:-0.125em" fill="currentColor" height="1em" width="1em" viewBox="0 0 896 1024" aria-hidden="true" role="img"><path d="M448,0 C465.333333,0 480.333333,6.33333333 493,19 C505.666667,31.6666667 512,46.6666667 512,64 L512,106 L514.23,106.45 C587.89,121.39 648.48,157.24 696,214 C744,271.333333 768,338.666667 768,416 C768,500 780,568.666667 804,622 C818.666667,652.666667 841.333333,684 872,716 C873.773676,718.829136 875.780658,721.505113 878,724 C890,737.333333 896,752.333333 896,769 C896,785.666667 890,800.333333 878,813 C866,825.666667 850.666667,832 832,832 L63.3,832 C44.9533333,831.84 29.8533333,825.506667 18,813 C6,800.333333 0,785.666667 0,769 C0,752.333333 6,737.333333 18,724 L24,716 L25.06,714.9 C55.1933333,683.28 77.5066667,652.313333 92,622 C116,568.666667 128,500 128,416 C128,338.666667 152,271.333333 200,214 C248,156.666667 309.333333,120.666667 384,106 L384,63.31 C384.166667,46.27 390.5,31.5 403,19 C415.666667,6.33333333 430.666667,0 448,0 Z M576,896 L576,897.08 C575.74,932.6 563.073333,962.573333 538,987 C512.666667,1011.66667 482.666667,1024 448,1024 C413.333333,1024 383.333333,1011.66667 358,987 C332.666667,962.333333 320,932 320,896 L576,896 Z"></path></svg>
    <h3 slot="title">Disabled</h3>
    <p>Subtext goes here</p>
  </pf-tile>
  {% endhtmlexample %}
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
