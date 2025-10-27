# Implementation Plan: Improve Quiz Results Scoring v3

**Branch**: `feat-improve-scoring-v3` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/feat-improve-scoring-v3/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → Feature spec loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type: web (Next.js frontend + API routes)
   → Set Structure Decision: Option 2 (web application)
3. Fill the Constitution Check section based on constitution content
4. Evaluate Constitution Check section
   → No violations detected
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → All requirements clearly specified, no NEEDS CLARIFICATION
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, .github/copilot-instructions.md
7. Re-evaluate Constitution Check section
   → No new violations
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

## Summary

Enhanced quiz results scoring system with new formulas for both quiz performance (accuracy + speed bonus) and egg juggling mini-game (bounce points - penalties). Replaces legacy scoring display with structured card-based sections showing detailed metrics for each component.

## Technical Context

**Language/Version**: JavaScript ES6+, React 18  
**Primary Dependencies**: Next.js 14.2.13, Tailwind CSS, React Icons  
**Storage**: Context API for state management, JSON for quiz data  
**Testing**: Jest 29.7.0, React Testing Library  
**Target Platform**: Web browsers (responsive design)  
**Project Type**: web - Next.js application with frontend components and utility functions  
**Performance Goals**: Real-time score calculation, smooth UI updates  
**Constraints**: Maintain existing component structure, preserve game integration  
**Scale/Scope**: Single Results component enhancement, 2 scoring utility functions

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

**Technology Stack Compliance**: ✅ PASS
- Uses approved Next.js/React stack
- Maintains existing testing framework (Jest)
- No new technology introductions

**Coding Standards Compliance**: ✅ PASS  
- Will follow existing JavaScript/React patterns
- Maintains structured logging for score calculations
- Input validation for scoring metrics

**Architecture Principles Compliance**: ✅ PASS
- Single responsibility: scoring utilities separate from UI
- Maintains existing service delegation pattern
- No new external dependencies

**Testing Requirements Compliance**: ✅ PASS
- Unit tests for scoring utility functions
- Component tests for Results UI changes
- Integration tests for score calculation flow

## Project Structure

### Documentation (this feature)

```
specs/feat-improve-scoring-v3/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Option 2: Web application (Next.js structure)
src/
├── components/
│   └── Results.jsx      # Enhanced with new scoring sections
├── utils/
│   ├── quizScoring.js   # New quiz scoring utilities
│   └── eggGameScoring.js # New egg game scoring utilities
└── context/
    └── PointsContext.js # Updated for new scoring

tests/
├── unit/
│   ├── quizScoring.test.js
│   └── eggGameScoring.test.js
├── integration/
│   └── scoring-integration.test.js
└── components/
    └── Results.test.js
```

**Structure Decision**: Option 2 - Web application (existing Next.js structure)

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - All technical requirements clearly specified in reference materials
   - Existing codebase structure well-documented
   - Scoring formulas provided with detailed examples

2. **Generate and dispatch research agents**:
   - Research existing Results component structure
   - Analyze current PointsContext implementation
   - Review existing scoring calculation patterns
   - Investigate card-based UI component patterns in codebase

3. **Consolidate findings** in `research.md`:
   - Decision: Enhance existing Results.jsx with new sections
   - Rationale: Maintains component hierarchy, adds structured scoring
   - Alternatives considered: Complete rewrite vs incremental enhancement

**Output**: research.md with component analysis and implementation approach

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:
   - QuizMetrics: totalQuestions, correct, wrong, timeSpentMs
   - EggGameMetrics: eggsDropped, eggsProduced, juggles, totalEggsIntroduced
   - QuizScore: points, breakdown (accuracyScore, speedBonus), percentage
   - EggGameScore: points, breakdown (bouncePoints, dropPenalty, efficiencyPenalty)
   - ResultCard: metric name, value, display format
   - ResultSection: title, cards array, conditional display

2. **Generate API contracts** from functional requirements:
   - computeQuizScore(metrics) → QuizScore interface
   - computeEggGameScore(metrics) → EggGameScore interface
   - Results component props interface
   - Card component interface

3. **Generate contract tests** from contracts:
   - quizScoring.contract.test.js - validates scoring formula accuracy
   - eggGameScoring.contract.test.js - validates penalty calculations
   - Results.contract.test.js - validates UI contract compliance

4. **Extract test scenarios** from user stories:
   - Complete quiz → view enhanced results with both sections
   - Quiz without mini-game → view quiz section only
   - Verify formula calculations match reference examples
   - Validate UI text changes (title, legacy text removal)

5. **Update agent file incrementally**:
   - Add scoring utility patterns to .github/copilot-instructions.md
   - Include new component structure context
   - Document formula calculation patterns

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, .github/copilot-instructions.md

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate utility function tasks from scoring formulas
- Create component enhancement tasks from UI requirements
- Generate test tasks for each contract and integration scenario

**Ordering Strategy**:
- TDD order: Contract tests → utility functions → component tests → UI implementation
- Dependency order: Scoring utilities → Results component enhancement → integration
- Mark [P] for parallel execution: utility functions can be developed independently

**Estimated Output**: 15-20 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (scoring utilities → Results component → tests)  
**Phase 5**: Validation (run tests, verify formulas, UI validation)

## Complexity Tracking

_No constitutional violations detected - section not needed_

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_