const languages = {
  en: '英语',
  'zh-CN': '简体中文',
  fr: '法语',
  it: '意大利语',
  de: '德语',
  es: '西班牙语',
  ru: '俄语',
  ja: '日语'
};

const jsonHeaders = { 'Cache-Control': 'private, no-store' };

function reply(data, status = 200) {
  return Response.json(data, { status, headers: jsonHeaders });
}

function parseTranslations(content, count) {
  if (typeof content !== 'string') return null;
  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try {
    const result = JSON.parse(cleaned);
    if (!Array.isArray(result) || result.length !== count) return null;
    if (!result.every(value => typeof value === 'string' && value.trim())) return null;
    return result;
  } catch {
    return null;
  }
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return reply({ error: 'method_not_allowed' }, 405);

    const origin = request.headers.get('origin');
    if (!origin || origin !== new URL(request.url).origin) {
      return reply({ error: 'forbidden_origin' }, 403);
    }

    if ((process.env.VERCEL || process.env.VERCEL_ENV) && request.headers.get('x-vercel-ip-country') !== 'CN') {
      return reply({ error: 'not_available_here' }, 403);
    }

    if (!process.env.TOKENHUB_API_KEY || !process.env.TOKENHUB_BASE_URL || !process.env.TOKENHUB_MODEL) {
      return reply({ error: 'translation_not_configured' }, 503);
    }

    let payload;
    try {
      const raw = await request.text();
      if (raw.length > 16000) return reply({ error: 'request_too_large' }, 413);
      payload = JSON.parse(raw);
    } catch {
      return reply({ error: 'invalid_json' }, 400);
    }

    const { target, segments } = payload ?? {};
    if (!Object.hasOwn(languages, target) || !Array.isArray(segments) || segments.length < 1 || segments.length > 12 ||
        !segments.every(value => typeof value === 'string' && value.trim() && value.length <= 2500) ||
        segments.reduce((sum, value) => sum + value.length, 0) > 4000) {
      return reply({ error: 'invalid_translation_request' }, 400);
    }

    let endpoint;
    try {
      const base = new URL(process.env.TOKENHUB_BASE_URL);
      if (base.protocol !== 'https:') throw new Error('insecure endpoint');
      endpoint = new URL(`${base.pathname.replace(/\/$/, '')}/chat/completions`, base.origin);
    } catch {
      return reply({ error: 'invalid_server_configuration' }, 503);
    }

    const prompt = `将下面 JSON 数组里的每个字符串分别翻译为${languages[target]}。只输出同样长度的 JSON 字符串数组，不要 Markdown 或解释。保留 LaTeX 公式、$...$、\\(...\\)、代码标识符、URL、标签名和产品型号原样。保持各项顺序，不要合并或拆分。\n${JSON.stringify(segments)}`;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const upstream = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.TOKENHUB_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: process.env.TOKENHUB_MODEL,
            messages: [{ role: 'user', content: prompt }]
          }),
          signal: AbortSignal.timeout(15000)
        });
        if (!upstream.ok) return reply({ error: 'translation_provider_error' }, 502);
        const data = await upstream.json();
        const translations = parseTranslations(data?.choices?.[0]?.message?.content, segments.length);
        if (translations) return reply({ translations });
      } catch {
        if (attempt === 1) return reply({ error: 'translation_unavailable' }, 502);
      }
    }
    return reply({ error: 'translation_format_error' }, 502);
  }
};
