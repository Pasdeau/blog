(function () {
  const views = document.getElementById('footer-views-count');
  if (views) {
    const counter = 'https://abacus.jasoncameron.dev';
    const endpoint = location.hostname === 'www.wenzheng.eu' ? 'hit' : 'get';
    const url = `${counter}/${endpoint}/wenzheng.eu/site-views-v2`;
    // Busuanzi reported 387 page views for www.wenzheng.eu at migration.
    fetch(url, { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!data || !Number.isSafeInteger(data.value) || data.value < 0) return;
        const total = 387 + data.value;
        views.textContent = new Intl.NumberFormat('en', {
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(total).toLowerCase();
        views.title = `${total.toLocaleString('en-US')} total page views`;
      })
      .catch(() => {});
  }

  const online = document.getElementById('footer-online-count');
  if (!online || location.hostname !== 'www.wenzheng.eu') return;

  window.now4real = window.now4real || {};
  now4real.config = { target: 'api', scope: 'site' };
  now4real.onload = function () {
    this.subscribe(this.Subject.COUNTER_SITE_VIEWERS, update => {
      const count = update.data && update.data.value;
      if ((typeof count === 'number' && Number.isFinite(count) && count >= 0) ||
          (typeof count === 'string' && /^\d+(?:[.,]\d+)?[kKmM]?$/.test(count))) {
        online.textContent = String(count);
      }
    }).catch(() => {});
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.now4real.com/now4real.js';
  document.head.appendChild(script);
})();
