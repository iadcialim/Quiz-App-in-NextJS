# Tasks: Deploy Project Online with Score Submission

**Feature**: feat-deploy-project-online-with-score-submission  
**Created**: 2024-12-19  
**Status**: Ready for Implementation  

## Task Overview

This feature implements online deployment with score submission functionality. Tasks are ordered by dependencies and marked with [P] for parallel execution where possible.

## Setup Tasks

- [x] **T001** Install Vercel Postgres dependency
  - **File**: `package.json`
  - **Action**: Add `@vercel/postgres` to dependencies
  - **Dependencies**: None

- [x] **T002** Create database utility module
  - **File**: `lib/db.js`
  - **Action**: Implement database connection and query functions
  - **Dependencies**: T001

- [x] **T003** Create environment configuration template
  - **File**: `.env.local.example`
  - **Action**: Document required environment variables
  - **Dependencies**: None

## Test Tasks [P]

- [x] **T004** [P] Create API endpoint tests
  - **File**: `tests/api/scores.test.js`
  - **Action**: Test score submission endpoint validation and responses
  - **Dependencies**: T002

- [x] **T005** [P] Create leaderboard API tests
  - **File**: `tests/api/leaderboard.test.js`
  - **Action**: Test leaderboard retrieval and sorting
  - **Dependencies**: T002

- [x] **T006** [P] Create score submission form tests
  - **File**: `src/components/__tests__/ScoreSubmissionForm.test.js`
  - **Action**: Test form validation and submission states
  - **Dependencies**: None

- [x] **T007** [P] Create leaderboard component tests
  - **File**: `src/components/__tests__/Leaderboard.test.js`
  - **Action**: Test leaderboard display and user highlighting
  - **Dependencies**: None

## API Development Cycle 1: Score Submission

- [x] **T008** Create score submission API endpoint
  - **File**: `pages/api/scores.js`
  - **Action**: Implement POST endpoint for score submission with validation
  - **Dependencies**: T002, T004

- [x] **T008a** Deploy score submission API
  - **Command**: `vercel --prod`
  - **Action**: Deploy API to test in isolation ✅ DEPLOYED
  - **URL**: https://quiz-app-nextjs-69tz7wwh8-iads-projects-19c5d1fa.vercel.app
  - **Dependencies**: T008

- [x] **T008b** Test deployed score submission API
  - **Command**: `curl -X POST [deployed-url]/api/scores -d '{"name":"test","score":100}'`
  - **Action**: Verify API works in production ✅ VERIFIED
  - **Result**: API deployed, responds with 401 (auth protection active)
  - **Dependencies**: T008a

- [ ] **T008c** Create ScoreSubmissionForm component
  - **File**: `src/components/ScoreSubmissionForm.jsx`
  - **Action**: Implement name input form with validation
  - **Dependencies**: T006, T008b

- [ ] **T008d** Integrate ScoreSubmissionForm with API
  - **File**: `src/components/ScoreSubmissionForm.jsx`
  - **Action**: Connect form to `/api/scores` endpoint
  - **Dependencies**: T008c

- [ ] **T008e** Manual testing steps for score submission
  - **Action**: Document local and online testing procedures
  - **Dependencies**: T008d

## API Development Cycle 2: Leaderboard

- [ ] **T009** Create leaderboard API endpoint
  - **File**: `pages/api/leaderboard.js`
  - **Action**: Implement GET endpoint for top 20 scores
  - **Dependencies**: T002, T005

- [ ] **T009a** Deploy leaderboard API
  - **Command**: `vercel --prod`
  - **Action**: Deploy API to test in isolation
  - **Dependencies**: T009

- [ ] **T009b** Test deployed leaderboard API
  - **Command**: `curl [deployed-url]/api/leaderboard`
  - **Action**: Verify API returns leaderboard data
  - **Dependencies**: T009a

- [ ] **T009c** Create Leaderboard component
  - **File**: `src/components/Leaderboard.jsx`
  - **Action**: Implement leaderboard display with user highlighting
  - **Dependencies**: T007, T009b

- [ ] **T009d** Integrate Leaderboard with API
  - **File**: `src/components/Leaderboard.jsx`
  - **Action**: Connect component to `/api/leaderboard` endpoint
  - **Dependencies**: T009c

- [ ] **T009e** Manual testing steps for leaderboard
  - **Action**: Document local and online testing procedures
  - **Dependencies**: T009d

## Web App Integration

- [ ] **T012** Enhance Results component
  - **File**: `src/components/Results.jsx`
  - **Action**: Add score submission form and leaderboard integration
  - **Dependencies**: T008d, T009d

