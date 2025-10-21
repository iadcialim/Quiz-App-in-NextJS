# Neon Database Setup (Manual Alternative)

## API Authentication Issue
The automated script requires Neon API authentication. 

## Manual Setup Steps (2 minutes)

### 1. Create Neon Account & Database
1. Visit: https://console.neon.tech/signup
2. Sign up (free tier)
3. Create new project: "quiz-app-db"
4. Select region: "US East (N. Virginia)"

### 2. Get Connection String
1. Go to project dashboard
2. Click "Connection Details"
3. Copy "Connection string"
4. Format: `postgresql://user:pass@host/dbname`

### 3. Set Environment Variable
```bash
export DATABASE_URL="your-connection-string-here"
```

### 4. Deploy Schema
```bash
bash deploy-schema.sh
```

## Alternative: Use Railway (1-click)
```bash
# Visit: https://railway.app
# Click "New Project" → "Provision PostgreSQL"
# Copy connection string
```

**Status**: Manual setup required (2 minutes)