(function () {
  if (!['www.wenzheng.eu', 'wenzheng.eu', 'localhost', '127.0.0.1'].includes(location.hostname)) return;
  const menu = document.querySelector('.main-menu');
  if (!menu || menu.querySelector('.menu-item-language')) return;

  const languages = [
    ['en', 'English'],
    ['zh-CN', '简体中文'],
    ['fr', 'Français'],
    ['it', 'Italiano'],
    ['de', 'Deutsch'],
    ['es', 'Español'],
    ['ru', 'Русский'],
    ['ja', '日本語']
  ];

  // Google cannot fetch a local Hexo server. Use the matching published page for previews.
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  const localChinaPreview = local && new URLSearchParams(location.search).get('previewCountry') === 'CN';
  const publishedPage = new URL(location.href);
  publishedPage.searchParams.delete('previewCountry');
  const pageUrl = local
    ? `https://www.wenzheng.eu${publishedPage.pathname}${publishedPage.search}${publishedPage.hash}`
    : location.href;
  const savedLanguageKey = 'site-translation-language';
  let country = local ? (localChinaPreview ? 'CN' : 'OTHER') : null;
  let translatedNodes = [];
  const countryPromise = local ? Promise.resolve(country) : fetch('/api/visitor-country', { cache: 'no-store' })
    .then(response => response.ok ? response.json() : null)
    .then(data => data?.country || null)
    .catch(() => null);
  countryPromise.then(value => { country = value; });

  const item = document.createElement('li');
  item.className = 'menu-item menu-item-language';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'language-toggle';
  toggle.setAttribute('aria-label', 'Choose translation language');
  toggle.setAttribute('aria-haspopup', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<i class="fa fa-language fa-fw" aria-hidden="true"></i>Language';
  const toggleLabel = toggle.lastChild;

  const list = document.createElement('ul');
  list.className = 'language-options';
  list.hidden = true;
  list.setAttribute('aria-label', 'Translation languages');

  const original = document.createElement('li');
  const originalButton = document.createElement('button');
  originalButton.type = 'button';
  originalButton.textContent = 'Original';
  originalButton.addEventListener('click', () => {
    restoreOriginal();
    sessionStorage.removeItem(savedLanguageKey);
    setOpen(false);
  });
  original.appendChild(originalButton);
  list.appendChild(original);

  languages.forEach(([code, name]) => {
    const row = document.createElement('li');
    const link = document.createElement('a');
    const url = new URL('https://translate.google.com/translate');
    url.searchParams.set('sl', 'auto');
    url.searchParams.set('tl', code);
    url.searchParams.set('u', pageUrl);
    link.href = url.toString();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = name;
    link.addEventListener('click', async event => {
      if (country && country !== 'CN') return;
      event.preventDefault();
      const visitorCountry = country || await countryPromise;
      if (visitorCountry === 'CN') {
        setOpen(false);
        await translatePage(code);
      } else {
        location.assign(link.href);
      }
    });
    row.appendChild(link);
    list.appendChild(row);
  });

  function restoreOriginal() {
    translatedNodes.forEach(({ node, original }) => {
      node.nodeValue = original;
    });
    translatedNodes = [];
    toggleLabel.textContent = 'Language';
  }

  function collectTextNodes() {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script, style, noscript, pre, code, svg, textarea, .menu-item-language, .MathJax, .katex, mjx-container, [translate="no"]')) continue;
      if (!/[\p{L}]/u.test(node.nodeValue)) continue;
      if (node.nodeValue.trim().length > 2500) continue;
      nodes.push({ node, original: node.nodeValue });
    }
    return nodes;
  }

  function protectMath(text) {
    const formulas = [];
    const value = text.replace(/\$\$[\s\S]*?\$\$|\$(?:\\.|[^$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, match => {
      const marker = `__MATH_${formulas.length}__`;
      formulas.push(match);
      return marker;
    });
    return { value, formulas };
  }

  function restoreMath(text, formulas) {
    let value = text;
    for (let index = 0; index < formulas.length; index++) {
      const marker = `__MATH_${index}__`;
      if (!value.includes(marker)) throw new Error('A formula was changed during translation');
      value = value.replaceAll(marker, formulas[index]);
    }
    return value;
  }

  async function translatePage(target) {
    restoreOriginal();
    const entries = collectTextNodes();
    if (!entries.length) return;
    translatedNodes = entries;
    toggle.disabled = true;
    toggleLabel.textContent = 'Translating…';

    const groups = [];
    let group = [];
    let length = 0;
    for (const entry of entries) {
      const prepared = protectMath(entry.original.trim());
      const item = { ...entry, prepared };
      if (group.length && (group.length >= 12 || length + prepared.value.length > 4000)) {
        groups.push(group);
        group = [];
        length = 0;
      }
      group.push(item);
      length += prepared.value.length;
    }
    if (group.length) groups.push(group);

    try {
      for (let index = 0; index < groups.length; index++) {
        const current = groups[index];
        toggleLabel.textContent = `Translating ${index + 1}/${groups.length}`;
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, segments: current.map(item => item.prepared.value) })
        });
        if (!response.ok) throw new Error('Translation request failed');
        const result = await response.json();
        if (!Array.isArray(result.translations) || result.translations.length !== current.length) throw new Error('Invalid translation');
        current.forEach((item, position) => {
          const translated = restoreMath(result.translations[position], item.prepared.formulas);
          const leading = item.original.match(/^\s*/)[0];
          const trailing = item.original.match(/\s*$/)[0];
          item.node.nodeValue = leading + translated.trim() + trailing;
        });
      }
      sessionStorage.setItem(savedLanguageKey, target);
      toggleLabel.textContent = 'Language';
    } catch {
      restoreOriginal();
      toggleLabel.textContent = 'Translation unavailable';
      setTimeout(() => { toggleLabel.textContent = 'Language'; }, 3000);
    } finally {
      toggle.disabled = false;
    }
  }

  function setOpen(open) {
    list.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);
    const nav = item.closest('.site-nav');
    if (nav && matchMedia('(max-width: 767px)').matches) {
      nav.style.setProperty('--scroll-height', `${nav.scrollHeight}px`);
    }
  }

  toggle.addEventListener('click', () => setOpen(list.hidden));
  document.addEventListener('click', event => {
    if (!item.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setOpen(false);
      toggle.focus();
    }
  });

  item.append(toggle, list);
  menu.appendChild(item);

  countryPromise.then(visitorCountry => {
    const saved = sessionStorage.getItem(savedLanguageKey);
    if (visitorCountry === 'CN' && languages.some(([code]) => code === saved)) translatePage(saved);
  });
})();
