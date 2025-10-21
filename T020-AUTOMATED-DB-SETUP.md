# T020 Automated Database Setup Options

## Current Limitation
- Node.js/npm/vercel CLI not available in current environment
- Cannot update Vercel CLI to get postgres commands

## Automated Database Setup Alternatives

### Option 1: Vercel API (Programmatic)
```bash
# Create database via Vercel REST API
curl -X POST "https://api.vercel.com/v1/storage/postgres" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "quiz-app-db", "region": "us-east-1"}'
```

### Option 2: Terraform/Infrastructure as Code
```hcl
# vercel.tf
resource "vercel_postgres_database" "quiz_db" {
  name   = "quiz-app-db"
  region = "us-east-1"
}
```

### Option 3: External Database Services (Fully Automated)

#### Supabase (Free tier, instant setup)
```bash
# Via Supabase CLI
supabase projects create quiz-app-db
supabase db start
```

#### Railway (One-click PostgreSQL)
```bash
# Via Railway CLI  
railway add postgresql
railway run -- psql $DATABASE_URL < sql/schema.sql
```

#### Neon (Serverless PostgreSQL)
```bash
# Via Neon CLI
neon databases create quiz-app-db
neon connection-string quiz-app-db
```

## Recommended: External Database Service
**Best Option**: Use Railway or Supabase for instant automated setup
- No manual dashboard interaction required
- CLI-based deployment
- Free tiers available
- Direct PostgreSQL compatibility

## Implementation Steps
1. Choose external service (Railway/Supabase/Neon)
2. Create database via CLI
3. Update environment variables in Vercel
4. Deploy schema
5. Test API with real database

**Status**: Ready for automated external database setup