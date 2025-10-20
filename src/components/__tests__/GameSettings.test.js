import { render, screen, fireEvent } from '@testing-library/react';
import GameSettings from '../GameSettings';

describe('GameSettings Component Contract', () => {
  const mockOnSettingsChange = jest.fn();
  const mockSettings = {
    enabled: true,
    eggQuantity: 5,
    spawnRate: 15,
    difficulty: 'medium',
    soundEnabled: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders settings controls', () => {
    render(
      <GameSettings 
        settings={mockSettings}
        onSettingsChange={mockOnSettingsChange}
      />
    );
    
    expect(screen.getByLabelText(/enable game/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/egg quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
  });

  test('calls onSettingsChange when settings are modified', () => {
    render(
      <GameSettings 
        settings={mockSettings}
        onSettingsChange={mockOnSettingsChange}
      />
    );
    
    const enableToggle = screen.getByLabelText(/enable game/i);
    fireEvent.click(enableToggle);
    
    // This will fail until implementation exists
    expect(mockOnSettingsChange).toHaveBeenCalledWith({
      ...mockSettings,
      enabled: false
    });
  });

  test('disables all controls when disabled prop is true', () => {
    render(
      <GameSettings 
        settings={mockSettings}
        onSettingsChange={mockOnSettingsChange}
        disabled={true}
      />
    );
    
    const enableToggle = screen.getByLabelText(/enable game/i);
    expect(enableToggle).toBeDisabled();
  });

  test('renders in compact mode when compact prop is true', () => {
    render(
      <GameSettings 
        settings={mockSettings}
        onSettingsChange={mockOnSettingsChange}
        compact={true}
      />
    );
    
    // Should have compact styling - will fail until implementation
    expect(screen.getByTestId('game-settings')).toHaveClass('compact');
  });
});