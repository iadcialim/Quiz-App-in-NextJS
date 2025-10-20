import { applyGravity, calculateBounce, detectCollision, generateSpawnPosition, PHYSICS_CONSTANTS } from './physics';

export default class GameEngine {
  constructor(canvas, settings) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.settings = settings;
    this.eggs = [];
    this.isRunning = false;
    this.lastUpdate = 0;
    this.spawnTimer = 0;
    this.animationId = null;
    
    this.handleClick = this.handleClick.bind(this);
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastUpdate = performance.now();
    this.canvas.addEventListener('click', this.handleClick);
    this.canvas.addEventListener('touchstart', this.handleClick);
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    this.eggs = [];
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.removeEventListener('touchstart', this.handleClick);
  }

  gameLoop() {
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastUpdate;
    this.lastUpdate = currentTime;
    
    this.update(deltaTime);
    this.render(this.context);
    
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update(deltaTime) {
    if (!this.settings.enabled) return;
    
    // Update spawn timer
    this.spawnTimer += deltaTime;
    const spawnInterval = (60 / this.settings.spawnRate) * 1000; // Convert to milliseconds
    
    // Spawn new eggs
    if (this.spawnTimer >= spawnInterval && this.eggs.length < this.settings.eggQuantity) {
      this.spawnEgg();
      this.spawnTimer = 0;
    }
    
    // Update existing eggs
    this.eggs = this.eggs.map(egg => applyGravity(egg, deltaTime));
    
    // Remove eggs that fell off screen
    this.eggs = this.eggs.filter(egg => egg.y < this.canvas.height + PHYSICS_CONSTANTS.EGG_RADIUS);
  }

  render(context) {
    // Clear canvas
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set background
    context.fillStyle = '#87CEEB'; // Sky blue
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render eggs
    this.eggs.forEach(egg => {
      context.fillStyle = egg.bounced ? '#FFD700' : '#FFFFFF'; // Gold if bounced, white otherwise
      context.beginPath();
      context.arc(egg.x, egg.y, egg.radius, 0, Math.PI * 2);
      context.fill();
      
      // Reset bounced state after rendering
      if (egg.bounced) {
        egg.bounced = false;
      }
    });
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    return this.handleInput(x, y);
  }

  handleInput(x, y) {
    for (let i = 0; i < this.eggs.length; i++) {
      const egg = this.eggs[i];
      
      if (detectCollision(x, y, egg)) {
        this.eggs[i] = calculateBounce(egg);
        return true;
      }
    }
    
    return false;
  }

  spawnEgg() {
    const position = generateSpawnPosition(this.canvas.width);
    
    const newEgg = {
      id: `egg-${Date.now()}-${Math.random()}`,
      x: position.x,
      y: position.y,
      velocityX: 0,
      velocityY: 0,
      radius: PHYSICS_CONSTANTS.EGG_RADIUS,
      bounced: false,
      created: Date.now()
    };
    
    this.eggs.push(newEgg);
  }
}