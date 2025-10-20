export const PHYSICS_CONSTANTS = {
  GRAVITY: 0.5,
  BOUNCE_DAMPING: 0.7,
  TERMINAL_VELOCITY: 15,
  BOUNCE_VELOCITY: -18,
  EGG_RADIUS: 20
};

export function applyGravity(egg, deltaTime, speedMultiplier = 1.0) {
  const timeScale = (deltaTime / 16) * speedMultiplier;
  
  const newVelocityY = Math.min(
    egg.velocityY + (PHYSICS_CONSTANTS.GRAVITY * timeScale),
    PHYSICS_CONSTANTS.TERMINAL_VELOCITY * speedMultiplier
  );
  
  return {
    ...egg,
    velocityY: newVelocityY,
    y: egg.y + (newVelocityY * timeScale),
    x: egg.x + (egg.velocityX * timeScale)
  };
}

export function handleWallBounce(egg, canvasWidth, canvasHeight) {
  let newEgg = { ...egg };
  const eggWidth = egg.radius * 1.2;
  const eggHeight = egg.radius * 1.6;
  // Visual offset used when drawing the egg: center is slightly above egg.y
  // verticalRadius = eggHeight * 0.9 and center offset = -eggHeight * 0.1
  // so bottom of the rendered egg is at egg.y + eggHeight * 0.8
  const eggBottomOffset = eggHeight * 0.8;
  
  // Left wall bounce
  if (newEgg.x - eggWidth/2 <= 0) {
    newEgg.x = eggWidth/2;
    newEgg.velocityX = Math.abs(newEgg.velocityX) * PHYSICS_CONSTANTS.BOUNCE_DAMPING;
  }
  
  // Right wall bounce
  if (newEgg.x + eggWidth/2 >= canvasWidth) {
    newEgg.x = canvasWidth - eggWidth/2;
    newEgg.velocityX = -Math.abs(newEgg.velocityX) * PHYSICS_CONSTANTS.BOUNCE_DAMPING;
  }
  
  // Top wall bounce (use visual top: egg.y - eggHeight)
  if (newEgg.y - eggHeight <= 0) {
    newEgg.y = eggHeight;
    newEgg.velocityY = Math.abs(newEgg.velocityY) * PHYSICS_CONSTANTS.BOUNCE_DAMPING;
  }

  // Prevent eggs from going past pan area (use visual bottom offset)
  const panTop = canvasHeight - 15;
  if (newEgg.y + eggBottomOffset > panTop) {
    newEgg.y = panTop - eggBottomOffset;
  }
  
  return newEgg;
}

export function calculateBounce(egg, tapForce = 1.0) {
  const bounceVelocity = PHYSICS_CONSTANTS.BOUNCE_VELOCITY * tapForce;
  
  return {
    ...egg,
    velocityY: bounceVelocity,
    bounced: true
  };
}

export function detectCollision(x, y, egg) {
  // More sensitive collision detection with larger clickable area
  const eggWidth = egg.radius * 1.8; // Increased from 1.2 * 0.8
  const eggHeight = egg.radius * 2.2; // Increased from 1.6 * 0.9
  const centerY = egg.y - egg.radius * 0.1;
  
  const dx = (x - egg.x) / eggWidth;
  const dy = (y - centerY) / eggHeight;
  
  return (dx * dx + dy * dy) <= 1;
}

export function generateSpawnPosition(canvasWidth) {
  const eggWidth = PHYSICS_CONSTANTS.EGG_RADIUS * 1.2;
  return {
    x: Math.random() * (canvasWidth - eggWidth) + eggWidth/2,
    y: -PHYSICS_CONSTANTS.EGG_RADIUS * 2,
    velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
    velocityY: 0
  };
}