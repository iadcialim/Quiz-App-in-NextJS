# Tasks: Improve Quiz Results Scoring v3

**Input**: Design documents from `/specs/feat-improve-scoring/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → Tech stack: Next.js 14.2.13, React 18, Jest 29.7.0
   → Structure: Web application (src/ components, utils, context)
2. Load optional design documents:
   → data-model.md: QuizMetrics, EggGameMetrics, QuizScore, EggGameScore
   → contracts/: scoring-utilities.contract.js, results-component.contract.js
   → research.md: Component enhancement approach, utility separation
3. Generate tasks by category:
   → Setup: linting validation, test environment
   → Tests: contract tests for scoring utilities and Results component
   → Core: scoring utility functions, Results component enhancement
   → Integration: PointsContext updates, end-to-end flow
   → Polish: edge case tests, performance validation
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Setup

- [x] T001 Verify ESLint configuration for new utility functions
- [x] T002 [P] Validate Jest test environment for contract tests
- [x] T003 [P] Create test data fixtures for scoring calculations

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [x] T004 [P] Contract test for computeQuizScore in specs/feat-improve-scoring/contracts/scoring-utilities.contract.js
- [x] T005 [P] Contract test for computeEggGameScore in specs/feat-improve-scoring/contracts/scoring-utilities.contract.js
- [x] T006 [P] Contract test for Results component UI in specs/feat-improve-scoring/contracts/results-component.contract.js
- [x] T007 [P] Integration test for quiz completion flow in tests/integration/scoring-integration.test.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [x] T008 [P] Create computeQuizScore utility function in src/utils/quizScoring.js
- [x] T009 [P] Create computeEggGameScore utility function in src/utils/eggGameScoring.js
- [x] T010 Create ResultCard component in src/components/ResultCard.jsx
- [x] T011 Create ResultSection component in src/components/ResultSection.jsx
- [x] T012 Enhance Results component with new scoring sections in src/components/Results.jsx
- [x] T013 Update PointsContext with new scoring integration in src/context/PointsContext.js

## Phase 3.4: Integration

- [x] T014 Wire quiz scoring calculation into PointsContext
- [x] T015 Wire egg game scoring calculation into PointsContext
- [x] T016 Update Results component to use enhanced PointsContext data
- [x] T017 Implement conditional rendering for Egg Juggling section
- [x] T018 Add input validation and error handling for scoring functions

## Phase 3.5: Polish

- [ ] T019 [P] Unit tests for edge cases in tests/unit/quizScoring.test.js
- [ ] T020 [P] Unit tests for edge cases in tests/unit/eggGameScoring.test.js
- [ ] T021 [P] Component tests for ResultCard in tests/components/ResultCard.test.js
- [ ] T022 [P] Component tests for ResultSection in tests/components/ResultSection.test.js
- [ ] T023 [P] Enhanced Results component tests in tests/components/Results.test.js
- [ ] T024 Performance validation for scoring calculations
- [ ] T025 Manual testing using quickstart.md validation steps
- [ ] T026 Remove legacy scoring text and update page title

## Dependencies

- Tests (T004-T007) before implementation (T008-T013)
- T008, T009 block T014, T015
- T010, T011 block T012
- T012, T013 block T016, T017
- Implementation before polish (T019-T026)

## Parallel Example

```
# Launch T004-T007 together (contract tests):
Task: "Contract test for computeQuizScore in specs/feat-improve-scoring/contracts/scoring-utilities.contract.js"
Task: "Contract test for computeEggGameScore in specs/feat-improve-scoring/contracts/scoring-utilities.contract.js"
Task: "Contract test for Results component UI in specs/feat-improve-scoring/contracts/results-component.contract.js"
Task: "Integration test for quiz completion flow in tests/integration/scoring-integration.test.js"

# Launch T008-T009 together (utility functions):
Task: "Create computeQuizScore utility function in src/utils/quizScoring.js"
Task: "Create computeEggGameScore utility function in src/utils/eggGameScoring.js"

# Launch T019-T023 together (polish tests):
Task: "Unit tests for edge cases in tests/unit/quizScoring.test.js"
Task: "Unit tests for edge cases in tests/unit/eggGameScoring.test.js"
Task: "Component tests for ResultCard in tests/components/ResultCard.test.js"
Task: "Component tests for ResultSection in tests/components/ResultSection.test.js"
Task: "Enhanced Results component tests in tests/components/Results.test.js"
```

## Detailed Task Specifications

### T004: Contract Test for computeQuizScore

**File**: `specs/feat-improve-scoring/contracts/scoring-utilities.contract.js`
**Requirements**:

- Test reference example: 8 correct, 2 wrong, 40 seconds, 10 questions → 1000 points
- Validate accuracy score: (8×100) - (2×50) = 700
- Validate speed bonus: ((100-40)/100) × 500 = 300
- Test edge cases: zero correct, perfect score, time exceeded
- Validate input parameter validation

### T005: Contract Test for computeEggGameScore

**File**: `specs/feat-improve-scoring/contracts/scoring-utilities.contract.js`
**Requirements**:

- Test reference example: 200 juggles, 1 dropped, 6 total eggs → 1700 points
- Validate bounce points: 200×10 = 2000
- Validate drop penalty: 1×200 = 200
- Validate efficiency penalty: (6-5)×100 = 100
- Test optimal efficiency (≤5 eggs), worst case scenarios

### T006: Contract Test for Results Component UI

**File**: `specs/feat-improve-scoring/contracts/results-component.contract.js`
**Requirements**:

- Verify "Your Score" title display
- Verify Quiz Results section with 5 cards
- Verify Egg Juggling section when active
- Verify conditional rendering when mini-game inactive
- Test responsive design and accessibility

### T008: Create computeQuizScore Utility

**File**: `src/utils/quizScoring.js`
**Requirements**:

- Implement exact formula from reference specification
- Input validation for QuizMetrics interface
- Return QuizScore with points, breakdown, percentage
- Handle edge cases (zero time, zero correct, etc.)
- Export function for contract test import

### T009: Create computeEggGameScore Utility

**File**: `src/utils/eggGameScoring.js`
**Requirements**:

- Implement exact formula from reference specification
- Input validation for EggGameMetrics interface
- Return EggGameScore with points and breakdown
- Handle efficiency penalty calculation (max 0, totalEggs - 5)
- Export function for contract test import

### T012: Enhance Results Component

**File**: `src/components/Results.jsx`
**Requirements**:

- Change title from "Quiz Result" to "Your Score"
- Remove legacy "You scored X out of Y possible points" text
- Add Quiz Results section with 5 cards
- Add conditional Egg Juggling section with 5 cards
- Use ResultCard and ResultSection components
- Integrate with enhanced PointsContext

## Notes

- [P] tasks = different files, no dependencies
- Verify contract tests fail before implementing utilities
- Follow existing component patterns and Tailwind CSS styling
- Maintain responsive design principles
- All scoring calculations must match reference examples exactly

## Validation Checklist

_GATE: Checked before task completion_

- [ ] All contract tests written and failing appropriately
- [ ] Scoring utilities implement exact reference formulas
- [ ] Results component displays both sections correctly
- [ ] PointsContext integration maintains existing functionality
- [ ] All tests pass after implementation
- [ ] Manual testing via quickstart.md completed
- [ ] Legacy text removed and title updated
- [ ] Performance requirements met (<100ms scoring calculations)
