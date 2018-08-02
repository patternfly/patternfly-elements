import "./scoping-shim.min.js";
import "./apply-shim.min.js";
import "./custom-style-interface.min.js";

(function() {
  const templateId = "cp-theme";

  if (document.getElementById(templateId)) {
    return;
  }

  const cpthemeTemplate = document.createElement("div");

  cpthemeTemplate.setAttribute("style", "display: none;");
  cpthemeTemplate.setAttribute("id", templateId);
  cpthemeTemplate.innerHTML = `<style id="${templateId}-style">:root {

  --rhe-theme--color--white:                $rh-global--color--white;
  --rhe-theme--color--black:                $rh-global--color--black;

  --rhe-theme--color--primary:              $rh-global--color--red;
  --rhe-theme--color--primary-shade2:       $rh-global--color--red-brick;
  --rhe-theme--color--primary-shade3:       $rh-global--color--red-maroon;
  --rhe-theme--color--primary-shade4:       $rh-global--color--red-garnet;
  --rhe-theme--color--primary-shade5:       $rh-global--color--red-morello;
  --rhe-theme--color--primary-shade6:       $rh-global--color--red-red-wine;
  --rhe-theme--color--primary-shade7:       $rh-global--color--red-daredevil;

  --rhe-theme--color--secondary:            $rh-global--color--gray-platinum;
  --rhe-theme--color--secondary-shade2:     $rh-global--color--gray-gainsboro;
  --rhe-theme--color--secondary-shade3:     $rh-global--color--gray-silver;
  --rhe-theme--color--secondary-shade4:     $rh-global--color--gray-battleship;
  --rhe-theme--color--secondary-shade5:     $rh-global--color--gray-batman;
  --rhe-theme--color--secondary-shade6:     $rh-global--color--gray-umbra;
  --rhe-theme--color--secondary-shade7:     $rh-global--color--gray-space;

  --rhe-theme--color--gray-100:             $rh-global--color--gray-moon;
  --rhe-theme--color--gray-150:             $rh-global--color--gray-nimbus;
  --rhe-theme--color--gray-200:             $rh-global--color--gray-platinum;
  --rhe-theme--color--gray-250:             $rh-global--color--gray-gainsboro;
  --rhe-theme--color--gray-300:             $rh-global--color--gray-mercury;
  --rhe-theme--color--gray-400:             $rh-global--color--gray-fog;
  --rhe-theme--color--gray-450:             $rh-global--color--gray-silver;
  --rhe-theme--color--gray-500:             $rh-global--color--gray-stone;
  --rhe-theme--color--gray-600:             $rh-global--color--gray-storm;
  --rhe-theme--color--gray-700:             $rh-global--color--gray-battleship;
  --rhe-theme--color--gray-750:             $rh-global--color--gray-nickel;
  --rhe-theme--color--gray-800:             $rh-global--color--gray-batman;
  --rhe-theme--color--gray-900:             $rh-global--color--gray-umbra;
  --rhe-theme--color--gray-950:             $rh-global--color--gray-space;
  --rhe-theme--color--gray-1000:            $rh-global--color--gray-iron;
  --rhe-theme--color--gray-1050:            $rh-global--color--gray-charcoal;
  --rhe-theme--color--gray-1100:            $rh-global--color--gray-night;
  --rhe-theme--color--gray-1150:            $rh-global--color--black-soft;
  --rhe-theme--color--gray-1200:            $rh-global--color--black-nero;


  --rhe-theme--color--red-100:              $rh-global--color--red;
  --rhe-theme--color--red-200:              $rh-global--color--red-brick;
  --rhe-theme--color--red-300:              $rh-global--color--red-maroon;
  --rhe-theme--color--red-400:              $rh-global--color--red-garnet;
  --rhe-theme--color--red-500:              $rh-global--color--red-morello;
  --rhe-theme--color--red-600:              $rh-global--color--red-red-wine;
  --rhe-theme--color--red-700:              $rh-global--color--red-daredevil;

  --rhe-theme--color--orange-100:           $pf-color-orange-100;
  --rhe-theme--color--orange-200:           $pf-color-orange-200;
  --rhe-theme--color--orange-300:           $pf-color-orange-300;
  --rhe-theme--color--orange-400:           $rh-global--color--orange;
  --rhe-theme--color--orange-500:           $pf-color-orange-500;
  --rhe-theme--color--orange-600:           $pf-color-orange-600;
  --rhe-theme--color--orange-700:           $pf-color-orange-700;

  --rhe-theme--color--gold-100:             $pf-color-gold-100;
  --rhe-theme--color--gold-200:             $pf-color-gold-200;
  --rhe-theme--color--gold-300:             $pf-color-gold-300;
  --rhe-theme--color--gold-400:             $rh-global--color--gold;
  --rhe-theme--color--gold-500:             $pf-color-gold-500;
  --rhe-theme--color--gold-600:             $pf-color-gold-600;
  --rhe-theme--color--gold-700:             $pf-color-gold-700;

  --rhe-theme--color--light-green-100:      $pf-color-light-green-100;
  --rhe-theme--color--light-green-200:      $pf-color-light-green-200;
  --rhe-theme--color--light-green-300:      $pf-color-light-green-300;
  --rhe-theme--color--light-green-400:      $rh-global--color--green;
  --rhe-theme--color--light-green-500:      $pf-color-light-green-500;
  --rhe-theme--color--light-green-600:      $pf-color-light-green-600;
  --rhe-theme--color--light-green-700:      $pf-color-light-green-700;

  --rhe-theme--color--green-100:            $pf-color-green-100;
  --rhe-theme--color--green-200:            $pf-color-green-200;
  --rhe-theme--color--green-300:            $pf-color-green-300;
  --rhe-theme--color--green-400:            $rh-global--color--green-verde;
  --rhe-theme--color--green-500:            $pf-color-green-500;
  --rhe-theme--color--green-600:            $pf-color-green-600;
  --rhe-theme--color--green-700:            $pf-color-green-700;

  --rhe-theme--color--teal-100:             $pf-color-cyan-100;
  --rhe-theme--color--teal-200:             $pf-color-cyan-200;
  --rhe-theme--color--teal-300:             $pf-color-cyan-300;
  --rhe-theme--color--teal-400:             $rh-global--color--teal;
  --rhe-theme--color--teal-500:             $pf-color-cyan-500;
  --rhe-theme--color--teal-600:             $rh-global--color--teal-dark;
  --rhe-theme--color--teal-700:             $rh-global--color--blue-rain;

  --rhe-theme--color--light-blue-100:       $rh-global--color--blue-sky;
  --rhe-theme--color--light-blue-200:       $pf-color-light-blue-200;
  --rhe-theme--color--light-blue-300:       $pf-color-light-blue-300;
  --rhe-theme--color--light-blue-400:       $rh-global--color--blue-sky-deep;
  --rhe-theme--color--light-blue-500:       $pf-color-light-blue-500;
  --rhe-theme--color--light-blue-600:       $pf-color-light-blue-600;
  --rhe-theme--color--light-blue-700:       $pf-color-light-blue-700;

  --rhe-theme--color--blue-100:             $pf-color-blue-100;
  --rhe-theme--color--blue-200:             $rh-global--color--blue-maya;
  --rhe-theme--color--blue-300:             $rh-global--color--blue-dodger;
  --rhe-theme--color--blue-350:             $rh-global--color--blue-sky-deep;
  --rhe-theme--color--blue-400:             $rh-global--color--blue-peacock;
  --rhe-theme--color--blue-500:             $rh-global--color--blue-azure;
  --rhe-theme--color--blue-600:             $rh-global--color--blue-denim;
  --rhe-theme--color--blue-700:             $rh-global--color--blue-navy;

  --rhe-theme--color--purple-100:            $pf-color-purple-100;
  --rhe-theme--color--purple-200:            $pf-color-purple-200;
  --rhe-theme--color--purple-300:            $rh-global--color--purple-amethyst;
  --rhe-theme--color--purple-400:            $rh-global--color--purple;
  --rhe-theme--color--purple-500:            $pf-color-purple-500;
  --rhe-theme--color--purple-600:            $rh-global--color--purple-rain;
  --rhe-theme--color--purple-700:            $pf-color-purple-700;


  --rhe-theme--bg-color:                         $rh-global--color--white;
  --rhe-theme--bg-color--shade2:                 $rh-global--color--gray-platinum;
  --rhe-theme--bg-color--shade3:                 $rh-global--color--gray-mercury;
  --rhe-theme--bg-color--shade4:                 $rh-global--color--gray-silver;
  --rhe-theme--bg-color--shade5:                 $rh-global--color--gray-storm;
  --rhe-theme--bg-color--shade6:                 $rh-global--color--gray-night;
  --rhe-theme--bg-color--shade7:                 $rh-global--color--black-soft;

  --rhe-theme--text-color:                       $rh-global--color--gray-night;
  --rhe-theme--text-color--shade2:               $rh-global--color--gray-night;
  --rhe-theme--text-color--shade3:               $rh-global--color--black;
  --rhe-theme--text-color--shade4:               $rh-global--color--black;
  --rhe-theme--text-color--shade5:               $rh-global--color--white;
  --rhe-theme--text-color--shade6:               $rh-global--color--white;
  --rhe-theme--text-color--shade7:               $rh-global--color--white;
  --rhe-theme--text-color--inverted:             $rh-global--color--white;

  --rhe-theme--link-color:                       $rh-global--color--blue-denim;
  --rhe-theme--link-color--hover:                $rh-global--color--blue-navy;
  --rhe-theme--link-color--focus:                $rh-global--color--blue-navy;
  --rhe-theme--link-color--active:               $rh-global--color--blue-navy;
  --rhe-theme--link-color--visited:              $rh-global--color--purple;

  --rhe-theme--link-color--inverted:             $rh-global--color--blue-maya;
  --rhe-theme--link-color--inverted--hover:      $rh-global--color--blue-dodger;
  --rhe-theme--link-color--inverted--focus:      $rh-global--color--blue-dodger;
  --rhe-theme--link-color--inverted--active:     $rh-global--color--blue-dodger;
  --rhe-theme--link-color--inverted--visited:    $rh-global--color--purple-amethyst;

  --rhe-theme--link-color--desaturated:          $rh-global--color--gray-night;
  --rhe-theme--link-color--desaturated--hover:   $rh-global--color--black;
  --rhe-theme--link-color--desaturated--focus:   $rh-global--color--black;
  --rhe-theme--link-color--desaturated--active:  $rh-global--color--black;
  --rhe-theme--link-color--desaturated--visited: $rh-global--color--black;

  --rhe-theme--link-color--desaturated--inverted:          $rh-global--color--white;
  --rhe-theme--link-color--desaturated--inverted--hover:   $rh-global--color--gray-moon;
  --rhe-theme--link-color--desaturated--inverted--focus:   $rh-global--color--gray-moon;
  --rhe-theme--link-color--desaturated--inverted--active:  $rh-global--color--gray-moon;
  --rhe-theme--link-color--desaturated--inverted--visited: $rh-global--color--gray-moon;

  --rhe-theme--ui-element-color--Color:          $rh-global--color--white;
  --rhe-theme--ui-element-color:                 $rh-global--color--blue-azure;
  --rhe-theme--ui-element-color--hover:          $rh-global--color--blue-navy;
  --rhe-theme--ui-element-color--focus:          $rh-global--color--blue-navy;
  --rhe-theme--ui-element-color--active:         $rh-global--color--blue-navy;

  --rhe-theme--ui-element-color-dark--Color:     $rh-global--color--white;
  --rhe-theme--ui-element-color-dark:            $rh-global--color--blue-rain;
  --rhe-theme--ui-element-color-dark--hover:     $rh-global--color--blue-navy;
  --rhe-theme--ui-element-color-dark--focus:     $rh-global--color--blue-navy;
  --rhe-theme--ui-element-color-dark--active:    $rh-global--color--blue-navy;
  --rhe-theme--hover-state--Color:            $rh-global--color--white;
  --rhe-theme--hover-state--BackgroundColor:  $rh-global--color--blue-navy;
  --rhe-theme--hover-state--BorderColor:      $rh-global--color--blue-navy;
  --rhe-theme--active-state--Color:           $rh-global--color--white;
  --rhe-theme--active-state--BackgroundColor: $rh-global--color--blue-navy;
  --rhe-theme--active-state--BorderColor:     $rh-global--color--blue-navy;
  --rhe-theme--disabled-state--Color:           $rh-global--color--gray-battleship;
  --rhe-theme--disabled-state--BackgroundColor: $rh-global--color--gray-mercury;
  --rhe-theme--disabled-state--BorderColor:     $rh-global--color--gray-mercury;
  --rh-theme--success-color:           $pf-color-green-100;
  --rh-theme--success-color--dark:     $rh-global--color--green;
  --rh-theme--info-color:              $pf-color-cyan-100;
  --rh-theme--info-color--dark:        $rh-global--color--teal;
  --rh-theme--warning-color:           $pf-color-orange-100;
  --rh-theme--warning-color--dark:     $rh-global--color--orange;
  --rh-theme--danger-color:            $rh-global--color--red;
  --rh-theme--danger-color--dark:      $pf-color-red-300; }

:root {

  --rhe-theme--grid-breakpoint--xs:       $rh-global--grid-breakpoint--xs;
  --rhe-theme--grid-breakpoint--sm:       $rh-global--grid-breakpoint--sm;
  --rhe-theme--grid-breakpoint--md:       $rh-global--grid-breakpoint--md;
  --rhe-theme--grid-breakpoint--lg:       $rh-global--grid-breakpoint--lg;
  --rhe-theme--grid-breakpoint--xl:       $rh-global--grid-breakpoint--xl;
  --rhe-theme--grid-breakpoint--xs--max:  $rh-global--grid-breakpoint--xs--max;
  --rhe-theme--grid-breakpoint--sm--max:  $rh-global--grid-breakpoint--sm--max;
  --rhe-theme--grid-breakpoint--md--max:  $rh-global--grid-breakpoint--md--max;
  --rhe-theme--grid-breakpoint--lg--max:  $rh-global--grid-breakpoint--lg--max;

  --rhe-theme--spacer--xs:                $rh-global--spacer--xs;
  --rhe-theme--spacer--sm:                $rh-global--spacer--sm;
  --rhe-theme--spacer:                    $rh-global--spacer;
  --rhe-theme--spacer--md:                $rh-global--spacer--md;
  --rhe-theme--spacer--lg:                $rh-global--spacer--lg;
  --rhe-theme--spacer--xl:                $rh-global--spacer--xl;
  --rhe-theme--spacer--xxl:               $rh-global--spacer--xxl; }

:root {

  --rhe-theme--animation-timing:             cubic-bezier(0.465, 0.183, 0.153, 0.946);

  --rhe-theme--border--BorderWidth:                  $rh-global--border--BorderWidth;
  --rhe-theme--border--BorderWidth--thin:            $rh-global--border--BorderWidth--thin;
  --rhe-theme--border--BorderStyle:                  $rh-global--border--BorderStyle;
  --rhe-theme--border--BorderColor:                  $rh-global--border--BorderColor;
  --rhe-theme--border--BorderColor--light:           $rh-global--border--BorderColor--light;
  --rhe-theme--border--BorderColor--dark:            $rh-global--border--BorderColor--dark;
  --rhe-theme--border--BorderRadius:                 $rh-global--border--BorderRadius;
  --rhe-theme--button-border--BorderRadius:          $rh-global--button-border--BorderRadius;

  --rhe-theme--shadow--BoxShadow--sm:        $rh-global--shadow--BoxShadow--sm;
  --rhe-theme--shadow--BoxShadow--md:        $rh-global--shadow--BoxShadow--md;
  --rhe-theme--shadow--BoxShadow--lg:        $rh-global--shadow--BoxShadow--lg;
  --rhe-theme--shadow--BoxShadow--sm-right:  $rh-global--shadow--BoxShadow--sm-right;
  --rhe-theme--shadow--BoxShadow--sm-left:   $rh-global--shadow--BoxShadow--sm-left;
  --rhe-theme--shadow--BoxShadow--sm-bottom: $rh-global--shadow--BoxShadow--sm-bottom;
  --rhe-theme--shadow--BoxShadow--sm-top:    $rh-global--shadow--BoxShadow--sm-top;
  --rhe-theme--shadow--BoxShadow--md-right:  $rh-global--shadow--BoxShadow--md-right;
  --rhe-theme--shadow--BoxShadow--md-left:   $rh-global--shadow--BoxShadow--md-left;
  --rhe-theme--shadow--BoxShadow--md-bottom: $rh-global--shadow--BoxShadow--md-bottom;
  --rhe-theme--shadow--BoxShadow--md-top:    $rh-global--shadow--BoxShadow--md-top;
  --rhe-theme--shadow--BoxShadow--lg-right:  $rh-global--shadow--BoxShadow--lg-right;
  --rhe-theme--shadow--BoxShadow--lg-left:   $rh-global--shadow--BoxShadow--lg-left;
  --rhe-theme--shadow--BoxShadow--lg-bottom: $rh-global--shadow--BoxShadow--lg-bottom;
  --rhe-theme--shadow--BoxShadow--lg-top:    $rh-global--shadow--BoxShadow--lg-top;
  --rhe-theme--shadow--BoxShadow--inset:     $rh-global--shadow--BoxShadow--inset; }

:root {

  --rhe-theme--FontSize:                    $rh-global--FontSize;
  --rhe-theme--LineHeight:                  $rh-global--LineHeight;
  --rhe-theme--LineHeight--sm:              $rh-global--LineHeight--sm;
  --rhe-theme--LineHeight--lg:              $rh-global--LineHeight--lg;
  --rhe-theme--FontWeight--light:           $rh-global--FontWeight--light;
  --rhe-theme--FontWeight--normal:          $rh-global--FontWeight--normal;
  --rhe-theme--FontWeight--semi-bold:       $rh-global--FontWeight--semi-bold;
  --rhe-theme--FontWeight--bold:            $rh-global--FontWeight--bold;
  --rhe-theme--FontFamily--sans-serif:      $rh-global--FontFamily--sans-serif;
  --rhe-theme--FontFamily--monospace:       $rh-global--FontFamily--monospace;
  --rhe-theme--FontSize--heading--xxl:      $rh-global--FontSize--heading--xxl;
  --rhe-theme--FontSize--heading--xl:       $rh-global--FontSize--heading--xl;
  --rhe-theme--FontSize--heading--lg:       $rh-global--FontSize--heading--lg;
  --rhe-theme--FontSize--heading--md:       $rh-global--FontSize--heading--md;
  --rhe-theme--FontSize--heading--sm:       $rh-global--FontSize--heading--sm;
  --rhe-theme--FontSize--heading--xs:       $rh-global--FontSize--heading--xs;
  --rhe-theme--FontSize--heading--xxs:      $rh-global--FontSize--heading--xxs; }

body {
  font-family: var(--rhe-theme--FontFamily--sans-serif, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);
  font-size: var(--rhe-theme--FontSize, 16px);
  line-height: var(--rhe-theme--LineHeight, 1.5);
  font-weight: var(--rhe-theme--FontWeight--normal, --rhe-theme--FontWeight--normal);
  color: var(--rhe-theme--text-color, #333);
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased; }

p {
  margin-top: 0;
  margin-bottom: var(--rhe-theme--spacer, 1rem); }

h1, h2, h3, h4, h5, h6 {
  margin-top: var(--rhe-theme--spacer, 1rem);
  margin-bottom: var(--rhe-theme--spacer, 1rem);
  font-weight: var(--rhe-theme--FontWeight--bold, 700);
  text-rendering: auto; }

h1 {
  font-size: var(--rhe-theme--FontSize--heading--xl, 1.75rem);
  line-height: var(--rhe-theme--LineHeight--sm, 1.2);
  font-weight: var(--rhe-theme--FontWeight--normal, 500); }

h2 {
  font-size: var(--rhe-theme--FontSize--heading--lg, 1.5rem);
  line-height: var(--rhe-theme--LineHeight--sm, 1.2);
  font-weight: var(--rhe-theme--FontWeight--normal, 500); }

h3 {
  font-size: var(--rhe-theme--FontSize--heading--md, 1.25rem);
  line-height: var(--rhe-theme--LineHeight--sm, 1.2); }

h4 {
  font-size: var(--rhe-theme--FontSize--heading--sm, 1.125rem);
  line-height: var(--rhe-theme--LineHeight--sm, 1.2); }

h5 {
  font-size: var(--rhe-theme--FontSize--heading--xs, 1rem);
  line-height: var(--rhe-theme--LineHeight, 1.5); }

h6 {
  font-size: var(--rhe-theme--FontSize--heading--xxs, 0.875rem);
  line-height: var(--rhe-theme--LineHeight, 1.5); }</style>`;

  document.head.appendChild(cpthemeTemplate);

  if (window.ShadyCSS) {
    window.ShadyCSS.CustomStyleInterface.addCustomStyle(
      document.querySelector(`#${templateId}-style`)
    );
  }
})();
