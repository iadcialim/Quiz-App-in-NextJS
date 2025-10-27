# Implementation Plan: Improved Scoring System with Enhanced Results Display

**Branch**: `feat-improve-scoring-v2` | **Date**: 2025-10-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/feat-improve-scoring-v2/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → ✅ Loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ Project Type: Web application (Next.js frontend)
   → ✅ Structure Decision: Single project (Next.js app)
3. Fill the Constitution Check section based on the content of the constitution document.
   → ✅ Constitution standards loaded
4. Evaluate Constitution Check section below
   → ✅ No violations detected
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → ✅ Reference materials fully specify requirements
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent file
   → ✅ Design artifacts generated
7. Re-evaluate Constitution Check section
   → ✅ No new violations
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. ✅ STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

This feature enhances the Quiz App's scoring system by implementing new mathematical formulas for both quiz and egg-juggling game scoring, and redesigning the Results page with a card-based layout showing separate sections for Quiz Results (5 cards) and Egg Juggling Results (5 cards). The quiz scoring now rewards speed with bonuses up to 500 points, while the game scoring penalizes drops (200 pts each) and inefficiency (100 pts per excess egg beyond 5).

**Primary Requirement**: Transform Results.jsx to display "Your Score" with two distinct sections using new scoring formulas that calculate accuracy scores, speed bonuses, bounce points, drop penalties, and efficiency penalties.

**Technical Approach**: Create scoring utility functions following the documented formulas, refactor Results component to use card-based sections, update PointsContext and GameContext to track new metrics, and ensure all calculations match the reference examples.

## Technical Context

**Language/Version**: JavaScript (ES6+), React 18, Next.js 14.2.13  
**Primary Dependencies**: React, Next.js, Tailwind CSS, react-icons, react-confetti  
**Storage**: Client-side state management (React Context API)  
**Testing**: Jest 29.7.0, React Testing Library  
**Target Platform**: Web browsers (desktop and mobile)  
**Project Type**: Single Next.js application (App Router)  
**Performance Goals**: 60fps UI rendering, <100ms scoring calculations  
**Constraints**: Maintain existing mini-game integration, backward compatibility with current data flow  
**Scale/Scope**: Single-page results display, 10 metric cards, 2 scoring algorithms

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Technology Stack Compliance

- [x] **Runtime**: Next.js 14.2.13 (approved React framework)
- [x] **Language**: JavaScript ES6+ (standard web technology)
- [x] **Testing**: Jest with React Testing Library (standard testing stack)
- [x] **No prohibited technologies**: All dependencies are approved web standards

### Coding Standards

- [x] **Type Safety**: PropTypes or TypeScript types for scoring functions
- [x] **Error Handling**: Try-catch blocks in scoring calculations, graceful fallbacks
- [x] **Modularity**: Scoring utilities separated from UI components
- [x] **Validation**: Input validation for all metrics before calculation
- [x] **Logging**: Console warnings for edge cases (negative scores, invalid metrics)

### Architectural Principles

- [x] **Single Responsibility**: Scoring utilities handle only calculations, components only UI
- [x] **Separation of Concerns**: Business logic (scoring) separate from presentation (Results.jsx)
- [x] **State Management**: React Context for shared state (PointsContext, GameContext)
- [x] **Stateless Components**: Results component receives props, context provides state

### Testing Requirements

- [x] **Unit Tests**: Scoring utility functions with edge cases
- [x] **Component Tests**: Results component rendering with various scores
- [x] **Integration Tests**: Quiz-game score combination flow
- [x] **Coverage Target**: >80% for new scoring utilities
- [x] **Test Organization**: Co-located `__tests__/` directories

### Security Considerations

- [x] **Input Validation**: Validate numeric inputs, prevent division by zero
- [x] **No External APIs**: All calculations client-side
- [x] **No Sensitive Data**: Scores are non-sensitive display data

### Branch & Commit Standards

- [x] **Branch Naming**: `feat-improve-scoring-v2` (follows convention)
- [x] **Commit Format**: `feat:` prefix for new features, imperative mood
- [x] **Scope**: Single feature - scoring improvements

**Constitution Check Status**: ✅ PASS - All standards met, no violations

## Project Structure

### Documentation (this feature)

```
specs/feat-improve-scoring-v2/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
│   ├── scoring-utils.contract.js
│   └── results-display.contract.js
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
src/
├── components/
│   ├── Results.jsx                    # UPDATE: Redesign with card sections
│   ├── __tests__/
│   │   └── Results.test.js            # UPDATE: Test new layout & scoring
│   └── cards/                         # NEW: Card components
│       ├── QuizScoreCard.jsx
│       └── GameScoreCard.jsx
├── context/
│   ├── PointsContext.js               # UPDATE: Add new metrics tracking
│   ├── GameContext.js                 # UPDATE: Track eggs produced, juggles
│   └── __tests__/
│       ├── PointsContext.test.js      # NEW
│       └── GameContext.test.js        # NEW
├── utils/
│   ├── scoring.js                     # NEW: Quiz & game scoring formulas
│   └── __tests__/
│       └── scoring.test.js            # NEW: Test all formulas with examples
└── constants/
    └── scoring.js                     # NEW: Scoring weights & constants

tests/
├── integration/
│   └── scoring-integration.test.js    # NEW: End-to-end scoring flow
└── contract/
    ├── scoring-utils.contract.test.js # NEW
    └── results-display.contract.test.js # NEW
```

