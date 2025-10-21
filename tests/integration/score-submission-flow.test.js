import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import Results from '../../src/components/Results';
import { PointsProvider } from '../../src/context/PointsContext';

// Mock fetch for API calls
global.fetch = jest.fn();

const mockQuizData = {
  score: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  wrongAnswers: 2,
  unattempted: 0,
  percentage: 80,
  timeSpent: 120,
  subject: 'javascript'
};

const mockLeaderboardData = [
  { id: 1, name: 'Alice', score: 95, subject: 'javascript', created_at: '2024-01-01' },
  { id: 2, name: 'Bob', score: 85, subject: 'javascript', created_at: '2024-01-02' }
];

const ResultsWrapper = ({ children }) => (
  <PointsProvider>
    {children}
  </PointsProvider>
);

describe('Score Submission Flow Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('complete score submission and leaderboard update flow', async () => {
    // Mock successful score submission
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Score submitted successfully' })
      })
      // Mock leaderboard fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockLeaderboardData
      });

    render(
      <ResultsWrapper>
        <Results {...mockQuizData} />
      </ResultsWrapper>
    );

    // Wait for leaderboard to load
    await waitFor(() => {
      expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    });

    // Find and fill score submission form
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const submitButton = screen.getByText(/submit score/i);

    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    fireEvent.click(submitButton);

    // Verify API calls
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'TestUser',
          score: 85,
          subject: 'javascript',
          totalQuestions: 10,
          correctAnswers: 8,
          timeSpent: 120
        })
      });
    });

    // Verify success message
    expect(screen.getByText(/score submitted successfully/i)).toBeInTheDocument();
  });

  test('handles submission errors gracefully', async () => {
    // Mock failed submission
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <ResultsWrapper>
        <Results {...mockQuizData} />
      </ResultsWrapper>
    );

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const submitButton = screen.getByText(/submit score/i);

    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    fireEvent.click(submitButton);

    // Verify error handling
    await waitFor(() => {
      expect(screen.getByText(/failed to submit score/i)).toBeInTheDocument();
    });
  });

  test('validates form input before submission', async () => {
    render(
      <ResultsWrapper>
        <Results {...mockQuizData} />
      </ResultsWrapper>
    );

    const submitButton = screen.getByText(/submit score/i);
    
    // Try to submit without name
    fireEvent.click(submitButton);

    // Should not make API call
    expect(fetch).not.toHaveBeenCalled();
    
    // Should show validation error
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  test('leaderboard updates after successful submission', async () => {
    const updatedLeaderboard = [
      { id: 3, name: 'TestUser', score: 85, subject: 'javascript', created_at: '2024-01-03' },
      ...mockLeaderboardData
    ];

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockLeaderboardData
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedLeaderboard
      });

    render(
      <ResultsWrapper>
        <Results {...mockQuizData} />
      </ResultsWrapper>
    );

    // Submit score
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    fireEvent.change(nameInput, { target: { value: 'TestUser' } });
    fireEvent.click(screen.getByText(/submit score/i));

    // Wait for leaderboard refresh
    await waitFor(() => {
      expect(screen.getByText('TestUser')).toBeInTheDocument();
    });
  });
});