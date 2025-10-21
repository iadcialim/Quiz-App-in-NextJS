# Implementation Plan: Improve results and egg-game scoring cards

**Branch**: `feat-improve-scoring` | **Date**: 2025-10-21 | **Spec**: `specs/feat-improve-scoring/spec.md`
**Input**: Feature specification from `/Users/2259797/Projects/Cognizant/Bench/Quiz-App-in-NextJS/specs/feat-improve-scoring/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context: Next.js web application (frontend + API routes)
   → Structure Decision: Single-project Next.js app (use `src/` structure), UI components in `src/components/`, hooks in `src/hooks/`, utils in `src/utils/`.
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Based on loaded constitution sections (core, architecture, testing, branching):
- Coding standards: follow ESLint rules already in repo; ensure new files pass linting.
- Testing: unit tests colocated with source; integration tests in `tests/integration/` per constitution.
- Branching: create branch `feat/improve-scoring` and follow commit message standard `feat: ...` for changes.

Initial gate: PASS (no conflicts with constitution detected for this small UI + util change).

## Project Structure

### Documentation (this feature)

```
specs/[feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: [DEFAULT to Option 1 unless Technical Context indicates web/mobile app]

## Phase 0: Outline & Research

Primary unknowns / clarifications required (from spec):
- Confirm presence and contents of `NEW-QUIZ-SCORING.md` and `NEW-EGG-JUGGLING-SCORING.md` (source of formulas).
- Decide whether the new scoring should be behind a runtime feature flag (config) or a compile-time toggle.

Research tasks to run now:
- R0.1: Inspect repository for `NEW-QUIZ-SCORING.md` and `NEW-EGG-JUGGLING-SCORING.md` and capture formulas. If missing, request the formula from stakeholders or define default formula.
- R0.2: Research patterns for testable scoring utils in React apps (pure functions, unit tests, TypeScript/prop types or simple JS with JSDoc).
- R0.3: Research feature-flag options for Next.js apps (env flag + runtime config vs. UI settings persisted in Points/Settings context).

Consolidate findings into `specs/feat-improve-scoring/research.md` with decisions and rationale.

Output: `research.md` created containing resolved clarifications.

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

Planned artifacts:
- `data-model.md` — extract QuizMetrics, QuizScore, EggGameMetrics, EggGameScore shapes (already in spec; add validation rules and types).
- `/contracts/score-api.js` — an internal contract describing the scoring util API and expected inputs/outputs. This drives contract tests.
- `quickstart.md` — short doc showing how to run tests and enable the feature flag.

Design actions:
1. Implement `src/utils/scoring/computeQuizScore.js` and `src/utils/scoring/computeEggGameScore.js` as pure functions with clear input and output shapes matching the spec.
2. Create `specs/feat-improve-scoring/contracts/score-utils.contract.js` describing function signatures and edge behavior.
3. Create contract tests under `src/utils/__tests__/` that import the contract spec and assert that the util functions return expected shapes (these tests initially fail if functions not implemented). Use Jest for unit tests.
4. Add `specs/feat-improve-scoring/data-model.md` containing entities and validation rules.

Output: `data-model.md`, `specs/feat-improve-scoring/contracts/*`, `quickstart.md`, and unit tests created (failing until implementation).


## Phase 2: Task Planning Approach

This phase is reserved for `/tasks`. Summary of strategy (for later automation):
- Use `tasks.md` to create TDD-style steps: contract tests → scoring utils → unit tests → Results UI changes → integration tests → rollout.
- Prioritize unit tests for scoring utils so behavior is fully specified before UI updates.
- Mark tasks with `[P]` where safe to parallelize (different files).

Estimated tasks: ~12-18 (smaller than large features because changes are confined to utils + Results UI + tests).

## Phase 3+: Future Implementation

These phases are executed after /tasks generates the task list.

**Phase 3**: Execute tasks in `tasks.md` (tests-first, implement scoring utils, update UI)  
**Phase 4**: Integrate scoring with Points/Results flows and add feature-flag gating  
**Phase 5**: Run full test suite, perform manual UX verification of Results page and compact mode

## Complexity Tracking

No major constitutional violations detected. This feature is scoped to a small set of pure functions and UI changes; architecture and technology choices remain within constitution constraints.

## Progress Tracking

**Phase Status**:

- [ ] Phase 0: Research complete (/plan command)
- [ ] Phase 1: Design complete (/plan command)
- [ ] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_

