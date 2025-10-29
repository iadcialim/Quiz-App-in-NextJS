/**
 * Contract Tests: Results Component
 * 
 * These tests validate the Results component UI contract
 * and ensure proper display of enhanced scoring sections.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Results } from '../../src/components/Results';
import { PointsContext } from '../../src/context/PointsContext';

// Mock context provider for testing
const createMockContext = (overrides = {}) => ({
  points: 1000,
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
  eggGameActive: false,
  eggGameMetrics: null,
  eggGameScore: null,
  ...overrides
});

const renderWithContext = (contextValue) => {
  return render(
    <PointsContext.Provider value={contextValue}>
      <Results />
    </PointsContext.Provider>
  );
};

describe('Results Component UI Contract', () => {
  test('should display "Your Score" as page title', () => {
    const context = createMockContext();
    renderWithContext(context);

    expect(screen.getByText('Your Score')).toBeInTheDocument();
    expect(screen.queryByText(/You scored.*out of.*possible points/)).not.toBeInTheDocument();
  });

  test('should display Quiz Results section with required cards', () => {
    const context = createMockContext();
    renderWithContext(context);

    // Verify Quiz section exists
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();

    // Verify all 5 required cards are present
    expect(screen.getByText('Correct Answers')).toBeInTheDocument();
    expect(screen.getByText('Wrong Answers')).toBeInTheDocument();
    expect(screen.getByText('Percentage')).toBeInTheDocument();
    expect(screen.getByText('Total Time Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();

    // Verify card values are displayed
    expect(screen.getByText('8')).toBeInTheDocument();  // Correct answers
    expect(screen.getByText('2')).toBeInTheDocument();  // Wrong answers
    expect(screen.getByText('80%')).toBeInTheDocument(); // Percentage
    expect(screen.getByText('1000')).toBeInTheDocument(); // Total points
  });

  test('should display Egg Juggling section when mini-game was active', () => {
    const context = createMockContext({
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
    });

    renderWithContext(context);

    // Verify Egg Juggling section exists
    expect(screen.getByText('Egg Juggling')).toBeInTheDocument();

    // Verify all 5 required cards are present
    expect(screen.getByText('Eggs Dropped')).toBeInTheDocument();
    expect(screen.getByText('Eggs Produced')).toBeInTheDocument();
    expect(screen.getByText('Egg Juggles')).toBeInTheDocument();
    expect(screen.getByText('Total Time Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();

    // Verify card values are displayed
    expect(screen.getByText('1')).toBeInTheDocument();   // Eggs dropped
    expect(screen.getByText('201')).toBeInTheDocument(); // Eggs produced
    expect(screen.getByText('200')).toBeInTheDocument(); // Egg juggles
    expect(screen.getByText('1700')).toBeInTheDocument(); // Total points
  });

  test('should NOT display Egg Juggling section when mini-game was inactive', () => {
    const context = createMockContext({
      eggGameActive: false
    });

    renderWithContext(context);

    // Verify Quiz section exists but Egg Juggling does not
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(screen.queryByText('Egg Juggling')).not.toBeInTheDocument();
  });

  test('should handle missing or invalid scoring data gracefully', () => {
    const context = createMockContext({
      quizScore: null,
      quizMetrics: null
    });

    renderWithContext(context);

    // Should still render title and structure
    expect(screen.getByText('Your Score')).toBeInTheDocument();
    
    // Should handle missing data without crashing
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
  });

  test('should format time values correctly', () => {
    const context = createMockContext({
      quizMetrics: {
        ...createMockContext().quizMetrics,
        timeSpentMs: 125000 // 2 minutes 5 seconds
      }
    });

    renderWithContext(context);

    // Should display time in MM:SS format
    expect(screen.getByText('02:05')).toBeInTheDocument();
  });

  test('should format percentage values correctly', () => {
    const context = createMockContext({
      quizScore: {
        ...createMockContext().quizScore,
        percentage: 85.5
      }
    });

    renderWithContext(context);

    // Should display percentage with % symbol
    expect(screen.getByText('85.5%')).toBeInTheDocument();
  });

  test('should format large numbers with commas', () => {
    const context = createMockContext({
      quizScore: {
        ...createMockContext().quizScore,
        points: 12345
      }
    });

    renderWithContext(context);

    // Should display numbers with comma separators
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });
});

describe('Results Component Responsive Design Contract', () => {
  test('should apply responsive grid classes for card layout', () => {
    const context = createMockContext();
    const { container } = renderWithContext(context);

    // Verify responsive grid classes are applied
    const cardContainer = container.querySelector('[class*="grid"]');
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer).toHaveClass(/grid-cols-/);
  });

  test('should maintain consistent spacing and styling', () => {
    const context = createMockContext();
    const { container } = renderWithContext(context);

    // Verify consistent card styling
    const cards = container.querySelectorAll('[class*="card"], [class*="bg-"]');
    expect(cards.length).toBeGreaterThan(0);
  });
});

describe('Results Component Accessibility Contract', () => {
  test('should have proper heading hierarchy', () => {
    const context = createMockContext({
      eggGameActive: true,
      eggGameMetrics: { eggsDropped: 0, eggsProduced: 5, juggles: 10, totalEggsIntroduced: 5 },
      eggGameScore: { points: 100, breakdown: { bouncePoints: 100, dropPenalty: 0, efficiencyPenalty: 0, excessEggs: 0 } }
    });

    renderWithContext(context);

    // Verify proper heading structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Your Score');

    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings).toHaveLength(2); // Quiz Results + Egg Juggling
  });

  test('should have accessible labels for metric values', () => {
    const context = createMockContext();
    renderWithContext(context);

    // Verify metrics have proper labels
    expect(screen.getByLabelText(/correct answers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/wrong answers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/percentage/i)).toBeInTheDocument();
  });
});