import { createReadStream, promises as fs } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import translate from '../api/translate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const port = Number(process.env.PORT || 4001);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.m4a': 'audio/mp4',
  '.aiff': 'audio/aiff',
  '.pdf': 'application/pdf'
};

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `127.0.0.1:${port}`}`);
  if (url.pathname === '/api/translate') {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const webRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body: chunks.length ? Buffer.concat(chunks) : undefined
    });
    const result = await translate.fetch(webRequest);
    console.log(`Translation request: ${result.status}`);
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(Buffer.from(await result.arrayBuffer()));
    return;
  }

  let filename;
  try {
    filename = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (url.pathname.endsWith('/')) filename = path.join(filename, 'index.html');
    if (filename !== root && !filename.startsWith(`${root}${path.sep}`)) throw new Error('outside public');
    const stat = await fs.stat(filename);
    if (!stat.isFile()) throw new Error('not a file');
  } catch {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': types[path.extname(filename).toLowerCase()] || 'application/octet-stream' });
  createReadStream(filename).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Translation preview: http://127.0.0.1:${port}`);
});
