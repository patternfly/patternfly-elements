const { shadowRoot } = document.querySelector('[data-demo="pfe-toast"]');

shadowRoot.querySelectorAll('[data-toast]').forEach(button => {
  button.addEventListener('click', function(event) {
    shadowRoot.getElementById(event.target.dataset.toast).toggle();
  });
});
