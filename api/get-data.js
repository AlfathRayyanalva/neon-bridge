import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // Izinkan request dari InfinityFree / browser
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Endpoint ini hanya untuk GET
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            error: 'Method Not Allowed'
        });
    }

    try {
        // Pastikan DATABASE_URL tersedia di Vercel
        if (!process.env.DATABASE_URL) {
            return res.status(500).json({
                success: false,
                error: 'DATABASE_URL belum dikonfigurasi di Vercel.'
            });
        }

        // Koneksi ke Neon
        const sql = neon(process.env.DATABASE_URL);

        // Ambil data dari tabel personils
        const data = await sql`
            SELECT *
            FROM personils
            ORDER BY id ASC
            LIMIT 100
        `;

        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {
        console.error('Neon Database Error:', error);

        return res.status(500).json({
            success: false,
            error: error.message || 'Terjadi kesalahan pada database.'
        });
    }
}
