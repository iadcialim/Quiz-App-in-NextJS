/**
 * Contract tests for Results component UI
 * These tests MUST FAIL until implementation is complete
 */

import { render, screen } from '@testing-library/react';
import Results from '../../../src/components/Results';
import { PointsContext } from '../../../src/context/PointsContext';

const mockQuizData = {
  quizMetrics: {
    totalQuestions: 10,
    correct: 8,
    wrong: 2,
    timeSpentMs: 40000
  },
  quizScore: {
    points: 1000,
    breakdown: {
      accuracyScore: 700,
      speedBonus: 300,
      maxPossibleTime: 100,
      speedFactor: 0.6
    },
    percentage: 80
  },
  eggGameActive: false
};

const mockEggGameData = {
  ...mockQuizData,
  eggGameActive: true,
  eggGameMetrics: {
    eggsDropped: 1,
    eggsProduced: 201,
    juggles: 200,
    totalEggsIntroduced: 6
  },
  eggGameScore: {
    points: 1700,
    breakdown: {
      bouncePoints: 2000,
      dropPenalty: 200,
      efficiencyPenalty: 100,
      excessEggs: 1
    }
  }
};

const renderWithContext = (contextValue) => {
  return render(
    <PointsContext.Provider value={contextValue}>
      <Results />
    </PointsContext.Provider>
  );
};

describe('Results Component Contract', () => {
  test('displays "Your Score" title', () => {
    renderWithContext(mockQuizData);
    expect(screen.getByText('Your Score')).toBeInTheDocument();
  });

  test('does not display legacy "Quiz Result" title', () => {
    renderWithContext(mockQuizData);
    expect(screen.queryByText('Quiz Result')).not.toBeInTheDocument();
  });

  test('does not display legacy scoring text', () => {
    renderWithContext(mockQuizData);
    expect(screen.queryByText(/You scored .* out of .* possible points/)).not.toBeInTheDocument();
  });

  test('displays Quiz Results section with 5 cards', () => {
    renderWithContext(mockQuizData);
    
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(screen.getByText('Correct Answers')).toBeInTheDocument();
    expect(screen.getByText('Wrong Answers')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
    expect(screen.getByText('Total Time Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
  });

  test('displays Egg Juggling section when mini-game active', () => {
    renderWithContext(mockEggGameData);
    
    expect(screen.getByText('Egg Juggling')).toBeInTheDocument();
    expect(screen.getByText('Eggs Dropped')).toBeInTheDocument();
    expect(screen.getByText('Eggs Produced')).toBeInTheDocument();
    expect(screen.getByText('Egg Juggles')).toBeInTheDocument();
    expect(screen.getByText('Total Time Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
  });

  test('hides Egg Juggling section when mini-game inactive', () => {
    renderWithContext(mockQuizData);
    
    expect(screen.queryByText('Egg Juggling')).not.toBeInTheDocument();
    expect(screen.queryByText('Eggs Dropped')).not.toBeInTheDocument();
    expect(screen.queryByText('Eggs Produced')).not.toBeInTheDocument();
    expect(screen.queryByText('Egg Juggles')).not.toBeInTheDocument();
  });

  test('displays correct quiz metric values', () => {
    renderWithContext(mockQuizData);
    
    expect(screen.getByText('8')).toBeInTheDocument(); // Correct answers
    expect(screen.getByText('2')).toBeInTheDocument(); // Wrong answers
    expect(screen.getByText('80%')).toBeInTheDocument(); // Percentage
    expect(screen.getByText('1000')).toBeInTheDocument(); // Total points
  });

  test('displays correct egg game metric values when active', () => {
    renderWithContext(mockEggGameData);
    
    expect(screen.getByText('1')).toBeInTheDocument(); // Eggs dropped
    expect(screen.getByText('201')).toBeInTheDocument(); // Eggs produced
    expect(screen.getByText('200')).toBeInTheDocument(); // Egg juggles
    expect(screen.getByText('1700')).toBeInTheDocument(); // Egg game points
  });
});