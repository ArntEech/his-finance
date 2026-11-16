(() => {
  const app = window.HIS_APP, $ = (id) => document.getElementById(id);
  const frame = $('frame'), splash = $('splash'), msg = $('msg'), retry = $('retry'), dots = $('dots');
  const url = (window.HIS_EXEC_URL || '').trim() + (app.query || '');
  let timer;

  function load() {
    retry.hidden = true; dots.hidden = false; splash.classList.remove('gone');
    if (!/^https:\/\/script\.google\.com\/.+\/exec/.test(url)) { fail('Setup needed: paste the web app link into config.js.'); return; }
    if (!navigator.onLine) { fail('You are offline. Connect to the internet and try again.'); return; }
    msg.textContent = 'Loading…';
    clearTimeout(timer);
    timer = setTimeout(() => fail('This is taking a while. Check your connection and try again.'), 25000);
    frame.src = url;
  }
  function fail(text) { clearTimeout(timer); msg.textContent = text; dots.hidden = true; retry.hidden = false; }
  frame.addEventListener('load', () => { if (!frame.src || frame.src === 'about:blank') return; clearTimeout(timer); splash.classList.add('gone'); });
  retry.addEventListener('click', load);
  window.addEventListener('online', () => { if (!splash.classList.contains('gone')) load(); });

  /* ---- install hint (only in the browser, never inside the installed app) ---- */
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const bar = $('install'), text = $('installText'), btn = $('installBtn');
  let dismissed = false; try { dismissed = localStorage.getItem('his-install-x') === '1'; } catch (e) {}
  let deferred = null;
  if (!standalone && !dismissed) {
    const ua = navigator.userAgent;
    const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (ios) {
      const safari = !/CriOS|FxiOS|EdgiOS/.test(ua);
      text.textContent = safari ? 'Install this app: tap the Share button, then “Add to Home Screen”.' : 'To install this app, open this page in Safari, tap Share, then “Add to Home Screen”.';
      btn.hidden = true; bar.hidden = false;
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); deferred = e;
      text.textContent = `Install ${app.name} on this phone for quick access.`; btn.hidden = false; bar.hidden = false;
    });
  }
  btn.addEventListener('click', async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; bar.hidden = true; });
  $('installX').addEventListener('click', () => { bar.hidden = true; try { localStorage.setItem('his-install-x', '1'); } catch (e) {} });
  window.addEventListener('appinstalled', () => { bar.hidden = true; });

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  load();
})();
