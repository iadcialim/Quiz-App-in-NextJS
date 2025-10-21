# T020 Database Setup Status

## Current Vercel CLI Limitation
**Issue**: Current Vercel CLI (v48.4.1) doesn't include `vercel postgres` command
**Reason**: Postgres commands were added in newer CLI versions

## Alternative Database Setup Options

### Option 1: Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select the deployed project: `quiz-app-nextjs`
3. Go to Storage tab
4. Create new Postgres database
5. Copy connection strings to environment variables

### Option 2: Update Vercel CLI
```bash
npm install -g vercel@latest
vercel postgres create quiz-app-db
```

### Option 3: Use External Database
- Set up PostgreSQL on Railway, Supabase, or Neon
- Configure connection strings in Vercel environment variables

## Required Environment Variables
```
POSTGRES_URL=postgres://username:password@host:port/database
POSTGRES_PRISMA_URL=postgres://username:password@host:port/database?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://username:password@host:port/database
```

## Next Steps for Real API Testing
1. **Manual Database Setup**: Use Vercel dashboard to create database
2. **Configure Environment Variables**: Add connection strings
3. **Deploy Schema**: Run SQL commands via database console
4. **Test API**: Real POST requests with database integration

**Current Status**: T020 requires manual database creation via Vercel dashboard