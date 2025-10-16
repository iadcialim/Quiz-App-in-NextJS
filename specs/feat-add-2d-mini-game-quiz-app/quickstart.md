# Quickstart: 2D Egg-Juggling Mini-Game

## Development Setup

### Prerequisites
- Node.js 18+ installed
- Next.js 14.2.13 project running
- React 18 with hooks support

### Installation Steps

1. **Clone and navigate to project**
   ```bash
   cd Quiz-App-in-NextJS
   npm install
   ```

2. **Verify existing dependencies**
   ```bash
   # Should already be installed in package.json
   npm list react react-dom next
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Quick Integration Test

### 1. Add Game Component to Quiz Page

```javascript
// src/app/quiz/[subject]/page.jsx
import EggJugglingGame from '@/components/EggJugglingGame';

// Add to quiz layout (left panel)
<div className="flex">
  <div className="w-1/3 p-4">
    <EggJugglingGame 
      isQuizActive={!showResults}
      onScoreUpdate={handleGameScore}
    />
  </div>
  <div className="w-2/3">
    {/* Existing quiz content */}
  </div>
</div>
```

### 2. Test Game Functionality

**Manual Test Checklist**:
- [ ] Game canvas appears in left panel
- [ ] Eggs spawn from top and fall down
- [ ] Clicking/tapping eggs makes them bounce
- [ ] Eggs that hit bottom are removed
- [ ] Score updates correctly (+1 bounce, -1 drop)
- [ ] Game integrates with quiz scoring
- [ ] Settings toggle works
- [ ] Game stops when quiz ends

### 3. Verify Performance

```javascript
// Add to browser console during gameplay
console.time('frame');
// ... game runs for a few seconds
console.timeEnd('frame'); // Should be <16ms average
```

## Component Usage Examples

### Basic Game Integration
```javascript
import { EggJugglingGame } from '@/components/EggJugglingGame';

function QuizPage() {
  const [gameScore, setGameScore] = useState(0);
  
  return (
    <EggJugglingGame 
      isQuizActive={true}
      onScoreUpdate={setGameScore}
      settings={{
        enabled: true,
        eggQuantity: 5,
        spawnRate: 15
      }}
    />
  );
}
```

### Custom Settings
```javascript
const gameSettings = {
  enabled: true,
  eggQuantity: 3,        // 1-10 eggs
  spawnRate: 10,         // eggs per minute
  difficulty: 'easy',    // easy|medium|hard
  soundEnabled: false
};

<EggJugglingGame settings={gameSettings} />
```

### Score Integration
```javascript
function QuizWithGame() {
  const { points, setPoints } = usePoints();
  
  const handleGameScore = (miniGameScore) => {
    // Combine quiz points with mini-game bonus
    const bonusMultiplier = 1 + (miniGameScore * 0.1);
    const totalScore = (points * bonusMultiplier) + miniGameScore;
    setPoints(totalScore);
  };
  
  return (
    <EggJugglingGame 
      onScoreUpdate={handleGameScore}
    />
  );
}
```

## Testing Commands

### Unit Tests
```bash
# Test individual components
npm test -- --testPathPattern=EggJugglingGame
npm test -- --testPathPattern=GameCanvas
npm test -- --testPathPattern=useGameState
```

### Integration Tests
```bash
# Test game-quiz integration
npm test -- --testPathPattern=game-quiz-integration
```

### Performance Tests
```bash
# Test animation performance
npm test -- --testPathPattern=game-performance
```

## Troubleshooting

### Common Issues

**Game not appearing**:
- Check canvas element is rendered
- Verify game settings enabled=true
- Check console for JavaScript errors

**Poor performance**:
- Reduce eggQuantity setting
- Check browser supports requestAnimationFrame
- Verify no memory leaks in egg cleanup

**Touch not working on mobile**:
- Add touch event listeners
- Test with both click and touch events
- Check viewport meta tag

### Debug Mode
```javascript
<EggJugglingGame debugMode={true} />
// Shows egg boundaries, physics info, FPS counter
```

## File Structure After Implementation

```
src/
├── components/
│   ├── EggJugglingGame.jsx      # Main game component
│   ├── GameCanvas.jsx           # Canvas rendering
│   ├── GameSettings.jsx         # Settings UI
│   └── __tests__/
├── hooks/
│   ├── useGameState.js          # Game state management
│   ├── useGamePhysics.js        # Physics calculations
│   └── __tests__/
├── utils/
│   ├── gameEngine.js            # Core game engine
│   ├── physics.js               # Physics utilities
│   └── __tests__/
└── context/
    ├── GameContext.js           # Game context provider
    └── __tests__/
```

## Next Steps

1. **Review implementation**: Check all components follow contracts
2. **Run full test suite**: Ensure all tests pass
3. **Performance optimization**: Profile and optimize if needed
4. **User testing**: Test on different devices and browsers
5. **Documentation**: Update README with game features