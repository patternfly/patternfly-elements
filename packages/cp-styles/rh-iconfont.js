(function () {
  const templateId = 'rh-iconfont-head';

  if (document.getElementById(templateId)) {
    return;
  }

  const cpstylesTemplate = document.createElement('div');

  cpstylesTemplate.setAttribute('style', 'display: none;');
  cpstylesTemplate.setAttribute('id', templateId);

  cpstylesTemplate.innerHTML = `
    <style>
    @font-face {
      font-family: 'rh-iconfont';
      src: url("https://access.redhat.com/webassets/avalon/f/nimbus/rh-iconfont-dec1e4804a32a457956c44a1148f5790.eot");
      src: url("https://access.redhat.com/webassets/avalon/f/nimbus/rh-iconfont-dec1e4804a32a457956c44a1148f5790.eot#iefix") format("embedded-opentype"),
           url("https://access.redhat.com/webassets/avalon/f/nimbus/rh-iconfont-dec1e4804a32a457956c44a1148f5790.woff") format("woff"),
           url("https://access.redhat.com/webassets/avalon/f/nimbus/rh-iconfont-dec1e4804a32a457956c44a1148f5790.ttf") format("truetype");
      font-weight: normal;
      font-style: normal;
    }
    </style>
  `;

  document.head.appendChild(cpstylesTemplate);
}());
