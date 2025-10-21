import { sql } from '@vercel/postgres';

export async function createScoreSubmission(name, score) {
  const result = await sql`
    INSERT INTO score_submissions (name, score)
    VALUES (${name}, ${score})
    RETURNING id, submitted_at
  `;
  return result.rows[0];
}

export async function getLeaderboard() {
  const result = await sql`
    SELECT name, score, submitted_at
    FROM score_submissions
    ORDER BY score DESC
    LIMIT 20
  `;
  return result.rows;
}