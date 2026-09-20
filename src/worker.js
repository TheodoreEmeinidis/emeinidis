const CONTACT_EMAIL = 'info@eminidis.gr';
const SENDER_EMAIL = 'website@eminidis.gr';

function json(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: { 'Cache-Control': 'no-store' }
  });
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validateContact(payload) {
  const contact = {
    name: clean(payload.name, 120),
    email: clean(payload.email, 254),
    phone: clean(payload.phone, 40),
    message: clean(payload.message, 5000),
    language: payload.language === 'en' ? 'en' : 'el',
    company: clean(payload.company, 200)
  };

  if (!contact.name || !contact.email || !contact.message) {
    return { error: 'Please complete all required fields.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return { error: 'Please enter a valid email address.' };
  }

  return contact;
}

function buildContactEmail(contact, request) {
  const submittedAt = new Intl.DateTimeFormat('el-GR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Athens'
  }).format(new Date());
  const pageUrl = request.headers.get('Referer') || new URL(request.url).origin;
  const phone = contact.phone || 'Δεν δόθηκε';
  const subject = `Νέο μήνυμα από ${contact.name} | Eminidis Projects`;
  const text = [
    'ΝΕΟ ΜΗΝΥΜΑ ΑΠΟ ΤΗ ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ',
    '',
    `Ονοματεπώνυμο: ${contact.name}`,
    `Email: ${contact.email}`,
    `Τηλέφωνο: ${phone}`,
    '',
    'Μήνυμα:',
    contact.message,
    '',
    `Ημερομηνία: ${submittedAt}`,
    `Γλώσσα ιστοσελίδας: ${contact.language === 'en' ? 'English' : 'Ελληνικά'}`,
    `Σελίδα: ${pageUrl}`
  ].join('\n');
  const html = `
    <!doctype html>
    <html lang="el">
      <body style="margin:0;background:#f4f1ec;color:#161616;font-family:Arial,sans-serif">
        <div style="max-width:680px;margin:0 auto;padding:32px 18px">
          <div style="background:#090909;border-top:4px solid #c9895d;padding:30px">
            <p style="margin:0 0 10px;color:#c9895d;font-size:12px;letter-spacing:1.4px">EMINIDIS PROJECTS</p>
            <h1 style="margin:0;color:#f4f1ec;font-size:25px;font-weight:500">Νέο μήνυμα επικοινωνίας</h1>
          </div>
          <div style="background:#ffffff;padding:30px;border:1px solid #ded8cf;border-top:0">
            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6">
              <tr><td style="width:145px;padding:8px 12px 8px 0;color:#75533f;vertical-align:top">Ονοματεπώνυμο</td><td style="padding:8px 0"><strong>${escapeHtml(contact.name)}</strong></td></tr>
              <tr><td style="padding:8px 12px 8px 0;color:#75533f;vertical-align:top">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(contact.email)}" style="color:#9d5e3d">${escapeHtml(contact.email)}</a></td></tr>
              <tr><td style="padding:8px 12px 8px 0;color:#75533f;vertical-align:top">Τηλέφωνο</td><td style="padding:8px 0">${escapeHtml(phone)}</td></tr>
            </table>
            <div style="height:1px;background:#ded8cf;margin:22px 0"></div>
            <p style="margin:0 0 9px;color:#75533f;font-size:13px">Μήνυμα</p>
            <div style="white-space:pre-wrap;font-size:16px;line-height:1.7">${escapeHtml(contact.message)}</div>
            <div style="height:1px;background:#ded8cf;margin:24px 0 18px"></div>
            <p style="margin:0;color:#6d6d6d;font-size:12px;line-height:1.6">${escapeHtml(submittedAt)} · ${contact.language === 'en' ? 'English' : 'Ελληνικά'}<br>${escapeHtml(pageUrl)}</p>
          </div>
        </div>
      </body>
    </html>`;

  return { subject, text, html };
}

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  const requestOrigin = request.headers.get('Origin');
  const expectedOrigin = new URL(request.url).origin;

  if (requestOrigin && requestOrigin !== expectedOrigin) {
    return json({ error: 'Invalid request origin.' }, 403);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const contact = validateContact(payload);
  if (contact.error) {
    return json(contact, 400);
  }

  // Quietly accept bot submissions so the honeypot is not detectable.
  if (contact.company) {
    return json({ ok: true }, 201);
  }

  const email = buildContactEmail(contact, request);

  try {
    await env.EMAIL.send({
      from: { email: SENDER_EMAIL, name: 'Eminidis Projects Website' },
      to: CONTACT_EMAIL,
      replyTo: contact.email,
      subject: email.subject,
      text: email.text,
      html: email.html
    });
  } catch (error) {
    console.error('Contact email delivery failed', error);
    return json({ error: 'Το μήνυμα δεν στάλθηκε. Παρακαλώ δοκιμάστε ξανά.' }, 502);
  }

  return json({ ok: true }, 201);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ error: 'API route not found.' }, 404);
    }

    return env.ASSETS.fetch(request);
  }
};
