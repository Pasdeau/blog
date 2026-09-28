(function () {
  const groups = document.querySelector('.topic-groups');
  const timeline = document.querySelector('.topic-timeline');
  if (!groups || !timeline) return;

  const sections = [...groups.querySelectorAll('.topic-category-section')];
  const seriesHeadings = [...groups.querySelectorAll('.topic-series-header')];
  const timelineList = timeline.querySelector('.topic-post-list');
  const entries = [];

  sections.forEach((section) => {
    const heading = section.querySelector('.topic-category-header');
    const category = section.querySelector('.topic-category-link').textContent.replace(/\s+\d+\s*$/, '').trim();

    section.querySelectorAll('.topic-post-item').forEach((post) => {
      const date = post.querySelector('.topic-post-date');
      const link = post.querySelector('.topic-post-title');
      const task = post.querySelector('.topic-post-task');
      const tags = post.querySelector('.topic-post-tags');
      entries.push({ date: date.textContent.trim(), href: link.getAttribute('href'), title: link.textContent.trim(), task, tags });
    });

    heading.querySelector('a').setAttribute('aria-label', `Show only ${category} posts`);
  });

  entries.sort((a, b) => b.date.localeCompare(a.date));
  entries.forEach((entry) => {
    const item = document.createElement('li');
    item.className = 'topic-post-item';
    const main = document.createElement('div');
    main.className = 'topic-post-main';
    const date = document.createElement('span');
    date.className = 'topic-post-date';
    date.textContent = entry.date;
    const link = document.createElement('a');
    link.className = 'topic-post-title';
    link.href = entry.href;
    link.textContent = entry.title;
    main.append(date, link);
    const task = entry.task.cloneNode(true);
    task.className = 'topic-post-task';
    item.append(main, task, entry.tags.cloneNode(true));
    timelineList.append(item);
  });

  function showView() {
    const view = decodeURIComponent(location.hash.slice(1));
    const selectedSeries = seriesHeadings.find((heading) => heading.id === view);
    const selected = selectedSeries
      ? selectedSeries.closest('.topic-category-section')
      : sections.find((section) => section.querySelector('.topic-category-header').id === view);
    const chronological = view === 'timeline';

    groups.hidden = chronological;
    timeline.hidden = !chronological;
    sections.forEach((section) => {
      section.hidden = Boolean(selected && section !== selected);
      const link = section.querySelector('.topic-category-link');
      if (section === selected && !selectedSeries) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    seriesHeadings.forEach((heading) => {
      const hidden = Boolean(selectedSeries && heading !== selectedSeries);
      heading.nextElementSibling.hidden = hidden;
      const link = heading.querySelector('.topic-series-link');
      if (heading === selectedSeries) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    document.querySelectorAll('[data-post-view]').forEach((link) => {
      const active = link.dataset.postView === (chronological ? 'timeline' : 'topics');
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  window.addEventListener('hashchange', () => {
    showView();
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target && target.scrollIntoView) target.scrollIntoView();
  });
  showView();
})();
