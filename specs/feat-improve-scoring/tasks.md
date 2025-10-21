````markdown
# Tasks: feat-improve-scoring

This file lists TDD-ordered, executable tasks for the `feat-improve-scoring` feature. Each task is minimal, verifiable, and references exact files to change. Follow the convention: tests-first (write failing tests), implement, then refactor.

T001 - Add scoring formula docs (non-code)
- Path: `specs/feat-improve-scoring/NEW-QUIZ-SCORING.md`
- Path: `specs/feat-improve-scoring/NEW-EGG-JUGGLING-SCORING.md`
- Description: Add the official scoring formulas. If stakeholders don't provide them, implement the sensible defaults in these files and mark as DRAFT.

T002 - Unit tests: computeQuizScore (fail first)
- Path: `src/utils/scoring/__tests__/computeQuizScore.test.js`
- Description: Create unit tests covering:
  - normal case (some correct, some wrong, time bonus/penalty)
  - all correct
  - zero questions (should return 0 safely)
  - invalid input (missing values -> defaults)

T003 - Implement computeQuizScore util
- Path: `src/utils/scoring/computeQuizScore.js`
- Description: Implement pure function matching tests and export default.

T004 - Unit tests: computeEggGameScore (fail first)
- Path: `src/utils/scoring/__tests__/computeEggGameScore.test.js`
- Description: Create unit tests covering:
  - drops penalty
  - juggles bonus
  - time influence
  - no-game case (zeros)

T005 - Implement computeEggGameScore util
- Path: `src/utils/scoring/computeEggGameScore.js`
- Description: Implement pure function matching tests and export default.

T006 - Add ScoreCard component and unit tests
- Path: `src/components/ScoreCard.jsx`
- Path: `src/components/__tests__/ScoreCard.test.jsx`
- Description: Small presentational card used by Results; test rendering, labels, compact mode.

T007 - Update Results UI and component tests
- Path: `src/components/Results.jsx`
- Path: `src/components/__tests__/Results.test.jsx`
- Description: Replace title with "Your Score", render two sections (Quiz + Egg Juggling) with five cards each, use scoring utils to compute points and display combined breakdown. Respect feature flag `ENABLE_NEW_SCORING`.

T008 - Integration test for combined scoring
- Path: `tests/integration/game-quiz-integration.test.js`
- Description: Ensure mini-game points are included in the final combined score when the egg-juggling game ran.

T009 - Test environment fixes
- Path: `jest.setup.js`
- Path: `package.json` (devDependencies)
- Description: Add canvas mocks or install `canvas` dev dep; add `node-mocks-http` dev dependency or refactor API tests.

Notes:
- Mark tasks that depend on external formula docs (T001) as blockers for implementation accuracy. If stakeholders cannot provide formulas in a timely manner, the team may implement the sensible defaults and document them.
- Keep each change small and use feature branch `feat/improve-scoring--improve-results-and-egg-game-scoring-cards` (already created by helper).

````
