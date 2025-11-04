/**
 * Enhanced Results component tests
 */

import { render, screen } from '@testing-library/react';
import Results from '../../src/components/Results';
import { PointsContext } from '../../src/context/PointsContext';

// Mock react-confetti
jest.mock('react-confetti', () => {
  return function MockConfetti() {
    return <div data-testid="confetti" />;
  };
});

// Mock react-use
jest.mock('react-use', () => ({
  useWindowSize: () => ({ width: 1024, height: 768 })
}));

// Mock other components
jest.mock('../../src/components/ScoreSubmissionForm', () => {
  return function MockScoreSubmissionForm() {
    return <div data-testid="score-submission-form" />;
  };
});

jest.mock('../../src/components/Leaderboard', () => {
  return function MockLeaderboard() {
    return <div data-testid="leaderboard" />;
  };
});

describe('Enhanced Results Component', () => {
  const defaultProps = {
    score: 800,
    totalQuestions: 10,
    correctAnswers: 8,
    wrongAnswers: 2,
    unattemptedQuestions: 0,
    percentage: 80,
    timeSpent: 45,
    averageTimePerQuestion: 4.5,
    miniGameScore: 100
  };

  const mockContextValue = {
    quizScore: {
      points: 800,
      percentage: 80,
      breakdown: { accuracyScore: 700, speedBonus: 100 }
    },
    eggGameScore: {
      points: 100,
      breakdown: { bouncePoints: 200, dropPenalty: 100 }
    },
    eggGameMetrics: {
      eggsDropped: 1,
      eggsProduced: 21,
      juggles: 20,
      totalEggsIntroduced: 6
    },
    eggGameActive: true
  };

  const renderWithContext = (props = defaultProps, contextValue = mockContextValue) => {
    return render(
      <PointsContext.Provider value={contextValue}>
        <Results {...props} />
      </PointsContext.Provider>
    );
  };

  test('displays "Your Score" title instead of legacy title', () => {
    renderWithContext();
    
    expect(screen.getByText('Your Score')).toBeInTheDocument();
    expect(screen.queryByText('Quiz Result')).not.toBeInTheDocument();
  });

  test('displays Quiz Results section with enhanced data', () => {
    renderWithContext();
    
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(screen.getByText('Correct Answers')).toBeInTheDocument();
    expect(screen.getByText('Wrong Answers')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
    expect(screen.getByText('Total Time Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
  });

  test('displays Egg Juggling section when game is active', () => {
    renderWithContext();
    
    expect(screen.getByText('Egg Juggling')).toBeInTheDocument();
    expect(screen.getByText('Eggs Dropped')).toBeInTheDocument();
    expect(screen.getByText('Eggs Produced')).toBeInTheDocument();
    expect(screen.getByText('Egg Juggles')).toBeInTheDocument();
  });

  test('hides Egg Juggling section when game is inactive', () => {
    const inactiveContext = { ...mockContextValue, eggGameActive: false };
    renderWithContext({ ...defaultProps, miniGameScore: 0 }, inactiveContext);
    
    expect(screen.queryByText('Egg Juggling')).not.toBeInTheDocument();
  });

  test('uses context data over props when available', () => {
    renderWithContext();
    
    // Should use context quizScore.percentage (80) over props percentage
    expect(screen.getByText('80%')).toBeInTheDocument();
    
    // Should use context quizScore.points (800) over props score
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  test('falls back to props when context data unavailable', () => {
    const emptyContext = {};
    renderWithContext(defaultProps, emptyContext);
    
    // Should fall back to props values
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  test('displays egg game metrics from context', () => {
    renderWithContext();
    
    expect(screen.getByText('1')).toBeInTheDocument(); // Eggs dropped
    expect(screen.getByText('21')).toBeInTheDocument(); // Eggs produced
    expect(screen.getByText('20')).toBeInTheDocument(); // Egg juggles
  });

  test('renders confetti component', () => {
    renderWithContext();
    
    expect(screen.getByTestId('confetti')).toBeInTheDocument();
  });

  test('renders score submission and leaderboard', () => {
    renderWithContext();
    
    expect(screen.getByTestId('score-submission-form')).toBeInTheDocument();
    expect(screen.getByTestId('leaderboard')).toBeInTheDocument();
  });
});