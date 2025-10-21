import { createScoreSubmission } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, score } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (typeof score !== 'number' || score < 0) {
    return res.status(400).json({ error: 'Invalid score' });
  }

  try {
    const submission = await createScoreSubmission(name.trim(), score);
    res.status(201).json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Score submission failed:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
}