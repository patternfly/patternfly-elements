import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-dialog.html and css from
 * cp-dialog.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: block; }

.card {
  display: flex;
  flex-direction: column;
  background: #e7e7e7;
  padding: 16px;
  margin-bottom: 32px; }
  .card p {
    margin-top: 0;
    flex: 1 1 auto; }
  .card a {
    color: #06c;
    text-decoration: none;
    font-weight: 700; }
  .card span {
    font-size: .9rem;
    font-weight: 400; }

@media (min-width: 768px) {
  .card-container {
    display: flex; }
    .card-container .card {
      width: 33%;
      margin: 16px;
      margin-top: 8px; }
      .card-container .card:first-child {
        margin-left: 0; }
      .card-container .card:last-child {
        margin-right: 0; } }</style>
<h3>People who viewed this ${data.contentType} also viewed</h3>
<div class="card-container">
  ${data.results.map(result => `
    <div class="card">
      <p><a href="${result.view_uri}">${result.allTitle}</a></p>
      <span>
        ${result.documentKind} - <rh-datetime
          datetime="${result.lastModifiedDate}"
          type="local"
          day="numeric"
          month="short"
          year="numeric">
          ${result.lastModifiedDate}
        </rh-datetime>
      </span>
    </div>
  `).join('\n')}
</div>
`;
/* end DO NOT EDIT */

class RhCard extends Rhelement {
  constructor() {
    super("rh-card", template);
  }
}

window.customElements.define("rh-card", RhCard);
