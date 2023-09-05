document.querySelector('pf-back-to-top').addEventListener('click', function() {
  // scroll to some element
  const target = document.querySelector('#top');
  target.scrollIntoView({ behavior: 'smooth' });
  target.focus();
});
