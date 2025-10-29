# Feature Specification: Improve Quiz Results Scoring v3

> **Reference**: `improve-scoring-v3`
>
> _This specification uses context from the reference folder to ensure consistency with existing patterns and implementations._

**Feature Branch**: `feat-improve-scoring`  
**Created**: 2024-12-19  
**Status**: Draft  
**Input**: User description: "Improve the scoring v3 -ref improve-scoring-v3"

## Execution Flow (main)

```
1. Parse user description from Input
   → Feature: Enhanced quiz results scoring with new formulas
2. Extract key concepts from description
   → Actors: quiz participants, game players
   → Actions: view results, calculate scores, display metrics
   → Data: quiz metrics, egg game metrics, scoring formulas
   → Constraints: specific card layouts, formula implementations
3. For each unclear aspect:
   → All requirements clearly specified in reference materials
4. Fill User Scenarios & Testing section
   → Clear user flow: complete quiz → view enhanced results
5. Generate Functional Requirements
   → Each requirement testable and measurable
6. Identify Key Entities (scoring metrics, result cards)
7. Run Review Checklist
   → No clarifications needed, implementation ready
8. Return: SUCCESS (spec ready for planning)
```

---

## Reference Context

**Reference Folder**: `improve-scoring-v3`
**Purpose**: Provide enhanced scoring formulas and results layout specifications

### Key Insights from Reference Material

#### Architecture & Patterns

- Results page organized into distinct sections for Quiz and Egg Juggling
- Card-based layout displaying specific metrics for each section
- New scoring formulas with accuracy and speed components
- Penalty system for egg juggling efficiency

#### Code Examples & Interfaces

- Quiz scoring: Accuracy Score + Speed Bonus calculation
- Egg juggling scoring: Bounce points - Total Penalty (drops + efficiency)
- Fixed weights: Correct Answer (100), Wrong Answer Penalty (50), Max Speed Bonus (500)
- Egg game weights: Bounce (10), Drop Penalty (200), Efficiency Penalty (100)

#### Configuration & Setup

- Quiz section cards: Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points
- Egg Juggling section cards: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points
- Title change from "Quiz Result" to "Your Score"
- Removal of legacy scoring text

#### Testing Approaches

- Formula validation with example calculations
- Card rendering verification for both sections
- Score calculation accuracy testing
- UI layout and text changes validation

### Referenced Files

- `.specify/reference/improve-scoring-v3/README.md` - Requirements overview
- `NEW-QUIZ-SCORING.md` - Detailed quiz scoring formula
- `NEW-EGG-JUGGLING-SCORING.md` - Detailed egg juggling scoring formula

---

## User Scenarios & Testing

### Primary User Story

As a quiz participant, I want to see detailed scoring results with separate sections for quiz performance and egg juggling game performance, so that I can understand how my final score was calculated using the new enhanced formulas.

### Acceptance Scenarios

1. **Given** a user completes a quiz, **When** they view the Results page, **Then** the page shows "Your Score" as the title and displays a Quiz section with 5 cards: Correct Answers, Wrong Answers, Percentage, Total Time Spent, and Total Points
2. **Given** the egg juggling mini-game was active during the quiz, **When** the user views Results, **Then** an Egg Juggling section appears with 5 cards: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, and Total Points
3. **Given** quiz performance data, **When** the new scoring formula is applied, **Then** the Total Points card shows the sum of Accuracy Score (correct × 100 - wrong × 50) and Speed Bonus (time saved factor × 500)
4. **Given** egg juggling performance data, **When** the new scoring formula is applied, **Then** the Total Points card shows bounce points (juggles × 10) minus total penalty (drops × 200 + excess eggs × 100)
5. **Given** the user views the Results page, **When** examining the layout, **Then** the legacy text "You scored .. out of .. possible points" is not displayed anywhere

### Edge Cases

- What happens when the egg juggling game was not active during the quiz?
- How does the system handle zero correct answers or zero time taken?
- What occurs when the number of eggs introduced is less than or equal to 5?

## Requirements

### Functional Requirements

- **FR-001**: System MUST display "Your Score" as the Results page title instead of "Quiz Result"
- **FR-002**: System MUST remove the legacy text "You scored .. out of .. possible points" from all Results displays
- **FR-003**: System MUST create a Quiz section displaying exactly 5 cards: Correct Answers, Wrong Answers, Percentage, Total Time Spent, and Total Points
- **FR-004**: System MUST create an Egg Juggling section displaying exactly 5 cards: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, and Total Points
- **FR-005**: System MUST implement the new quiz scoring formula: Accuracy Score (correct × 100 - wrong × 50) + Speed Bonus (time saved factor × 500)
- **FR-006**: System MUST implement the new egg juggling scoring formula: Bounce Points (juggles × 10) - Total Penalty (drops × 200 + excess eggs above 5 × 100)
- **FR-007**: System MUST calculate Maximum Possible Time as Total Questions × 10 seconds for speed bonus calculation
- **FR-008**: System MUST calculate Speed Factor as (Maximum Possible Time - Actual Time) / Maximum Possible Time
- **FR-009**: System MUST only display the Egg Juggling section when the mini-game was active during the quiz
- **FR-010**: System MUST ensure all card values are calculated and displayed accurately according to the new formulas

### Key Entities

- **QuizMetrics**: Contains total questions, correct answers, wrong answers, and time taken data
- **EggGameMetrics**: Contains eggs dropped, eggs produced, egg juggles, and total eggs introduced data
- **QuizScore**: Calculated using accuracy score and speed bonus components
- **EggGameScore**: Calculated using bounce points minus drop and efficiency penalties
- **ResultCard**: Display component for individual metric values in each section
- **ResultSection**: Container for grouped cards (Quiz or Egg Juggling)

---

## Review & Acceptance Checklist

### Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed
