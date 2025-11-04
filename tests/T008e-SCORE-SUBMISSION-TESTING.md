# T008e: Score Submission Testing Procedures

## Local Testing

### Prerequisites
- Development server running: `npm run dev`
- Database connection configured in `.env.local`

### Test Steps
1. Complete a quiz (any subject)
2. Navigate to Results page
3. Enter name in submission form
4. Click "Submit Score"
5. Verify success message appears
6. Check database for new entry

### Expected Results
- Form validates name input (min 2 characters)
- Success message displays after submission
- Score appears in database with timestamp
- Form resets after successful submission

## Online Testing

### Prerequisites  
- Application deployed to production
- Database schema deployed
- Environment variables configured

### Test Steps
1. Visit production URL
2. Complete quiz workflow
3. Submit score with valid name
4. Verify submission success
5. Check leaderboard updates

### API Testing
```bash
# Test score submission endpoint
curl -X POST https://[production-url]/api/scores \
  -H "Content-Type: application/json" \
  -d '{"name":"TestUser","score":85,"subject":"javascript","totalQuestions":10,"correctAnswers":8,"timeSpent":120}'

# Expected: 201 status with success message
```

## Error Cases
- Empty name: Should show validation error
- Invalid score: Should reject submission
- Network failure: Should show retry option
- Database error: Should show graceful error message

## Verification Checklist
- [ ] Local submission works
- [ ] Production submission works
- [ ] Validation errors display correctly
- [ ] Success feedback is clear
- [ ] Database entries are correct