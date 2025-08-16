import fs from 'fs';
import path from 'path';
import { query } from '@/server/config/db.config';

async function runMigration(file: string) {
  const sql = fs.readFileSync(file, 'utf-8');
  // console.log(sql);
  await query(sql);

  console.log(`✅ Migration ${path.basename(file)} applied`);
}

async function main() {
  const migrationsDir = path.join(__dirname, 'schema');
  const migrations = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort()
    .map(f => path.join(migrationsDir, f));

  for (const file of migrations) {
    await runMigration(file);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
