# Local API Testing Instructions

## Prerequisites
Since npm/node are not available in this environment, you'll need to run these commands in your local terminal:

## Step 1: Set Environment Variable
```bash
export DATABASE_URL="your-neon-connection-string"
```

## Step 2: Start Dev Server
```bash
npm run dev
```
Wait for: `Ready - started server on 0.0.0.0:3000`

## Step 3: Test API (New Terminal)
```bash
# Test score submission
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "score": 85}'
```

Expected response:
```json
{"success": true, "message": "Score submitted successfully"}
```

## Step 4: Verify Database
```bash
# Check database records
bash quick-db-check.sh
```

Should show:
```
id | name      | score | created_at
1  | Test User | 85    | 2024-12-19...
```

## Alternative: Direct Database Query
```bash
psql "$DATABASE_URL" -c "SELECT * FROM score_submissions;"
```

**Status**: Ready for local testing - run these commands in your terminal