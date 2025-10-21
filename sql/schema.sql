CREATE TABLE score_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_score_submissions_score ON score_submissions(score DESC);