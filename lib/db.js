import { sql } from '@vercel/postgres';

export async function createScoreSubmission(data) {
  try {
    const { name, score } = data;
    const result = await sql`
      INSERT INTO score_submissions (name, score)
      VALUES (${name}, ${score})
      RETURNING id, submitted_at
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Database connection failed. Please configure environment variables.');
  }
}

export async function getLeaderboard() {
  try {
    const result = await sql`
      SELECT name, score, submitted_at
      FROM score_submissions
      ORDER BY score DESC
      LIMIT 20
    `;
    return result.rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}