# Quickstart: Improved Scoring System Testing Guide

**Feature**: `feat-improve-scoring-v2`  
**Date**: 2025-10-27  
**Purpose**: Manual testing scenarios to validate the improved scoring system

## Prerequisites

Before starting manual testing:

- [ ] All contract tests passing (`npm test -- contract`)
- [ ] Scoring utilities implemented (`src/utils/scoring.js`)
- [ ] Results component updated (`src/components/Results.jsx`)
- [ ] Contexts updated (`PointsContext.js`, `GameContext.js`)
- [ ] Development server running (`npm run dev`)

## Test Scenarios

### Scenario 1: Perfect Speed Run ⚡

**Objective**: Verify maximum speed bonus is awarded for instant completion

**Steps**:
1. Navigate to any quiz subject
2. Answer all 10 questions correctly as fast as possible (< 10 seconds total)
3. View Results page

**Expected Results**:
- ✅ Title shows "Your Score" (not "Quiz Results")
- ✅ Legacy text "You scored X out of Y possible points" is REMOVED
- ✅ Quiz Results section displays:
  - Correct Answers: 10
  - Wrong Answers: 0
  - Percentage: 100%
  - Total Time Spent: < 10s
  - Total Points: ~1500 (1000 accuracy + 500 speed bonus)
- ✅ Quiz Total Points is approximately: (10 × 100) + (500 speed bonus) = 1500

**Formula Verification**:
- Accuracy Score = (10 × 100) - (0 × 50) = 1000
- Max Possible Time = 10 × 10 = 100 seconds
- Time Saved = 100 - (your time)
- Speed Factor = Time Saved / 100
- Speed Bonus = Speed Factor × 500 (max 500)
- Final Score = 1000 + Speed Bonus

---

### Scenario 2: Mixed Performance Quiz 📊

**Objective**: Verify formula from specification example (8 correct, 2 wrong, 40s)

**Steps**:
1. Navigate to any quiz subject
2. Answer 8 questions correctly, 2 incorrectly
3. Take approximately 40 seconds total
4. View Results page

**Expected Results**:
- ✅ Quiz Results section displays:
  - Correct Answers: 8
  - Wrong Answers: 2
  - Percentage: 80%
  - Total Time Spent: ~40s
  - Total Points: 1000
- ✅ Breakdown matches spec example:
  - Accuracy Score: 700 = (8 × 100) - (2 × 50)
  - Speed Bonus: 300 = (60/100) × 500
  - Final Score: 1000 = 700 + 300

**Formula Verification**:
- Accuracy Score = (8 × 100) - (2 × 50) = 800 - 100 = 700 ✓
- Max Possible Time = 10 × 10 = 100 seconds
- Time Saved = 100 - 40 = 60 seconds
- Speed Factor = 60 / 100 = 0.6
- Speed Bonus = 0.6 × 500 = 300 ✓
- Final Score = 700 + 300 = 1000 ✓

---

### Scenario 3: Egg Juggling Master 🥚

**Objective**: Verify game scoring formula from specification (200 juggles, 1 drop, 6 eggs)

**Steps**:
1. Navigate to any quiz subject
2. Enable mini-game before starting quiz
3. During quiz, juggle eggs actively
4. Try to achieve: ~200 juggles, ~1 drop, ~6 eggs total
5. Complete quiz and view Results page

**Expected Results**:
- ✅ Quiz Results section displayed (as before)
- ✅ Egg Juggling section displayed (separate section)
- ✅ Egg Juggling section shows:
  - Eggs Dropped: 1
  - Eggs Produced: 6
  - Egg Juggles: 200
  - Total Time Spent: (game duration)
  - Total Points: 1700
- ✅ Breakdown matches spec example:
  - Bounce Points: 2000 = 200 × 10
  - Drop Penalty: -200 = 1 × 200
  - Efficiency Penalty: -100 = (6-5) × 100
  - Final Score: 1700 = 2000 - 200 - 100

**Formula Verification**:
- Bounce Points = 200 × 10 = 2000 ✓
- Drop Penalty = 1 × 200 = 200
- Excess Eggs = 6 - 5 = 1
- Efficiency Penalty = 1 × 100 = 100
- Total Penalty = 200 + 100 = 300
- Final Score = 2000 - 300 = 1700 ✓

---

### Scenario 4: Perfect Efficiency (No Penalties) ⭐

**Objective**: Verify no efficiency penalty when exactly 5 eggs used

**Steps**:
1. Navigate to quiz
2. Enable mini-game
3. Configure game settings: 5 eggs exactly
4. Juggle all eggs without dropping any
5. View Results page

