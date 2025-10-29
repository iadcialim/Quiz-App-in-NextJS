# Feature Specification: Improve results and egg-game scoring cards

> **Reference**: `improve-scoring`
>
> _This specification uses context from the reference folder to ensure consistency with existing patterns and implementations._

**Feature Branch**: `feat/improve-scoring`  
**Created**: 2025-10-21  
**Status**: Draft  
**Input**: User description: "Improve the scoring -ref improve-scoring"

## Execution Flow (main)
```
1. Read reference scoring docs (NEW-QUIZ-SCORING.md, NEW-EGG-JUGGLING-SCORING.md) and the improve-scoring README
2. Extract metrics required by formulas (correct, wrong, time, eggsDropped, eggsProduced, juggles, time)
3. Implement testable scoring utils for quiz and egg-game
4. Add/modify Results UI to render the two sections with five cards each and change title to "Your Score"
5. Wire combined scoring (quiz + mini-game) and ensure feature flag toggles are respected
6. Add unit/component/integration tests as specified
7. Run review checklist and promote to plan/tasks
8. Return: SUCCESS (spec ready for planning)
```

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
- As a quiz participant, I want the Results page to present clear, actionable scoring information for both the quiz and the egg-juggling mini-game so that I can understand how my final score is composed and where I can improve.

### Acceptance Scenarios
1. **Given** a user completes a quiz, **When** they view the Results page, **Then** the page shows a results section titled "Your Score" and displays quiz scoring cards for: Correct Answers, Wrong Answers, Percentage, Total Time Spent, and Total Points.
2. **Given** the egg-juggling mini-game ran during the quiz, **When** the user views Results, **Then** a separate Egg Juggling section is shown containing cards for: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, and Total Points.
3. **Given** new scoring formulas are provided in `NEW-QUIZ-SCORING.md` and `NEW-EGG-JUGGLING-SCORING.md`, **When** final scores are calculated, **Then** the Results page uses those formulas to compute and display the quiz and mini-game points.
4. **Given** the user toggles compact mode, **When** compact mode is active, **Then** cards condense but still show the five metrics for each section.
5. **Given** bonus/penalty rules exist in the formulas, **When** an egg is dropped or juggled, **Then** the mini-game points update according to formula and flow into combined final score.
6. **Given** the user finishes the quiz, **When** final scoring occurs, **Then** the Results page shows combined total points along with a breakdown (quiz points + mini-game points).

### Edge Cases
- If scoring formula files are missing or malformed, the system MUST fall back to a documented default formula and log a warning.
- If the mini-game was not active or disabled, the Egg Juggling section SHOULD be omitted and the combined score should equal quiz points only.
- Zero-question quiz: `computeQuizScore` must return 0 points and a safe breakdown without division-by-zero.

## Reference Context

**Reference Folder**: `improve-scoring`
**Purpose**: Provide the scoring formulas and desired results layout to ensure the Results page and mini-game scoring are changed consistently.

### Key Insights from Reference Material

#### Architecture & Patterns
- The Results page is componentized; new cards should be implemented as small presentational components to fit existing layout patterns (React + Tailwind CSS).
- Scoring formulas are best implemented in testable utility modules that accept metrics and return points + breakdown.

#### Code Examples & Interfaces
- Recommended util interfaces:
  - `computeQuizScore({ totalQuestions, correct, wrong, timeSpentMs }) => { points, breakdown, percentage }`
  - `computeEggGameScore({ eggsDropped, eggsProduced, juggles, timeSpentMs }) => { points, breakdown }`

#### Configuration & Setup
- Expose a feature flag (e.g., `enableNewScoring`) to support gradual rollout and easy rollback.
- Validate inputs and use defaults when metrics are missing.

#### Testing Approaches
- Unit tests for scoring utilities (happy path + edge cases).
- Component tests for Results cards rendering and compact layout.
- Integration tests to ensure combined scoring flows from game/quiz into final results.

### Referenced Files
- `.specify/reference/improve-scoring/README.md`
- `NEW-QUIZ-SCORING.md` (implementor should add or verify this file)
- `NEW-EGG-JUGGLING-SCORING.md` (implementor should add or verify this file)

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST update the Results page title to "Your Score" and remove legacy phrase "You scored .. out of .. possible points".
- **FR-002**: System MUST present a Quiz Results section showing these cards: Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points.
- **FR-003**: System MUST present an Egg Juggling section (if mini-game active) with these cards: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points.
- **FR-004**: System MUST compute quiz points using the formula defined in `NEW-QUIZ-SCORING.md` and expose a testable util API `computeQuizScore(metrics)`.
- **FR-005**: System MUST compute mini-game points using the formula defined in `NEW-EGG-JUGGLING-SCORING.md` and expose a testable util API `computeEggGameScore(metrics)`.
- **FR-006**: System MUST combine quiz points and mini-game points into a visible Combined Total Points value on Results and provide a breakdown.
- **FR-007**: System MUST render cards responsively and provide a compact display mode.
- **FR-008**: System MUST not display the legacy phrase anywhere in the Results UI.
- **FR-009**: System SHOULD provide a feature flag or settings toggle for enabling the new scoring logic.
- **FR-010**: Implementations MUST include unit tests for scoring utilities and component/integration tests as described in the Testing Approaches.

## Key Entities *(include if feature involves data)*
- **QuizMetrics**: { totalQuestions: number, correct: number, wrong: number, timeSpentMs: number }
- **QuizScore**: { points: number, breakdown: { correctPoints, timeBonus, penalty }, percentage: number }
- **EggGameMetrics**: { eggsDropped: number, eggsProduced: number, juggles: number, timeSpentMs: number }
- **EggGameScore**: { points: number, breakdown: { dropsPenalty, jugglesBonus } }
- **CombinedScore**: { quizPoints: number, eggGamePoints: number, totalPoints: number }

## Testing Approaches *(mandatory)*
- Unit tests
  - `computeQuizScore` tests covering normal and edge cases (0 questions, all correct, time bonuses/penalties).
  - `computeEggGameScore` tests covering drop extremes and high juggles.
- Component tests
  - Results page tests asserting the presence and content of the five quiz cards and five mini-game cards when applicable.
  - Snapshot tests for compact and full card layouts.
- Integration tests
  - Update `tests/integration/game-quiz-integration.test.js` (or add a new test) to assert that when the egg-juggling game runs, its points are included in final score.
- Regression tests
  - Assert legacy text is removed and title changed.

## Review & Acceptance Checklist
- [ ] Title changed to "Your Score" and legacy text removed (UI verification)
- [ ] Quiz Results displays 5 cards with correct labels and computed values
- [ ] Egg Juggling Results displays 5 cards with correct labels and computed values (when mini-game active)
- [ ] `computeQuizScore` and `computeEggGameScore` implemented with unit test coverage
- [ ] Combined total points displayed with breakdown
- [ ] Compact mode layout exists and is verified by tests
- [ ] Feature flag exists (or rollout plan documented)
- [ ] Integration tests updated to confirm scoring flow end-to-end

## Execution Status
- [x] User description parsed
- [x] Key concepts extracted from reference
- [x] Ambiguities: formulas referenced by `NEW-*.md` files must be loaded and validated during implementation
- [ ] User scenarios defined (primary scenarios included)
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist pending
