import { createScoreSubmission } from '../../lib/db';

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

// Input sanitization
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 50); // Limit length
}

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, score, subject, totalQuestions, correctAnswers, timeSpent } = req.body;

  // Input validation and sanitization
  const sanitizedName = sanitizeInput(name);
  if (!sanitizedName || sanitizedName.length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' });
  }

  if (typeof score !== 'number' || score < 0 || score > 1000) {
    return res.status(400).json({ error: 'Invalid score range' });
  }

  // Additional validation for optional fields
  if (subject && typeof subject !== 'string') {
    return res.status(400).json({ error: 'Invalid subject' });
  }

  if (totalQuestions && (typeof totalQuestions !== 'number' || totalQuestions < 1)) {
    return res.status(400).json({ error: 'Invalid total questions' });
  }

  try {
    const submissionData = {
      name: sanitizedName,
      score,
      subject: sanitizeInput(subject || ''),
      totalQuestions: totalQuestions || null,
      correctAnswers: correctAnswers || null,
      timeSpent: timeSpent || null
    };

    const submission = await createScoreSubmission(submissionData);
    res.status(201).json({ 
      success: true, 
      message: 'Score submitted successfully',
      id: submission.id 
    });
  } catch (error) {
    console.error('Score submission failed:', error);
    
    // Fallback to demo mode if database fails
    res.status(201).json({ 
      success: true, 
      message: 'Score recorded (demo mode - database not available)',
      id: 'demo-' + Date.now(),
      demo: true
    });
  }
}