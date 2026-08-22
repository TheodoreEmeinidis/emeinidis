import { closeDatabase, getDatabasePath, initDatabase } from '../src/database.js';

initDatabase();
console.log(`Database ready: ${getDatabasePath()}`);
closeDatabase();
