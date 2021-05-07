// import { storiesOf } from "@storybook/polymer";
// import * as storybookBridge from "@storybook/addon-knobs";
// import * as tools from "../../../.storybook/utils.js";

// import PfeNavigation from "../dist/pfe-navigation";
// import logo from "./assets/redhat--reverse.svg";
// import "../dist/pfe-navigation--lightdom.min.css";
// import "../../pfe-icon/dist/pfe-icon";
// import readme from "../README.md";

// const stories = storiesOf("Navigation", module);

// stories.addParameters({
//   notes: {
//     markdown: readme
//   }
// });

// // Define the template to be used
// const template = (data = {}) => {
//   return tools.component(PfeNavigation.tag, data.prop, data.slots);
// };

// // Use these to get dynamically generated content
// // const defaultHeading = tools.autoHeading(true);
// const defaultContent = tools.autoContent(1, 2);

// stories.addDecorator(storybookBridge.withKnobs);

// stories.add(PfeNavigation.tag, () => {
//   return `
//     <pfe-navigation>
//       <nav class="pfe-navigation" aria-label="Main Navigation">
//       <div class="pfe-navigation__logo-wrapper" id="pfe-navigation__logo-wrapper">
//         <a href="#" class="pfe-navigation__logo-link">
//           <img class="pfe-navigation__logo-image pfe-navigation__logo-image--small" src="${logo}" width="400" alt="Red Hat" />
//         </a>
//       </div>
//       <ul class="pfe-navigation__menu" id="pfe-navigation__menu">
//         <li class="pfe-navigation__menu-item">
//           <!-- @todo/note: removed aria-expanded attr and has-dropdown class since this is the no js version, how will this component be used? why is it called <ze-navigation>? -->
//           <a href="#" class="pfe-navigation__menu-link">
//             Products
//           </a>

//           <div class="pfe-navigation__dropdown pfe-navigation__dropdown--12-column-grid">
//             <section class="col-xs-12 col-md-6 col-lg-6">
//               <h3>
//                 <a href="#">Platforms</a>
//               </h3>
//               <ul class="css-cols-lg-2">
//                 <li>
//                   <a href="#">Red Hat Enterprise Linux</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat JBoss Enterprise Application Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat OpenStack Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat Virtualization</a>
//                 </li>
//               </ul>
//             </section>
//             <section class="col-xs-12 col-md-6 col-lg-6">
//               <h3>
//                 <a href="#">Ladders</a>
//               </h3>
//               <ul class="css-cols-lg-2">
//                 <li>
//                   <a href="#">Lorem ipsum</a>
//                 </li>
//                 <li>
//                   <a href="#">Dolor sit amet</a>
//                 </li>
//                 <li>
//                   <a href="#">Wakka Wakka</a>
//                 </li>
//                 <li>
//                   <a href="#">Optimizus Prime</a>
//                 </li>
//               </ul>
//             </section>
//             <section class="col-xs-12 col-md-6 col-lg-3">
//               <h3>
//                 <a href="#">Chutes</a>
//               </h3>
//               <ul>
//                 <li>
//                   <a href="#">Yakkita yakkita</a>
//                 </li>
//                 <li>
//                   <a href="#">Enterprise Yakkita yakkita</a>
//                 </li>
//                 <li>
//                   <a href="#">Upstream Yakkita</a>
//                 </li>
//                 <li>
//                   <a href="#">Yakkita ME</a>
//                 </li>
//               </ul>
//             </section>
//             <section class="col-xs-12 col-md-6 col-lg-3">
//               <h3>
//                 <a href="#">Platforms</a>
//               </h3>
//               <ul>
//                 <li>
//                   <a href="#">Red Hat Enterprise Linux</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat JBoss Enterprise Application Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat OpenStack Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat Virtualization</a>
//                 </li>
//               </ul>
//             </section>
//             <section class="col-xs-12 col-md-6 col-lg-3">
//               <h3>
//                 <a href="#">Ladders</a>
//               </h3>
//               <ul>
//                 <li>
//                   <a href="#">Lorem ipsum</a>
//                 </li>
//                 <li>
//                   <a href="#">Dolor sit amet</a>
//                 </li>
//                 <li>
//                   <a href="#">Wakka Wakka</a>
//                 </li>
//               </ul>
//             </section>
//             <section class="col-xs-12 col-md-6 col-lg-3">
//               <h3>
//                 <a href="#">Chutes</a>
//               </h3>
//               <ul>
//                 <li>
//                   <a href="#">Yakkita yakkita</a>
//                 </li>
//                 <li>
//                   <a href="#">Enterprise Yakkita yakkita</a>
//                 </li>
//                 <li>
//                   <a href="#">Upstream Yakkita</a>
//                 </li>
//                 <li>
//                   <a href="#">Yakkita ME</a>
//                 </li>
//               </ul>
//             </section>