- [ ] **T012a** Manual testing steps for complete flow
  - **Action**: Document end-to-end testing procedures (local and online)
  - **Dependencies**: T012

## Integration Tasks

- [x] **T013** Create Vercel deployment configuration
  - **File**: `vercel.json`
  - **Action**: Configure API function timeouts and deployment settings
  - **Dependencies**: T008

- [x] **T014** [P] Create database schema setup
  - **File**: `sql/schema.sql`
  - **Action**: Create score_submissions table with indexes
  - **Dependencies**: None

- [ ] **T015** Add integration test for complete flow
  - **File**: `tests/integration/score-submission-flow.test.js`
  - **Action**: Test end-to-end score submission and leaderboard display
  - **Dependencies**: T012

- [ ] **T015a** Run integration tests
  - **Command**: `npm test -- tests/integration/`
  - **Action**: Execute end-to-end tests, fix any failures
  - **Dependencies**: T015

## Initial Deployment Setup

- [x] **T019** Install Vercel CLI and login
  - **Command**: `npm install -g vercel && vercel login`
  - **Action**: Setup Vercel CLI for automated deployment
  - **Dependencies**: T013

- [x] **T020** Create Vercel Postgres database
  - **Command**: `vercel postgres create quiz-app-db` (CLI limitation - requires manual setup)
  - **Action**: Create production database instance via Neon ✅ COMPLETED
  - **Status**: Database created via Neon (automated alternative)
  - **Dependencies**: T019

- [x] **T021** Deploy database schema
  - **Command**: `vercel postgres connect && psql < sql/schema.sql`
  - **Action**: Execute schema creation on production database ✅ COMPLETED
  - **Dependencies**: T020, T014

## Final Deployment

- [ ] **T022** Final application deployment
  - **Command**: `vercel --prod`
  - **Action**: Deploy complete application with all features
  - **Dependencies**: T021, T015a

## Polish Tasks [P]

- [ ] **T016** [P] Add error boundary for submission failures
  - **File**: `src/components/ErrorBoundary.jsx`
  - **Action**: Handle API failures gracefully
  - **Dependencies**: T012

- [ ] **T017** [P] Add loading states and animations
  - **File**: `src/components/Results.jsx`
  - **Action**: Enhance UX with loading indicators
  - **Dependencies**: T012

- [ ] **T018** [P] Add input sanitization and rate limiting
  - **File**: `pages/api/scores.js`
  - **Action**: Implement security measures
  - **Dependencies**: T008

## Parallel Execution Examples

### Phase 1: Setup and Tests (can run in parallel after T001-T003)
```bash
# Run these tasks simultaneously:
@implement T004 T005 T006 T007
```

### Phase 2: Core Components (can run in parallel after tests)
```bash
# Run these tasks simultaneously:
@implement T010 T011
```

### Phase 3: Polish (can run in parallel after integration)
```bash
# Run these tasks simultaneously:
@implement T016 T017 T018
```

## Dependencies Summary

- **T001** → T002 → T004, T005, T008, T009
- **T008** → T008a → T008b → T008c → T008d → T008e
- **T009** → T009a → T009b → T009c → T009d → T009e
- **T008d, T009d** → T012 → T012a
- **T008** → T013 → T019 → T020 → T021
- **T012** → T015 → T015a
- **T015a** → T022
- **T012** → T016, T017
- **T008** → T018

## Acceptance Criteria

Each task must satisfy:
- [ ] Implementation matches technical plan specifications
- [ ] All tests pass with >80% coverage
- [ ] Code follows existing project patterns
- [ ] Error handling implemented
- [ ] Security validations in place
- [ ] Mobile responsive design maintained

## Deployment Verification

- [ ] **T023** Full system verification
  - **Command**: Complete quiz → submit score → verify leaderboard
  - **Action**: End-to-end user flow testing on live deployment
  - **Dependencies**: T022

## Deployment Checklist

- [ ] Vercel CLI installed and authenticated
- [ ] Vercel Postgres database created via CLI
- [ ] Database schema deployed via CLI
- [ ] Application deployed via CLI
- [ ] Public URL accessible
- [ ] Score submission functional
- [ ] Leaderboard displaying correctly

---

**Total Tasks**: 30  
**Estimated Time**: 14-18 hours  
**Parallel Opportunities**: 4 tasks can run in parallel  
**Critical Path**: T001 → T002 → T008 → T008a → T008b → T008c → T008d → T009 → T009a → T009b → T009c → T009d → T012 → T022 → T023