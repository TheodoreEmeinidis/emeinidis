import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { URL } from 'node:url';
import { closeDatabase, getDatabasePath, initDatabase, mapProject } from './src/database.js';

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
const root = process.cwd();
const db = initDatabase();

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon']
]);

const pageRoutes = new Map([
  ['/', '/index.html'],
  ['/erga', '/erga.html'],
  ['/anakainiseis', '/anakainiseis.html'],
  ['/epikoinwnia', '/epikoinwnia.html']
]);

const allowedFiles = new Set([
  '/index.html',
  '/erga.html',
  '/anakainiseis.html',
  '/epikoinwnia.html',
  '/styles.css',
  '/responsive.css',
  '/pages.css',
  '/script.js'
]);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

function readJsonBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        rejectBody(new Error('Request body is too large.'));
      }
    });

    request.on('end', () => {
      if (!body) {
        resolveBody({});
        return;
      }

      try {
        resolveBody(JSON.parse(body));
      } catch {
        rejectBody(new Error('Invalid JSON body.'));
      }
    });

    request.on('error', rejectBody);
  });
}

function validateContactPayload(payload) {
  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const phone = String(payload.phone || '').trim();
  const message = String(payload.message || '').trim();

  if (!name || !email || !message) {
    return { error: 'Name, email, and message are required.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'A valid email is required.' };
  }

  return { name, email, phone, message };
}

async function handleApi(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api/health') {
    const projectCount = db.prepare('SELECT COUNT(*) AS total FROM projects').get().total;
    sendJson(response, 200, {
      ok: true,
      database: 'ready',
      databasePath: getDatabasePath(),
      projectCount
    });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/projects') {
    const status = url.searchParams.get('status');
    const rows = status
      ? db.prepare(`
          SELECT * FROM projects
          WHERE status = ? AND is_published = 1
          ORDER BY sort_order ASC, created_at DESC
        `).all(status)
      : db.prepare(`
          SELECT * FROM projects
          WHERE is_published = 1
          ORDER BY sort_order ASC, created_at DESC
        `).all();

    sendJson(response, 200, { projects: rows.map(mapProject) });
    return true;
  }

  if (request.method === 'GET' && url.pathname.startsWith('/api/projects/')) {
    const slug = decodeURIComponent(url.pathname.replace('/api/projects/', '')).trim();
    const project = db.prepare('SELECT * FROM projects WHERE slug = ? AND is_published = 1').get(slug);

    if (!project) {
      sendJson(response, 404, { error: 'Project not found.' });
      return true;
    }

    const images = db.prepare(`
      SELECT image_path AS imagePath, alt_text AS altText, sort_order AS sortOrder
      FROM project_images
      WHERE project_id = ?
      ORDER BY sort_order ASC, id ASC
    `).all(project.id);

    sendJson(response, 200, { project: mapProject(project), images });
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/contact') {
    try {
      const payload = await readJsonBody(request);
      const contact = validateContactPayload(payload);

      if (contact.error) {
        sendJson(response, 400, contact);
        return true;
      }

      const result = db.prepare(`
        INSERT INTO contact_messages (name, email, phone, message, source)
        VALUES (?, ?, ?, ?, ?)
      `).run(contact.name, contact.email, contact.phone || null, contact.message, 'website');

      sendJson(response, 201, { ok: true, id: result.lastInsertRowid, delivery: 'stored' });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }

    return true;
  }

  if (url.pathname.startsWith('/api/')) {
    sendJson(response, 404, { error: 'API route not found.' });
    return true;
  }

  return false;
}

function canServePath(pathname) {
  return allowedFiles.has(pathname) || pathname.startsWith('/assets/');
}

function serveStatic(request, response, url) {
  let pathname = decodeURIComponent(url.pathname);

  if (pageRoutes.has(pathname)) {
    pathname = pageRoutes.get(pathname);
  }

  if (!extname(pathname)) {
    sendText(response, 404, 'Not found');
    return;
  }

  if (!canServePath(pathname)) {
    sendText(response, 404, 'Not found');
    return;
  }

  const filePath = resolve(root, `.${pathname}`);
  const rootWithSeparator = root.endsWith(sep) ? root : `${root}${sep}`;

  if (!filePath.startsWith(rootWithSeparator) && filePath !== root) {
    sendText(response, 403, 'Forbidden');
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    sendText(response, 404, 'Not found');
    return;
  }

  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    'Content-Type': mimeTypes.get(extension) || 'application/octet-stream',
    'Cache-Control': extension === '.html' ? 'no-store' : 'public, max-age=3600'
  });

  const stream = createReadStream(filePath);
  stream.on('error', () => {
    response.destroy();
  });
  stream.pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  if (await handleApi(request, response, url)) {
    return;
  }

  serveStatic(request, response, url);
});

server.requestTimeout = 30_000;
server.headersTimeout = 35_000;
server.keepAliveTimeout = 5_000;

server.on('clientError', (_error, socket) => {
  if (socket.writable) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  }
});

server.on('error', (error) => {
  closeDatabase();

  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the old Node process or run with a different PORT.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Eminidis website running at http://${host}:${port}`);
  console.log(`SQLite database: ${getDatabasePath()}`);
});

let isShuttingDown = false;
let forcedShutdownTimer;

function shutdown(signal) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}. Shutting down server...`);

  server.close((error) => {
    clearTimeout(forcedShutdownTimer);
    closeDatabase();

    if (error) {
      console.error(error);
      process.exit(1);
    }

    process.exit(0);
  });

  server.closeIdleConnections?.();

  forcedShutdownTimer = setTimeout(() => {
    server.closeAllConnections?.();
    closeDatabase();
    process.exit(0);
  }, 2_000);
  forcedShutdownTimer.unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