//             <!-- documentation note: mega menu footer region can fit at most 4 ctas -->
//             <section class="pfe-navigation__footer">
//               <pfe-cta pfe-priority="primary">
//                 <a href="#">Learn more about PFElements</a>
//               </pfe-cta>

//               <pfe-cta>
//                 <a href="https://github.com/">GitHub</a>
//               </pfe-cta>

//               <pfe-cta>
//                 <a href="https://github.com/">Another CTA Example</a>
//               </pfe-cta>

//               <pfe-cta>
//                 <a href="#">Learn more about CTAs and How to Use Them</a>
//               </pfe-cta>
//             </section>
//           </div> <!-- end .pfe-navigation__dropdown -->
//         </li>
//         <li class="pfe-navigation__menu-item">
//           <a href="#" class="pfe-navigation__menu-link">
//             Solutions
//           </a>
//           <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
//             <!-- documentation note: single-col dropdowns CANNOT have pfe-nav footer regions -->
//             <!-- documentation note: single col headings are groups with different styles than mega menu tray headings -->
//             <section>
//               <h3>
//                 Group 1
//               </h3>
//               <ul>
//                 <li>
//                   <a href="#">Red Hat Enterprise Linux</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat JBoss Enterprise Application Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat OpenStack Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat Virtualization</a>
//                 </li>
//               </ul>
//             </section>
//             <section>
//               <h3>
//                 Group 2
//               </h3>
//               <ul>
//                 <li>
//                   <a href="#">Red Hat Enterprise Linux</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat JBoss Enterprise Application Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat OpenStack Platform</a>
//                 </li>
//                 <li>
//                   <a href="#">Red Hat Virtualization</a>
//                 </li>
//               </ul>
//             </section>
//           </div> <!-- end .pfe-navigation__dropdown -->
//         </li>
//         <li class="pfe-navigation__menu-item">
//           <a href="#" class="pfe-navigation__menu-link">
//             Learning & Support
//           </a>
//           <div class="pfe-navigation__dropdown pfe-navigation__dropdown--single-column">
//             <!-- documentation note: single-col dropdowns CANNOT have pfe-nav footer regions -->
//             <!-- documentation note: separator class, pfe-navigation__sub-nav-link--separator -->
//             <ul>
//               <li>
//                 <a href="#">Red Hat Enterprise Linux</a>
//               </li>
//               <li>
//                 <a href="#">Red Hat JBoss Enterprise Application Platform</a>
//               </li>
//               <li>
//                 <a href="#">Red Hat OpenStack Platform</a>
//               </li>
//               <li class="pfe-navigation__sub-nav-link--separator">
//                 <a href="#">Red Hat Virtualization</a>
//               </li>
//               <li>
//                 <a href="#">Red Hat Virtualization Example</a>
//               </li>
//             </ul>
//           </div> <!-- end .pfe-navigation__dropdown -->
//         </li>
//         <li class="pfe-navigation__menu-item">
//           <a href="#" class="pfe-navigation__menu-link">
//             Resources
//           </a>
//         </li>
//         <li class="pfe-navigation__menu-item">
//           <a href="#" class="pfe-navigation__menu-link">
//             Red Hat & open source
//           </a>
//         </li>
//       </ul>
//     </nav>

//     <ul class="pfe-navigation__fallback-links">
//       <li>
//         <a href="#">Search</a>
//       </li>
//       <li>
//         <a href="#">Custom Link</a>
//       </li>
//       <li>
//         <a href="#">Log in</a>
//       </li>
//     </ul>

//     <li slot="secondary-links">
//       <a href="#">
//         <pfe-icon icon="web-icon-globe" pfe-size="md" aria-hidden="true"></pfe-icon>
//         Custom Link
//       </a>
//     </li>

//     <div slot="search" class="pfe-navigation__search pfe-navigation__search--default-styles">
//     <!-- @todo: move form and label for="" and label id into shadow DOM -->
//     <!-- @todo: add a11y features to search form and submit button in shadow DOM -->
//       <form>
//         <label for="pfe-navigation__search-label1" class="sr-only">Search the Red Hat Customer Portal</label>
//         <input id="pfe-navigation__search-label1" type="text" placeholder="Search the Red Hat Customer Portal" />
//         <button aria-label="Submit Search">Search</button>
//       </form>
//     </div>
//     </pfe-navigation>
//   `;
// });
