# Research: 2D Egg-Juggling Mini-Game

## HTML5 Canvas Integration with React

**Decision**: Use HTML5 Canvas with useRef and useEffect hooks for React integration  
**Rationale**: Direct pixel manipulation, 60fps performance, full control over rendering  
**Alternatives considered**: CSS animations (limited physics), SVG (performance issues), WebGL (overkill)

### Implementation Pattern
```javascript
const GameCanvas = ({ width, height, gameState }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Animation loop with requestAnimationFrame
  }, [gameState]);
  
  return <canvas ref={canvasRef} width={width} height={height} />;
};
```

## Game Physics for 2D Falling Objects

**Decision**: Simple gravity-based physics with collision detection  
**Rationale**: Realistic egg behavior, predictable performance, easy to understand  
**Alternatives considered**: Complex physics engines (Box2D - too heavy), CSS transforms (limited control)

### Physics Model
- Gravity: 9.8 pixels/frame²
- Bounce: 70% velocity retention on tap
- Collision: AABB (Axis-Aligned Bounding Box) detection
- Spawn: Random X position, fixed Y start

## Performance Optimization for Canvas Animations

**Decision**: RequestAnimationFrame with delta time calculation  
**Rationale**: Smooth 60fps, frame-rate independent physics, browser optimization  
**Alternatives considered**: setInterval (inconsistent timing), CSS animations (limited control)

### Optimization Techniques
- Object pooling for eggs (reuse objects)
- Dirty rectangle rendering (only redraw changed areas)
- Offscreen canvas for static elements
- Throttle physics calculations to 60fps max

## Modular Game Engine Patterns

**Decision**: Component-based architecture with custom hooks  
**Rationale**: Reusable across projects, testable, follows React patterns  
**Alternatives considered**: Class-based engine (not React-friendly), Global state (harder to test)

### Architecture Pattern
```
GameEngine (hook) → Physics calculations
GameRenderer (component) → Canvas rendering  
GameController (hook) → User input handling
GameState (context) → State management
```

## Integration with Quiz Application

**Decision**: Context API bridge between game and quiz scoring  
**Rationale**: Minimal coupling, existing pattern in app, easy to test  
**Alternatives considered**: Direct prop drilling (tight coupling), Redux (overkill for this feature)

### Integration Points
- Quiz page layout: Left panel for game canvas
- Scoring system: Bonus points added to quiz total
- Settings: Toggle in existing settings UI
- Lifecycle: Game starts/stops with quiz timer