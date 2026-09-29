(function () {
  // Conservative lower bound supplied by the site owner for views before migration.
  const historicalViewsBaseline = 12000;
  const views = document.getElementById('footer-views-count');
  if (views) {
    const counter = 'https://abacus.jasoncameron.dev';
    const endpoint = location.hostname === 'www.wenzheng.eu' ? 'hit' : 'get';
    const url = `${counter}/${endpoint}/wenzheng.eu/site-views-v2`;
    fetch(url, { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (!data || !Number.isSafeInteger(data.value) || data.value < 0) return;
        const total = historicalViewsBaseline + data.value;
        const formatted = new Intl.NumberFormat('en', {
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(total).toLowerCase();
        views.textContent = formatted;
        views.title = `At least ${total.toLocaleString('en-US')} page views: ${historicalViewsBaseline.toLocaleString('en-US')} historical baseline plus ${data.value.toLocaleString('en-US')} since September 28, 2026`;
      })
      .catch(() => {});
  }

  const online = document.getElementById('footer-online-count');
  const liveDetail = document.getElementById('online-live-count');
  const map = document.getElementById('online-map');
  const locations = document.getElementById('online-map-locations');
  if (!online || location.hostname !== 'www.wenzheng.eu') return;

  const heatmap = new Map();
  let ownCountry = null;
  function updateCountry(country, intensity) {
    if (typeof country !== 'string') return;
    const code = country.toUpperCase();
    const score = Number(intensity);
    if (!/^[A-Z]{2}$/.test(code) || !Number.isFinite(score)) return;
    if (score > 0) heatmap.set(code, score);
    else heatmap.delete(code);
  }

  function renderMap() {
    if (!map || !map.querySelector('svg')) return;
    const dots = map.querySelector('#online-map-dots');
    dots.replaceChildren();
    map.querySelectorAll('.online-map-country').forEach(path => {
      path.classList.remove('is-active');
    });
    const names = [];
    function addDot(country, label, own) {
      const path = map.querySelector(`.online-map-country[data-code="${country}"]`);
      if (!path) return;
      path.classList.add('is-active');
      const name = path.querySelector('title').textContent;
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('class', own ? 'online-map-dot is-own' : 'online-map-dot');
      dot.setAttribute('cx', path.dataset.x);
      dot.setAttribute('cy', path.dataset.y);
      dot.setAttribute('r', '5');
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = label || name;
      dot.appendChild(title);
      dots.appendChild(dot);
      names.push(label || name);
    }
    heatmap.forEach((intensity, country) => {
      if (intensity <= 0) return;
      const path = map.querySelector(`.online-map-country[data-code="${country}"]`);
      if (!path) return;
      addDot(country);
    });
    if (ownCountry && document.visibilityState === 'visible' && !heatmap.has(ownCountry)) {
      const path = map.querySelector(`.online-map-country[data-code="${ownCountry}"]`);
      if (path) addDot(ownCountry, `${path.querySelector('title').textContent} (you)`, true);
    }
    if (locations) {
      locations.textContent = names.length ? names.join(' · ') : 'Location data is unavailable for current visitors.';
    }
  }

  if (map) {
    fetch('/api/visitor-country', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (data && /^[A-Z]{2}$/.test(data.country)) {
          ownCountry = data.country;
          renderMap();
        }
      })
      .catch(() => {});
    fetch('/images/world-countries.svg')
      .then(response => {
        if (!response.ok) throw new Error('Map unavailable');
        return response.text();
      })
      .then(svg => {
        map.innerHTML = svg;
        renderMap();
      })
      .catch(() => { map.textContent = 'Map unavailable.'; });
    document.addEventListener('visibilitychange', renderMap);
  }

  window.now4real = window.now4real || {};
  now4real.config = { target: 'api', scope: 'site' };
  now4real.onload = function () {
    this.subscribe(this.Subject.COUNTER_SITE_VIEWERS, update => {
      const count = update.data && update.data.value;
      if ((typeof count === 'number' && Number.isFinite(count) && count >= 0) ||
          (typeof count === 'string' && /^\d+(?:[.,]\d+)?[kKmM]?$/.test(count))) {
        online.textContent = String(count);
        if (liveDetail) liveDetail.textContent = String(count);
      }
    }).catch(() => {});

    if (map) {
      const subject = this.Subject.HEATMAP_SITE_VIEWERS;
      this.subscribe(subject, update => {
        const data = update.data;
        if (!data) return;
        updateCountry(data.country, data.intensity);
        renderMap();
      }).then(() => {
        const snapshot = this.get(subject);
        if (snapshot && typeof snapshot === 'object') {
          Object.entries(snapshot).forEach(([country, intensity]) => {
            updateCountry(country, intensity);
          });
          renderMap();
        }
      }).catch(() => {
        if (locations) locations.textContent = 'Live locations are unavailable.';
      });
    }
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.now4real.com/now4real.js';
  document.head.appendChild(script);
})();
