# Technical Plan: Deploy Project Online with Score Submission

**Feature**: feat-deploy-project-online-with-score-submission  
**Created**: 2024-12-19  
**Status**: Ready for Implementation  

## Architecture Overview

### Deployment Strategy
- **Platform**: Vercel (aligns with Next.js and constitutional standards)
- **Database**: Vercel Postgres (serverless, minimal setup)
- **Domain**: Auto-generated Vercel domain initially

### Data Architecture

#### Database Schema
```sql
CREATE TABLE score_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_score_submissions_score ON score_submissions(score DESC);
```

#### API Endpoints
- `POST /api/scores` - Submit new score
- `GET /api/leaderboard` - Fetch top 20 scores

### Component Modifications

#### Results Component Enhancement
- Add name input field
- Add submit button
- Add submission status feedback
- Add leaderboard display
- Add loading states

#### New Components
- `ScoreSubmissionForm` - Name input and submit functionality
- `Leaderboard` - Display top 20 scores with highlighting

## Technical Implementation

### 1. Database Setup
```javascript
// lib/db.js
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
```

### 2. API Routes

#### Score Submission API
```javascript
// pages/api/scores.js
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
```

#### Leaderboard API
```javascript
// pages/api/leaderboard.js
import { getLeaderboard } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leaderboard = await getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Leaderboard fetch failed:', error);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
}
```

### 3. Component Updates

#### Enhanced Results Component
```javascript
// src/components/Results.jsx (additions)
const [submissionState, setSubmissionState] = useState('idle'); // idle, submitting, success, error
const [userName, setUserName] = useState('');
const [leaderboard, setLeaderboard] = useState([]);
const [submissionId, setSubmissionId] = useState(null);

const handleSubmitScore = async () => {
  if (!userName.trim()) return;
  
  setSubmissionState('submitting');
  
  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName.trim(), score })
    });
    
    if (response.ok) {
      const result = await response.json();
      setSubmissionId(result.id);
      setSubmissionState('success');
      await loadLeaderboard();
    } else {
      setSubmissionState('error');
    }
  } catch (error) {
    setSubmissionState('error');
  }
};

const loadLeaderboard = async () => {
  try {
    const response = await fetch('/api/leaderboard');
    const data = await response.json();
    setLeaderboard(data);
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
  }
};
```

#### New ScoreSubmissionForm Component
```javascript
// src/components/ScoreSubmissionForm.jsx
export default function ScoreSubmissionForm({ 
  onSubmit, 
  isSubmitting, 
  userName, 
  setUserName 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Submit Your Score</h3>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
        maxLength={100}
      />
      <button
        onClick={onSubmit}
        disabled={!userName.trim() || isSubmitting}
        className="w-full bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Score'}
      </button>
    </div>
  );
}
```

#### New Leaderboard Component
```javascript
// src/components/Leaderboard.jsx
export default function Leaderboard({ scores, currentUserName }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">🏆 Top 20 Scores</h3>
      <div className="space-y-2">
        {scores.map((entry, index) => (
          <div
            key={index}
            className={`flex justify-between p-3 rounded ${
              entry.name === currentUserName 
                ? 'bg-yellow-100 font-bold' 
                : 'bg-gray-50'
            }`}
          >
            <span>#{index + 1} {entry.name}</span>
            <span>{entry.score} points</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. Environment Configuration

#### Environment Variables
```bash
# .env.local
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

#### Vercel Configuration
```json
// vercel.json
{
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

## Security Considerations

### Input Validation
- Sanitize name input (trim, length limit)
- Validate score is positive integer
- Rate limiting on submission endpoint

### Error Handling
- Graceful database connection failures
- User-friendly error messages
- Proper HTTP status codes

## Testing Strategy

### Unit Tests
- API endpoint validation
- Component rendering with different states
- Form submission logic

### Integration Tests
- End-to-end score submission flow
- Database operations
- Leaderboard display accuracy

## Deployment Steps

1. **Database Setup**
   - Create Vercel Postgres database
   - Run schema creation SQL
   - Configure environment variables

2. **Code Deployment**
   - Push to GitHub repository
   - Connect Vercel to repository
   - Deploy with environment variables

3. **Verification**
   - Test quiz completion flow
   - Verify score submission
   - Confirm leaderboard display

## Performance Considerations

- Database queries optimized with indexes
- Leaderboard caching (future enhancement)
- Minimal API payload sizes
- Client-side loading states

## Monitoring & Observability

- API endpoint error logging
- Database connection monitoring
- User submission success rates
- Performance metrics via Vercel Analytics

---

**Estimated Implementation Time**: 8-12 hours  
**Dependencies**: Vercel account, Postgres database setup  
**Risk Level**: Low (standard Next.js deployment pattern)