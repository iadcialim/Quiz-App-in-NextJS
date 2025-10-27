# Data Model: Improved Scoring System

**Feature**: `feat-improve-scoring-v2`  
**Date**: 2025-10-27

## Overview

This document defines all data structures, entities, and their relationships for the improved scoring system. All entities are client-side TypeScript/JavaScript objects with no persistence layer.

## Entity Definitions

### 1. QuizMetrics

**Purpose**: Input data for quiz scoring calculations

**Type Definition**:
```javascript
{
  totalQuestions: number,   // Total number of questions in the quiz
  correct: number,          // Count of correct answers
  wrong: number,            // Count of incorrect answers  
  timeTaken: number         // Total time spent in seconds
}
```

**Validation Rules**:
- `totalQuestions` >= 0 (integer)
- `correct` >= 0 (integer)
- `wrong` >= 0 (integer)
- `correct + wrong` <= `totalQuestions`
- `timeTaken` >= 0 (float, seconds)

**Example**:
```javascript
const quizMetrics = {
  totalQuestions: 10,
  correct: 8,
  wrong: 2,
  timeTaken: 40.5
};
```

---

### 2. QuizScore

**Purpose**: Output from quiz scoring calculations with breakdown

**Type Definition**:
```javascript
{
  accuracyScore: number,    // Points from correct/wrong answers
  speedBonus: number,       // Bonus points for quick completion (0-500)
  finalScore: number,       // accuracyScore + speedBonus
  percentage: number        // (correct / totalQuestions) × 100
}
```

**Calculation Rules**:
- `accuracyScore` = (correct × 100) - (wrong × 50)
- `speedBonus` = speedFactor × 500, where speedFactor ∈ [0, 1]
- `speedFactor` = max(0, timeSaved / maxPossibleTime)
- `timeSaved` = maxPossibleTime - timeTaken
- `maxPossibleTime` = totalQuestions × 10 seconds
- `finalScore` = accuracyScore + speedBonus
- `percentage` = (correct / totalQuestions) × 100

**Range**:
- `accuracyScore`: Can be negative (if many wrong answers)
- `speedBonus`: [0, 500]
- `finalScore`: No limits (can be negative)
- `percentage`: [0, 100]

**Example**:
```javascript
const quizScore = {
  accuracyScore: 700,    // (8×100) - (2×50) = 700
  speedBonus: 300,       // (60/100) × 500 = 300
  finalScore: 1000,      // 700 + 300
  percentage: 80         // (8/10) × 100
};
```

---

### 3. GameMetrics

**Purpose**: Input data for egg juggling game scoring

**Type Definition**:
```javascript
{
  juggles: number,          // Successful egg bounces (taps)
  drops: number,            // Eggs that hit the bottom
  eggsIntroduced: number,   // Total eggs spawned during game
  timePlayed: number        // Game duration in seconds
}
```

**Validation Rules**:
- `juggles` >= 0 (integer)
- `drops` >= 0 (integer)
- `eggsIntroduced` >= 0 (integer)
- `juggles + drops` <= total interactions (soft rule)
- `timePlayed` >= 0 (float, seconds)

**Example**:
```javascript
const gameMetrics = {
  juggles: 200,
  drops: 1,
  eggsIntroduced: 6,
  timePlayed: 120.5
};
```

---

### 4. GameScore

**Purpose**: Output from game scoring calculations with penalty breakdown

**Type Definition**:
```javascript
{
  bouncePoints: number,       // Points from successful juggles
  dropPenalty: number,        // Penalty for dropped eggs
  efficiencyPenalty: number,  // Penalty for excess eggs
  totalPenalty: number,       // dropPenalty + efficiencyPenalty
  finalScore: number          // bouncePoints - totalPenalty
}
```

**Calculation Rules**:
- `bouncePoints` = juggles × 10
- `dropPenalty` = drops × 200
- `excessEggs` = max(0, eggsIntroduced - 5)
- `efficiencyPenalty` = excessEggs × 100
- `totalPenalty` = dropPenalty + efficiencyPenalty
- `finalScore` = bouncePoints - totalPenalty

**Range**:
- `bouncePoints`: [0, ∞)
- `dropPenalty`: [0, ∞)
- `efficiencyPenalty`: [0, ∞)
- `totalPenalty`: [0, ∞)
- `finalScore`: Can be negative

**Example**:
```javascript
const gameScore = {
  bouncePoints: 2000,        // 200 × 10
  dropPenalty: 200,          // 1 × 200
  efficiencyPenalty: 100,    // (6-5) × 100
  totalPenalty: 300,         // 200 + 100
  finalScore: 1700           // 2000 - 300
};
```

---

### 5. ScoringConstants

**Purpose**: Centralized scoring weights and thresholds

