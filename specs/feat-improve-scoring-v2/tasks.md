# Tasks: Improved Scoring System with Enhanced Results Display

**Input**: Design documents from `/specs/feat-improve-scoring-v2/`
**Prerequisites**: plan.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → ✅ Found: Next.js 14.2.13, React 18, JavaScript ES6+, Jest 29.7.0
   → Extracted: Single project structure (src/, tests/)
2. Load optional design documents:
   → data-model.md: ✅ Found 5 entities (QuizMetrics, QuizScore, GameMetrics, GameScore, ScoringConstants)
   → contracts/: ✅ Found 2 contracts (scoring-utils.contract.js, results-display.contract.js)
   → research.md: ✅ Found 5 technical decisions
   → quickstart.md: ✅ Found 10 test scenarios
3. Generate tasks by category:
   → Setup: 1 task (constants module)
   → Tests: 5 tasks (2 contract tests + 3 integration tests)
   → Core: 2 tasks (scoring utilities implementation)
   → Integration: 3 tasks (context updates + Results component)
   → Polish: 2 tasks (manual testing + validation)
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → ✅ All contracts have tests
   → ✅ All entities have constants defined
   → ✅ All scoring functions implemented
   → ✅ All integration scenarios covered
9. Return: SUCCESS (13 tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single Next.js project**: `src/`, `tests/` at repository root
- All paths are absolute from project root
- Contract tests in `tests/contract/`
- Integration tests in `tests/integration/`

---

## Phase 3.1: Setup & Constants

- [ ] T001 Create scoring constants module in `src/constants/scoring.js`
  - **Description**: Define `SCORING_CONSTANTS` object with QUIZ and GAME properties
  - **Requirements**: Export frozen object with all weights from data-model.md
  - **Values**: QUIZ (CORRECT_WEIGHT: 100, WRONG_PENALTY: 50, MAX_TIME_PER_QUESTION: 10, MAX_SPEED_BONUS: 500), GAME (BOUNCE_WEIGHT: 10, DROP_PENALTY: 200, EFFICIENCY_PENALTY: 100, IDEAL_MIN_EGGS: 5)
  - **Validation**: Object.freeze() to ensure immutability
  - **File**: `src/constants/scoring.js` (NEW)
  - **Dependencies**: None

---

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T002 [P] Contract test for computeQuizScore in `tests/contract/scoring-utils.contract.test.js`
  - **Description**: Write 5 required tests for quiz scoring formula validation
  - **Test Cases**:
    1. Spec example: 8 correct, 2 wrong, 40s → {accuracyScore: 700, speedBonus: 300, finalScore: 1000, percentage: 80}
    2. Perfect speed run: 10 correct, 0 wrong, 0s → {accuracyScore: 1000, speedBonus: 500, finalScore: 1500, percentage: 100}
    3. Zero correct: 0 correct, 10 wrong → accuracyScore = -500 (negative allowed)
    4. Time exceeded: timeTaken > maxPossibleTime → speedBonus = 0
    5. Division by zero: totalQuestions = 0 → handle gracefully
  - **Expected**: All tests FAIL initially (functions not implemented)
  - **File**: `tests/contract/scoring-utils.contract.test.js` (NEW)
  - **Dependencies**: T001 (imports SCORING_CONSTANTS)

- [ ] T003 [P] Contract test for computeGameScore in `tests/contract/scoring-utils.contract.test.js`
  - **Description**: Write 5 required tests for game scoring formula validation
  - **Test Cases**:
    1. Spec example: 200 juggles, 1 drop, 6 eggs → {bouncePoints: 2000, dropPenalty: 200, efficiencyPenalty: 100, totalPenalty: 300, finalScore: 1700}
    2. Perfect efficiency: 50 juggles, 0 drops, 5 eggs → {bouncePoints: 500, dropPenalty: 0, efficiencyPenalty: 0, totalPenalty: 0, finalScore: 500}
    3. Exactly 5 eggs: eggsIntroduced = 5 → efficiencyPenalty = 0 (boundary test)
    4. High penalty: 10 juggles, 5 drops, 15 eggs → negative finalScore
    5. Zero activity: all metrics = 0 → all scores = 0
  - **Expected**: All tests FAIL initially (functions not implemented)
  - **File**: `tests/contract/scoring-utils.contract.test.js` (NEW)
  - **Dependencies**: T001 (imports SCORING_CONSTANTS)

- [ ] T004 [P] Contract test for Results component in `tests/contract/results-display.contract.test.js`
  - **Description**: Write 10 required tests for Results component UI validation
  - **Test Cases**:
    1. FR-001: Title is "Your Score" (not "Quiz Results")
    2. FR-002: Legacy text "You scored" / "out of" / "possible points" NOT present
    3. FR-003 & FR-004: Quiz Results section has exactly 5 cards with correct labels (Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points)
    4. FR-005 & FR-006: Egg Juggling section has exactly 5 cards with correct labels (Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points)
    5. FR-007: Egg Juggling section hidden when gameActive=false
    6. FR-014: Quiz Total Points displays quizBreakdown.finalScore
    7. FR-021: Game Total Points displays gameBreakdown.finalScore
    8. Responsive layout: Cards stack on mobile, grid on desktop
    9. Accessibility: Heading hierarchy (h2 → h3), ARIA labels
    10. Backward compatibility: Renders without errors when quizBreakdown/gameBreakdown missing
  - **Expected**: All tests FAIL initially (component not updated)
  - **File**: `tests/contract/results-display.contract.test.js` (NEW)
  - **Dependencies**: None (mocks component props)

- [ ] T005 [P] Integration test for perfect speed run scenario in `tests/integration/scoring-integration.test.js`
  - **Description**: Test scenario 1 from quickstart.md (10 correct, 0 wrong, <10s)
  - **Flow**: Quiz metrics → computeQuizScore → Results display
  - **Expected**: Quiz Total Points ≈ 1500, all 5 quiz cards display correct values
  - **File**: `tests/integration/scoring-integration.test.js` (NEW)
  - **Dependencies**: None (integration test, will fail until implementation)

- [ ] T006 [P] Integration test for mixed performance scenario in `tests/integration/scoring-integration.test.js`
  - **Description**: Test scenario 2 from quickstart.md (8 correct, 2 wrong, 40s) + scenario 3 (game with 200 juggles, 1 drop, 6 eggs)
  - **Flow**: Quiz + Game metrics → computeQuizScore + computeGameScore → Results display
  - **Expected**: Quiz Total = 1000, Game Total = 1700, both sections visible
  - **File**: `tests/integration/scoring-integration.test.js` (NEW)
  - **Dependencies**: None (integration test, will fail until implementation)

---

## Phase 3.3: Core Implementation (ONLY after tests are failing)

**DO NOT START until T002-T006 are complete and failing**

- [ ] T007 Implement computeQuizScore function in `src/utils/scoring.js`
  - **Description**: Create pure function implementing quiz scoring formula from contracts/scoring-utils.contract.js
  - **Formula**:
    - accuracyScore = (correct × 100) - (wrong × 50)
    - maxPossibleTime = totalQuestions × 10
    - timeSaved = maxPossibleTime - timeTaken
    - speedFactor = max(0, min(1, timeSaved / maxPossibleTime))
    - speedBonus = speedFactor × 500
    - finalScore = accuracyScore + speedBonus
    - percentage = (correct / totalQuestions) × 100
  - **Edge Cases**: Handle division by zero, negative scores, time exceeded
  - **Validation**: Input validation with clear error messages
  - **Expected**: Makes T002 tests PASS (green)
  - **File**: `src/utils/scoring.js` (NEW)
  - **Dependencies**: T001 (imports SCORING_CONSTANTS), T002 (tests must exist)

- [ ] T008 Implement computeGameScore function in `src/utils/scoring.js`
  - **Description**: Create pure function implementing game scoring formula from contracts/scoring-utils.contract.js
  - **Formula**:
    - bouncePoints = juggles × 10
    - dropPenalty = drops × 200
    - excessEggs = max(0, eggsIntroduced - 5)
    - efficiencyPenalty = excessEggs × 100
    - totalPenalty = dropPenalty + efficiencyPenalty
    - finalScore = bouncePoints - totalPenalty
  - **Edge Cases**: Handle zero activity, negative final scores
  - **Validation**: Input validation with clear error messages
  - **Expected**: Makes T003 tests PASS (green)
  - **File**: `src/utils/scoring.js` (UPDATE - same file as T007)
  - **Dependencies**: T001 (imports SCORING_CONSTANTS), T003 (tests must exist), T007 (sequential - same file)

---

## Phase 3.4: Integration - Context & Component Updates

- [ ] T009 [P] Update PointsContext in `src/context/PointsContext.js`
  - **Description**: Add quizBreakdown and gameBreakdown state, create updateScoring method
  - **New State**:
    - quizBreakdown: QuizScore | null
    - gameBreakdown: GameScore | null
  - **New Methods**:
    - setQuizBreakdown(breakdown: QuizScore): void
    - setGameBreakdown(breakdown: GameScore): void
    - updateScoring(quizBreakdown, gameBreakdown): void (replaces updateTotalScore)
  - **Backward Compatibility**: Keep existing points, miniGameScore, bonusMultiplier
  - **File**: `src/context/PointsContext.js` (UPDATE)
  - **Dependencies**: T007, T008 (scoring utilities must exist to generate breakdown objects)

- [ ] T010 [P] Update GameContext in `src/context/GameContext.js`
  - **Description**: Add eggsProduced and timePlayed to gameStats
  - **New Fields in gameStats**:
    - eggsProduced: number (total eggs spawned)
    - timePlayed: number (game duration in seconds)
  - **Note**: Existing updateGameStats already supports new fields via spread operator
  - **Validation**: Ensure new metrics tracked in EggJugglingGame component
  - **File**: `src/context/GameContext.js` (UPDATE)
  - **Dependencies**: None (data structure update only)

- [ ] T011 Refactor Results component in `src/components/Results.jsx`
  - **Description**: Implement new card-based layout with separate Quiz Results and Egg Juggling sections per contracts/results-display.contract.js
  - **Changes**:
    1. FR-001: Change title to "Your Score" (remove "Quiz Results")
    2. FR-002: Remove legacy text "You scored X out of Y possible points"
    3. FR-003 & FR-004: Create Quiz Results section with 5 cards (Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points)
    4. FR-005 & FR-006: Create Egg Juggling section with 5 cards (Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points)
    5. FR-007: Conditionally render Egg Juggling section based on gameActive prop
    6. Add new props: quizBreakdown, gameBreakdown, gameMetrics, gameActive
    7. Use quizBreakdown.finalScore for Quiz Total Points card
    8. Use gameBreakdown.finalScore for Game Total Points card
    9. Display gameMetrics values in game cards
  - **Styling**: Tailwind grid (grid-cols-1 sm:grid-cols-2 md:grid-cols-3), responsive layout
  - **Icons**: Use react-icons (FaCheckCircle, FaTimesCircle, FaPercentage, FaClock, FaTrophy)
  - **Expected**: Makes T004 tests PASS (green)
  - **File**: `src/components/Results.jsx` (UPDATE)
  - **Dependencies**: T004 (tests must exist), T009 (PointsContext provides breakdown data), T010 (GameContext provides metrics)

---

## Phase 3.5: Polish & Validation

- [ ] T012 [P] Add unit tests for scoring utilities in `src/utils/__tests__/scoring.test.js`
  - **Description**: Additional edge case tests beyond contract tests
  - **Test Cases**:
    - Boundary values (0, max values)
    - Invalid inputs (negative numbers, non-numbers, null, undefined)
    - Rounding behavior
    - Large numbers (overflow protection)
    - Performance (<100ms for calculation)
  - **Coverage Goal**: >80% for scoring.js
  - **File**: `src/utils/__tests__/scoring.test.js` (NEW)
  - **Dependencies**: T007, T008 (implementation complete)

- [ ] T013 Manual testing using quickstart.md scenarios
  - **Description**: Execute all 10 test scenarios from quickstart.md manually
  - **Scenarios**:
    1. Perfect speed run (10 correct, 0 wrong, <10s) → verify 1500 points
    2. Mixed performance (8 correct, 2 wrong, 40s) → verify 1000 points
    3. Egg juggling master (200 juggles, 1 drop, 6 eggs) → verify 1700 points
    4. Perfect efficiency (5 eggs, 0 drops) → verify no penalties
    5. No game played → verify game section hidden
    6. Zero correct answers → verify negative score displayed
    7. Time exceeded → verify 0 speed bonus
    8. High penalties → verify negative game score
    9. Combined quiz + game → verify both sections display
    10. Responsive layout → test mobile, tablet, desktop viewports
  - **Validation Checklist** (from quickstart.md):
    - [ ] FR-001: Title is "Your Score"
    - [ ] FR-002: Legacy text removed
    - [ ] FR-003: Quiz section has 5 cards
    - [ ] FR-004: Quiz cards show correct labels and values
    - [ ] FR-005: Game section has 5 cards
    - [ ] FR-006: Game cards show correct labels and values
    - [ ] FR-007: Game section hidden when not active
    - [ ] FR-008-013: Quiz formulas correct
    - [ ] FR-015-020: Game formulas correct
    - [ ] FR-022-026: All metrics displayed correctly
    - [ ] Performance: <100ms scoring calculations
    - [ ] Test coverage: >80%
    - [ ] No console errors/warnings
    - [ ] Accessibility: WCAG compliant, keyboard navigation
  - **File**: Follow steps in `specs/feat-improve-scoring-v2/quickstart.md`
  - **Dependencies**: T011 (Results component complete), all implementation tasks done

---

## Dependencies

```
Dependency Graph:

T001 (Constants)
  ↓
T002, T003, T004 [P] (Contract Tests - all parallel, different test files)
  ↓
T005, T006 [P] (Integration Tests - parallel, same file but independent scenarios)
  ↓
T007 (computeQuizScore implementation)
  ↓
T008 (computeGameScore implementation - sequential with T007, same file)
  ↓
T009, T010 [P] (Context updates - parallel, different files)
  ↓
T011 (Results component refactor - depends on T009, T010)
  ↓
T012 [P] (Unit tests - can run while T013 executes)
T013 (Manual testing)
```

**Critical Path**: T001 → T002 → T007 → T008 → T009 → T011 → T013

**Parallel Opportunities**:
- T002, T003, T004 can run simultaneously (different test files)
- T005, T006 can run simultaneously (same file, independent tests)
- T009, T010 can run simultaneously (different context files)
- T012 can run while T013 executes (independent validation)

---

## Parallel Execution Example

### Phase 3.2 - Contract Tests (All Parallel)
```bash
# Launch T002-T004 together (different test files):
Task T002: "Contract test computeQuizScore in tests/contract/scoring-utils.contract.test.js"
Task T003: "Contract test computeGameScore in tests/contract/scoring-utils.contract.test.js"
Task T004: "Contract test Results component in tests/contract/results-display.contract.test.js"

# Then launch T005-T006 together:
Task T005: "Integration test perfect speed run in tests/integration/scoring-integration.test.js"
Task T006: "Integration test mixed performance in tests/integration/scoring-integration.test.js"
```

### Phase 3.4 - Context Updates (Parallel)
```bash
# Launch T009-T010 together (different context files):
Task T009: "Update PointsContext in src/context/PointsContext.js"
Task T010: "Update GameContext in src/context/GameContext.js"
```

### Phase 3.5 - Final Validation (Parallel)
```bash
# Launch T012-T013 together (independent activities):
Task T012: "Unit tests in src/utils/__tests__/scoring.test.js"
Task T013: "Manual testing using quickstart.md"
```

---

## Notes

- **[P] tasks**: Different files, no dependencies - safe to execute in parallel
- **Sequential tasks**: T007 → T008 (same file), T009+T010 → T011 (component depends on contexts)
- **TDD Approach**: All tests (T002-T006) MUST be written and failing before implementation (T007-T011)
- **Commit Strategy**: Commit after each task completion for clean git history
- **Performance Target**: <100ms for all scoring calculations (validate in T012, T013)
- **Coverage Target**: >80% for src/utils/scoring.js (validate in T012)
- **Backward Compatibility**: Maintain existing props in Results component, PointsContext (validate in T004, T013)

---

## Task Generation Rules Applied

✅ **From Contracts**:
- contracts/scoring-utils.contract.js → T002 (computeQuizScore tests), T003 (computeGameScore tests), T007 (computeQuizScore impl), T008 (computeGameScore impl)
- contracts/results-display.contract.js → T004 (Results component tests), T011 (Results component impl)

✅ **From Data Model**:
- ScoringConstants entity → T001 (constants module)
- QuizMetrics, QuizScore, GameMetrics, GameScore → T007, T008 (input/output types for functions)

✅ **From User Stories**:
- Acceptance scenario 1 (perfect speed) → T005
- Acceptance scenarios 2-3 (mixed + game) → T006
- All 10 quickstart scenarios → T013 (manual validation)

✅ **Ordering**:
- Setup (T001) → Tests (T002-T006) → Implementation (T007-T008) → Integration (T009-T011) → Polish (T012-T013)
- Dependencies enforced: Tests before impl, contexts before component, all impl before manual testing

---

## Validation Checklist

**GATE: Verified before task execution**

- [x] All contracts have corresponding tests (T002, T003, T004)
- [x] All entities have implementation tasks (T001 for constants, T007-T008 for functions)
- [x] All tests come before implementation (T002-T006 before T007-T011)
- [x] Parallel tasks truly independent (different files or independent test cases)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task (except T005/T006 which are independent test cases)
- [x] Test coverage >80% planned (T012)
- [x] Manual testing scenario included (T013)
- [x] Performance validation included (<100ms in T012, T013)
- [x] All 26 functional requirements mapped to tasks:
  - FR-001 to FR-007: T004, T011 (Results component)
  - FR-008 to FR-014: T002, T007 (Quiz scoring)
  - FR-015 to FR-021: T003, T008 (Game scoring)
  - FR-022 to FR-026: T011 (Results data display)

---

**Status**: ✅ 13 tasks generated, dependency-ordered, ready for execution

**Estimated Completion**: 
- Phase 3.1: 0.5 hours
- Phase 3.2: 2 hours (5 test tasks)
- Phase 3.3: 2 hours (2 implementation tasks)
- Phase 3.4: 3 hours (3 integration tasks)
- Phase 3.5: 2 hours (validation)
- **Total**: ~9.5 hours

**Next Step**: Begin with T001 (Create constants module)
