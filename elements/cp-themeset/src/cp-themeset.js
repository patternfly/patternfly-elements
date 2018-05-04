import "./scoping-shim.min.js";
import "./apply-shim.min.js";
import "./custom-style-interface.min.js";

(function() {
  const templateId = "cp-themeset";

  if (document.getElementById(templateId)) {
    return;
  }

  const cpthemesetTemplate = document.createElement("div");

  cpthemesetTemplate.setAttribute("style", "display: none;");
  cpthemesetTemplate.setAttribute("id", templateId);
  cpthemesetTemplate.innerHTML = `<style id="${templateId}-style"></style>`;

  document.head.appendChild(cpthemesetTemplate);

  if (window.ShadyCSS) {
    window.ShadyCSS.CustomStyleInterface.addCustomStyle(
      document.querySelector(`#${templateId}-style`)
    );
  }
})();
