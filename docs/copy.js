const template = document.createElement('template');
template.innerHTML = `<button class="copy-btn">Copy</button>`;

async function handleCopyClick(evt) {
  const [{ innerText }] = evt.target.parentElement.children;
  await navigator.clipboard.writeText(innerText);
}

for (const block of document.querySelectorAll('pre[class^="language-"]')) {
  if (!block.closest('.inline-type')) {
    block.append(template.content.cloneNode(true));
    block.querySelector('button.copy-btn').addEventListener('click', handleCopyClick);
  }
}
