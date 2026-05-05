import { Pool, QueryResult } from 'pg';

let pool: Pool | null = null;

function getConnectionString(): string {
  // Production (Vercel) uses DATABASE_URL; local dev uses LOCAL_DATABASE_URL
  const url = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;
  if (url) return url;

  // Fallback for local default Postgres setup.
  const user = process.env.PGUSER || process.env.USER || 'postgres';
  const host = process.env.PGHOST || 'localhost';
  const port = process.env.PGPORT || '5432';
  const db = process.env.PGDATABASE || 'scholararena_test';
  return `postgresql://${user}@${host}:${port}/${db}`;
}

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: getConnectionString(),
      max: 10,
    });
  }
  return pool;
}

export async function query<T = unknown>(text: string, values: unknown[] = []): Promise<QueryResult<T>> {
  return getPool().query<T>(text, values);
}
