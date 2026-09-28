/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', data => {
  data.content = data.content.replace(/<img\b(?![^>]*\bloading=)([^>]*?)>/gi, '<img loading="lazy"$1>');
  return data;
});