**Type Definition**:
```javascript
{
  QUIZ: {
    CORRECT_WEIGHT: 100,            // Points per correct answer
    WRONG_PENALTY: 50,              // Points deducted per wrong answer
    MAX_TIME_PER_QUESTION: 10,      // Seconds allowed per question
    MAX_SPEED_BONUS: 500            // Maximum bonus for speed
  },
  GAME: {
    BOUNCE_WEIGHT: 10,              // Points per successful juggle
    DROP_PENALTY: 200,              // Points deducted per dropped egg
    EFFICIENCY_PENALTY: 100,        // Points deducted per excess egg
    IDEAL_MIN_EGGS: 5               // Threshold for efficiency penalty
  }
}
```

**Immutability**: These constants should be frozen (`Object.freeze`) to prevent accidental modification.

**File Location**: `src/constants/scoring.js`

---

### 6. ResultsProps (Component Interface)

**Purpose**: Props interface for Results component

**Type Definition**:
```javascript
{
  // Existing props (maintained for backward compatibility)
  score: number,                    // Final combined score
  totalQuestions: number,
  correctAnswers: number,
  wrongAnswers: number,
  unattemptedQuestions: number,
  percentage: number,
  timeSpent: number,
  averageTimePerQuestion: number,
  miniGameScore: number,
  
  // NEW props for detailed scoring
  quizBreakdown: QuizScore,         // Detailed quiz scoring breakdown
  gameBreakdown: GameScore,         // Detailed game scoring breakdown
  gameMetrics: GameMetrics,         // Raw game metrics for display
  gameActive: boolean               // Whether mini-game was played
}
```

**Usage Example**:
```jsx
<Results
  score={1700}
  totalQuestions={10}
  correctAnswers={8}
  wrongAnswers={2}
  unattemptedQuestions={0}
  percentage={80}
  timeSpent={40.5}
  averageTimePerQuestion={4.05}
  miniGameScore={700}
  quizBreakdown={{
    accuracyScore: 700,
    speedBonus: 300,
    finalScore: 1000,
    percentage: 80
  }}
  gameBreakdown={{
    bouncePoints: 2000,
    dropPenalty: 200,
    efficiencyPenalty: 100,
    totalPenalty: 300,
    finalScore: 1700
  }}
  gameMetrics={{
    juggles: 200,
    drops: 1,
    eggsIntroduced: 6,
    timePlayed: 120.5
  }}
  gameActive={true}
/>
```

---

## Entity Relationships

```
┌─────────────────┐
│  QuizMetrics    │
│  (Input)        │
└────────┬────────┘
         │
         │ computeQuizScore()
         ▼
┌─────────────────┐
│   QuizScore     │
│   (Output)      │
└─────────────────┘


┌─────────────────┐
│  GameMetrics    │
│  (Input)        │
└────────┬────────┘
         │
         │ computeGameScore()
         ▼
┌─────────────────┐
│   GameScore     │
│   (Output)      │
└─────────────────┘


┌─────────────────┐      ┌─────────────────┐
│   QuizScore     │      │   GameScore     │
└────────┬────────┘      └────────┬────────┘
         │                        │
         └────────┬───────────────┘
                  │
                  │ Displayed together
                  ▼
         ┌─────────────────┐
         │  Results (UI)   │
         │  - Quiz section │
         │  - Game section │
         └─────────────────┘
```

---

## State Management

### PointsContext Updates

**Current State**:
```javascript
{
  points: number,              // Total combined score
  miniGameScore: number,       // Simple game score
  bonusMultiplier: number      // Multiplier value
}
```

**Updated State** (backward compatible):
```javascript
{
  points: number,              // KEEP: Total combined score
  miniGameScore: number,       // KEEP: Game score (for compatibility)
  bonusMultiplier: number,     // KEEP: Multiplier
  
  // NEW: Detailed breakdowns
  quizBreakdown: QuizScore | null,
  gameBreakdown: GameScore | null
}
```

**New Methods**:
```javascript
// Store quiz scoring breakdown
setQuizBreakdown(breakdown: QuizScore): void

// Store game scoring breakdown  
setGameBreakdown(breakdown: GameScore): void

// Combined update (replaces updateTotalScore)
updateScoring(quizBreakdown: QuizScore, gameBreakdown: GameScore | null): void
```

---

### GameContext Updates

**Current State**:
```javascript
{
  gameScore: number,
  gameSettings: {...},
  gameStats: {
    eggsJuggled: number,       // Unused currently
    eggsDropped: number,
    totalInteractions: number,
    bonusMultiplier: number
  }
}
```

**Updated State**:
```javascript
{
  gameScore: number,           // KEEP: For compatibility
  gameSettings: {...},         // KEEP: No changes
  gameStats: {
    eggsJuggled: number,       // UPDATE: Now used for juggles count
    eggsDropped: number,       // KEEP: Drops count
    eggsProduced: number,      // NEW: Total eggs spawned
    totalInteractions: number, // KEEP: For reference
    bonusMultiplier: number,   // KEEP: For compatibility
    timePlayed: number         // NEW: Game duration in seconds
  }
}
```

