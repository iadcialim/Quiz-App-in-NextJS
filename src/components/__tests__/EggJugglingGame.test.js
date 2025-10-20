import { render, screen, fireEvent } from '@testing-library/react';
import EggJugglingGame from '../EggJugglingGame';

describe('EggJugglingGame Component Contract', () => {
  const mockOnScoreUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with required props', () => {
    render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
      />
    );
    
    expect(screen.getByTestId('egg-juggling-game')).toBeInTheDocument();
  });

  test('accepts optional width and height props', () => {
    render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
        width={400}
        height={500}
      />
    );
    
    const canvas = screen.getByRole('img', { hidden: true });
    expect(canvas).toHaveAttribute('width', '400');
    expect(canvas).toHaveAttribute('height', '500');
  });

  test('calls onScoreUpdate when score changes', () => {
    render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
      />
    );
    
    // This will fail until implementation exists
    expect(mockOnScoreUpdate).toHaveBeenCalledWith(expect.any(Number));
  });

  test('stops game when isQuizActive becomes false', () => {
    const { rerender } = render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
      />
    );
    
    rerender(
      <EggJugglingGame 
        isQuizActive={false}
        onScoreUpdate={mockOnScoreUpdate}
      />
    );
    
    // Game should stop when quiz becomes inactive
    expect(screen.getByTestId('egg-juggling-game')).toHaveClass('game-stopped');
  });
});