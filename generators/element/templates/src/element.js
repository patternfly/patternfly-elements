import PFElement from "<%= pfeElementLocation %>";

class <%= elementClassName %> extends PFElement {
  static get tag() {
    return "<%= elementName %>";
  }

  get schemaUrl() {
    return "<%= elementName %>.json";
  }

  get templateUrl() {
    return "<%= elementName %>.html";
  }

  get styleUrl() {
<%_ if (useSass) { _%>
    return "<%= elementName %>.scss";
<%_ } else { _%>
    return "<%= elementName %>.css";
<%_ } _%>
  }

<%_ if (attributes.length > 0) { _%>
  static get observedAttributes() {
    return [<% if (isPfelement) { %><%- _.join(attributes.map(item => `"pfe-${item}"`), ", ") %><% } else { %><%- _.join(attributes.map(item => `"${item}"`), ", ") %><% } %>];
  }
<%_ } else { _%>
  // static get observedAttributes() {
  //   return [];
  // }
<%_ } _%>

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.<%= _.capitalize(template_type) %>;
  }

  constructor() {
    super(<%= elementClassName %>, { type: <%= elementClassName %>.PfeType });
    <%_ if (slots.length > 0) { %>
    <%_ for(let i = 0; i < slots.length; i++) { _%>
    this._<%= slots[i] %> = this.shadowRoot.querySelector(`.${this.tag}__<%= slots[i] %>`);
    <%_ } } _%>
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    <%_ if (slots.length > 0) { %>
    <%_ for(let i = 0; i < slots.length; i++) { _%>
    this.<%= slots[i] %> = this.querySelector(`[slot="<%= slots[i] %>"]`);
    <%_ } _%>
    <%_ for(let i = 0; i < slots.length; i++) { %>
    // Add a slotchange listener to the lightDOM trigger
    // this.<%= slots[i] %>.addEventListener("slotchange", this._init);
    <%_ } _%>
    <%_ } _%>
  }

  // disconnectedCallback() {}

<%_ if (attributes.length > 0) { _%>
  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }
<%_ } else { _%>
  // attributeChangedCallback(attr, oldValue, newValue) {}
<%_ } _%>
}

PFElement.create(<%= elementClassName %>);

export default <%= elementClassName %>;
