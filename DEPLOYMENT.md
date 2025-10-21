# Deployment Instructions

## T008a - Deploy Score Submission API

### Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`

### Deployment Steps
1. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

2. **Expected Output:**
   ```
   🔗  Preview: https://quiz-app-xxx.vercel.app
   ✅  Production: https://quiz-app-xxx.vercel.app
   ```

3. **Set up Database:**
   ```bash
   vercel postgres create quiz-app-db
   vercel postgres connect
   ```

4. **Deploy Schema:**
   ```bash
   psql < sql/schema.sql
   ```

### Testing Deployed API (T008b)
```bash
# Test score submission
curl -X POST https://quiz-app-xxx.vercel.app/api/scores \
  -H "Content-Type: application/json" \
  -d '{"name":"test","score":100}'

# Expected response:
# {"success":true,"id":1}
```

### Manual Steps Required
1. Run deployment commands above
2. Configure environment variables in Vercel dashboard
3. Test API endpoints
4. Proceed to T008c (create form component)

**Status:** Ready for manual deployment