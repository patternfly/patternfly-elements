import { storiesOf } from "@storybook/polymer";
import "./rh-search-result";
import "../rh-datetime/rh-datetime";

const stories = storiesOf("Search", module);

stories.add(
  "rh-search-result: Customer Portal",
  () => `
  <link rel="stylesheet" type="text/css" href="//overpass-30e2.kxcdn.com/overpass.css">
  <style>
    body {
      font-family: Overpass;
      color: #252525;
    }

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

stories.add(
  "rh-search-result: Red Hat",
  () => `
  <link rel="stylesheet" type="text/css" href="//overpass-30e2.kxcdn.com/overpass.css">
  <style>
    body {
      font-family: Overpass;
      color: #646464;
    }

    rh-search-result {
      --rhe-c-search-result_heading--Margin: 11px 0 6px 0;
      --rhe-c-search-result_heading--FontWeight: 700;
      --rhe-c-search-result_heading--FontColor: #2290ff;
      --rhe-c-search-result_heading--FontColorHover: #5ea8f2;
      --rhe-c-search-result_heading--TextDecorationHover: none;
      --rhe-c-search-result_heading--FontSize: 20px;
      --rhe-c-search-result_meta--Margin: 0rem 0rem 0.5rem;
      border-bottom: 1px solid #eee;
      padding: 0.25rem 0rem 2rem;
      margin-bottom: 1em;
    }
  </style>

  <rh-search-result>
    <h4 slot="heading">
      <a href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux">Red Hat Enterprise Linux operating system</a>
    </h4>
    <a slot="meta" href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux">https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux</a>
    The stable Red Hat Enterprise Linux platform offers military-grade security, support across physical, virtual, and cloud environments, and much more.
  </rh-search-result>
  <rh-search-result>
    <h4 slot="heading">
      <a href="">Introducing the "rhel-tools" for RHEL Atomic Host - RHD Blog</a>
    </h4>
    <a slot="meta" href="https://developers.redhat.com/blog/2015/03/11/introducing-the-rhel-container-for-rhel-atomic-host/">https://developers.redhat.com/blog/2015/03/11/introducing-the-rhel-container-for-rhel-atomic-host/</a>
    The rise of the purpose-built Linux distribution Recently, several purpose-built distributions have been created specifically to run Linux containers.  There seem to be more popping up every day. ...
  </rh-search-result>
`
);

stories.add(
  "rh-search-result: Developers Program",
  () => `
  <link rel="stylesheet" type="text/css" href="//overpass-30e2.kxcdn.com/overpass.css">
  <style>
    body {
      font-family: Overpass;
    }

    rh-search-result {
      --rhe-c-search-result_heading--TextDecorationHover: none;
      --rhe-c-search-result_heading--FontSize: 20px;
      --rhe-c-search-result_heading--LineHeight: 1.4;
      --rhe-c-search-result_meta--Margin: 0;
      --rhe-c-search-result_meta--LineHeight: 1.5;
      border-bottom: 1px solid #d5d5d5;
      padding-bottom: 25px;
      margin-bottom: 25px;
    }

    .caps {
      text-transform: uppercase;
    }
  </style>

  <rh-search-result>
    <h4 slot="heading">
      <a href="https://developers.redhat.com/blog/2018/04/13/rhel-vm-deallocate-azure-cli/">Deallocate an Azure VM Using the Azure CLI on RHEL</a>
    </h4>
    <div slot="meta">
      <span class="caps">Blog Post</span> -
      <rh-datetime datetime="2018-04-13T10:55:07.000Z" type="local" day="numeric" month="long" year="numeric">
        2018-04-13T10:55:07.000Z
      </rh-datetime>
    </div>
    If you’re running Red Hat Enterprise Linux server on Microsoft Azure, you may want to shut down and deallocate the VM using commands inside of the VM itself for automation or just for convenience. On Azure, if you shut down the VM by
  </rh-search-result>
  <rh-search-result>
    <h4 slot="heading">
      <a href="https://developer.jboss.org/thread/271534">Clearing the dust | .NET on RHEL</a>
    </h4>
    <div slot="meta">
      <span class="caps">Forum Thread</span> -
      <rh-datetime datetime="2016-07-15T10:29:33.219Z" type="local" day="numeric" month="long" year="numeric">
        2016-07-15T10:29:33.219Z
      </rh-datetime>
    </div>
    Hi there, I have answered this on a post here but wanted to make it a seperate discussion for better handling. to be honest. It is kind of hard to get all the .NET pieces together since there are Instructions on Github and there we have Instructions on Redhat. As for the Github instructions. Most of the examples will work but the instructions are already outdated (e.g. version changes from RC t...
  </rh-search-result>
`
);
