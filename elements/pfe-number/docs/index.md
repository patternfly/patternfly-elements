{% renderOverview %}
  <div class="pfe-l-grid pfe-m-gutters pfe-m-all-4-col">
    <pfe-card>
      <h3 slot="header">Ordinal numbers</h3>
      <pfe-number type="ordinal" number="1">1</pfe-number>,
      <pfe-number type="ordinal" number="2">2</pfe-number>,
      <pfe-number type="ordinal" number="3">3</pfe-number>,
      <pfe-number type="ordinal" number="4">4</pfe-number>
    </pfe-card>
    <pfe-card>
      <h3 slot="header">Bytes</h3>
      <pfe-number type="bytes" number="2017">2017</pfe-number>,
      <pfe-number type="bytes" number="4430292">4430292</pfe-number>
    </pfe-card>
    <pfe-card>
      <h3 slot="header">Abbreviations</h3>
      <pfe-number type="abbrev" number="12345">12345</pfe-number>,
      <pfe-number type="abbrev" number="1000000">1000000</pfe-number>
    </pfe-card>
    <pfe-card>
      <h3 slot="header">Percentages</h3>
      <pfe-number type="percent" number="0.5678">0.5678</pfe-number>,
      <pfe-number type="percent" number="1.2039">1.2039</pfe-number>
    </pfe-card>
    <pfe-card>
      <h3 slot="header">e</h3>
      <pfe-number type="e" number="2000000">2000000</pfe-number>
    </pfe-card>
    <pfe-card>
      <h3 slot="header">Thousands</h3>
      <pfe-number type="thousands" number="97654321.12345678">97654321.12345678</pfe-number>
    </pfe-card>
  </div>
{% endrenderOverview %}

{% band header="Usage" %}
  ### Ordinal numbers
  <pfe-number type="ordinal" number="1">1</pfe-number>,
  <pfe-number type="ordinal" number="2">2</pfe-number>,
  <pfe-number type="ordinal" number="3">3</pfe-number>,
  <pfe-number type="ordinal" number="4">4</pfe-number>

  ```html
  <pfe-number type="ordinal" number="1">1</pfe-number>
  <pfe-number type="ordinal" number="2">2</pfe-number>
  <pfe-number type="ordinal" number="3">3</pfe-number>
  <pfe-number type="ordinal" number="4">4</pfe-number>
  ```

  ### Bytes
  <pfe-number type="bytes" number="2017">2017</pfe-number>,
  <pfe-number type="bytes" number="4430292">4430292</pfe-number>

  ```html
  <pfe-number type="bytes" number="2017">2017</pfe-number>
  <pfe-number type="bytes" number="4430292">4430292</pfe-number>
  ```

  ### Abbreviations
  <pfe-number type="abbrev" number="12345">12345</pfe-number>,
  <pfe-number type="abbrev" number="1000000">1000000</pfe-number>

  ```html
  <pfe-number type="abbrev" number="12345">12345</pfe-number>
  <pfe-number type="abbrev" number="1000000">1000000</pfe-number>
  ```

  ### Percentages
  <pfe-number type="percent" number="0.5678">0.5678</pfe-number>,
  <pfe-number type="percent" number="1.2039">1.2039</pfe-number>

  ```html
  <pfe-number type="percent" number="0.5678">0.5678</pfe-number>
  <pfe-number type="percent" number="1.2039">1.2039</pfe-number>
  ```

  ### e
  <pfe-number type="e" number="2000000">2000000</pfe-number>

  ```html
  <pfe-number type="e" number="2000000">2000000</pfe-number>
  ```

  ### Thousands
  <pfe-number type="thousands" number="97654321.12345678">97654321.12345678</pfe-number>

  ```html
  <pfe-number type="thousands" number="97654321.12345678">97654321.12345678</pfe-number>
  ```
{% endband %}

{% renderSlots %}{% endrenderSlots %}

{% renderAttributes %}{% endrenderAttributes %}

{% renderProperties %}{% endrenderProperties %}

{% renderMethods %}{% endrenderMethods %}

{% renderEvents %}{% endrenderEvents %}

{% renderCssCustomProperties %}{% endrenderCssCustomProperties %}

{% renderCssParts %}{% endrenderCssParts %}
