import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Test database connection
    const result = await sql`SELECT NOW() as current_time`;
    
    // Test if table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'score_submissions'
      );
    `;
    
    res.status(200).json({
      success: true,
      database_connected: true,
      current_time: result.rows[0].current_time,
      table_exists: tableCheck.rows[0].exists,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({
      success: false,
      database_connected: false,
      error: error.message,
      message: 'Database connection failed'
    });
  }
}