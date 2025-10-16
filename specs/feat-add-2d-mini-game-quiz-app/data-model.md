# Data Model: 2D Egg-Juggling Mini-Game

## Core Entities

### Egg
```javascript
{
  id: string,           // Unique identifier
  x: number,           // X position (pixels)
  y: number,           // Y position (pixels)
  velocityX: number,   // Horizontal velocity
  velocityY: number,   // Vertical velocity
  radius: number,      // Collision radius
  bounced: boolean,    // Recently bounced flag
  created: timestamp   // Creation time
}
```

**Validation Rules**:
- id: Required, unique within game session
- x: 0 to canvas width
- y: 0 to canvas height + buffer
- velocityX: -5 to 5 pixels/frame
- velocityY: -20 to 20 pixels/frame
- radius: 15-25 pixels

**State Transitions**:
- Created → Falling → (Tapped) → Bouncing → Falling → Destroyed

### GameState
```javascript
{
  isActive: boolean,        // Game running status
  eggs: Egg[],             // Active eggs array
  score: number,           // Mini-game points
  settings: GameSettings,   // Configuration
  canvas: {
    width: number,
    height: number
  },
  lastUpdate: timestamp,   // Last physics update
  spawnTimer: number      // Next egg spawn countdown
}
```

**Validation Rules**:
- eggs: Maximum 10 active eggs
- score: Can be negative
- canvas: Minimum 200x300 pixels
- spawnTimer: 0 to 5000ms

### GameSettings
```javascript
{
  enabled: boolean,        // Game on/off toggle
  eggQuantity: number,     // Max concurrent eggs
  spawnRate: number,       // Eggs per minute
  difficulty: string,      // 'easy' | 'medium' | 'hard'
  soundEnabled: boolean    // Audio feedback
}
```

**Validation Rules**:
- eggQuantity: 1-10 eggs
- spawnRate: 5-30 eggs per minute
- difficulty: Enum validation

### GameScore
```javascript
{
  miniGamePoints: number,   // Points from egg juggling
  bonusMultiplier: number,  // Quiz score multiplier
  eggsJuggled: number,     // Successfully bounced
  eggsDropped: number,     // Hit bottom
  totalInteractions: number // Total taps/clicks
}
```

**Calculation Rules**:
- +1 point per successful bounce
- -1 point per dropped egg
- Bonus multiplier: 1.0 + (eggsJuggled * 0.1)
- Final quiz score: (quiz points * bonusMultiplier) + miniGamePoints

## Relationships

```
QuizContext
    ↓ (provides scoring integration)
GameContext
    ↓ (manages)
GameState
    ↓ (contains)
Egg[] + GameSettings + GameScore
```

## Physics Constants

```javascript
const PHYSICS = {
  GRAVITY: 0.5,           // Pixels per frame²
  BOUNCE_DAMPING: 0.7,    // Velocity retention on bounce
  SPAWN_HEIGHT: -50,      // Start position above canvas
  TERMINAL_VELOCITY: 15,  // Maximum fall speed
  BOUNCE_VELOCITY: -12,   // Initial bounce speed
  EGG_RADIUS: 20         // Standard egg size
};
```

## State Management Hooks

### useGameState
```javascript
const {
  gameState,
  startGame,
  stopGame,
  updatePhysics,
  addEgg,
  removeEgg,
  bounceEgg
} = useGameState(initialSettings);
```

### useGamePhysics
```javascript
const {
  updateEggPhysics,
  checkCollisions,
  handleBoundaryCollision,
  calculateSpawnPosition
} = useGamePhysics(canvasSize);
```