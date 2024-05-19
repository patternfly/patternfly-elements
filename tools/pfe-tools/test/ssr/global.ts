export async function renderGlobal(
  html: string,
  importSpecifiers: string[],
) {
  await import('./shims.js');
  const { ssr } = await import('./ssr.js');
  await Promise.all(importSpecifiers.map(x => import(x)));
  return ssr(html);
}

