document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll("pfe-accordion-header:not([PFElement])").forEach(header => {
      header.setAttribute("tabindex", "0");
      header.addEventListener("click", event => header.toggleAttribute("active"));
      header.addEventListener("keydown", event => {
        if (event.key === "Enter") header.toggleAttribute("active");
      });
    });
  }, 3000);
});
