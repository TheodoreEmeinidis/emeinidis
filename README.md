# Eminidis Projects

A Greek-language portfolio website for Eminidis Projects, with a lightweight Node.js backend and an empty SQLite database ready for future project/contact functionality.

## Run Locally

Use Node 24 or newer.

```powershell
npm start
```

Then open:

```text
http://127.0.0.1:3000
```

Stop the server with `Ctrl+C` in the same terminal where you started it.

The site now has clean page routes inspired by the previous NextGen structure:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/erga
http://127.0.0.1:3000/anakainiseis
http://127.0.0.1:3000/epikoinwnia
```

The old static workflow still works for the homepage, but the multi-page navigation is designed for the Node server.

If PowerShell says that port `3000` is already in use, find and stop the process:

```powershell
netstat -ano | findstr :3000
Stop-Process -Id <PID>
```

Replace `<PID>` with the number shown at the end of the `LISTENING` line.

## Database

The app uses Node's built-in SQLite support, so there are no package dependencies yet.

```bash
node scripts/init-db.js
```

This creates:

```text
data/emeinidis.sqlite
```

The database starts empty. The schema is in `database/schema.sql` and includes tables for future projects, project images, contact messages, and site settings.

## API

```text
GET  /api/health
GET  /api/projects
GET  /api/projects/:slug
POST /api/contact
```

`/api/projects` currently returns an empty list until projects are added to the database.

## Replace Before Launch

- Replace any remaining temporary Unsplash image URLs in `index.html` with approved project photography.
- Replace placeholder project names/details in `erga.html` with final approved project data.
- Confirm the final email address, phone number, and address.
- Add the final favicon and any legal/privacy pages required for production.
- The supplied brand logo is loaded from `assets/logo.png`.
- `responsive.css` contains the tablet and compact-phone alignment refinements, including a dedicated breakpoint below 340px.
