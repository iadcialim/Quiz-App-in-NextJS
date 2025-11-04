# Manual Testing Guide - Enhanced Scoring System

## Overview
Test the enhanced scoring system with updated weights:
- **Bounce Weight**: 100 points per successful juggle
- **Drop Penalty Weight**: 10 points per dropped egg
- **Efficiency Penalty Weight**: 10 points per excess egg (above 5)

## Test Scenarios

### Scenario 1: Basic Quiz Completion
**Objective**: Verify quiz scoring formula works correctly

**Steps**:
1. Start the application: `npm run dev`
2. Select any subject (e.g., Math)
3. Complete 5 questions:
   - Answer 4 correctly
   - Answer 1 incorrectly
   - Try to complete in under 30 seconds
4. Check Results page

**Expected Results**:
- **Quiz Results section** shows:
  - Correct Answers: 4
  - Wrong Answers: 1
  - Quiz Score: ~600-800 points (depending on speed)
- **Points section** shows same Total Points as Quiz Score (if no egg game)

### Scenario 2: Egg Juggling Only
**Objective**: Test egg game scoring with new weights

**Steps**:
1. Start a quiz but focus only on egg juggling
2. Try to juggle 3 eggs successfully
3. Let 2 eggs drop
4. Complete quiz (answer questions randomly)
5. Check Results page

**Expected Egg Game Calculation**:
- Eggs Juggled: 3
- Eggs Dropped: 2
- Total Eggs: 5
- **Bounce Points**: 3 × 100 = 300
- **Drop Penalty**: 2 × 10 = 20
- **Efficiency Penalty**: (5-5) × 10 = 0
- **Game Score**: 300 - 20 - 0 = **280 points**

### Scenario 3: Combined Scoring
**Objective**: Test quiz + egg game combined scoring

**Steps**:
1. Complete a full quiz with moderate performance
2. Play egg juggling game simultaneously
3. Aim for: 5 correct answers, 2 wrong, 4 eggs juggled, 3 dropped
4. Check all three sections in Results

**Expected Results**:
- **Quiz Results**: Shows quiz-only metrics and score
- **Egg Juggling**: Shows egg game metrics and score  
- **Points**: Shows combined total of both scores

### Scenario 4: Efficiency Penalty Test
**Objective**: Verify efficiency penalty with excess eggs

**Steps**:
1. Start quiz and let many eggs spawn (>5 total)
2. Try to juggle 2 eggs, let 6 eggs drop
3. Complete quiz
4. Verify efficiency penalty calculation

**Expected Calculation**:
- Total Eggs: 2 + 6 = 8
- Excess Eggs: 8 - 5 = 3
- **Efficiency Penalty**: 3 × 10 = 30 points
- **Game Score**: (2×100) - (6×10) - 30 = 200 - 60 - 30 = **110 points**

## Verification Checklist

### ✅ Quiz Scoring
- [ ] Quiz score uses new formula (accuracy + speed bonus)
- [ ] Speed bonus decreases with longer completion time
- [ ] Perfect score gives maximum points
- [ ] Quiz Results section displays correctly

### ✅ Egg Game Scoring  
- [ ] Successful juggles worth 100 points each
- [ ] Dropped eggs penalty 10 points each
- [ ] Efficiency penalty 10 points per excess egg (above 5)
- [ ] Egg Juggling section shows: Juggled, Dropped, Produced, Game Score

### ✅ Combined Scoring
- [ ] Points section shows Total Points (quiz + egg game)
- [ ] Total Time Spent appears in Points section
- [ ] Score submission uses correct combined total
- [ ] Leaderboard saves the right total score

### ✅ UI/UX
- [ ] Three distinct sections: Quiz Results, Egg Juggling, Points
- [ ] Egg Juggling section only appears when game is played
- [ ] All values display as non-zero when activity occurs
- [ ] Console logs show correct metrics (check browser dev tools)

## Debug Information

**Browser Console Logs**:
Check for these debug messages:
```
Results - eggGameActive: true/false
Results - eggGameMetrics: {juggles: X, eggsDropped: Y, ...}
EggJugglingGame - gameState.score: X
EggJugglingGame - calculated metrics: {...}
```

**Common Issues**:
- If egg values show 0: Check console logs for game state
- If sections don't appear: Verify visibility conditions
- If scores seem wrong: Manually calculate using formulas above

## Success Criteria

✅ **All scenarios complete successfully**  
✅ **Calculations match expected formulas**  
✅ **UI displays three sections correctly**  
✅ **Score submission uses combined total**  
✅ **No console errors during testing**

---

**Task Status**: [ ] T035 Manual testing of enhanced scoring system with updated weights