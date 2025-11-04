/**
 * Component tests for ResultSection
 */

import { render, screen } from '@testing-library/react';
import ResultSection from '../../src/components/ResultSection';

describe('ResultSection Component', () => {
  const mockCards = [
    { title: 'Card 1', value: 10, format: 'number' },
    { title: 'Card 2', value: 85, format: 'percentage' },
    { title: 'Card 3', value: 120, format: 'time' }
  ];

  test('renders section with title and cards', () => {
    render(<ResultSection title="Test Section" cards={mockCards} />);
    
    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });

  test('hides section when visible is false', () => {
    render(<ResultSection title="Hidden Section" cards={mockCards} visible={false} />);
    
    expect(screen.queryByText('Hidden Section')).not.toBeInTheDocument();
  });

  test('shows section when visible is true', () => {
    render(<ResultSection title="Visible Section" cards={mockCards} visible={true} />);
    
    expect(screen.getByText('Visible Section')).toBeInTheDocument();
  });

  test('shows section by default when visible prop not provided', () => {
    render(<ResultSection title="Default Section" cards={mockCards} />);
    
    expect(screen.getByText('Default Section')).toBeInTheDocument();
  });

  test('renders empty cards array', () => {
    render(<ResultSection title="Empty Section" cards={[]} />);
    
    expect(screen.getByText('Empty Section')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <ResultSection title="Custom" cards={mockCards} className="custom-section" />
    );
    
    expect(container.firstChild).toHaveClass('custom-section');
  });

  test('renders cards in responsive grid', () => {
    const { container } = render(<ResultSection title="Grid Test" cards={mockCards} />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });
});