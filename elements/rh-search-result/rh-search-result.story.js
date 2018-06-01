import { storiesOf } from "@storybook/polymer";
import "./rh-search-result";
import "../rh-datetime/rh-datetime";

storiesOf("Search", module).add(
  "rh-search-result",
  () => `
  <style>
    rh-search-result {
      margin-bottom: 1.8em;
    }

    mark {
      background-color: #fcf8e3;
      padding: .2em;
    }

    .recommended {
      color: #c00;
      font-weight: 800;
    }
  </style>
  
  <rh-search-result>
    <h3 slot="heading">
      <a href="https://access.redhat.com/products/red-hat-enterprise-linux">Red Hat Enterprise Linux</a>
    </h3>
    <div slot="meta">
      <span class="recommended">Recommended:</span> Product Hub  —
      <rh-datetime datetime="2018-05-31T15:02:20Z" type="local" day="numeric" month="short" year="numeric">
        2018-05-31T15:02:20Z
      </rh-datetime>
    </div>
    The Red Hat Enterprise Linux product page on the Customer Portal has the latest downloads, curated knowledge, support information and implementation guides.
  </rh-search-result>
  <rh-search-result>
    <h3 slot="heading">
      <a href="https://access.redhat.com/downloads/content/mongodb-server/1.6.4-4.el6/i686/fd431d51/package">mongodb-server-1.6.4-4.el6.i686.rpm</a>
    </h3>
    <div slot="meta">
      Packages  —
      <rh-datetime datetime="2017-03-03T16:10:59Z" type="local" day="numeric" month="short" year="numeric">
        2017-03-03T16:10:59Z
      </rh-datetime>
    </div>
    This package provides the <mark>mongo</mark> server software, <mark>mongo</mark> sharding server software, default configuration files, and init scripts.
  </rh-search-result>
  `
);
