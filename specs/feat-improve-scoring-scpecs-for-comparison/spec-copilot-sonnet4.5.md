````markdown
> **Reference**: `improve-scoring-v2`
>
> _This specification uses context from the reference folder to ensure consistency with existing patterns and implementations._

# Feature Specification: Improved Scoring System with Enhanced Results Display

**Feature Branch**: `feat-improve-scoring-v2`  
**Created**: 2025-10-22  
**Status**: Draft  
**Input**: User description: "Improve the scoring v2 -ref improve-scoring-v2"

## Execution Flow (main)

```
1. Parse user description from Input
   → Feature: Enhanced scoring system with new formulas and improved results page layout
2. Extract key concepts from description
   → Actors: quiz takers, game players
   → Actions: calculate scores, display results, apply formulas
   → Data: quiz metrics, game metrics, scoring breakdowns
   → Constraints: new formula specifications, specific card displays
3. For each unclear aspect:
   → All requirements clearly specified in reference materials
4. Fill User Scenarios & Testing section
   → Clear user flow: complete quiz → view enhanced results with separated sections
5. Generate Functional Requirements
   → Each requirement testable and measurable
6. Identify Key Entities (quiz scores, game scores, metrics)
7. Run Review Checklist
   → No clarifications needed, implementation ready
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines

- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing _(mandatory)_

### Primary User Story

As a quiz participant, I want to see my quiz performance and egg juggling game performance displayed in separate, clearly organized sections with specific scoring metrics, so that I can understand my performance in each activity independently and see how the new scoring formulas reward accuracy, speed, and efficiency.

### Acceptance Scenarios

1. **Given** a user completes a quiz, **When** they view the Results page, **Then** the page displays "Your Score" as the title instead of the legacy score text
2. **Given** a user views the Results page, **When** the Quiz Results section is rendered, **Then** it shows exactly 5 cards: Correct Answers, Wrong Answers, Percentage, Total Time Spent, and Total Points
3. **Given** a user views the Results page, **When** the Egg Juggling section is rendered, **Then** it shows exactly 5 cards: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, and Total Points
4. **Given** a user answers quiz questions, **When** the quiz score is calculated, **Then** it uses the new formula: (Correct × 100) - (Wrong × 50) + Speed Bonus based on time saved
5. **Given** a user plays the egg juggling game, **When** the game score is calculated, **Then** it uses the new formula: (Juggles × 10) - (Drops × 200) - (Excess Eggs × 100)
6. **Given** a user completes the quiz quickly, **When** final scoring occurs, **Then** they receive a speed bonus proportional to time saved up to a maximum of 500 points
7. **Given** a user drops eggs in the game, **When** the game score is calculated, **Then** each dropped egg deducts 200 points from their score
8. **Given** a user introduces more than 5 eggs in the game, **When** the efficiency penalty is applied, **Then** each excess egg beyond 5 deducts 100 points

### Edge Cases

- What happens when a user answers all questions correctly in minimal time?
- How does the system handle a quiz with 0 correct answers?
- What occurs if the egg juggling game wasn't played during the quiz?
- How does the system display results when time taken exceeds maximum possible time?
- What happens when eggs produced is exactly 5 (no efficiency penalty)?

---

## Reference Context

**Reference Folder**: `improve-scoring-v2`
**Purpose**: Define new scoring formulas and results page layout requirements

### Key Insights from Reference Material

#### Architecture & Patterns

- **Separation of Concerns**: Quiz and Egg Juggling results are displayed in distinct sections
- **Card-Based Layout**: Each metric is presented in individual cards for clear visual organization
- **Formula-Driven Scoring**: All scoring calculations follow documented mathematical formulas
- **Penalty and Bonus System**: Rewards speed and accuracy while penalizing drops and inefficiency

#### Code Examples & Interfaces

- **Quiz Scoring Function**: Accepts (correct, wrong, timeTaken, totalQuestions) → Returns (finalScore, accuracyScore, speedBonus)
- **Game Scoring Function**: Accepts (juggles, drops, eggsIntroduced) → Returns (finalScore, bouncePoints, totalPenalty)
- **Results Display**: Two sections with 5 cards each, specific metrics per section

#### Configuration & Setup

**Quiz Scoring Constants**:

- Correct Answer Weight: 100 points
- Wrong Answer Penalty: 50 points
- Max Time per Question: 10 seconds
- Max Speed Bonus: 500 points

**Egg Juggling Scoring Constants**:

- Bounce Weight: 10 points
- Drop Penalty Weight: 200 points
- Efficiency Penalty Weight: 100 points
- Ideal Minimum Eggs: 5

**Results Page Layout**:

- Title: "Your Score"
- Remove legacy text: "You scored .. out of .. possible points"
- Quiz Results Cards: Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points
- Egg Juggling Cards: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points

#### Testing Approaches

- **Unit Tests**: Test scoring functions with various input combinations
- **Formula Validation**: Verify calculations match documented examples
- **Edge Case Testing**: Test boundary conditions (0 correct, max time exceeded, exactly 5 eggs)
- **Display Testing**: Verify correct cards are shown in each section
- **Integration Testing**: Ensure quiz and game scores combine correctly

### Referenced Files

- `.specify/reference/improve-scoring-v2/README.md` - Overall requirements and layout specifications
- `.specify/reference/improve-scoring-v2/NEW-QUIZ-SCORING.md` - Detailed quiz scoring formula
- `.specify/reference/improve-scoring-v2/NEW-EGG-JUGGLING-SCORING.md` - Detailed game scoring formula

---

## Requirements _(mandatory)_

### Functional Requirements

#### Results Page Display

- **FR-001**: System MUST change the Results page title to "Your Score"
- **FR-002**: System MUST remove the legacy text "You scored .. out of .. possible points" from all results displays
- **FR-003**: System MUST create a Quiz Results section displaying exactly 5 cards
- **FR-004**: System MUST display these cards in Quiz Results: Correct Answers, Wrong Answers, Percentage, Total Time Spent, Total Points
- **FR-005**: System MUST create an Egg Juggling section displaying exactly 5 cards
- **FR-006**: System MUST display these cards in Egg Juggling: Eggs Dropped, Eggs Produced, Egg Juggles, Total Time Spent, Total Points
- **FR-007**: System MUST hide the Egg Juggling section if the mini-game was not active during the quiz

#### Quiz Scoring Formula

- **FR-008**: System MUST calculate Accuracy Score as: (Number Correct × 100) - (Number Wrong × 50)
- **FR-009**: System MUST calculate Maximum Possible Time as: Total Questions × 10 seconds
- **FR-010**: System MUST calculate Time Saved as: Maximum Possible Time - Total Time Taken
- **FR-011**: System MUST calculate Speed Factor as: Time Saved ÷ Maximum Possible Time (capped between 0 and 1)
- **FR-012**: System MUST calculate Speed Bonus as: Speed Factor × 500
- **FR-013**: System MUST calculate Final Quiz Score as: Accuracy Score + Speed Bonus
- **FR-014**: System MUST display Quiz Total Points in the Quiz Results section

#### Egg Juggling Scoring Formula

- **FR-015**: System MUST calculate Bounce Points as: Number of Eggs Juggled × 10
- **FR-016**: System MUST calculate Drop Penalty as: Number of Eggs Dropped × 200
- **FR-017**: System MUST calculate Excess Eggs as: Total Eggs Introduced - 5 (minimum 0)
- **FR-018**: System MUST calculate Efficiency Penalty as: Excess Eggs × 100
- **FR-019**: System MUST calculate Total Penalty as: Drop Penalty + Efficiency Penalty
- **FR-020**: System MUST calculate Final Game Score as: Bounce Points - Total Penalty
- **FR-021**: System MUST display Game Total Points in the Egg Juggling section

#### Data Display Requirements

- **FR-022**: System MUST calculate and display Percentage as: (Correct Answers ÷ Total Questions) × 100
- **FR-023**: System MUST display Total Time Spent in both Quiz and Egg Juggling sections
- **FR-024**: System MUST track and display Eggs Dropped count
- **FR-025**: System MUST track and display Eggs Produced (Total Eggs Introduced) count
- **FR-026**: System MUST track and display Egg Juggles (successful bounces) count

### Key Entities _(include if feature involves data)_

#### Quiz Metrics

- **Total Questions**: Number of questions in the quiz
- **Number Correct**: Count of correctly answered questions
- **Number Wrong**: Count of incorrectly answered questions
- **Total Time Taken**: Time in seconds spent on the quiz
- **Accuracy Score**: Calculated score from correct/wrong answers
- **Speed Bonus**: Bonus points earned for quick completion
- **Final Quiz Score**: Total quiz points (accuracy + speed bonus)
- **Percentage**: Success rate as a percentage

#### Egg Juggling Metrics

- **Number of Eggs Juggled**: Count of successful egg bounces
- **Number of Eggs Dropped**: Count of eggs that hit the bottom
- **Total Eggs Introduced**: Total number of eggs spawned in the game
- **Bounce Points**: Points earned from juggling
- **Drop Penalty**: Points deducted for dropped eggs
- **Efficiency Penalty**: Points deducted for excess eggs
- **Total Penalty**: Combined penalties
- **Final Game Score**: Total game points (bounces - penalties)
- **Game Time Spent**: Duration of egg juggling gameplay

#### Scoring Constants

- **Correct Answer Weight**: 100 points per correct answer
- **Wrong Answer Penalty**: 50 points per wrong answer
- **Max Time per Question**: 10 seconds
- **Max Speed Bonus**: 500 points
- **Bounce Weight**: 10 points per juggle
- **Drop Penalty Weight**: 200 points per drop
- **Efficiency Penalty Weight**: 100 points per excess egg
- **Ideal Minimum Eggs**: 5 eggs (no penalty threshold)

---

## Review & Acceptance Checklist

_GATE: Automated checks run during main() execution_

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

_Updated by main() during processing_

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked (none found)
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---
````