**Structure Decision**: Single Next.js project (Option 1) - Frontend-only scoring enhancements


## Phase 0: Outline & Research

### Research Summary

All technical requirements are fully specified in the reference materials. No unknowns remain.

**Key Decisions Made**:

1. **Scoring Implementation Location**:
   - **Decision**: Create dedicated `src/utils/scoring.js` utility module
   - **Rationale**: Separates business logic from UI, enables easy testing, promotes reusability
   - **Alternatives Considered**: 
     - Inline calculations in Results.jsx (rejected: poor separation of concerns)
     - Context provider methods (rejected: mixing state management with business logic)

2. **Card Component Architecture**:
   - **Decision**: Reuse existing card pattern in Results.jsx, no separate card components initially
   - **Rationale**: Current card structure already works well, minimal refactoring needed
   - **Alternatives Considered**:
     - Separate `QuizScoreCard` and `GameScoreCard` components (deferred: premature optimization)
     - Third-party UI library (rejected: adds unnecessary dependency)

3. **Metric Tracking Strategy**:
   - **Decision**: Extend existing GameContext to track eggs produced and juggles
   - **Rationale**: GameContext already manages game state, natural extension point
   - **Alternatives Considered**:
     - New ScoringContext (rejected: adds complexity without benefit)
     - Direct prop drilling (rejected: violates React best practices)

4. **Formula Constants Management**:
   - **Decision**: Create `src/constants/scoring.js` for all weights and thresholds
   - **Rationale**: Single source of truth, easy to modify, documented values
   - **Alternatives Considered**:
     - Hardcoded in formulas (rejected: poor maintainability)
     - Environment variables (rejected: overkill for static constants)

5. **Testing Strategy**:
   - **Decision**: Test-driven development with contract tests first
   - **Rationale**: Formulas are well-defined with examples, contracts ensure correctness
   - **Alternatives Considered**:
     - Implementation-first (rejected: higher risk of formula bugs)

**Output**: See [research.md](./research.md) for complete details

## Phase 1: Design & Contracts

### Data Model

See [data-model.md](./data-model.md) for complete entity definitions.

**Key Entities**:

1. **QuizMetrics** (input to quiz scoring):
   ```javascript
   {
     totalQuestions: number,    // Total questions in quiz
     correct: number,           // Correct answers count
     wrong: number,             // Wrong answers count
     timeTaken: number          // Time in seconds
   }
   ```

2. **QuizScore** (output from quiz scoring):
   ```javascript
   {
     accuracyScore: number,     // (correct × 100) - (wrong × 50)
     speedBonus: number,        // Up to 500 points
     finalScore: number,        // accuracyScore + speedBonus
     percentage: number         // (correct / total) × 100
   }
   ```

3. **GameMetrics** (input to game scoring):
   ```javascript
   {
     juggles: number,           // Successful egg bounces
     drops: number,             // Eggs that hit bottom
     eggsIntroduced: number,    // Total eggs spawned
     timePlayed: number         // Game duration in seconds
   }
   ```

4. **GameScore** (output from game scoring):
   ```javascript
   {
     bouncePoints: number,      // juggles × 10
     dropPenalty: number,       // drops × 200
     efficiencyPenalty: number, // max(0, eggsIntroduced - 5) × 100
     totalPenalty: number,      // dropPenalty + efficiencyPenalty
     finalScore: number         // bouncePoints - totalPenalty
   }
   ```

5. **ScoringConstants**:
   ```javascript
   {
     QUIZ: {
       CORRECT_WEIGHT: 100,
       WRONG_PENALTY: 50,
       MAX_TIME_PER_QUESTION: 10,
       MAX_SPEED_BONUS: 500
     },
     GAME: {
       BOUNCE_WEIGHT: 10,
       DROP_PENALTY: 200,
       EFFICIENCY_PENALTY: 100,
       IDEAL_MIN_EGGS: 5
     }
   }
   ```

### API Contracts

See [contracts/](./contracts/) directory for detailed contracts.

**Scoring Utilities Contract** (`contracts/scoring-utils.contract.js`):

```javascript
/**
 * Quiz Scoring Contract
 * Calculates quiz score based on accuracy and speed
 */
function computeQuizScore(metrics: QuizMetrics): QuizScore

/**
 * Game Scoring Contract  
 * Calculates game score based on juggles, drops, and efficiency
 */
function computeGameScore(metrics: GameMetrics): GameScore

/**
 * Constants Export Contract
 * Provides all scoring weights and thresholds
 */
export const SCORING_CONSTANTS
```

**Results Display Contract** (`contracts/results-display.contract.js`):

```javascript
/**
 * Results Component Contract
 * Displays quiz and game results in card-based sections
 */
function Results({
  score: number,              // Final combined score
  totalQuestions: number,
  correctAnswers: number,
  wrongAnswers: number,
  unattemptedQuestions: number,
  percentage: number,
  timeSpent: number,
  averageTimePerQuestion: number,
  miniGameScore: number,
  // NEW PROPS:
  quizBreakdown: QuizScore,   // Detailed quiz scoring
  gameBreakdown: GameScore,   // Detailed game scoring
  gameMetrics: GameMetrics    // Raw game metrics for cards
}): ReactElement
```

### Contract Tests

**Test Files Created** (failing until implementation):

1. `tests/contract/scoring-utils.contract.test.js`:
   - ✅ Test `computeQuizScore` with example from spec (8 correct, 2 wrong, 40s, 10 questions → 1000 points)
   - ✅ Test `computeGameScore` with example from spec (200 juggles, 1 drop, 6 eggs → 1700 points)
   - ✅ Test edge cases: 0 correct, max time exceeded, exactly 5 eggs, negative scores

2. `tests/contract/results-display.contract.test.js`:
   - ✅ Test Results renders "Your Score" title
   - ✅ Test Quiz Results section shows 5 cards with correct labels
   - ✅ Test Egg Juggling section shows 5 cards with correct labels
   - ✅ Test Egg Juggling section hidden when game not active
   - ✅ Test legacy text "You scored .. out of .. possible points" is removed

### Integration Test Scenarios

From user stories (see [quickstart.md](./quickstart.md)):

1. **Perfect Speed Run**:
   - User answers all 10 questions correctly in 20 seconds
   - Expected: Accuracy 1000, Speed Bonus 400, Total 1400

2. **Egg Juggling Master**:
   - User juggles 200 eggs, drops 1, introduces 6 eggs total
   - Expected: Bounce 2000, Drop Penalty -200, Efficiency -100, Total 1700

3. **Mixed Performance**:
   - Quiz: 8 correct, 2 wrong, 40 seconds
   - Game: 50 juggles, 3 drops, 5 eggs
   - Expected: Quiz 1000, Game -100, Combined display correct

4. **No Game Played**:
   - User completes quiz without enabling mini-game
   - Expected: Only Quiz Results section displayed, no Egg Juggling section

### Agent Context Update

Updated `.github/copilot-instructions.md` with:
- New scoring constants and formulas
- Results component refactoring approach
- Testing requirements for scoring utilities
- Card layout specifications

**Output**: ✅ All Phase 1 artifacts generated

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

1. **Load Template**: Use `.specify/templates/tasks-template.md` as base structure

2. **Generate from Contracts**:
   - Scoring utilities contract → 2 contract test tasks [P]
   - Results display contract → 1 contract test task [P]
   - Data model entities → constant definitions task [P]

3. **Generate from Design**:
   - Each scoring formula → utility function implementation task
   - Results component → UI refactoring task (depends on utilities)
   - Context updates → state management tasks [P]

4. **Generate from User Stories**:
   - Each acceptance scenario → integration test task
   - Edge cases → unit test tasks

**Ordering Strategy**:

1. **Constants First** (no dependencies): Task 1
2. **Contract Tests** (parallel): Tasks 2-4 [P]
3. **Scoring Utilities** (makes tests pass): Tasks 5-6
4. **Context Updates** (parallel): Tasks 7-8 [P]
5. **Results UI Refactor** (depends on utilities + context): Task 9
6. **Component Tests** (depends on UI): Task 10
7. **Integration Tests** (depends on all): Task 11
8. **Manual Testing**: Task 12

**Estimated Output**: 12-15 numbered, dependency-ordered tasks in tasks.md

**Task Categories**:
- Setup & Constants: 1 task
- Contract Tests: 3 tasks [P]
- Implementation: 4 tasks (2 parallel, 2 sequential)
- Testing: 3 tasks
- Validation: 1 task

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation following TDD approach:
  1. Write contract tests (red)
  2. Implement scoring utilities (green)
  3. Refactor Results component (green)
  4. Write integration tests (green)
  5. Manual testing with quickstart.md

**Phase 5**: Validation checklist:
  - ✅ All contract tests pass
  - ✅ Scoring formulas match reference examples exactly
  - ✅ Results page displays "Your Score" title
  - ✅ Quiz Results shows 5 cards with correct values
  - ✅ Egg Juggling shows 5 cards when game active
  - ✅ Legacy score text removed
  - ✅ All edge cases handled (0 correct, no game, etc.)
  - ✅ Performance: <100ms scoring calculations
  - ✅ Test coverage >80%

## Complexity Tracking

_No complexity deviations from constitutional standards required._

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command) - 13 tasks created
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

**Execution Summary**:

✅ Specification analyzed and fully understood  
✅ Reference materials provide complete formulas and examples  
✅ Technical architecture designed with clear separation of concerns  
✅ Contract tests defined for TDD approach  
✅ Data model documented with all entities and relationships  
✅ No constitutional violations or complexity deviations  
✅ Ready for task generation via /tasks command

---

_Based on Constitution v2.1.1 - See `.specify/constitution.md`_
