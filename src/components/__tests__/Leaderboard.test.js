import { render, screen } from '@testing-library/react';
import Leaderboard from '../Leaderboard';

describe('Leaderboard', () => {
  const mockScores = [
    { name: 'Alice', score: 100, submitted_at: '2024-01-01' },
    { name: 'Bob', score: 80, submitted_at: '2024-01-02' },
    { name: 'Charlie', score: 60, submitted_at: '2024-01-03' }
  ];

  it('renders leaderboard title', () => {
    render(<Leaderboard scores={mockScores} />);
    
    expect(screen.getByText('🏆 Top 20 Scores')).toBeInTheDocument();
  });

  it('displays all scores with rankings', () => {
    render(<Leaderboard scores={mockScores} />);
    
    expect(screen.getByText('#1 Alice')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument();
    expect(screen.getByText('#2 Bob')).toBeInTheDocument();
    expect(screen.getByText('80 points')).toBeInTheDocument();
    expect(screen.getByText('#3 Charlie')).toBeInTheDocument();
    expect(screen.getByText('60 points')).toBeInTheDocument();
  });

  it('highlights current user', () => {
    render(<Leaderboard scores={mockScores} currentUserName="Alice" />);
    
    const aliceEntry = screen.getByText('#1 Alice').closest('div');
    expect(aliceEntry).toHaveClass('bg-yellow-100', 'font-bold');
  });

  it('does not highlight other users', () => {
    render(<Leaderboard scores={mockScores} currentUserName="Alice" />);
    
    const bobEntry = screen.getByText('#2 Bob').closest('div');
    expect(bobEntry).toHaveClass('bg-gray-50');
    expect(bobEntry).not.toHaveClass('bg-yellow-100', 'font-bold');
  });

  it('handles empty scores array', () => {
    render(<Leaderboard scores={[]} />);
    
    expect(screen.getByText('🏆 Top 20 Scores')).toBeInTheDocument();
  });
});