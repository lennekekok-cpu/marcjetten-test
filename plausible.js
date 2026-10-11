// Cookieloze Plausible-meting, uitsluitend op het ingestelde openbare domein.
// De build neemt dit script alleen op na activering met een eigen Plausible-script.
(() => {
  const settings = document.currentScript;
  if (!settings) return;
  let hosts;
  try { hosts = JSON.parse(settings.dataset.hosts || '[]'); } catch { return; }
  if (!Array.isArray(hosts) || !hosts.includes(window.location.hostname)) return;
  const src = settings.dataset.scriptUrl || '';
  if (!/^https:\/\/plausible\.io\/js\/pa-[A-Za-z0-9_-]+\.js$/.test(src)) return;
  if (document.querySelector('script[data-marc-plausible]')) return;
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };
  window.plausible.init = window.plausible.init || function (options) {
    window.plausible.o = options || {};
  };
  window.plausible.init();
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.dataset.marcPlausible = 'true';
  document.head.appendChild(script);
})();
