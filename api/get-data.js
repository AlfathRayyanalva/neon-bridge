import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const sql = neon(process.env.DATABASE_URL);
    // Ganti 'nama_tabel_mu' sesuai tabel di Neon kamu
    const data = await sql`SELECT * FROM personils LIMIT 100`;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
