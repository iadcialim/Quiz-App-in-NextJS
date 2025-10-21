# 🔍 Database Connection Debug

## Issue Fixed
Restored database functionality to both APIs. They now try to connect to your database first, then fall back to demo data if it fails.

## Test Database Connection
After deploying, test your database:
```bash
curl https://quiz-app-nextjs-ebl7bs9x4-iads-projects-19c5d1fa.vercel.app/api/test-db
```

## Expected Results

### If Database is Connected:
```json
{
  "success": true,
  "database_connected": true,
  "current_time": "2024-12-19T...",
  "table_exists": true,
  "message": "Database connection successful"
}
```

### If Database is Not Connected:
```json
{
  "success": false,
  "database_connected": false,
  "error": "connection error details",
  "message": "Database connection failed"
}
```

## Fix Database Issues

### 1. Check Environment Variables in Vercel
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Ensure `POSTGRES_URL` is set correctly
- Format: `postgresql://user:pass@host:5432/dbname`

### 2. Create Table if Missing
```sql
CREATE TABLE score_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Redeploy After Fixes
```bash
vercel --prod
```

## Deploy These Fixes
```bash
vercel --prod
```

Then test: `/api/test-db` to diagnose the database connection.