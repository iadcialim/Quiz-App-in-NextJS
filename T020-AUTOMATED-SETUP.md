# T020 Automated Database Setup

## Quick Setup (Choose One)

### Option 1: Neon (Recommended)

```bash
# 1. Run setup script
./setup-database.sh

# 2. Get connection string from Neon dashboard
# Visit: https://console.neon.tech/app/projects

# 3. Set environment variable
export DATABASE_URL="postgresql://user:pass@host/db"

# 4. Deploy schema
./deploy-schema.sh
```

### Option 2: Supabase

```bash
# 1. Run Supabase setup
./setup-supabase-db.sh

# 2. Get connection string from Supabase dashboard
# Visit: https://app.supabase.com/projects

# 3. Deploy schema
export DATABASE_URL="postgresql://user:pass@host/db"
./deploy-schema.sh
```

## Files Created

- `setup-database.sh` - Neon database creation
- `setup-supabase-db.sh` - Supabase alternative
- `deploy-schema.sh` - Schema deployment

## Next Steps After Setup

1. Add DATABASE_URL to Vercel environment variables
2. Test API with real database
3. Continue with T008c (ScoreSubmissionForm)

**Status**: Done and complete
