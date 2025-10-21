# T012a - End-to-End Testing Procedures

## Local Testing (Development Environment)

### 1. Start Development Server
```bash
npm run dev
```

### 2. Complete Quiz Flow
1. Navigate to `http://localhost:3000`
2. Select a quiz subject
3. Complete the quiz (answer questions)
4. Reach the Results page

### 3. Test Score Submission & Leaderboard Integration
1. **Verify Initial State:**
   - Score submission form appears in right panel
   - Leaderboard appears below submission form
   - Leaderboard shows "Loading leaderboard..." initially

2. **Test Score Submission:**
   - Enter a name in the submission form
   - Click "Submit Score"
   - Verify form disappears after successful submission
   - Check that leaderboard refreshes automatically

3. **Test User Highlighting:**
   - Verify submitted user appears in leaderboard
   - Confirm submitted user entry is highlighted in bold/yellow
   - Check ranking position is correct

### 4. Test Error Scenarios
1. **Network Errors:**
   - Disconnect internet during submission
   - Verify error message displays
   - Reconnect and retry submission

2. **Invalid Data:**
   - Submit empty name (should be disabled)
   - Test with special characters in name

## Online Testing (Production Environment)

### 1. Access Deployed Application
- URL: `https://quiz-app-nextjs-69tz7wwh8-iads-projects-19c5d1fa.vercel.app`

### 2. Complete End-to-End Flow
1. **Quiz Completion:**
   - Select subject and complete quiz
   - Navigate to Results page
   - Verify all quiz statistics display correctly

2. **Score Submission:**
   - Enter unique name for testing
   - Submit score successfully
   - Verify form disappears

3. **Leaderboard Verification:**
   - Confirm leaderboard updates with new score
   - Verify user highlighting works
   - Check top 20 scores display properly
   - Verify scores are sorted correctly (highest first)

### 3. Multi-User Testing
1. Complete multiple quiz sessions with different names
2. Verify leaderboard updates correctly
3. Test user highlighting with different submitted names
4. Confirm ranking order is maintained

## API Testing

### 1. Test Score Submission Endpoint
```bash
curl -X POST https://quiz-app-nextjs-69tz7wwh8-iads-projects-19c5d1fa.vercel.app/api/scores \
  -H "Content-Type: application/json" \
  -d '{"name":"TestUser","score":85}'
```

### 2. Test Leaderboard Endpoint
```bash
curl https://quiz-app-nextjs-69tz7wwh8-iads-projects-19c5d1fa.vercel.app/api/leaderboard
```

## Expected Results

### Score Submission
- ✅ Form validates name input (non-empty)
- ✅ Successful submission hides form
- ✅ Error handling displays appropriate messages
- ✅ Loading states show during submission

### Leaderboard Integration
- ✅ Displays top 20 scores in descending order
- ✅ Shows rank, name, and score for each entry
- ✅ Highlights current user in yellow/bold
- ✅ Refreshes automatically after score submission
- ✅ Handles loading and error states gracefully

### Responsive Design
- ✅ Two-panel layout on desktop (results left, submission/leaderboard right)
- ✅ Stacked layout on mobile devices
- ✅ Proper spacing and alignment maintained
- ✅ All interactive elements accessible

## Performance Validation
- ✅ Page loads within 2 seconds
- ✅ API responses within 1 second
- ✅ Smooth transitions between states
- ✅ No memory leaks or console errors