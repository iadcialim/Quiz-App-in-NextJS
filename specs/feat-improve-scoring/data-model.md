````markdown
# Data Model: Improve results and egg-game scoring

## Entities

- **QuizMetrics**
  - totalQuestions: integer >= 0
  - correct: integer >= 0
  - wrong: integer >= 0
  - timeSpentMs: integer >= 0

- **QuizScore**
  - points: number (can be integer or float depending on formula)
  - breakdown: object { correctPoints, timeBonus, penalty }
  - percentage: number 0..100

- **EggGameMetrics**
  - eggsDropped: integer >= 0
  - eggsProduced: integer >= 0
  - juggles: integer >= 0
  - timeSpentMs: integer >= 0

- **EggGameScore**
  - points: number
  - breakdown: object { dropsPenalty, jugglesBonus }

- **CombinedScore**
  - quizPoints: number
  - eggGamePoints: number
  - totalPoints: number

## Validation Rules

- All numeric fields must be non-negative; totals must be consistent (correct + wrong <= totalQuestions).
- Time fields must be provided in milliseconds; very large values should be clamped or validated by integration tests.

````
