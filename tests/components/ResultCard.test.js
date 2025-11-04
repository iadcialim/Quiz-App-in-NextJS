/**
 * Component tests for ResultCard
 */

import { render, screen } from '@testing-library/react';
import ResultCard from '../../src/components/ResultCard';

describe('ResultCard Component', () => {
  test('renders basic card with number format', () => {
    render(<ResultCard title="Test Metric" value={42} />);
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('formats percentage values', () => {
    render(<ResultCard title="Accuracy" value={85} format="percentage" />);
    
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  test('formats time values', () => {
    render(<ResultCard title="Duration" value={125} format="time" />);
    
    expect(screen.getByText('2:05')).toBeInTheDocument();
  });

  test('formats large numbers with commas', () => {
    render(<ResultCard title="Score" value={12345} format="number" />);
    
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  test('handles null and undefined values', () => {
    render(<ResultCard title="Empty" value={null} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    
    render(<ResultCard title="Undefined" value={undefined} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">🏆</span>;
    render(<ResultCard title="Trophy" value={100} icon={<TestIcon />} />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <ResultCard title="Custom" value={1} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});