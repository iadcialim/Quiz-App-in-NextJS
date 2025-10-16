# Implementation Plan: 2D Egg-Juggling Mini-Game Integration

**Branch**: `feat-add-2d-mini-game-quiz-app` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/feat-add-2d-mini-game-quiz-app/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → Feature spec loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type: web (Next.js frontend)
   → Set Structure Decision: Option 1 (Single project)
3. Fill the Constitution Check section based on constitution content
4. Evaluate Constitution Check section below
   → No violations detected
   → Update Progress Tracking: Initial Constitution Check ✓
5. Execute Phase 0 → research.md
   → All requirements clearly specified in reference
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent file
7. Re-evaluate Constitution Check section
   → No new violations
   → Update Progress Tracking: Post-Design Constitution Check ✓
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Add a 2D egg-juggling mini-game to the quiz application's left panel that runs simultaneously with quiz questions. Users tap falling eggs to bounce them up, earning bonus points for successful juggling or losing points when eggs hit the bottom. The game integrates with the existing quiz scoring system and includes configurable settings for enabling/disabling the game and controlling egg quantity.

## Technical Context

**Language/Version**: JavaScript ES6+ (Next.js 14.2.13)  
**Primary Dependencies**: React 18, HTML5 Canvas API, Tailwind CSS  
**Storage**: Local state management with React Context API  
**Testing**: Jest with React Testing Library  
**Target Platform**: Web browsers (desktop and mobile)  
**Project Type**: web - Next.js single project structure  
**Performance Goals**: 60 fps game animation, <16ms frame time  
**Constraints**: Modular design for reusability, responsive design  
**Scale/Scope**: Single mini-game component, 5-10 concurrent eggs maximum

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

**Technology Stack Compliance**:
- ✅ Next.js 14.2.13 (approved runtime)
- ✅ JavaScript ES6+ (approved language)
- ✅ HTML5 Canvas (web standard, no external dependencies)
- ✅ React Context API (approved state management)

**Coding Standards Compliance**:
- ✅ Functional components with hooks
- ✅ ESLint configuration for code quality
- ✅ Modular component architecture
- ✅ Error handling with try-catch patterns

**Architecture Compliance**:
- ✅ Component-based React architecture
- ✅ Single responsibility per component
- ✅ Clear separation of game logic and UI

**Testing Requirements**:
- ✅ Unit tests for game components
- ✅ Integration tests for quiz integration
- ✅ Performance tests for animation

## Project Structure

### Documentation (this feature)

```
specs/feat-add-2d-mini-game-quiz-app/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Option 1: Single project (SELECTED)
src/
├── components/
│   ├── EggJugglingGame.jsx
│   ├── GameCanvas.jsx
│   ├── GameSettings.jsx
│   └── __tests__/
├── hooks/
│   ├── useGameState.js
│   ├── useGamePhysics.js
│   └── __tests__/
├── utils/
│   ├── gameEngine.js
│   ├── physics.js
│   └── __tests__/
└── context/
    ├── GameContext.js
    └── __tests__/

tests/
├── integration/
│   └── game-quiz-integration.test.js
└── performance/
    └── game-performance.test.js
```

**Structure Decision**: Option 1 (Single project) - Next.js application with component-based architecture

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - All technical requirements clearly specified in reference material
   - HTML5 Canvas API patterns for 2D game development
   - React integration patterns for Canvas components
   - Game physics implementation for egg dropping and bouncing

2. **Generate and dispatch research agents**:
   ```
   Task: "Research HTML5 Canvas best practices for React integration"
   Task: "Find game physics patterns for 2D falling objects"
   Task: "Research performance optimization for Canvas animations"
   Task: "Find modular game engine patterns for web applications"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: HTML5 Canvas with requestAnimationFrame
   - Rationale: Smooth 60fps animation, direct pixel control
   - Alternatives considered: CSS animations, SVG, WebGL

**Output**: research.md with Canvas integration and physics patterns

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:
   - Egg: position, velocity, bounce state, id
   - GameState: active eggs, score, settings, game status
   - GameSettings: enabled, egg quantity, difficulty
   - GameScore: mini-game points, bonus multiplier

2. **Generate API contracts** from functional requirements:
   - Game component props interface
   - Game state management hooks
   - Settings configuration interface
   - Score integration with quiz context

3. **Generate contract tests** from contracts:
   - Game component rendering tests
   - Physics engine behavior tests
   - Settings persistence tests
   - Score calculation tests

4. **Extract test scenarios** from user stories:
   - User enables game and sees canvas
   - User taps egg and it bounces
   - User misses egg and loses points
   - Game integrates with quiz scoring

5. **Update agent file incrementally**:
   - Add HTML5 Canvas patterns
   - Add React game component patterns
   - Add physics simulation techniques
   - Keep under 150 lines for efficiency

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, .github/copilot-instructions.md

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs
- Each game component → component creation task [P]
- Each physics function → physics implementation task [P]
- Each integration point → integration test task
- Settings UI → settings component task [P]

**Ordering Strategy**:
- TDD order: Tests before implementation
- Dependency order: Physics engine → Game components → Integration
- Mark [P] for parallel execution (independent components)

**Estimated Output**: 20-25 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

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

_Based on Constitution v1.0.0 - See `.specify/memory/constitution/`_