# Quiz-App-in-NextJS Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-01-16

## Project Overview
Interactive quiz application with a 2D egg-juggling mini-game, built using Next.js 14 and following Spec-Driven Development (SDD) methodology.

## Active Technologies
- **Next.js 14.2.13**: App Router architecture with SSR/SSG
- **React 18**: Component-based UI with Context API state management
- **Tailwind CSS 3.4.1**: Utility-first styling framework
- **JavaScript ES6+**: Modern async/await, destructuring, modules
- **HTML5 Canvas**: 2D game rendering (60fps target)
- **Jest 29.7.0 + React Testing Library**: Unit, integration, contract testing
- **Vercel PostgreSQL**: Score submission and leaderboard backend

## Project Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (Results, GameCanvas, Leaderboard, etc.)
├── context/          # Context API providers (PointsContext, GameContext)
├── hooks/            # Custom hooks (useGameState, useGamePhysics)
└── utils/            # Utility functions (gameEngine, physics, scoring)
tests/
├── api/              # API route tests
├── integration/      # Integration tests
└── performance/      # Performance benchmarks
specs/
└── feat-*/           # Feature specifications (SDD methodology)
```

## Commands
### Development
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Production build
npm test             # Run Jest tests
npm run test:watch   # Jest in watch mode
```

### Database
```bash
./setup-database.sh        # Automated database setup
./setup-supabase-db.sh     # Supabase-specific setup
./quick-db-check.sh        # Verify database connection
```

### Testing
```bash
./test-api-local.sh        # Test API routes locally
npm test -- --coverage     # Run tests with coverage report
```

## Code Style
- **JavaScript**: ES6+ with functional components, async/await over promises
- **React**: Functional components with hooks, Context API for state
- **Testing**: Contract tests define interfaces, TDD approach (red → green → refactor)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **File Organization**: Co-locate tests with source (e.g., `__tests__/` subdirectories)

## Architectural Patterns
### State Management
- **PointsContext**: Quiz scoring, mini-game score, bonus multipliers
- **GameContext**: Game state (active, paused), egg metrics (juggled, dropped)
- **Pattern**: Pure utility functions + Context providers (no Redux/Zustand)

### Scoring System
- **Quiz Scoring**: `accuracyScore = (correct × 100) - (wrong × 50)`; `speedBonus = max(500 - (timeTaken - targetTime) × 50, 0)`
- **Game Scoring**: `bouncePoints = juggles × 10`; `dropPenalty = drops × 200`; `efficiencyPenalty = max(eggsIntroduced - 5, 0) × 100`
- **Location**: `src/utils/scoring.js` (v2) with constants in `src/constants/scoring.js`

### Testing Strategy
1. **Contract Tests**: Define function signatures and expected behaviors
2. **Unit Tests**: Validate individual utility functions/components
3. **Integration Tests**: Test quiz → scoring → results flow
4. **Performance Tests**: Ensure 60fps game rendering, <100ms scoring calculations

## Recent Changes
### feat-improve-scoring-v2 (IN PROGRESS - Phase 3 Complete)
**Status**: Tasks generated, ready for implementation

**Completed**:
- ✅ Specification created (26 functional requirements)
- ✅ Implementation plan with constitutional compliance
- ✅ Research documentation (5 technical decisions)
- ✅ Data model (5 entities: QuizMetrics, QuizScore, GameMetrics, GameScore, ScoringConstants)
- ✅ Contracts created (scoring-utils, results-display)
- ✅ Quickstart guide (10 manual test scenarios)
- ✅ Tasks generated (13 dependency-ordered tasks)

**Pending**:
- ⏳ T001: Create scoring constants module
- ⏳ T002-T006: Write contract and integration tests (TDD)
- ⏳ T007-T008: Implement scoring utilities
- ⏳ T009-T010: Update context providers
- ⏳ T011: Refactor Results component
- ⏳ T012-T013: Unit tests and manual validation

**Key Requirements**:
- Change Results title to "Your Score" (remove "You scored X out of Y")
- Show 5 quiz cards: Correct, Wrong, Percentage, Time, Points
- Show 5 game cards: Drops, Produced, Juggles, Time, Points (conditional rendering)
- Responsive grid layout (1/2/3 columns)
- Test coverage >80% for scoring utilities

**Formula Examples** (from spec):
- Quiz: 8 correct, 2 wrong, 40s → 1000 points
- Game: 200 juggles, 1 drop, 6 eggs, 60s → 1700 points

### feat-add-2d-mini-game-quiz-app (COMPLETED)
- Added egg-juggling game with Canvas rendering
- Implemented game physics (gravity, collision detection)
- Integrated game score with quiz results

### feat-deploy-project-online-with-score-submission (COMPLETED)
- Vercel deployment with PostgreSQL backend
- Score submission API (`/api/scores`)
- Leaderboard display (`/api/leaderboard`)

## Development Workflow (SDD)
1. **@specify**: Create feature specification (spec.md)
2. **@plan**: Generate implementation plan with Phase 0 (research) and Phase 1 (design)
3. **@tasks**: Generate ordered task list (tasks.md) from contracts
4. **Implement**: Follow TDD (contracts → tests → implementation)
5. **Validate**: Manual testing using quickstart.md scenarios

## Critical Constraints
- **Performance**: 60fps game rendering, <100ms scoring calculations
- **Browser Support**: Modern browsers with Canvas API support
- **Accessibility**: Keyboard navigation for quiz, ARIA labels on cards
- **Testing**: >80% coverage for business logic, contract tests for all public APIs
- **Constitution**: All implementations must pass constitutional compliance checks

## References
- Specification docs: `/specs/feat-*/spec.md`
- Contracts: `/specs/feat-*/contracts/*.js`
- Manual testing: `/specs/feat-*/quickstart.md`
- Task tracking: See each feature's `tasks.md`

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->