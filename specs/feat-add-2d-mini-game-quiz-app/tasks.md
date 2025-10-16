# Tasks: 2D Egg-Juggling Mini-Game Integration

**Input**: Design documents from `/specs/feat-add-2d-mini-game-quiz-app/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: Next.js 14, React 18, HTML5 Canvas, Tailwind CSS
   → Structure: Single project with component-based architecture
2. Load optional design documents:
   → data-model.md: Egg, GameState, GameSettings, GameScore entities
   → contracts/: game-components.js, game-api.js → contract test tasks
   → research.md: Canvas integration, physics patterns
3. Generate tasks by category:
   → Setup: Canvas dependencies, physics utilities
   → Tests: component tests, physics tests, integration tests
   → Core: game engine, components, hooks
   → Integration: quiz integration, settings UI
   → Polish: performance optimization, documentation
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/` at repository root (Next.js structure)
- Components in `src/components/`
- Hooks in `src/hooks/`
- Utils in `src/utils/`
- Tests colocated with source files

## Phase 3.1: Setup
- [ ] T001 Create game component directory structure in src/components/
- [ ] T002 Create game hooks directory structure in src/hooks/
- [ ] T003 Create game utilities directory structure in src/utils/
- [ ] T004 [P] Configure ESLint rules for Canvas and game development

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test EggJugglingGame component in src/components/__tests__/EggJugglingGame.test.js
- [ ] T006 [P] Contract test GameCanvas component in src/components/__tests__/GameCanvas.test.js
- [ ] T007 [P] Contract test GameSettings component in src/components/__tests__/GameSettings.test.js
- [ ] T008 [P] Contract test useGameState hook in src/hooks/__tests__/useGameState.test.js
- [ ] T009 [P] Contract test useGamePhysics hook in src/hooks/__tests__/useGamePhysics.test.js
- [ ] T010 [P] Physics engine tests in src/utils/__tests__/physics.test.js
- [ ] T011 [P] Game engine tests in src/utils/__tests__/gameEngine.test.js
- [ ] T012 [P] Integration test game-quiz integration in tests/integration/game-quiz-integration.test.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T013 [P] Physics utilities in src/utils/physics.js
- [ ] T014 [P] Game engine core in src/utils/gameEngine.js
- [ ] T015 [P] useGamePhysics hook in src/hooks/useGamePhysics.js
- [ ] T016 useGameState hook in src/hooks/useGameState.js (depends on T015)
- [ ] T017 [P] GameCanvas component in src/components/GameCanvas.jsx
- [ ] T018 [P] GameSettings component in src/components/GameSettings.jsx
- [ ] T019 EggJugglingGame main component in src/components/EggJugglingGame.jsx (depends on T016, T017)
- [ ] T020 Game context provider in src/context/GameContext.js

## Phase 3.4: Integration
- [ ] T021 Integrate game component into quiz page src/app/quiz/[subject]/page.jsx
- [ ] T022 Update PointsContext to handle mini-game scoring in src/context/PointsContext.js
- [ ] T023 Add game settings to existing settings UI
- [ ] T024 Update Results component to show mini-game scores in src/components/Results.jsx
- [ ] T025 Add responsive design for mobile devices

## Phase 3.5: Polish
- [ ] T026 [P] Performance optimization for Canvas rendering
- [ ] T027 [P] Add game sound effects (optional)
- [ ] T028 [P] Unit tests for edge cases in src/components/__tests__/
- [ ] T029 [P] Performance tests in tests/performance/game-performance.test.js
- [ ] T030 [P] Update README.md with game features
- [ ] T031 Code cleanup and remove console.logs
- [ ] T032 Run quickstart.md validation tests

## Dependencies
- Tests (T005-T012) before implementation (T013-T025)
- T013 (physics) blocks T015 (useGamePhysics)
- T015 (useGamePhysics) blocks T016 (useGameState)
- T016, T017 (hooks, canvas) block T019 (main component)
- T019 (main component) blocks T021 (quiz integration)
- Implementation before polish (T026-T032)

## Parallel Example
```
# Launch T005-T011 together (contract tests):
Task: "Contract test EggJugglingGame component in src/components/__tests__/EggJugglingGame.test.js"
Task: "Contract test GameCanvas component in src/components/__tests__/GameCanvas.test.js"
Task: "Contract test GameSettings component in src/components/__tests__/GameSettings.test.js"
Task: "Contract test useGameState hook in src/hooks/__tests__/useGameState.test.js"
Task: "Contract test useGamePhysics hook in src/hooks/__tests__/useGamePhysics.test.js"
Task: "Physics engine tests in src/utils/__tests__/physics.test.js"
Task: "Game engine tests in src/utils/__tests__/gameEngine.test.js"

# Launch T013-T014, T017-T018 together (independent implementations):
Task: "Physics utilities in src/utils/physics.js"
Task: "Game engine core in src/utils/gameEngine.js"
Task: "GameCanvas component in src/components/GameCanvas.jsx"
Task: "GameSettings component in src/components/GameSettings.jsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Canvas performance is critical - monitor frame rates
- Mobile touch events need special handling

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - game-components.js → component contract tests [P]
   - game-api.js → engine and physics tests [P]
   
2. **From Data Model**:
   - Egg entity → physics utilities [P]
   - GameState → useGameState hook
   - GameSettings → GameSettings component [P]
   - GameScore → scoring integration
   
3. **From User Stories**:
   - Quiz integration → integration test [P]
   - Settings control → settings UI tasks
   - Score combination → Results component update

4. **Ordering**:
   - Setup → Tests → Utils → Hooks → Components → Integration → Polish
   - Physics before game state management
   - Components before quiz integration

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have implementation tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Canvas performance considerations included
- [x] Mobile responsiveness addressed
- [x] Quiz integration properly sequenced