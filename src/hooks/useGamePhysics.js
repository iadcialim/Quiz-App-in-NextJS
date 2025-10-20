import { useCallback } from "react";
import {
  applyGravity,
  calculateBounce,
  detectCollision,
  generateSpawnPosition,
  handleWallBounce,
  PHYSICS_CONSTANTS,
} from "../utils/physics";

export default function useGamePhysics(canvasSize) {
  const updateEggPhysics = useCallback(
    (egg, deltaTime, speedMultiplier = 1.0) => {
      const gravityApplied = applyGravity(egg, deltaTime, speedMultiplier);
      return handleWallBounce(
        gravityApplied,
        canvasSize.width,
        canvasSize.height
      );
    },
    [canvasSize]
  );

  const checkCollisions = useCallback((eggs, canvasSize) => {
    const collisions = [];

    eggs.forEach((egg) => {
      const eggHeight = egg.radius * 1.6;
      const eggBottomOffset = eggHeight * 0.8; // matches rendering offset in GameCanvas
      // Check pan collision (15px from bottom)
      const panTop = canvasSize.height - 15;
      // Use visual bottom of egg (egg.y + eggBottomOffset). Add small tolerance to avoid jitter.
      if (egg.y + eggBottomOffset >= panTop - 1) {
        collisions.push({
          eggId: egg.id,
          type: "bottom",
          position: { x: egg.x, y: egg.y },
        });
      }
    });

    return collisions;
  }, []);

  const spawnEgg = useCallback((canvasSize) => {
    const spawn = generateSpawnPosition(canvasSize.width);

    return {
      id: `egg-${Date.now()}-${Math.random()}`,
      x: spawn.x,
      y: spawn.y,
      velocityX: spawn.velocityX,
      velocityY: spawn.velocityY,
      radius: PHYSICS_CONSTANTS.EGG_RADIUS,
      bounced: false,
      created: Date.now(),
    };
  }, []);

  const removeExpiredEggs = useCallback((eggs, canvasSize) => {
    const keptEggs = [];
    let removedCount = 0;
    // Buffer for removal should scale with canvas height to avoid early removal on small canvases
    let buffer = Math.max(100, Math.floor(canvasSize.height * 0.25));
    eggs.forEach((egg) => {
      const eggHeight = egg.radius * 1.6;
      const eggBottomOffset = eggHeight * 0.8;
      // Only remove when egg bottom is well past bottom of canvas
      if (egg.y - eggBottomOffset < canvasSize.height + buffer) {
        keptEggs.push(egg);
      } else {
        removedCount++;
      }
    });

    return { eggs: keptEggs, droppedCount: removedCount };
  }, []);

  return {
    updateEggPhysics,
    checkCollisions,
    spawnEgg,
    removeExpiredEggs,
  };
}
