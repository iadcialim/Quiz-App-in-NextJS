/**
 * API Contracts for Game Engine and Physics
 * These define the core game engine interfaces and expected behavior
 */

// Game Engine API Contract
export const GameEngineAPI = {
  // Core engine methods
  initialize: {
    signature: '(canvasElement, settings) => GameEngine',
    description: 'Initialize game engine with canvas and settings',
    throws: ['InvalidCanvasError', 'InvalidSettingsError']
  },
  
  start: {
    signature: '() => void',
    description: 'Start the game loop and physics updates',
    preconditions: ['Engine must be initialized', 'Canvas must be valid']
  },
  
  stop: {
    signature: '() => void', 
    description: 'Stop the game loop and clear all eggs',
    postconditions: ['All eggs removed', 'Animation loop stopped']
  },
  
  update: {
    signature: '(deltaTime) => void',
    description: 'Update physics and game state for one frame',
    parameters: {
      deltaTime: 'number (milliseconds since last update)'
    }
  },
  
  render: {
    signature: '(context) => void',
    description: 'Render current game state to canvas context',
    parameters: {
      context: 'CanvasRenderingContext2D'
    }
  },
  
  handleInput: {
    signature: '(x, y) => boolean',
    description: 'Handle user tap/click at coordinates',
    returns: 'boolean (true if egg was hit)',
    parameters: {
      x: 'number (canvas x coordinate)',
      y: 'number (canvas y coordinate)'
    }
  }
};

// Physics Engine API Contract
export const PhysicsEngineAPI = {
  // Physics calculations
  applyGravity: {
    signature: '(egg, deltaTime) => Egg',
    description: 'Apply gravity to egg velocity and position',
    sideEffects: 'Modifies egg.velocityY and egg.y'
  },
  
  checkBoundaryCollision: {
    signature: '(egg, boundaries) => CollisionResult',
    description: 'Check if egg collides with canvas boundaries',
    returns: 'CollisionResult { hit: boolean, side: string }'
  },
  
  calculateBounce: {
    signature: '(egg, tapForce) => Egg',
    description: 'Calculate new velocity after user tap',
    parameters: {
      tapForce: 'number (0-1, tap intensity)'
    }
  },
  
  detectEggCollision: {
    signature: '(x, y, egg) => boolean',
    description: 'Check if coordinates intersect with egg',
    algorithm: 'Circular collision detection using radius'
  },
  
  spawnPosition: {
    signature: '(canvasWidth) => {x: number, y: number}',
    description: 'Generate random spawn position for new egg',
    constraints: ['x: 0 to canvasWidth', 'y: above canvas (negative)']
  }
};

// Game State Management API Contract
export const GameStateAPI = {
  // State mutations
  addEgg: {
    signature: '(egg) => void',
    description: 'Add new egg to active eggs array',
    validation: ['Unique egg ID', 'Valid position', 'Max eggs limit']
  },
  
  removeEgg: {
    signature: '(eggId) => boolean',
    description: 'Remove egg from active eggs array',
    returns: 'boolean (true if egg was found and removed)'
  },
  
  updateScore: {
    signature: '(points, reason) => void',
    description: 'Update mini-game score with points and reason',
    parameters: {
      points: 'number (positive or negative)',
      reason: 'string (bounce|drop|bonus)'
    }
  },
  
  getGameStats: {
    signature: '() => GameStats',
    description: 'Get current game statistics',
    returns: 'GameStats { score, eggsJuggled, eggsDropped, accuracy }'
  },
  
  resetGame: {
    signature: '() => void',
    description: 'Reset game to initial state',
    postconditions: ['Empty eggs array', 'Zero score', 'Default settings']
  }
};

// Settings Management API Contract
export const SettingsAPI = {
  // Settings operations
  updateSettings: {
    signature: '(newSettings) => void',
    description: 'Update game settings with validation',
    validation: ['Valid egg quantity (1-10)', 'Valid spawn rate', 'Valid difficulty']
  },
  
  getSettings: {
    signature: '() => GameSettings',
    description: 'Get current game settings',
    returns: 'Immutable copy of current settings'
  },
  
  resetToDefaults: {
    signature: '() => void',
    description: 'Reset all settings to default values'
  },
  
  validateSettings: {
    signature: '(settings) => ValidationResult',
    description: 'Validate settings object',
    returns: 'ValidationResult { valid: boolean, errors: string[] }'
  }
};

// Error Handling Contract
export const GameErrorTypes = {
  InvalidCanvasError: 'Canvas element is null or invalid',
  InvalidSettingsError: 'Settings object is malformed or invalid',
  PhysicsError: 'Physics calculation failed',
  RenderError: 'Canvas rendering failed',
  StateError: 'Game state is corrupted or invalid'
};

// Performance Contract
export const PerformanceContract = {
  targetFrameRate: 60,          // Target FPS
  maxFrameTime: 16.67,          // Max milliseconds per frame
  maxActiveEggs: 10,            // Maximum concurrent eggs
  memoryUsage: '<50MB',         // Maximum memory usage
  startupTime: '<100ms'         // Maximum initialization time
};