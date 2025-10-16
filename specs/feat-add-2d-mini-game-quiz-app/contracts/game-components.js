/**
 * Component Contracts for 2D Egg-Juggling Mini-Game
 * These interfaces define the expected props and behavior for game components
 */

// EggJugglingGame Component Contract
export const EggJugglingGameProps = {
  // Required props
  isQuizActive: 'boolean',      // Whether quiz is currently running
  onScoreUpdate: 'function',    // Callback: (miniGameScore) => void
  
  // Optional props
  width: 'number',              // Canvas width (default: 300)
  height: 'number',             // Canvas height (default: 400)
  settings: 'GameSettings',     // Game configuration object
  className: 'string'           // Additional CSS classes
};

// GameCanvas Component Contract
export const GameCanvasProps = {
  // Required props
  width: 'number',              // Canvas width in pixels
  height: 'number',             // Canvas height in pixels
  gameState: 'GameState',       // Current game state object
  onEggTap: 'function',         // Callback: (eggId) => void
  
  // Optional props
  backgroundColor: 'string',    // Canvas background color
  debugMode: 'boolean'          // Show debug information
};

// GameSettings Component Contract
export const GameSettingsProps = {
  // Required props
  settings: 'GameSettings',     // Current settings object
  onSettingsChange: 'function', // Callback: (newSettings) => void
  
  // Optional props
  disabled: 'boolean',          // Disable all controls
  compact: 'boolean'            // Compact layout mode
};

// Custom Hooks Contracts

// useGameState Hook Contract
export const useGameStateReturn = {
  // State
  gameState: 'GameState',       // Current game state
  isLoading: 'boolean',         // Loading state
  error: 'string|null',         // Error message if any
  
  // Actions
  startGame: 'function',        // () => void
  stopGame: 'function',         // () => void
  pauseGame: 'function',        // () => void
  resumeGame: 'function',       // () => void
  updateSettings: 'function',   // (settings) => void
  bounceEgg: 'function',        // (eggId) => void
  resetScore: 'function'        // () => void
};

// useGamePhysics Hook Contract
export const useGamePhysicsReturn = {
  // Physics functions
  updateEggPhysics: 'function', // (egg, deltaTime) => Egg
  checkCollisions: 'function',  // (eggs, canvasSize) => CollisionResult[]
  spawnEgg: 'function',         // (canvasSize) => Egg
  removeExpiredEggs: 'function' // (eggs, canvasSize) => Egg[]
};

// Event Handlers Contract
export const GameEventHandlers = {
  onGameStart: 'function',      // () => void
  onGameEnd: 'function',        // (finalScore) => void
  onEggBounce: 'function',      // (eggId, score) => void
  onEggDrop: 'function',        // (eggId, penalty) => void
  onSettingsChange: 'function', // (newSettings) => void
  onError: 'function'           // (error) => void
};

// Integration Contracts

// Quiz Integration Contract
export const QuizIntegrationContract = {
  // Methods quiz page must implement
  registerMiniGame: 'function', // (gameInstance) => void
  updateTotalScore: 'function', // (quizScore, miniGameScore) => void
  onQuizComplete: 'function',   // (finalScores) => void
  
  // Properties quiz page must provide
  quizSettings: 'object',       // Quiz configuration
  currentQuestion: 'number',    // Current question index
  timeRemaining: 'number'       // Quiz time left in seconds
};