**New Methods**: None - existing `updateGameStats` handles new fields

---

## Data Flow

### Quiz Flow

1. User completes quiz → Quiz component collects metrics
2. Quiz component calls `computeQuizScore(quizMetrics)`
3. Resulting `QuizScore` stored in PointsContext
4. Results component receives `quizBreakdown` prop
5. Results displays Quiz Results section with 5 cards

### Game Flow

1. User plays egg juggling → GameContext tracks metrics in real-time
2. On game end, GameContext has complete `GameMetrics`
3. Scoring utility calls `computeGameScore(gameMetrics)`
4. Resulting `GameScore` stored in PointsContext
5. Results component receives `gameBreakdown` and `gameMetrics` props
6. Results displays Game Results section with 5 cards (if game was active)

### Combined Flow

1. Both scores calculated independently
2. PointsContext holds both breakdowns
3. Results component receives all data via props/context
4. Results displays two sections side-by-side
5. No legacy "You scored X out of Y" text

---

## Validation & Error Handling

### Input Validation

**Quiz Metrics**:
```javascript
function validateQuizMetrics(metrics) {
  if (typeof metrics.totalQuestions !== 'number' || metrics.totalQuestions < 0) {
    throw new Error('totalQuestions must be a non-negative number');
  }
  // ... similar for other fields
  
  if (metrics.correct + metrics.wrong > metrics.totalQuestions) {
    console.warn('Correct + Wrong exceeds total questions, capping values');
    // Auto-correct if possible
  }
}
```

**Game Metrics**:
```javascript
function validateGameMetrics(metrics) {
  // Ensure all fields are non-negative numbers
  // Log warnings for unusual values (e.g., 0 eggs produced but juggles > 0)
}
```

### Calculation Edge Cases

**Division by Zero**:
- Percentage calculation when `totalQuestions = 0` → return 0
- Speed factor when `maxPossibleTime = 0` → return 0

**Negative Scores**:
- Allowed for both quiz and game final scores
- Display negative values clearly in UI

**Overflow Protection**:
- JavaScript handles large numbers automatically
- No special overflow handling needed

---

## Testing Data

### Test Case 1: Perfect Speed Run

```javascript
// Input
const quizMetrics = {
  totalQuestions: 10,
  correct: 10,
  wrong: 0,
  timeTaken: 0
};

// Expected Output
const expectedQuizScore = {
  accuracyScore: 1000,    // 10 × 100 = 1000
  speedBonus: 500,        // (100/100) × 500 = 500
  finalScore: 1500,
  percentage: 100
};
```

### Test Case 2: Mixed Performance

```javascript
// Input
const quizMetrics = {
  totalQuestions: 10,
  correct: 8,
  wrong: 2,
  timeTaken: 40
};

// Expected Output  
const expectedQuizScore = {
  accuracyScore: 700,     // (8×100) - (2×50) = 700
  speedBonus: 300,        // (60/100) × 500 = 300
  finalScore: 1000,
  percentage: 80
};
```

### Test Case 3: Egg Juggling Master

```javascript
// Input
const gameMetrics = {
  juggles: 200,
  drops: 1,
  eggsIntroduced: 6,
  timePlayed: 120
};

// Expected Output
const expectedGameScore = {
  bouncePoints: 2000,     // 200 × 10
  dropPenalty: 200,       // 1 × 200
  efficiencyPenalty: 100, // (6-5) × 100
  totalPenalty: 300,
  finalScore: 1700
};
```

### Test Case 4: No Game Played

```javascript
// Input
const gameMetrics = null;  // or {juggles: 0, drops: 0, eggsIntroduced: 0, timePlayed: 0}

// Expected Output
const expectedGameScore = null;  // or {bouncePoints: 0, dropPenalty: 0, ...finalScore: 0}

// UI Behavior
// - Game Results section is hidden
// - Only Quiz Results section displayed
```

---

## Migration Notes

### Backward Compatibility

**Existing Code** that uses simple scores will continue to work:
- `points` in PointsContext still represents total score
- `miniGameScore` still available
- `bonusMultiplier` still calculated

**New Code** can access detailed breakdowns:
- `quizBreakdown` for accuracy/speed breakdown
- `gameBreakdown` for bounce/penalty breakdown

### Deprecation Plan

**No deprecations** - all existing fields maintained for compatibility.

Future enhancement could consolidate scoring, but not required for this feature.

---

## Summary

✅ **5 core entities defined** (QuizMetrics, QuizScore, GameMetrics, GameScore, ScoringConstants)  
✅ **Data flow documented** (Quiz → Scoring → Context → UI)  
✅ **Validation rules specified** (Type checks, range validation)  
✅ **Test cases provided** (4 scenarios with expected outputs)  
✅ **Backward compatibility ensured** (Existing props maintained)  
✅ **Error handling defined** (Edge cases, validation)

**Status**: Data model complete, ready for contract implementation

---

_All entities validated against functional requirements FR-001 through FR-026_