**Expected Results**:
- ✅ Egg Juggling section shows:
  - Eggs Dropped: 0
  - Eggs Produced: 5
  - Egg Juggles: (your count)
  - Total Points: (juggles × 10) with NO penalties

**Formula Verification**:
- Bounce Points = (your juggles) × 10
- Drop Penalty = 0 × 200 = 0
- Excess Eggs = max(0, 5 - 5) = 0
- Efficiency Penalty = 0 × 100 = 0
- Total Penalty = 0 + 0 = 0
- Final Score = Bounce Points - 0 = Bounce Points ✓

---

### Scenario 5: No Game Played 🚫

**Objective**: Verify Egg Juggling section is hidden when game not active

**Steps**:
1. Navigate to quiz
2. **Disable mini-game** in settings (or don't enable it)
3. Complete quiz normally
4. View Results page

**Expected Results**:
- ✅ Title shows "Your Score"
- ✅ Quiz Results section displayed with 5 cards
- ✅ Egg Juggling section is **NOT displayed** (hidden)
- ✅ Only Quiz Results visible
- ✅ No errors or warnings in console

**Verification**:
- Inspect DOM: No element with "Egg Juggling" text
- gameActive prop should be false
- Conditional rendering working correctly

---

### Scenario 6: Zero Correct Answers (Edge Case) ⚠️

**Objective**: Verify negative accuracy score is handled correctly

**Steps**:
1. Navigate to quiz
2. Answer all 10 questions incorrectly
3. View Results page

**Expected Results**:
- ✅ Quiz Results section displays:
  - Correct Answers: 0
  - Wrong Answers: 10
  - Percentage: 0%
  - Total Points: -500 (negative score allowed)
- ✅ Negative score displayed clearly (not hidden)
- ✅ UI handles negative values without breaking

**Formula Verification**:
- Accuracy Score = (0 × 100) - (10 × 50) = -500 ✓
- Speed Bonus = (depends on time)
- Final Score = -500 + Speed Bonus (likely still negative)

---

### Scenario 7: Time Exceeded Maximum ⏰

**Objective**: Verify no speed bonus when time exceeds max

**Steps**:
1. Navigate to quiz
2. Take longer than 100 seconds (10 questions × 10s each)
3. View Results page

**Expected Results**:
- ✅ Quiz Results section displays:
  - Total Time Spent: > 100s
  - Total Points: (accuracy score only, no speed bonus)
- ✅ Speed Bonus = 0 (time saved is negative, clamped to 0)

**Formula Verification**:
- Max Possible Time = 10 × 10 = 100 seconds
- Time Taken = (your time, e.g., 150s)
- Time Saved = 100 - 150 = -50 (negative)
- Speed Factor = max(0, -50/100) = 0
- Speed Bonus = 0 × 500 = 0 ✓

---

### Scenario 8: High Penalty Game 💀

**Objective**: Verify negative game score when penalties exceed points

**Steps**:
1. Navigate to quiz with mini-game enabled
2. During game, drop many eggs (e.g., 5+ drops)
3. Use many eggs (e.g., 15+ eggs spawned)
4. Juggle minimally (e.g., < 10 juggles)
5. View Results page

**Expected Results**:
- ✅ Egg Juggling section shows:
  - High Eggs Dropped count (5+)
  - High Eggs Produced count (15+)
  - Low Egg Juggles count (< 10)
  - Total Points: NEGATIVE value
- ✅ Negative score displayed correctly

**Formula Verification**:
- Bounce Points = (low juggles) × 10
- Drop Penalty = (high drops) × 200 = large penalty
- Efficiency Penalty = (excess eggs) × 100 = large penalty
- Final Score = Bounce Points - Large Penalties = NEGATIVE ✓

---

### Scenario 9: Combined Quiz & Game ✅

**Objective**: Verify both sections display correctly together

**Steps**:
1. Navigate to quiz with mini-game enabled
2. Complete quiz with mixed performance (e.g., 8/10 correct)
3. Play mini-game with moderate performance
4. View Results page

**Expected Results**:
- ✅ Both sections visible side-by-side (or stacked on mobile)
- ✅ Quiz Results shows 5 cards with quiz metrics
- ✅ Egg Juggling shows 5 cards with game metrics
- ✅ Each section has correct title
- ✅ Total points calculated independently for each
- ✅ No overlap or confusion between sections

---

### Scenario 10: Responsive Layout 📱💻

**Objective**: Verify responsive design on different screen sizes

**Steps**:
1. Complete a quiz with mini-game
2. View Results on desktop (wide viewport)
3. Resize browser to tablet size
4. Resize browser to mobile size

**Expected Results Desktop** (> 768px):
- ✅ Cards display in 3-column grid
- ✅ Both sections visible side-by-side or vertically
- ✅ All cards readable, not cramped

**Expected Results Tablet** (480-768px):
- ✅ Cards display in 2-column grid
- ✅ Sections stack vertically if needed
- ✅ Cards maintain readable size

**Expected Results Mobile** (< 480px):
- ✅ Cards display in 1-column (stacked)
- ✅ All text readable without horizontal scroll
- ✅ Icons and values clearly visible

---

## Verification Checklist

After running all scenarios, verify:

### UI Requirements
- [ ] FR-001: Title is "Your Score" (not "Quiz Results")
- [ ] FR-002: Legacy text "You scored X out of Y possible points" removed
- [ ] FR-003: Quiz Results section has exactly 5 cards
- [ ] FR-004: Quiz cards show: Correct, Wrong, %, Time, Points
- [ ] FR-005: Egg Juggling section has exactly 5 cards
- [ ] FR-006: Game cards show: Drops, Produced, Juggles, Time, Points
- [ ] FR-007: Game section hidden when game not active

### Quiz Scoring Formula
- [ ] FR-008: Accuracy = (Correct × 100) - (Wrong × 50) ✓
- [ ] FR-009: Max Time = Questions × 10 seconds ✓
- [ ] FR-010: Time Saved calculated correctly ✓
- [ ] FR-011: Speed Factor clamped [0, 1] ✓
- [ ] FR-012: Speed Bonus = Factor × 500 ✓
- [ ] FR-013: Final = Accuracy + Speed Bonus ✓
- [ ] FR-014: Quiz Total Points displayed ✓

### Game Scoring Formula
- [ ] FR-015: Bounce Points = Juggles × 10 ✓
- [ ] FR-016: Drop Penalty = Drops × 200 ✓
- [ ] FR-017: Excess Eggs = max(0, Introduced - 5) ✓
- [ ] FR-018: Efficiency Penalty = Excess × 100 ✓
- [ ] FR-019: Total Penalty = Drop + Efficiency ✓
- [ ] FR-020: Final = Bounce - Penalty ✓
- [ ] FR-021: Game Total Points displayed ✓

### Data Display
- [ ] FR-022: Percentage = (Correct / Total) × 100 ✓
- [ ] FR-023: Time displayed in both sections ✓
- [ ] FR-024: Eggs Dropped tracked and shown ✓
- [ ] FR-025: Eggs Produced tracked and shown ✓
- [ ] FR-026: Egg Juggles tracked and shown ✓

### Edge Cases
- [ ] Perfect speed run (all correct, instant) works
- [ ] Zero correct (negative score) displays correctly
- [ ] Time exceeded (no speed bonus) works
- [ ] Exactly 5 eggs (no efficiency penalty) works
- [ ] Negative game score displays correctly
- [ ] No game played (section hidden) works

### Performance
- [ ] Scoring calculations < 100ms
- [ ] UI renders smoothly at 60fps
- [ ] No console errors or warnings
- [ ] Responsive on all screen sizes

---

## Debugging Tips

### If scores don't match formulas:

1. **Check console logs** for calculation warnings
2. **Inspect props** in React DevTools
3. **Verify constants** in `src/constants/scoring.js`
4. **Review formulas** in `src/utils/scoring.js`
5. **Run unit tests**: `npm test -- scoring.test.js`

### If sections don't display correctly:

1. **Check gameActive prop** (should be boolean)
2. **Inspect conditional rendering** in Results.jsx
3. **Verify CSS classes** for responsive grid
4. **Check for React errors** in console

### If metrics are wrong:

1. **Verify GameContext** is tracking juggles/drops/produced
2. **Check PointsContext** has correct breakdowns
3. **Inspect data flow** from game → context → Results
4. **Review integration tests**

---

## Success Criteria

All scenarios pass ✅ when:

1. All formulas match specification examples exactly
2. UI displays both sections correctly
3. Legacy text is completely removed
4. Edge cases handled gracefully (negative scores, no game, etc.)
5. Responsive layout works on all screen sizes
6. No console errors or warnings
7. Performance targets met (<100ms calculations, 60fps rendering)

---

**Manual Testing Complete**: ✅ All scenarios passed
**Date Completed**: _____________
**Tested By**: _____________
**Notes**: _____________

---

_Quickstart ready for manual validation after implementation_
