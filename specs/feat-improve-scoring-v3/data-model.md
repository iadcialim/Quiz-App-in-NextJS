# Data Model: Improve Quiz Results Scoring v3

**Feature**: Enhanced quiz results scoring with new formulas  
**Date**: 2024-12-19  
**Status**: Complete

## Core Entities

### QuizMetrics
Input data for quiz scoring calculations.

```javascript
interface QuizMetrics {
  totalQuestions: number;    // Total number of questions in quiz
  correct: number;           // Number of correct answers
  wrong: number;             // Number of wrong answers  
  timeSpentMs: number;       // Total time taken in milliseconds
}
```

**Validation Rules**:
- `totalQuestions` must be positive integer
- `correct + wrong` should not exceed `totalQuestions`
- `timeSpentMs` must be non-negative
- All fields required for scoring calculation

### EggGameMetrics
Input data for egg juggling game scoring calculations.

```javascript
interface EggGameMetrics {
  eggsDropped: number;       // Number of eggs that hit the bottom
  eggsProduced: number;      // Total number of eggs spawned
  juggles: number;           // Number of successful egg bounces
  totalEggsIntroduced: number; // Total eggs introduced to game
}
```

**Validation Rules**:
- All fields must be non-negative integers
- `eggsDropped` should not exceed `eggsProduced`
- `juggles` represents successful interactions
- `totalEggsIntroduced` used for efficiency penalty calculation

### QuizScore
Calculated result from quiz performance metrics.

```javascript
interface QuizScore {
  points: number;            // Final calculated score
  breakdown: {
    accuracyScore: number;   // Points from correct/wrong answers
    speedBonus: number;      // Bonus points from time performance
    maxPossibleTime: number; // Maximum time allowed (questions × 10s)
    speedFactor: number;     // Calculated speed efficiency (0-1)
  };
  percentage: number;        // Accuracy percentage (correct/total)
}
```

**Calculation Rules**:
- `accuracyScore = (correct × 100) - (wrong × 50)`
- `maxPossibleTime = totalQuestions × 10` (seconds)
- `speedFactor = (maxPossibleTime - actualTime) / maxPossibleTime`
- `speedBonus = speedFactor × 500`
- `points = accuracyScore + speedBonus`
- `percentage = (correct / totalQuestions) × 100`

### EggGameScore
Calculated result from egg juggling game performance.

```javascript
interface EggGameScore {
  points: number;            // Final calculated score
  breakdown: {
    bouncePoints: number;    // Points earned from successful juggles
    dropPenalty: number;     // Penalty for dropped eggs
    efficiencyPenalty: number; // Penalty for excess eggs (>5)
    excessEggs: number;      // Number of eggs above optimal (5)
  };
}
```

**Calculation Rules**:
- `bouncePoints = juggles × 10`
- `dropPenalty = eggsDropped × 200`
- `excessEggs = max(0, totalEggsIntroduced - 5)`
- `efficiencyPenalty = excessEggs × 100`
- `points = bouncePoints - dropPenalty - efficiencyPenalty`

## UI Components

### ResultCard
Individual metric display component.

```javascript
interface ResultCardProps {
  title: string;             // Display name for the metric
  value: number | string;    // Metric value to display
  icon?: ReactNode;          // Optional icon for visual enhancement
  format?: 'number' | 'percentage' | 'time'; // Display formatting
  className?: string;        // Additional CSS classes
}
```

**Display Rules**:
- `format: 'number'`: Display as integer with commas
- `format: 'percentage'`: Display with % symbol
- `format: 'time'`: Display as MM:SS format
- Default format is 'number'

### ResultSection
Container for grouped metric cards.

```javascript
interface ResultSectionProps {
  title: string;             // Section title (e.g., "Quiz Results")
  cards: ResultCardProps[];  // Array of cards to display
  className?: string;        // Additional CSS classes
  visible?: boolean;         // Conditional display control
}
```

**Layout Rules**:
- Cards arranged in responsive grid (2-3 columns based on screen size)
- Section only renders when `visible` is true
- Title displayed prominently above cards
- Consistent spacing and styling

## State Management

### Enhanced PointsContext
Extended context for comprehensive scoring data.

```javascript
interface PointsContextValue {
  // Existing fields (maintained for compatibility)
  points: number;
  
  // New quiz scoring fields
  quizMetrics: QuizMetrics;
  quizScore: QuizScore;
  
  // New egg game scoring fields  
  eggGameMetrics?: EggGameMetrics;
  eggGameScore?: EggGameScore;
  eggGameActive: boolean;
  
  // Utility functions
  calculateQuizScore: (metrics: QuizMetrics) => QuizScore;
  calculateEggGameScore: (metrics: EggGameMetrics) => EggGameScore;
  updateQuizMetrics: (metrics: QuizMetrics) => void;
  updateEggGameMetrics: (metrics: EggGameMetrics) => void;
}
```

**State Transitions**:
1. Quiz completion → `updateQuizMetrics()` → `calculateQuizScore()`
2. Egg game completion → `updateEggGameMetrics()` → `calculateEggGameScore()`
3. Results display → render sections based on available data

## Validation & Error Handling

### Input Validation
```javascript
function validateQuizMetrics(metrics: QuizMetrics): ValidationResult {
  const errors = [];
  
  if (metrics.totalQuestions <= 0) {
    errors.push('Total questions must be positive');
  }
  
  if (metrics.correct + metrics.wrong > metrics.totalQuestions) {
    errors.push('Answered questions exceed total questions');
  }
  
  if (metrics.timeSpentMs < 0) {
    errors.push('Time spent cannot be negative');
  }
  
  return { valid: errors.length === 0, errors };
}
```

### Error States
- **Invalid Metrics**: Display error message, fallback to basic scoring
- **Missing Data**: Hide affected sections, show available data only
- **Calculation Errors**: Log error, display zero score with explanation

## Data Flow

```
Quiz Completion
    ↓
QuizMetrics Collection
    ↓
QuizScore Calculation
    ↓
PointsContext Update
    ↓
Results Component Render
    ↓
Quiz Section Display

Egg Game Completion (if active)
    ↓
EggGameMetrics Collection
    ↓
EggGameScore Calculation
    ↓
PointsContext Update
    ↓
Egg Juggling Section Display
```

## Testing Considerations

### Unit Test Data
```javascript
// Example test data for quiz scoring
const mockQuizMetrics = {
  totalQuestions: 10,
  correct: 8,
  wrong: 2,
  timeSpentMs: 40000 // 40 seconds
};

// Expected quiz score result
const expectedQuizScore = {
  points: 1000, // (8×100 - 2×50) + ((100-40)/100 × 500)
  breakdown: {
    accuracyScore: 700,
    speedBonus: 300,
    maxPossibleTime: 100,
    speedFactor: 0.6
  },
  percentage: 80
};
```

### Edge Cases
- Zero correct answers
- Maximum time exceeded
- No egg game activity
- All eggs dropped
- Perfect performance scenarios