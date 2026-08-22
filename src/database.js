import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const defaultDbPath = resolve(projectRoot, 'data', 'emeinidis.sqlite');
const schemaPath = resolve(projectRoot, 'database', 'schema.sql');

let database;

export function initDatabase(dbPath = process.env.DB_PATH || defaultDbPath) {
  const resolvedPath = resolve(dbPath);
  const dbDirectory = dirname(resolvedPath);

  if (!existsSync(dbDirectory)) {
    mkdirSync(dbDirectory, { recursive: true });
  }

  database = new DatabaseSync(resolvedPath);
  database.exec('PRAGMA foreign_keys = ON;');
  database.exec(readFileSync(schemaPath, 'utf8'));

  return database;
}

export function getDatabase() {
  if (!database) {
    return initDatabase();
  }

  return database;
}

export function getDatabasePath() {
  return resolve(process.env.DB_PATH || defaultDbPath);
}

export function mapProject(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    status: row.status,
    location: row.location,
    projectType: row.project_type,
    areaSqm: row.area_sqm,
    year: row.year,
    summary: row.summary,
    description: row.description,
    coverImage: row.cover_image,
    sortOrder: row.sort_order,
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function closeDatabase() {
  if (database) {
    database.close();
    database = undefined;
  }
}
