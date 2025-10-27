# Research: Improved Scoring System with Enhanced Results Display

**Feature**: `feat-improve-scoring-v2`  
**Date**: 2025-10-27

## Research Summary

All technical requirements for this feature are comprehensively documented in the reference materials (`.specify/reference/improve-scoring-v2/`). No unknowns or clarifications needed.

## Key Technical Decisions

### 1. Scoring Logic Implementation Location

**Question**: Where should scoring calculation logic reside?

**Options Evaluated**:

1. Inline in Results.jsx component
2. Methods in Context providers (PointsContext/GameContext)
3. Dedicated utility module (`src/utils/scoring.js`)

**Decision**: Option 3 - Dedicated utility module

**Rationale**:

- **Separation of Concerns**: Business logic separated from UI presentation
- **Testability**: Pure functions easy to unit test with various inputs
- **Reusability**: Scoring functions can be imported anywhere needed
- **Maintainability**: Single source of truth for formulas, easy to update
- **Performance**: Can be optimized independently without UI concerns

**References**:

- React best practices: Separate business logic from components
- Constitutional principle: Single responsibility per module
- Test coverage requirement: >80% for business logic

---

### 2. Card Component Architecture

**Question**: Should we create separate card components or reuse existing pattern?

**Options Evaluated**:

1. Create `QuizScoreCard.jsx` and `GameScoreCard.jsx` components
2. Create generic `ScoreCard.jsx` with props
3. Keep cards as JSX in Results.jsx (current approach)

**Decision**: Option 3 - Keep cards in Results.jsx initially

**Rationale**:

- **YAGNI Principle**: Current card pattern works well, no duplication yet
- **Simplicity**: Fewer files, easier to understand flow
- **Flexibility**: Easier to iterate on layout without component API changes
- **Performance**: No unnecessary component overhead
- **Future-Proof**: Can refactor later if cards are needed elsewhere

**Implementation Note**: Use array mapping for card data to reduce repetition while keeping cards inline.

---

### 3. Metric Tracking in Context

**Question**: How should we track new metrics (eggs produced, juggles, etc.)?

**Options Evaluated**:

1. Create new `ScoringContext` for all metrics
2. Extend existing `GameContext` with new fields
3. Pass metrics via props (prop drilling)
4. Use global state management (Redux/Zustand)

**Decision**: Option 2 - Extend `GameContext`

**Rationale**:

- **Natural Extension**: GameContext already manages game state
- **Minimal Changes**: Leverages existing provider structure
- **Type Safety**: Can add proper TypeScript/PropTypes validation
- **Avoid Over-Engineering**: No need for additional context or library
- **Performance**: Context already optimized, no new subscriptions needed

**Implementation**:

```javascript
// Update GameContext.gameStats
setGameStats({
  eggsJuggled: number, // NEW: track bounces
  eggsDropped: number, // Existing
  eggsProduced: number, // NEW: total spawned
  totalInteractions: number,
  bonusMultiplier: number,
  timePlayed: number, // NEW: duration
});
```

---

### 4. Scoring Constants Management

**Question**: How should we manage scoring weights and thresholds?

**Options Evaluated**:

1. Hardcode in scoring functions
2. Environment variables
3. Configuration file (JSON/YAML)
4. Dedicated constants module

**Decision**: Option 4 - Dedicated constants module (`src/constants/scoring.js`)

**Rationale**:

- **Documentation**: Constants serve as self-documenting code
- **Maintainability**: Single place to update weights
- **Validation**: Easy to add validation/constraints
- **Type Safety**: Can export typed constants
- **Testing**: Easy to import same constants in tests

**Implementation**:

```javascript
export const SCORING_CONSTANTS = {
  QUIZ: {
    CORRECT_WEIGHT: 100,
    WRONG_PENALTY: 50,
    MAX_TIME_PER_QUESTION: 10, // seconds
    MAX_SPEED_BONUS: 500,
  },
  GAME: {
    BOUNCE_WEIGHT: 10,
    DROP_PENALTY: 200,
    EFFICIENCY_PENALTY: 100,
    IDEAL_MIN_EGGS: 5,
  },
};
```

---

### 5. Testing Strategy

**Question**: What testing approach should we follow?

**Options Evaluated**:

1. Implementation-first, then tests
2. Test-driven development (TDD)
3. Behavior-driven development (BDD)

**Decision**: Option 2 - Test-driven development

**Rationale**:

- **Formula Verification**: Reference materials provide exact examples to test against
- **Contract Tests**: Clear contracts define expected behavior upfront
- **Confidence**: Formulas are complex, tests ensure correctness before integration
- **Regression Prevention**: Tests catch formula changes immediately
- **Documentation**: Tests serve as executable examples

**Test Execution Order**:

1. Write contract tests (failing) for `computeQuizScore` and `computeGameScore`
2. Implement scoring utilities to make tests pass
3. Write component tests for Results layout
4. Write integration tests for end-to-end flow
5. Manual testing with quickstart scenarios

**Test Coverage Goals**:

- Scoring utilities: 100% (pure functions, easy to test)
- Components: 80%+ (UI rendering, user interactions)
- Integration: Key user flows from spec

---

## Formula Verification Examples

### Quiz Scoring Example (from reference)

**Input**:

- Correct: 8
- Wrong: 2
- Time Taken: 40 seconds
- Total Questions: 10

**Expected Calculation**:

