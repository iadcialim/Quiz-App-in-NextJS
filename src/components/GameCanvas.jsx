'use client';

import { useRef, useEffect } from 'react';
import { detectCollision, PHYSICS_CONSTANTS } from '../utils/physics';

export default function GameCanvas({ 
  width, 
  height, 
  gameState, 
  onEggTap, 
  backgroundColor = '#87CEEB',
  debugMode = false 
}) {
  const canvasRef = useRef(null);

  // Handle canvas clicks
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click hit any egg
    for (const egg of gameState.eggs) {
      if (detectCollision(x, y, egg)) {
        onEggTap(egg.id);
        break;
      }
    }
  };

  // Render game state to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    
    // Clear canvas
    context.clearRect(0, 0, width, height);
    
    // Set background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
    
    // Draw pan at bottom
    const panHeight = 15;
    const panWidth = width * 0.8;
    const panX = (width - panWidth) / 2;
    const panY = height - panHeight;
    
    context.fillStyle = '#8B4513';
    context.fillRect(panX, panY, panWidth, panHeight);
    context.strokeStyle = '#654321';
    context.lineWidth = 2;
    context.strokeRect(panX, panY, panWidth, panHeight);
    
    // Render eggs
    gameState.eggs.forEach(egg => {
      context.fillStyle = egg.bounced ? '#FFD700' : '#F5F5DC';
      context.strokeStyle = '#8B4513';
      context.lineWidth = 1.5;
      
      // Draw egg shape using ellipse and curves
      const eggWidth = egg.radius * 1.2;
      const eggHeight = egg.radius * 1.6;
      
      context.save();
      context.translate(egg.x, egg.y);
      
      context.beginPath();
      context.ellipse(0, -eggHeight * 0.1, eggWidth * 0.8, eggHeight * 0.9, 0, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      
      context.restore();
    });

    // Debug mode overlay
    if (debugMode) {
      context.fillStyle = 'rgba(255, 0, 0, 0.3)';
      context.font = '12px Arial';
      context.fillText(`Eggs: ${gameState.eggs.length}`, 10, 20);
      context.fillText(`Score: ${gameState.score}`, 10, 40);
      context.fillText(`Active: ${gameState.isActive}`, 10, 60);
      
      // Draw egg collision boundaries
      gameState.eggs.forEach(egg => {
        context.strokeStyle = 'red';
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(egg.x, egg.y - egg.radius * 0.1, egg.radius * 1.2 * 0.8, egg.radius * 1.6 * 0.9, 0, 0, Math.PI * 2);
        context.stroke();
      });
    }
  }, [gameState, width, height, backgroundColor, debugMode]);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasClick}
        className="border border-gray-300 rounded cursor-pointer max-w-full max-h-full"
        style={{ touchAction: 'manipulation' }}
      />
      {debugMode && (
        <div 
          data-testid="debug-overlay"
          className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs"
        >
          <div>Eggs: {gameState.eggs.length}</div>
          <div>Score: {gameState.score}</div>
          <div>Active: {gameState.isActive ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
}