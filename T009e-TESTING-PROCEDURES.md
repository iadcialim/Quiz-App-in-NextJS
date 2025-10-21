# T009e - Manual Testing Steps for Leaderboard

## Local Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Leaderboard Component
- Navigate to Results page after completing a quiz
- Verify leaderboard section appears below score submission form
- Check loading state displays "Loading leaderboard..."
- Verify error handling shows appropriate error messages

### 3. Test API Integration
```bash
# Test leaderboard endpoint locally
curl http://localhost:3000/api/leaderboard
```

## Online Testing

### 1. Test Deployed Leaderboard API
```bash
curl https://quiz-app-nextjs-69tz7wwh8-iads-projects-19c5d1fa.vercel.app/api/leaderboard
```

### 2. End-to-End Flow Testing
1. Complete a quiz on deployed app
2. Submit score using form
3. Verify leaderboard updates with new score
4. Check user highlighting works correctly
5. Verify top 20 scores display properly

## Expected Results

- **API Response**: JSON array of score objects with name, score, submitted_at
- **UI Display**: Ranked list (#1, #2, etc.) with names and scores
- **User Highlighting**: Current user entry highlighted in yellow
- **Error Handling**: Graceful fallback for API failures
- **Loading States**: Proper loading indicators during data fetch