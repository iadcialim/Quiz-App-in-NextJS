import { render, screen, fireEvent } from '@testing-library/react';
import ScoreSubmissionForm from '../ScoreSubmissionForm';

describe('ScoreSubmissionForm', () => {
  const mockProps = {
    onSubmit: jest.fn(),
    isSubmitting: false,
    userName: '',
    setUserName: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements', () => {
    render(<ScoreSubmissionForm {...mockProps} />);
    
    expect(screen.getByText('Submit Your Score')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByText('Submit Score')).toBeInTheDocument();
  });

  it('calls setUserName on input change', () => {
    render(<ScoreSubmissionForm {...mockProps} />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'John' } });
    
    expect(mockProps.setUserName).toHaveBeenCalledWith('John');
  });

  it('calls onSubmit when button clicked', () => {
    const props = { ...mockProps, userName: 'John' };
    render(<ScoreSubmissionForm {...props} />);
    
    const button = screen.getByText('Submit Score');
    fireEvent.click(button);
    
    expect(mockProps.onSubmit).toHaveBeenCalled();
  });

  it('disables button when name is empty', () => {
    render(<ScoreSubmissionForm {...mockProps} />);
    
    const button = screen.getByText('Submit Score');
    expect(button).toBeDisabled();
  });

  it('shows submitting state', () => {
    const props = { ...mockProps, isSubmitting: true, userName: 'John' };
    render(<ScoreSubmissionForm {...props} />);
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByText('Submitting...')).toBeDisabled();
  });
});