import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PointsProvider } from '../../src/context/PointsContext';
import QuizPage from '../../src/app/quiz/[subject]/page';

// Mock the quiz data
jest.mock('../../public/data/questions.json', () => ({
  subjects: [{
    name: 'Math',
    questions: [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
      }
    ]
  }]
}));

describe('Game-Quiz Integration Contract', () => {
  const mockParams = { subject: 'math' };

  beforeEach(() => {
    // Mock fetch for quiz data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          subjects: [{
            name: 'Math',
            questions: [
              {
                question: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                answer: '4'
              }
            ]
          }]
        })
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders quiz page with mini-game when enabled', async () => {
    render(
      <PointsProvider>
        <QuizPage params={mockParams} />
      </PointsProvider>
    );

    // This will fail until implementation exists
    await waitFor(() => {
      expect(screen.getByTestId('egg-juggling-game')).toBeInTheDocument();
      expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    });
  });

  test('mini-game integrates with quiz scoring', async () => {
    render(
      <PointsProvider>
        <QuizPage params={mockParams} />
      </PointsProvider>
    );

    // This will fail until implementation exists
    await waitFor(() => {
      const gameCanvas = screen.getByRole('img', { hidden: true });
      fireEvent.click(gameCanvas, { clientX: 100, clientY: 200 });
    });

    // Score should update to include mini-game points
    expect(screen.getByTestId('total-score')).toHaveTextContent(/\d+/);
  });

  test('mini-game stops when quiz ends', async () => {
    render(
      <PointsProvider>
        <QuizPage params={mockParams} />
      </PointsProvider>
    );

    // Answer the question to end quiz
    await waitFor(() => {
      const correctAnswer = screen.getByText('4');
      fireEvent.click(correctAnswer);
    });

    // Wait for next button and click it
    await waitFor(() => {
      const nextButton = screen.getByText(/submit/i);
      fireEvent.click(nextButton);
    });

    // This will fail until implementation exists
    await waitFor(() => {
      const game = screen.getByTestId('egg-juggling-game');
      expect(game).toHaveClass('game-stopped');
    });
  });

  test('game settings are accessible during quiz', async () => {
    render(
      <PointsProvider>
        <QuizPage params={mockParams} />
      </PointsProvider>
    );

    // This will fail until implementation exists
    await waitFor(() => {
      expect(screen.getByTestId('game-settings')).toBeInTheDocument();
    });

    const enableToggle = screen.getByLabelText(/enable game/i);
    fireEvent.click(enableToggle);

    // Game should be disabled
    const game = screen.getByTestId('egg-juggling-game');
    expect(game).toHaveClass('game-disabled');
  });

  test('final results include mini-game score', async () => {
    render(
      <PointsProvider>
        <QuizPage params={mockParams} />
      </PointsProvider>
    );

    // Complete the quiz
    await waitFor(() => {
      const correctAnswer = screen.getByText('4');
      fireEvent.click(correctAnswer);
    });

    await waitFor(() => {
      const submitButton = screen.getByText(/submit/i);
      fireEvent.click(submitButton);
    });

    // This will fail until implementation exists
    await waitFor(() => {
      expect(screen.getByText(/mini-game score/i)).toBeInTheDocument();
      expect(screen.getByText(/bonus multiplier/i)).toBeInTheDocument();
    });
  });
});