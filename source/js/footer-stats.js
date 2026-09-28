(function () {
  const value = document.getElementById('busuanzi_value_site_pv');
  if (value) {
    function formatViews() {
      const raw = value.textContent.replace(/[\s,]/g, '');
      if (!/^\d+$/.test(raw)) return;

      const count = Number(raw);
      const compact = count < 1000
        ? String(count)
        : new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count).toLowerCase();

      value.title = `${count.toLocaleString('en-US')} total views`;
      if (value.textContent !== compact) value.textContent = compact;
    }

    new MutationObserver(formatViews).observe(value, { childList: true, characterData: true, subtree: true });
    formatViews();
  }

  const online = document.getElementById('footer-online-count');
  if (!online) return;

  let visitorId;
  try {
    visitorId = localStorage.getItem('blog-online-visitor');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('blog-online-visitor', visitorId);
    }
  } catch {
    visitorId = Math.random().toString(36).slice(2);
  }

  async function refreshOnline() {
    if (document.hidden) return;

    const url = new URL('https://counterapi.com/api/wenzheng-wang-blog/presence/site');
    url.searchParams.set('timeline', '1m');
    url.searchParams.set('unique', 'true');
    url.searchParams.set('userId', visitorId);

    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (Number.isSafeInteger(data.value) && data.value >= 0) {
        online.textContent = data.value.toLocaleString('en-US');
      }
    } catch {
      // Keep the count unavailable when the analytics service cannot be reached.
    }
  }

  refreshOnline();
  setInterval(refreshOnline, 30000);
  document.addEventListener('visibilitychange', refreshOnline);
})();
