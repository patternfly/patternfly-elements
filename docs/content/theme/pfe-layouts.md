+++
title = "Layouts"
description = ""
weight = 4
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++

<link rel="stylesheet" type="text/css" href="//overpass-30e2.kxcdn.com/overpass.css">
<link rel="stylesheet" type="text/css" href="../pfe-layouts.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.14.0/themes/prism.min.css">

<style>

.pfe-l-grid > * {
  background: #e0d7ee;
  padding: 8px;
}
</style>

<article>
  <section>
    <h2>Grid</h2>

    <section>
      <h3>Pure Grid</h3>
      <div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md pfe-m-all-3-col-on-lg">
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
        <div>Item</div>
      </div>

      <h4>Code</h4>
      <pre><code class="lang-markup">&lt;div class="pfe-l-grid pfe-m-gutters pfe-m-all-6-col pfe-m-all-4-col-on-md pfe-m-all-3-col-on-lg"&gt;
&lt;div&gt;Item&lt;/div&gt;
&lt;div&gt;Item&lt;/div&gt;
&lt;div&gt;Item&lt;/div&gt;
&lt;div&gt;Item&lt;/div&gt;
&lt;div&gt;Item&lt;/div&gt;
&lt;/div&gt;</code></pre>
    </section>

    <section>
      <h3>Bootstrap-style Columns</h3>
      <div class="pfe-l-grid pfe-m-gutters">
        <div class="pfe-l-grid__item">Default Item</div>
        <div class="pfe-l-grid__item pfe-m-2-col"><code>pfe-m-2-col</code></div>
        <div class="pfe-l-grid__item pfe-m-10-col"><code>pfe-m-10-col</code></div>
        <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
        <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
        <div class="pfe-l-grid__item pfe-m-4-col"><code>pfe-m-4-col</code></div>
        <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
        <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md</code></div>
        <div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"><code>pfe-m-6-col pfe-m-3-col-on-md</code></div>
      </div>

      <h4>Code</h4>
      <pre><code class="lang-markup">&lt;div class="pfe-l-grid pfe-m-gutters"&gt;
&lt;div class="pfe-l-grid__item"&gt;Default Item&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-2-col"&gt;&lt;code&gt;pfe-m-2-col&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-10-col"&gt;&lt;code&gt;pfe-m-10-col&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-4-col"&gt;&lt;code&gt;pfe-m-4-col&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-4-col"&gt;&lt;code&gt;pfe-m-4-col&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-4-col"&gt;&lt;code&gt;pfe-m-4-col&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"&gt;&lt;code&gt;pfe-m-6-col pfe-m-3-col-on-md&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md"&gt;&lt;code&gt;pfe-m-6-col pfe-m-3-col-on-md pfe-m-startat-7-col-on-md&lt;/code&gt;&lt;/div&gt;
&lt;div class="pfe-l-grid__item pfe-m-6-col pfe-m-3-col-on-md"&gt;&lt;code&gt;pfe-m-6-col pfe-m-3-col-on-md&lt;/code&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

    </section>

  </section>
</article>
