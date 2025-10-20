import { render, screen, fireEvent } from '@testing-library/react';
import GameCanvas from '../GameCanvas';

describe('GameCanvas Component Contract', () => {
  const mockOnEggTap = jest.fn();
  const mockGameState = {
    eggs: [
      { id: '1', x: 100, y: 200, radius: 20 },
      { id: '2', x: 150, y: 300, radius: 20 }
    ],
    isActive: true,
    score: 0
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders canvas with correct dimensions', () => {
    render(
      <GameCanvas 
        width={300}
        height={400}
        gameState={mockGameState}
        onEggTap={mockOnEggTap}
      />
    );
    
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '400');
  });

  test('handles click events and calls onEggTap', () => {
    render(
      <GameCanvas 
        width={300}
        height={400}
        gameState={mockGameState}
        onEggTap={mockOnEggTap}
      />
    );
    
    const canvas = screen.getByRole('img', { hidden: true });
    fireEvent.click(canvas, { clientX: 100, clientY: 200 });
    
    // This will fail until implementation exists
    expect(mockOnEggTap).toHaveBeenCalledWith('1');
  });

  test('renders eggs from game state', () => {
    render(
      <GameCanvas 
        width={300}
        height={400}
        gameState={mockGameState}
        onEggTap={mockOnEggTap}
      />
    );
    
    // Canvas should render eggs - this will fail until implementation
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toBeInTheDocument();
  });

  test('shows debug information when debugMode is true', () => {
    render(
      <GameCanvas 
        width={300}
        height={400}
        gameState={mockGameState}
        onEggTap={mockOnEggTap}
        debugMode={true}
      />
    );
    
    // Should show debug overlay - will fail until implementation
    expect(screen.getByTestId('debug-overlay')).toBeInTheDocument();
  });
});