1. Accuracy Score = (8 × 100) - (2 × 50) = 800 - 100 = **700**
2. Max Possible Time = 10 × 10 = 100 seconds
3. Time Saved = 100 - 40 = 60 seconds
4. Speed Factor = 60 / 100 = 0.6
5. Speed Bonus = 0.6 × 500 = **300**
6. **Final Score = 700 + 300 = 1000**

**Test**: `computeQuizScore({totalQuestions: 10, correct: 8, wrong: 2, timeTaken: 40})` → `{accuracyScore: 700, speedBonus: 300, finalScore: 1000, percentage: 80}`

### Game Scoring Example (from reference)

**Input**:

- Juggles: 200
- Drops: 1
- Eggs Introduced: 6

**Expected Calculation**:

1. Bounce Points = 200 × 10 = **2000**
2. Drop Penalty = 1 × 200 = **200**
3. Excess Eggs = 6 - 5 = 1
4. Efficiency Penalty = 1 × 100 = **100**
5. Total Penalty = 200 + 100 = **300**
6. **Final Score = 2000 - 300 = 1700**

**Test**: `computeGameScore({juggles: 200, drops: 1, eggsIntroduced: 6})` → `{bouncePoints: 2000, dropPenalty: 200, efficiencyPenalty: 100, totalPenalty: 300, finalScore: 1700}`

---

## Edge Cases Identified

### Quiz Scoring Edge Cases

1. **All Correct, Instant Completion**:

   - Input: 10 correct, 0 wrong, 0 seconds
   - Speed Factor = 100/100 = 1.0
   - Expected: Max speed bonus (500 points)

2. **Zero Correct**:

   - Input: 0 correct, 10 wrong
   - Accuracy Score = -500 (negative allowed)
   - Expected: Negative score possible

3. **Time Exceeded Maximum**:

   - Input: Time taken > max possible time
   - Time Saved = negative
   - Speed Factor = clamped to 0
   - Expected: No speed bonus (0 points)

4. **Division by Zero Protection**:
   - Input: 0 total questions
   - Expected: Return safe default or error

### Game Scoring Edge Cases

1. **No Drops, Exactly 5 Eggs**:

   - Ideal scenario, no penalties
   - Expected: Only bounce points counted

2. **More Drops Than Juggles**:

   - High penalty scenario
   - Expected: Negative final score allowed

3. **Zero Eggs Introduced**:

   - Edge case: game not played or error
   - Expected: Score = 0

4. **Massive Egg Count**:
   - Stress test: 1000 eggs
   - Expected: Large efficiency penalty applied

---

## Dependencies & Prerequisites

### Existing Code to Modify

1. **`src/components/Results.jsx`**:

   - Current: Shows legacy combined score display
   - Change: Split into Quiz Results and Game Results sections
   - Approach: Refactor card rendering, update title

2. **`src/context/PointsContext.js`**:

   - Current: Tracks basic quiz points and mini-game score
   - Change: Add methods to receive and store breakdown data
   - Approach: Add `quizBreakdown` and `gameBreakdown` state

3. **`src/context/GameContext.js`**:
   - Current: Tracks `eggsDropped`, basic score
   - Change: Add `eggsProduced` (total spawned), `eggsJuggled` (bounces)
   - Approach: Extend `gameStats` object

### New Code to Create

1. **`src/constants/scoring.js`**: Export all weights and constants
2. **`src/utils/scoring.js`**: Implement `computeQuizScore` and `computeGameScore`
3. **`src/utils/__tests__/scoring.test.js`**: Unit tests for formulas
4. **`tests/contract/scoring-utils.contract.test.js`**: Contract tests
5. **`tests/contract/results-display.contract.test.js`**: UI contract tests
6. **`tests/integration/scoring-integration.test.js`**: End-to-end flow

---

## Performance Considerations

### Calculation Performance

- **Target**: <100ms for all scoring calculations
- **Complexity**: O(1) - Simple arithmetic operations
- **Optimization**: Not needed initially, formulas are lightweight

### Rendering Performance

- **Target**: 60fps UI rendering
- **Concern**: 10 cards could cause reflows
- **Mitigation**:
  - Use React.memo for card components if extracted
  - Batch state updates in Context
  - Avoid inline function creation in render

### Memory

- **Footprint**: Minimal - small numeric values and objects
- **Concern**: None - client-side scoring, transient data

---

## Security & Validation

### Input Validation

**Required Validations**:

- All numeric inputs must be numbers (not NaN, null, undefined)
- Negative values allowed for scores, but validate source metrics
- Division by zero protection in percentage calculations
- Time values must be >= 0

**Validation Pattern**:

```javascript
function validateQuizMetrics(metrics) {
  const { totalQuestions, correct, wrong, timeTaken } = metrics;

  if (totalQuestions < 0 || correct < 0 || wrong < 0 || timeTaken < 0) {
    console.warn("Negative metric values detected", metrics);
  }

  if (correct + wrong > totalQuestions) {
    console.error("Correct + Wrong exceeds total questions");
  }

  return true; // Proceed with calculation
}
```

### Error Handling

- Try-catch around scoring calculations
- Graceful fallback to 0 if calculation fails
- Console warnings for edge cases (negative scores, time exceeded)
- No throw errors - show best effort results

---

## Research Conclusion

✅ **All technical questions resolved**  
✅ **Architecture decisions documented**  
✅ **Formula examples validated**  
✅ **Edge cases identified**  
✅ **Performance targets established**  
✅ **Security considerations addressed**

**Status**: Ready for Phase 1 (Design & Contracts)

---

_Research complete - No NEEDS CLARIFICATION markers remain_
