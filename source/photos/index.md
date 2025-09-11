---
title: Gallery
layout: page
comments: false
---

<div class="gallery-filter">
  <button data-filter="all" class="active">全部</button>
  <button data-filter="people">生活</button>
  <button data-filter="travel">旅行</button>
  <button data-filter="lab">实验室</button>
</div>

<div class="gallery-grid">
  <!-- 每个 a 是一张图：href = 大图；img src = 缩略图；data-caption = 标题；data-category = 分类（可多，用逗号） -->
  <!-- <a href="/images/photos/01-large.jpg" data-fancybox="photos" data-caption="海边日落" data-category="travel">
    <img src="/images/photos/thumbs/01.jpg" alt="海边日落" loading="lazy">
    <span class="caption">海边日落</span>
  </a> -->

  <a href="/images/photos/LA-0885.jpg" data-fancybox="photos" data-caption="肖像" data-category="people">
    <img src="/images/photos/LA-0885.jpg" alt="肖像" loading="lazy">
    <span class="caption">肖像</span>
  </a>

  <!-- <a href="/images/photos/03-large.jpg" data-fancybox="photos" data-caption="实验设备" data-category="lab">
    <img src="/images/photos/thumbs/03.jpg" alt="实验设备" loading="lazy">
    <span class="caption">实验设备</span>
  </a> -->
</div>
